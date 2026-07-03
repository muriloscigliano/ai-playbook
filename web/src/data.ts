// Adapts the @muriloscigliano/ai-playbook data layer into a graph model.
// Single source of truth — no data is duplicated here; it is imported live.

import {
  patterns,
  principles,
  uxPatterns,
  allRelations,
  autonomyLevels,
  visibilityLevels,
  uxDiagnoses,
  detectUxComplaints,
  type Pattern,
  type Principle,
  type UxPattern,
  type Relation,
} from '@muriloscigliano/ai-playbook'

export type EntityKind = 'pattern' | 'principle' | 'ux-pattern'

export interface GraphNode {
  id: string
  kind: EntityKind
  number: number
  code: string // 'P44' style label for patterns, 'PR3', 'UX1'
  name: string
  slug: string
  /** Grouping facet used by filters + panel. */
  group: string
  summary: string
  keywords: string[]
  /** Autonomy levels this node is applicable to (UX patterns only). */
  autonomy: number[]
  /** Visibility levels this node's principles are primary for. */
  visibility: number[]
  degree: number
  // d3-force mutates these:
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
}

export interface GraphEdge {
  source: string | GraphNode
  target: string | GraphNode
  type: Relation['type']
  strength: Relation['strength']
  reason: string
}

// ── Build nodes ───────────────────────────────────────────────────────────

// Which UX codes each autonomy level lists as applicable → reverse into
// per-UX-pattern autonomy tags.
const uxAutonomy = new Map<number, number[]>()
for (const lvl of autonomyLevels) {
  for (const code of lvl.applicablePatterns || []) {
    const n = Number(String(code).replace(/^P/, ''))
    if (!Number.isNaN(n)) uxAutonomy.set(n, [...(uxAutonomy.get(n) || []), lvl.level])
  }
}

// Which visibility levels each principle is "primary" for → reverse map.
const principleVisibility = new Map<number, number[]>()
for (const v of visibilityLevels) {
  for (const p of v.primaryPrinciples || []) {
    principleVisibility.set(p, [...(principleVisibility.get(p) || []), v.level])
  }
}

function patternNode(p: Pattern): GraphNode {
  return {
    id: p.id,
    kind: 'pattern',
    number: p.number,
    code: `P${p.number}`,
    name: p.name,
    slug: p.slug,
    group: p.part,
    summary: p.problem,
    keywords: p.keywords,
    autonomy: [],
    visibility: [],
    degree: 0,
  }
}

function principleNode(p: Principle): GraphNode {
  return {
    id: p.id,
    kind: 'principle',
    number: p.number,
    code: `PR${p.number}`,
    name: p.name,
    slug: p.slug,
    group: p.theme,
    summary: p.summary,
    keywords: p.keywords,
    autonomy: [],
    visibility: principleVisibility.get(p.number) || [],
    degree: 0,
  }
}

function uxNode(p: UxPattern): GraphNode {
  return {
    id: p.id,
    kind: 'ux-pattern',
    number: p.number,
    code: p.code,
    name: p.name,
    slug: p.slug,
    group: p.lifecyclePhase,
    summary: p.summary,
    keywords: p.keywords,
    autonomy: uxAutonomy.get(p.number) || [],
    visibility: [],
    degree: 0,
  }
}

export const nodes: GraphNode[] = [
  ...patterns.map(patternNode),
  ...principles.map(principleNode),
  ...uxPatterns.map(uxNode),
]

export const nodeById = new Map(nodes.map((n) => [n.id, n]))

// ── Build edges (only those whose endpoints are real graph nodes) ──────────

export const edges: GraphEdge[] = (allRelations as Relation[])
  .filter((r) => nodeById.has(r.from) && nodeById.has(r.to))
  .map((r) => ({
    source: r.from,
    target: r.to,
    type: r.type,
    strength: r.strength,
    reason: r.reason || (r as any).note || '',
  }))

// Degree count for node sizing.
for (const e of edges) {
  const s = nodeById.get(e.source as string)
  const t = nodeById.get(e.target as string)
  if (s) s.degree++
  if (t) t.degree++
}

// ── Neighborhood lookup ────────────────────────────────────────────────────

export interface Neighbor {
  node: GraphNode
  type: Relation['type']
  strength: Relation['strength']
  reason: string
  /** true when the selected node is the `from` side of the edge. */
  outgoing: boolean
}

/** d3-force mutates edge.source/target from id strings into node objects. */
function endpointId(end: string | GraphNode): string {
  return typeof end === 'string' ? end : end.id
}

export function neighborsOf(id: string): Neighbor[] {
  const out: Neighbor[] = []
  for (const e of edges) {
    const from = endpointId(e.source)
    const to = endpointId(e.target)
    if (from === id && nodeById.has(to)) {
      out.push({ node: nodeById.get(to)!, type: e.type, strength: e.strength, reason: e.reason, outgoing: true })
    } else if (to === id && nodeById.has(from)) {
      out.push({ node: nodeById.get(from)!, type: e.type, strength: e.strength, reason: e.reason, outgoing: false })
    }
  }
  // Strong relations first, then by kind.
  const order = { strong: 0, moderate: 1, weak: 2 }
  return out.sort((a, b) => order[a.strength] - order[b.strength])
}

// ── Facets for filters ──────────────────────────────────────────────────────

export const parts = [...new Set(patterns.map((p) => p.part))]
export const themes = [...new Set(principles.map((p) => p.theme))]
export const lifecyclePhases = [...new Set(uxPatterns.map((p) => p.lifecyclePhase))]
export const relationTypes = [...new Set(edges.map((e) => e.type))].sort()

export { autonomyLevels, visibilityLevels }

// ── Doc deep-links ──────────────────────────────────────────────────────────

const REPO = 'https://github.com/muriloscigliano/ai-playbook/blob/main'

export function docLink(node: GraphNode): { label: string; url: string } {
  switch (node.kind) {
    case 'pattern':
      return {
        label: `AI_AGENT_PATTERNS_PLAYBOOK.md`,
        url: `${REPO}/AI_AGENT_PATTERNS_PLAYBOOK.md`,
      }
    case 'principle':
      return {
        label: `AI_DESIGN_PRINCIPLES.md#principle-${node.number}`,
        url: `${REPO}/AI_DESIGN_PRINCIPLES.md#${node.slug}`,
      }
    case 'ux-pattern':
      return {
        label: `AI_DESIGN_PRINCIPLES.md#${node.code.toLowerCase()}`,
        url: `${REPO}/AI_DESIGN_PRINCIPLES.md#${node.code.toLowerCase()}-${node.slug}`,
      }
  }
}

// ── Full-text search over entities ──────────────────────────────────────────

export function searchNodes(query: string): GraphNode[] {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1)
  if (terms.length === 0) return []
  const scored = nodes
    .map((n) => {
      let score = 0
      for (const t of terms) {
        if (n.name.toLowerCase().includes(t)) score += 10
        if (n.code.toLowerCase() === t) score += 20
        if (n.summary.toLowerCase().includes(t)) score += 4
        if (n.group.toLowerCase().includes(t)) score += 2
        if (n.keywords.some((k) => k.includes(t))) score += 1
      }
      return { n, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.map((r) => r.n)
}

// ── diagnose-ux (reuses the Phase 1 dataset + helper — no re-implementation) ─

export interface UxDiagnosisResult {
  key: string
  title: string
  challenge: string
  uxPatterns: { code: string; name: string; node?: GraphNode }[]
  principles: { number: number; name: string; node?: GraphNode }[]
  microcopy: string
  engineeringRootCause: string | null
  explanation: string
}

const principleByNumber = new Map(principles.map((p) => [p.number, p]))
const uxByCode = new Map(uxPatterns.map((p) => [p.code, p]))

export function diagnoseUx(complaint: string): UxDiagnosisResult[] {
  const keys = detectUxComplaints(complaint)
  return keys.map((key) => {
    const d = (uxDiagnoses as Record<string, any>)[key]
    return {
      key,
      title: d.title,
      challenge: d.challenge,
      microcopy: d.microcopy,
      engineeringRootCause: d.engineeringRootCause,
      explanation: d.explanation,
      uxPatterns: (d.uxPatterns as string[]).map((code) => {
        const ux = uxByCode.get(code)
        return { code, name: ux?.name || code, node: ux ? nodeById.get(ux.id) : undefined }
      }),
      principles: (d.principles as number[]).map((n) => {
        const pr = principleByNumber.get(n)
        return { number: n, name: pr?.name || `Principle ${n}`, node: pr ? nodeById.get(pr.id) : undefined }
      }),
    }
  })
}

export const uxDiagnosisKeys = Object.keys(uxDiagnoses as Record<string, unknown>)
