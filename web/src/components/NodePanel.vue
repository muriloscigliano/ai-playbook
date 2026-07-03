<script setup lang="ts">
import { computed } from 'vue'
import { neighborsOf, docLink, autonomyLevels, visibilityLevels, type GraphNode } from '../data'
import { kindColor, kindLabel, edgeColor } from '../theme'

const props = defineProps<{ node: GraphNode }>()
const emit = defineEmits<{ (e: 'select', id: string): void; (e: 'close'): void }>()

const neighbors = computed(() => neighborsOf(props.node.id))
const link = computed(() => docLink(props.node))

// group neighbors by relation type for a readable panel
const grouped = computed(() => {
  const map = new Map<string, typeof neighbors.value>()
  for (const n of neighbors.value) {
    const arr = map.get(n.type) || []
    arr.push(n)
    map.set(n.type, arr)
  }
  return [...map.entries()]
})

const autonomyNames = computed(() =>
  props.node.autonomy
    .map((l) => autonomyLevels.find((a) => a.level === l))
    .filter(Boolean)
    .map((a) => `L${a!.level} ${a!.name}`),
)
const visibilityNames = computed(() =>
  props.node.visibility
    .map((l) => visibilityLevels.find((v) => v.level === l))
    .filter(Boolean)
    .map((v) => `${v!.code} ${v!.name}`),
)

const relLabel = (t: string) => t.replace(/_/g, ' ')
</script>

<template>
  <aside class="panel">
    <header>
      <div class="kind" :style="{ color: kindColor[node.kind] }">
        <span class="dot" :style="{ background: kindColor[node.kind] }"></span>
        {{ kindLabel[node.kind] }}
        <span class="code mono">{{ node.code }}</span>
      </div>
      <button class="close" @click="emit('close')" aria-label="Close">✕</button>
    </header>

    <h2 class="display">{{ node.name }}</h2>
    <div class="group mono">{{ node.group }}</div>

    <p class="summary">{{ node.summary }}</p>

    <div v-if="autonomyNames.length || visibilityNames.length" class="tags">
      <span v-for="a in autonomyNames" :key="a" class="tag autonomy">{{ a }}</span>
      <span v-for="v in visibilityNames" :key="v" class="tag visibility">{{ v }}</span>
    </div>

    <a class="doclink" :href="link.url" target="_blank" rel="noopener">
      ↗ {{ link.label }}
    </a>

    <div class="rels">
      <div class="rels-head">
        {{ neighbors.length }} connection{{ neighbors.length === 1 ? '' : 's' }}
      </div>
      <div v-for="[type, items] in grouped" :key="type" class="rel-group">
        <div class="rel-type" :style="{ color: edgeColor(type as any) }">
          <span class="rel-bar" :style="{ background: edgeColor(type as any) }"></span>
          {{ relLabel(type) }}
        </div>
        <button
          v-for="nb in items"
          :key="nb.node.id + type"
          class="neighbor"
          @click="emit('select', nb.node.id)"
        >
          <span class="arrow">{{ nb.outgoing ? '→' : '←' }}</span>
          <span class="nb-code mono" :style="{ color: kindColor[nb.node.kind] }">{{ nb.node.code }}</span>
          <span class="nb-name">{{ nb.node.name }}</span>
          <span class="nb-strength" :class="nb.strength">{{ nb.strength[0] }}</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 22px;
  overflow-y: auto;
  background: var(--bg-panel);
  border-left: 1px solid var(--line);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kind {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.code {
  color: var(--text-faint);
  font-size: 12px;
}
.close {
  background: none;
  border: none;
  color: var(--text-faint);
  font-size: 16px;
}
.close:hover {
  color: var(--text);
}
h2 {
  margin: 14px 0 4px;
  font-size: 24px;
  line-height: 1.15;
}
.group {
  color: var(--text-faint);
  font-size: 11px;
  margin-bottom: 14px;
}
.summary {
  color: var(--text-dim);
  line-height: 1.55;
  font-size: 14px;
  margin: 0 0 16px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}
.tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 20px;
  border: 1px solid var(--line);
  color: var(--text-dim);
}
.tag.autonomy {
  border-color: #4aa3a244;
}
.tag.visibility {
  border-color: #8b7fd644;
}
.doclink {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 12px;
  margin-bottom: 20px;
}
.rels-head {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-faint);
  border-top: 1px solid var(--line-soft);
  padding-top: 16px;
  margin-bottom: 12px;
}
.rel-group {
  margin-bottom: 14px;
}
.rel-type {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 6px;
}
.rel-bar {
  width: 14px;
  height: 2px;
  border-radius: 2px;
}
.neighbor {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 5px 6px;
  border-radius: 6px;
  color: var(--text);
}
.neighbor:hover {
  background: var(--bg-elev);
}
.arrow {
  color: var(--text-faint);
  font-size: 12px;
}
.nb-code {
  font-size: 12px;
  min-width: 34px;
}
.nb-name {
  flex: 1;
  font-size: 13px;
  color: var(--text-dim);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nb-strength {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-faint);
  text-transform: uppercase;
}
.nb-strength.strong {
  color: var(--text);
}
</style>
