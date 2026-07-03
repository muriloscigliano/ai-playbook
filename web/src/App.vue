<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import ForceGraph from './components/ForceGraph.vue'
import NodePanel from './components/NodePanel.vue'
import FilterBar from './components/FilterBar.vue'
import DiagnoseUx from './components/DiagnoseUx.vue'
import { nodes, edges, nodeById, neighborsOf, searchNodes } from './data'
import { defaultFilters, passesFilters, type Filters } from './filters'
import { kindColor } from './theme'

type View = 'graph' | 'diagnose'
const view = ref<View>('graph')

const filters = ref<Filters>(defaultFilters())
const selectedId = ref<string | null>(null)
const graphRef = shallowRef<InstanceType<typeof ForceGraph> | null>(null)

const search = ref('')
const searchResults = computed(() => (search.value.trim() ? searchNodes(search.value).slice(0, 8) : []))
const showResults = ref(false)

const visibleIds = computed(() => {
  const s = new Set<string>()
  for (const n of nodes) if (passesFilters(n, filters.value)) s.add(n.id)
  return s
})

const neighborIds = computed(() => {
  const s = new Set<string>()
  if (selectedId.value) {
    s.add(selectedId.value)
    for (const nb of neighborsOf(selectedId.value)) s.add(nb.node.id)
  }
  return s
})

const selectedNode = computed(() => (selectedId.value ? nodeById.get(selectedId.value) ?? null : null))

const visibleCount = computed(() => visibleIds.value.size)

function select(id: string | null) {
  selectedId.value = id
  if (id) graphRef.value?.centerOn(id)
}

function pickSearch(id: string) {
  search.value = ''
  showResults.value = false
  view.value = 'graph'
  select(id)
}

function resetFilters() {
  filters.value = defaultFilters()
}
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="brand">
        <span class="mark">◆</span>
        <div>
          <div class="title display">AI Playbook</div>
          <div class="subtitle mono">relations explorer</div>
        </div>
      </div>

      <nav class="views">
        <button :class="{ on: view === 'graph' }" @click="view = 'graph'">Graph</button>
        <button :class="{ on: view === 'diagnose' }" @click="view = 'diagnose'">Diagnose UX</button>
      </nav>

      <div class="search">
        <input
          v-model="search"
          type="text"
          placeholder="Search patterns, principles, UX…"
          @focus="showResults = true"
          @input="showResults = true"
          @keydown.escape="showResults = false"
        />
        <ul v-if="showResults && searchResults.length" class="results">
          <li v-for="r in searchResults" :key="r.id">
            <button @click="pickSearch(r.id)">
              <span class="r-code mono" :style="{ color: kindColor[r.kind] }">{{ r.code }}</span>
              <span class="r-name">{{ r.name }}</span>
            </button>
          </li>
        </ul>
      </div>
    </header>

    <div v-show="view === 'graph'" class="workspace">
      <aside class="sidebar">
        <div class="count mono">{{ visibleCount }} / {{ nodes.length }} shown</div>
        <FilterBar :filters="filters" :counts="{}" @update="filters = $event" @reset="resetFilters" />
      </aside>

      <main class="stage" @click.self="selectedId = null">
        <ForceGraph
          ref="graphRef"
          :nodes="nodes"
          :edges="edges"
          :selected-id="selectedId"
          :visible-ids="visibleIds"
          :neighbor-ids="neighborIds"
          @select="select"
        />
        <div class="legend">
          <span><i :style="{ background: kindColor.pattern }"></i> Pattern</span>
          <span><i :style="{ background: kindColor.principle }"></i> Principle</span>
          <span><i :style="{ background: kindColor['ux-pattern'] }"></i> UX pattern</span>
        </div>
      </main>

      <transition name="slide">
        <NodePanel
          v-if="selectedNode"
          :key="selectedNode.id"
          :node="selectedNode"
          @select="select"
          @close="selectedId = null"
        />
      </transition>
    </div>

    <div v-show="view === 'diagnose'" class="diagnose-view">
      <DiagnoseUx @select="pickSearch" />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--bg-panel);
  z-index: 5;
}
.brand {
  display: flex;
  align-items: center;
  gap: 11px;
}
.mark {
  color: var(--accent);
  font-size: 18px;
}
.title {
  font-size: 17px;
  line-height: 1.1;
}
.subtitle {
  font-size: 10px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.views {
  display: flex;
  gap: 4px;
  background: var(--bg-elev);
  border-radius: var(--r);
  padding: 3px;
}
.views button {
  background: none;
  border: none;
  color: var(--text-dim);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
}
.views button.on {
  background: var(--bg);
  color: var(--text);
}
.search {
  position: relative;
  margin-left: auto;
  width: 320px;
  max-width: 40vw;
}
.search input {
  width: 100%;
  background: var(--bg-elev);
  border: 1px solid var(--line);
  border-radius: var(--r);
  color: var(--text);
  padding: 8px 12px;
  font-size: 13px;
  font-family: inherit;
}
.search input:focus {
  outline: none;
  border-color: var(--focus);
}
.results {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 5px;
  background: var(--bg-elev);
  border: 1px solid var(--line);
  border-radius: var(--r);
  z-index: 10;
  max-height: 360px;
  overflow-y: auto;
}
.results button {
  display: flex;
  gap: 9px;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--text);
  padding: 7px 8px;
  border-radius: 6px;
}
.results button:hover {
  background: var(--bg-panel);
}
.r-code {
  font-size: 12px;
  min-width: 36px;
}
.r-name {
  font-size: 13px;
  color: var(--text-dim);
}
.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 232px 1fr auto;
  min-height: 0;
}
.sidebar {
  border-right: 1px solid var(--line);
  padding: 16px 14px;
  overflow-y: auto;
  background: var(--bg-panel);
}
.count {
  font-size: 11px;
  color: var(--text-faint);
  margin-bottom: 14px;
}
.stage {
  position: relative;
  min-width: 0;
  background:
    radial-gradient(circle at 50% 40%, #15151b 0%, var(--bg) 70%);
}
.legend {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: var(--text-dim);
  pointer-events: none;
}
.legend i {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 2px;
  margin-right: 5px;
}
.diagnose-view {
  flex: 1;
  overflow-y: auto;
}
aside.panel,
:deep(.panel) {
  width: 340px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease, opacity 0.22s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
@media (max-width: 860px) {
  .workspace {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
  :deep(.panel) {
    position: fixed;
    right: 0;
    top: 57px;
    bottom: 0;
    width: min(360px, 90vw);
    z-index: 20;
  }
}
</style>
