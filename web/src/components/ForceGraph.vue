<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  type Simulation,
} from 'd3-force'
import type { GraphNode, GraphEdge } from '../data'
import { kindColor, edgeColor, strengthWidth } from '../theme'

const props = defineProps<{
  nodes: GraphNode[]
  edges: GraphEdge[]
  selectedId: string | null
  /** ids passing the current filters — dimmed if not included */
  visibleIds: Set<string>
  neighborIds: Set<string>
}>()

const emit = defineEmits<{ (e: 'select', id: string | null): void }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const wrap = ref<HTMLDivElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let sim: Simulation<GraphNode, GraphEdge> | null = null
let width = 0
let height = 0
let dpr = 1

// transform (pan/zoom)
const tx = ref(0)
const ty = ref(0)
const scale = ref(1)

let hoverId: string | null = null

const radius = (n: GraphNode) => 4 + Math.min(9, Math.sqrt(n.degree) * 1.7)

function resize() {
  if (!canvas.value || !wrap.value || !ctx) return
  const rect = wrap.value.getBoundingClientRect()
  width = rect.width
  height = rect.height
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  draw()
}

function draw() {
  if (!ctx) return
  ctx.save()
  ctx.clearRect(0, 0, width, height)
  ctx.translate(tx.value, ty.value)
  ctx.scale(scale.value, scale.value)

  const sel = props.selectedId
  const focusing = sel !== null
  const isLit = (id: string) => !focusing || id === sel || props.neighborIds.has(id)

  // edges
  for (const e of props.edges) {
    const s = e.source as GraphNode
    const t = e.target as GraphNode
    if (s.x == null || t.x == null) continue
    const inFilter = props.visibleIds.has(s.id) && props.visibleIds.has(t.id)
    const lit =
      inFilter &&
      (!focusing ||
        ((s.id === sel || t.id === sel) && (isLit(s.id) && isLit(t.id))))
    ctx.beginPath()
    ctx.moveTo(s.x, s.y!)
    ctx.lineTo(t.x!, t.y!)
    ctx.strokeStyle = edgeColor(e.type)
    ctx.globalAlpha = lit ? 0.75 : inFilter ? 0.08 : 0.02
    ctx.lineWidth = strengthWidth[e.strength] / scale.value
    ctx.stroke()
  }

  // nodes
  ctx.globalAlpha = 1
  for (const n of props.nodes) {
    if (n.x == null) continue
    const inFilter = props.visibleIds.has(n.id)
    const lit = inFilter && isLit(n.id)
    const r = radius(n)
    ctx.beginPath()
    ctx.arc(n.x, n.y!, r, 0, Math.PI * 2)
    ctx.fillStyle = kindColor[n.kind]
    ctx.globalAlpha = lit ? 1 : inFilter ? 0.18 : 0.05
    ctx.fill()
    if (n.id === sel) {
      ctx.globalAlpha = 1
      ctx.lineWidth = 2.5 / scale.value
      ctx.strokeStyle = '#fff'
      ctx.stroke()
    } else if (n.id === hoverId && lit) {
      ctx.globalAlpha = 1
      ctx.lineWidth = 1.5 / scale.value
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.stroke()
    }
    // labels for hubs, selection, hover, and neighbors while focusing
    const showLabel =
      (lit && (n.degree >= 9 || n.id === sel || n.id === hoverId)) ||
      (focusing && props.neighborIds.has(n.id))
    if (showLabel && scale.value > 0.4) {
      ctx.globalAlpha = lit ? 0.95 : 0.3
      ctx.fillStyle = '#ececf1'
      ctx.font = `${11 / scale.value}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const label = n.name.length > 26 ? n.name.slice(0, 24) + '…' : n.name
      ctx.fillText(label, n.x, n.y! + r + 2 / scale.value)
    }
  }
  ctx.restore()
}

// screen → world
function toWorld(px: number, py: number) {
  return { x: (px - tx.value) / scale.value, y: (py - ty.value) / scale.value }
}

function nodeAt(px: number, py: number): GraphNode | null {
  const w = toWorld(px, py)
  let best: GraphNode | null = null
  let bestD = Infinity
  for (const n of props.nodes) {
    if (n.x == null || !props.visibleIds.has(n.id)) continue
    const r = radius(n) + 3
    const d = (n.x - w.x) ** 2 + (n.y! - w.y) ** 2
    if (d < r * r && d < bestD) {
      bestD = d
      best = n
    }
  }
  return best
}

// interaction ----------------------------------------------------------------
let dragging: GraphNode | null = null
let panning = false
let lastX = 0
let lastY = 0
let moved = false

function onPointerDown(ev: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  const px = ev.clientX - rect.left
  const py = ev.clientY - rect.top
  lastX = ev.clientX
  lastY = ev.clientY
  moved = false
  const n = nodeAt(px, py)
  if (n) {
    dragging = n
    n.fx = n.x
    n.fy = n.y
    sim?.alphaTarget(0.15).restart()
  } else {
    panning = true
  }
  ;(ev.target as Element).setPointerCapture(ev.pointerId)
}

function onPointerMove(ev: PointerEvent) {
  const rect = canvas.value!.getBoundingClientRect()
  const px = ev.clientX - rect.left
  const py = ev.clientY - rect.top
  if (Math.abs(ev.clientX - lastX) + Math.abs(ev.clientY - lastY) > 3) moved = true

  if (dragging) {
    const w = toWorld(px, py)
    dragging.fx = w.x
    dragging.fy = w.y
  } else if (panning) {
    tx.value += ev.clientX - lastX
    ty.value += ev.clientY - lastY
    lastX = ev.clientX
    lastY = ev.clientY
    draw()
  } else {
    const n = nodeAt(px, py)
    const id = n?.id ?? null
    if (id !== hoverId) {
      hoverId = id
      canvas.value!.style.cursor = id ? 'pointer' : 'grab'
      draw()
    }
  }
}

function onPointerUp(ev: PointerEvent) {
  if (dragging) {
    dragging.fx = null
    dragging.fy = null
    sim?.alphaTarget(0)
    dragging = null
  }
  if (panning) panning = false
  if (!moved) {
    const rect = canvas.value!.getBoundingClientRect()
    const n = nodeAt(ev.clientX - rect.left, ev.clientY - rect.top)
    emit('select', n?.id ?? null)
  }
}

function onWheel(ev: WheelEvent) {
  ev.preventDefault()
  const rect = canvas.value!.getBoundingClientRect()
  const px = ev.clientX - rect.left
  const py = ev.clientY - rect.top
  const factor = Math.exp(-ev.deltaY * 0.0015)
  const newScale = Math.min(4, Math.max(0.25, scale.value * factor))
  // zoom toward cursor
  tx.value = px - (px - tx.value) * (newScale / scale.value)
  ty.value = py - (py - ty.value) * (newScale / scale.value)
  scale.value = newScale
  draw()
}

// public: center on a node (used when selecting from search/panel)
const centerOn = (id: string) => {
  const n = props.nodes.find((x) => x.id === id)
  if (!n || n.x == null) return
  scale.value = Math.max(scale.value, 1.1)
  tx.value = width / 2 - n.x * scale.value
  ty.value = height / 2 - n.y! * scale.value
  draw()
}
defineExpose({ centerOn, resetView })

function resetView() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
  draw()
}

const linkDistance = computed(() => 55)

onMounted(() => {
  ctx = canvas.value!.getContext('2d')
  const ro = new ResizeObserver(resize)
  ro.observe(wrap.value!)

  sim = forceSimulation(props.nodes)
    .force(
      'charge',
      forceManyBody<GraphNode>().strength((n) => -60 - n.degree * 6),
    )
    .force(
      'link',
      forceLink<GraphNode, GraphEdge>(props.edges)
        .id((n) => n.id)
        .distance(linkDistance.value)
        .strength((e) => (e.strength === 'strong' ? 0.5 : e.strength === 'moderate' ? 0.28 : 0.12)),
    )
    .force('center', forceCenter(0, 0))
    .force('collide', forceCollide<GraphNode>((n) => radius(n) + 3))
    .on('tick', draw)

  // seed positions in a ring so the layout settles nicely
  const R = 240
  props.nodes.forEach((n, i) => {
    const a = (i / props.nodes.length) * Math.PI * 2
    n.x = Math.cos(a) * R
    n.y = Math.sin(a) * R
  })

  resize()
  // center the initial view
  tx.value = width / 2
  ty.value = height / 2

  onBeforeUnmount(() => {
    ro.disconnect()
    sim?.stop()
  })
})

watch(
  () => [props.selectedId, props.visibleIds, props.neighborIds],
  draw,
  { deep: false },
)
</script>

<template>
  <div ref="wrap" class="graph-wrap">
    <canvas
      ref="canvas"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @wheel="onWheel"
    ></canvas>
    <button class="reset-btn" title="Reset view" @click="resetView">⤢ reset</button>
  </div>
</template>

<style scoped>
.graph-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
canvas {
  display: block;
  cursor: grab;
  touch-action: none;
}
.reset-btn {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: var(--bg-elev);
  border: 1px solid var(--line);
  color: var(--text-dim);
  border-radius: var(--r);
  padding: 6px 10px;
  font-size: 12px;
  font-family: var(--font-mono);
}
.reset-btn:hover {
  color: var(--text);
  border-color: var(--focus);
}
</style>
