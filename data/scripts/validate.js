#!/usr/bin/env node
// Integrity validator for the AI Playbook data layer.
// Zero dependencies, plain Node. Run: `npm run validate` (from data/).
//
// Asserts:
//   - pattern numbers unique & in 1..78; principle numbers 1..17; UX codes P1..PN.
//   - every relation from/to resolves to a real entity id; type & strength in enums.
//   - every principles[]/patterns[]/uxPattern reference in vocabulary,
//     recommendations, and taxonomy resolves to a real entity.
//   - orphan patterns (0 relations) — warned, not failed.
// Exits non-zero with a readable report on any hard failure.

import { patterns } from '../patterns/_index.js'
import { principles } from '../principles/_index.js'
import { uxPatterns } from '../ux-patterns/_index.js'
import { allRelations } from '../relations/_index.js'
import {
  humanTasks,
  constraints,
  constraintCategories,
  touchpoints,
  aiTasks,
} from '../vocabulary/index.js'
import {
  projectBlueprints,
  problemDiagnoses,
} from '../recommendations/index.js'
import { autonomyLevels } from '../taxonomy/autonomy-levels.js'

// ── Allowed enums ──
// Relation types actually in use across the corpus (superset of the documented
// core set requires|enhances|alternative|extends|implements|conflicts|measured_by).
const RELATION_TYPES = new Set([
  'requires',
  'enhances',
  'alternative',
  'extends',
  'implements',
  'conflicts',
  'measured_by',
  'prerequisite',
  'enables',
  'triggers',
  'prevents',
  'conflicts_with',
])
const STRENGTHS = new Set(['strong', 'moderate', 'weak'])

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

// ── Build the id universe ──
const patternIds = new Set(patterns.map((p) => p.id))
const principleIds = new Set(principles.map((p) => p.id))
const uxPatternIds = new Set(uxPatterns.map((p) => p.id))
const uxPatternCodes = new Set(uxPatterns.map((p) => p.code))
const allEntityIds = new Set([...patternIds, ...principleIds, ...uxPatternIds])

const patternNumbers = new Set(patterns.map((p) => p.number))
const principleNumbers = new Set(principles.map((p) => p.number))
const autonomyCodes = new Set(autonomyLevels.map((l) => `L${l.level}`))

// Reference resolvers ───────────────────────────────────────────────────────
const resolvePatternNumber = (n, where) => {
  if (!patternNumbers.has(n)) fail(`${where}: patterns[] references unknown pattern number ${n}`)
}
const resolvePrincipleNumber = (n, where) => {
  if (!principleNumbers.has(n)) fail(`${where}: principles[] references unknown principle number ${n}`)
}
// UX pattern refs may be a code (P4) or an autonomy level code (L1..L4);
// autonomyLevels.applicablePatterns mixes P-codes only.
const resolveUxCode = (code, where) => {
  if (!uxPatternCodes.has(code)) fail(`${where}: references unknown UX pattern code "${code}"`)
}

// ── 1. Entity number/code integrity ──
;(() => {
  const seen = new Set()
  for (const p of patterns) {
    if (typeof p.number !== 'number' || p.number < 1 || p.number > 78) {
      fail(`pattern ${p.id}: number ${p.number} out of range 1..78`)
    }
    if (seen.has(p.number)) fail(`duplicate pattern number ${p.number}`)
    seen.add(p.number)
    if (p.id !== `pattern-${p.number}`) fail(`pattern ${p.id}: id does not match number ${p.number}`)
  }
})()
;(() => {
  const seen = new Set()
  for (const p of principles) {
    if (typeof p.number !== 'number' || p.number < 1 || p.number > 17) {
      fail(`principle ${p.id}: number ${p.number} out of range 1..17`)
    }
    if (seen.has(p.number)) fail(`duplicate principle number ${p.number}`)
    seen.add(p.number)
    if (p.id !== `principle-${p.number}`) fail(`principle ${p.id}: id does not match number ${p.number}`)
  }
})()
;(() => {
  const seenCode = new Set()
  const seenNum = new Set()
  for (const p of uxPatterns) {
    if (!/^P\d+$/.test(p.code)) fail(`ux pattern ${p.id}: code "${p.code}" not in P<N> form`)
    if (p.code !== `P${p.number}`) fail(`ux pattern ${p.id}: code ${p.code} does not match number ${p.number}`)
    if (seenCode.has(p.code)) fail(`duplicate UX pattern code ${p.code}`)
    if (seenNum.has(p.number)) fail(`duplicate UX pattern number ${p.number}`)
    seenCode.add(p.code)
    seenNum.add(p.number)
    if (p.id !== `ux-pattern-${p.number}`) fail(`ux pattern ${p.id}: id does not match number ${p.number}`)
  }
})()

// ── 2. Relations ──
for (const [i, r] of allRelations.entries()) {
  const where = `relation[${i}] (${r.from} -${r.type}-> ${r.to})`
  if (!allEntityIds.has(r.from)) fail(`${where}: "from" is not a real entity id`)
  if (!allEntityIds.has(r.to)) fail(`${where}: "to" is not a real entity id`)
  if (!RELATION_TYPES.has(r.type)) fail(`${where}: unknown relation type "${r.type}"`)
  if (!STRENGTHS.has(r.strength)) fail(`${where}: unknown strength "${r.strength}"`)
}

// ── 3. Cross-references in vocabulary ──
for (const t of Object.values(humanTasks)) {
  const w = `humanTask "${t.key}"`
  ;(t.principles || []).forEach((n) => resolvePrincipleNumber(n, w))
  ;(t.patterns || []).forEach((n) => resolvePatternNumber(n, w))
  if (t.uxPattern != null) resolveUxCode(t.uxPattern, w)
}
for (const c of Object.values(constraints)) {
  const w = `constraint "${c.key}"`
  ;(c.principles || []).forEach((n) => resolvePrincipleNumber(n, w))
  ;(c.patterns || []).forEach((n) => resolvePatternNumber(n, w))
}
// constraintCategories.constraints must reference real constraint keys
for (const [cid, cat] of Object.entries(constraintCategories)) {
  ;(cat.constraints || []).forEach((k) => {
    if (!constraints[k]) fail(`constraintCategory "${cid}": references unknown constraint "${k}"`)
  })
}
for (const tp of touchpoints) {
  if (tp.primaryPrinciple != null) resolvePrincipleNumber(tp.primaryPrinciple, `touchpoint "${tp.id}"`)
}
for (const t of aiTasks) {
  if (t.defaultLevel != null && !autonomyCodes.has(`L${t.defaultLevel}`)) {
    fail(`aiTask "${t.id}": defaultLevel ${t.defaultLevel} is not a real autonomy level`)
  }
}

// ── 4. Cross-references in recommendations ──
for (const [key, d] of Object.entries(problemDiagnoses)) {
  ;(d.patterns || []).forEach((n) => resolvePatternNumber(n, `problemDiagnosis "${key}"`))
}
for (const [key, b] of Object.entries(projectBlueprints)) {
  ;(b.phases || []).forEach((phase, pi) => {
    ;(phase.patterns || []).forEach((n) =>
      resolvePatternNumber(n, `projectBlueprint "${key}" phase[${pi}] "${phase.name}"`),
    )
  })
}

// ── 5. Cross-references in taxonomy ──
for (const level of autonomyLevels) {
  ;(level.applicablePatterns || []).forEach((code) => {
    // These are UX pattern codes (P1..PN)
    resolveUxCode(code, `autonomyLevel "${level.id}"`)
  })
}

// ── 6. Orphan patterns (warn only) ──
;(() => {
  const involved = new Set()
  for (const r of allRelations) {
    involved.add(r.from)
    involved.add(r.to)
  }
  for (const p of patterns) {
    if (!involved.has(p.id)) warn(`orphan pattern ${p.id} (${p.name}) has 0 relations`)
  }
})()

// ── Report ──
const line = '─'.repeat(60)
console.log(line)
console.log('AI Playbook — data integrity report')
console.log(line)
console.log(`  patterns:    ${patterns.length}`)
console.log(`  principles:  ${principles.length}`)
console.log(`  ux patterns: ${uxPatterns.length}`)
console.log(`  relations:   ${allRelations.length}`)
console.log(line)

if (warnings.length) {
  console.log(`\n⚠  ${warnings.length} warning(s):`)
  for (const w of warnings) console.log(`   - ${w}`)
}

if (errors.length) {
  console.log(`\n✖  ${errors.length} error(s):`)
  for (const e of errors) console.log(`   - ${e}`)
  console.log(`\nFAILED — data integrity check did not pass.`)
  process.exit(1)
}

console.log(`\n✔  All integrity checks passed${warnings.length ? ' (with warnings)' : ''}.`)
