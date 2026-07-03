<script setup lang="ts">
import { ref, computed } from 'vue'
import { diagnoseUx, uxDiagnosisKeys } from '../data'
import { kindColor } from '../theme'

const emit = defineEmits<{ (e: 'select', id: string): void }>()

const query = ref('')
const results = computed(() => (query.value.trim() ? diagnoseUx(query.value) : []))

const examples = [
  'it keeps giving me walls of text',
  'it just makes things up',
  "it never asks me what I meant",
  'it agrees with everything I say',
  'the output is hard to edit',
  'it hit the usage limit with no warning',
]
</script>

<template>
  <div class="diagnose">
    <div class="intro">
      <h1 class="display">Diagnose a UX complaint</h1>
      <p>
        Describe how an AI feature <em>feels</em> broken to a user. Get the UX patterns,
        design principles, and microcopy that address it — and a pointer to the engineering
        root cause when there is one. This consumes the same
        <code>uxDiagnoses</code> dataset as the <code>diagnose_ux</code> MCP tool.
      </p>
      <input
        v-model="query"
        class="q"
        type="text"
        placeholder="e.g. it keeps giving me walls of text"
        autofocus
      />
      <div class="examples">
        <button v-for="ex in examples" :key="ex" @click="query = ex">{{ ex }}</button>
      </div>
    </div>

    <div v-if="query.trim() && !results.length" class="empty">
      No match. Try one of the {{ uxDiagnosisKeys.length }} known complaints — e.g.
      “walls of text”, “made it up”, “won’t ask me anything”.
    </div>

    <div v-for="r in results" :key="r.key" class="card">
      <h2 class="display">{{ r.title }}</h2>
      <p class="challenge">{{ r.challenge }}</p>

      <div class="cols">
        <div class="col">
          <h4>UX patterns</h4>
          <button
            v-for="ux in r.uxPatterns"
            :key="ux.code"
            class="chip"
            :style="{ borderColor: kindColor['ux-pattern'] }"
            :disabled="!ux.node"
            @click="ux.node && emit('select', ux.node.id)"
          >
            <span class="mono">{{ ux.code }}</span> {{ ux.name }}
          </button>
        </div>
        <div class="col">
          <h4>Design principles</h4>
          <button
            v-for="pr in r.principles"
            :key="pr.number"
            class="chip"
            :style="{ borderColor: kindColor['principle'] }"
            :disabled="!pr.node"
            @click="pr.node && emit('select', pr.node.id)"
          >
            <span class="mono">{{ pr.number }}</span> {{ pr.name }}
          </button>
        </div>
      </div>

      <div class="microcopy">
        <h4>Microcopy</h4>
        <p>{{ r.microcopy }}</p>
      </div>

      <p class="explanation">{{ r.explanation }}</p>

      <div v-if="r.engineeringRootCause" class="root">
        ↳ Root cause may be technical — see <code>diagnose_agent</code> →
        “{{ r.engineeringRootCause }}”.
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagnose {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}
.intro h1 {
  font-size: 34px;
  margin: 0 0 12px;
}
.intro p {
  color: var(--text-dim);
  line-height: 1.6;
  margin: 0 0 22px;
}
code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  color: var(--focus);
}
.q {
  width: 100%;
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: var(--r);
  color: var(--text);
  font-size: 16px;
  padding: 14px 16px;
  font-family: inherit;
}
.q:focus {
  outline: none;
  border-color: var(--focus);
}
.examples {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 12px;
}
.examples button {
  background: none;
  border: 1px solid var(--line-soft);
  color: var(--text-faint);
  border-radius: 20px;
  padding: 5px 11px;
  font-size: 12px;
}
.examples button:hover {
  color: var(--text);
  border-color: var(--focus);
}
.empty {
  margin-top: 30px;
  color: var(--text-faint);
  line-height: 1.6;
}
.card {
  margin-top: 34px;
  padding: 24px;
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.card h2 {
  font-size: 22px;
  margin: 0 0 6px;
}
.challenge {
  color: var(--text-dim);
  margin: 0 0 20px;
  line-height: 1.5;
}
.cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}
h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-faint);
  margin: 0 0 8px;
}
.chip {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--bg-elev);
  border: 1px solid var(--line);
  border-left-width: 3px;
  color: var(--text);
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 13px;
  margin-bottom: 6px;
}
.chip:hover:not(:disabled) {
  background: #24242c;
}
.chip:disabled {
  cursor: default;
  opacity: 0.7;
}
.chip .mono {
  color: var(--text-faint);
  margin-right: 4px;
}
.microcopy {
  background: var(--bg-elev);
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 16px;
}
.microcopy p {
  margin: 0;
  color: var(--text);
  line-height: 1.5;
  font-size: 14px;
}
.explanation {
  color: var(--text-dim);
  line-height: 1.6;
  font-size: 14px;
  margin: 0 0 14px;
}
.root {
  font-size: 13px;
  color: var(--accent);
  border-top: 1px solid var(--line-soft);
  padding-top: 14px;
}
@media (max-width: 560px) {
  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
