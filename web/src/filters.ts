import type { EntityKind, GraphNode } from './data'
import { parts, themes, lifecyclePhases } from './data'

export interface Filters {
  kinds: EntityKind[]
  parts: string[]
  themes: string[]
  phases: string[]
  autonomy: number[]
  visibility: number[]
}

export function defaultFilters(): Filters {
  return {
    kinds: ['pattern', 'principle', 'ux-pattern'],
    parts: [...parts],
    themes: [...themes],
    phases: [...lifecyclePhases],
    autonomy: [],
    visibility: [],
  }
}

/**
 * A node is visible when its kind is enabled AND it passes the facet filters
 * that apply to that kind. Autonomy/visibility filters are additive narrowers:
 * when non-empty they require the node to carry a matching tag.
 */
export function passesFilters(n: GraphNode, f: Filters): boolean {
  if (!f.kinds.includes(n.kind)) return false

  if (n.kind === 'pattern' && !f.parts.includes(n.group)) return false
  if (n.kind === 'principle' && !f.themes.includes(n.group)) return false
  if (n.kind === 'ux-pattern' && !f.phases.includes(n.group)) return false

  if (f.autonomy.length) {
    // only constrains UX patterns (the only nodes with autonomy tags)
    if (n.kind === 'ux-pattern' && !n.autonomy.some((a) => f.autonomy.includes(a))) return false
  }
  if (f.visibility.length) {
    // only constrains principles (the only nodes with visibility tags)
    if (n.kind === 'principle' && !n.visibility.some((v) => f.visibility.includes(v))) return false
  }
  return true
}
