<script setup lang="ts">
import { parts, themes, lifecyclePhases, autonomyLevels, visibilityLevels } from '../data'
import type { EntityKind } from '../data'
import { kindColor, kindLabel } from '../theme'
import type { Filters } from '../filters'

const props = defineProps<{ filters: Filters; counts: Record<string, number> }>()
const emit = defineEmits<{ (e: 'update', f: Filters): void; (e: 'reset'): void }>()

const kinds: EntityKind[] = ['pattern', 'principle', 'ux-pattern']

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}
function set(patch: Partial<Filters>) {
  emit('update', { ...props.filters, ...patch })
}
</script>

<template>
  <div class="filters">
    <section>
      <h3>Entity</h3>
      <label v-for="k in kinds" :key="k" class="check">
        <input
          type="checkbox"
          :checked="filters.kinds.includes(k)"
          @change="set({ kinds: toggle(filters.kinds, k) })"
        />
        <span class="swatch" :style="{ background: kindColor[k] }"></span>
        {{ kindLabel[k] }}
      </label>
    </section>

    <section>
      <h3>Autonomy <span class="hint">UX patterns</span></h3>
      <label v-for="a in autonomyLevels" :key="a.level" class="check">
        <input
          type="checkbox"
          :checked="filters.autonomy.includes(a.level)"
          @change="set({ autonomy: toggle(filters.autonomy, a.level) })"
        />
        <span class="mono lvl">L{{ a.level }}</span> {{ a.name }}
      </label>
    </section>

    <section>
      <h3>Visibility <span class="hint">principles</span></h3>
      <label v-for="v in visibilityLevels" :key="v.level" class="check">
        <input
          type="checkbox"
          :checked="filters.visibility.includes(v.level)"
          @change="set({ visibility: toggle(filters.visibility, v.level) })"
        />
        <span class="mono lvl">{{ v.code }}</span> {{ v.name }}
      </label>
    </section>

    <section>
      <h3>UX lifecycle</h3>
      <label v-for="p in lifecyclePhases" :key="p" class="check">
        <input
          type="checkbox"
          :checked="filters.phases.includes(p)"
          @change="set({ phases: toggle(filters.phases, p) })"
        />
        {{ p }}
      </label>
    </section>

    <section>
      <h3>Design theme</h3>
      <label v-for="t in themes" :key="t" class="check small">
        <input
          type="checkbox"
          :checked="filters.themes.includes(t)"
          @change="set({ themes: toggle(filters.themes, t) })"
        />
        {{ t.replace(/^Theme \d+: /, '') }}
      </label>
    </section>

    <section>
      <h3>Engineering part</h3>
      <label v-for="p in parts" :key="p" class="check small">
        <input
          type="checkbox"
          :checked="filters.parts.includes(p)"
          @change="set({ parts: toggle(filters.parts, p) })"
        />
        {{ p.replace(/^Part [IVX]+: /, '') }}
      </label>
    </section>

    <button class="reset" @click="emit('reset')">Reset filters</button>
  </div>
</template>

<style scoped>
.filters {
  padding: 4px 4px 24px;
}
section {
  margin-bottom: 20px;
}
h3 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  margin: 0 0 8px;
  font-weight: 600;
}
.hint {
  text-transform: none;
  letter-spacing: 0;
  color: var(--line);
  font-weight: 400;
}
.check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-dim);
  padding: 3px 0;
  cursor: pointer;
}
.check.small {
  font-size: 12px;
}
.check:hover {
  color: var(--text);
}
.check input {
  accent-color: var(--focus);
}
.swatch {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}
.lvl {
  color: var(--text-faint);
  font-size: 11px;
}
.reset {
  background: none;
  border: 1px solid var(--line);
  color: var(--text-dim);
  border-radius: var(--r);
  padding: 7px 12px;
  font-size: 12px;
  width: 100%;
}
.reset:hover {
  color: var(--text);
  border-color: var(--focus);
}
</style>
