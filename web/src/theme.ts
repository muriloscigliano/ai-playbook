// Visual language shared between the graph canvas and the DOM chrome.
import type { EntityKind } from './data'
import type { Relation } from '@muriloscigliano/ai-playbook'

// Node color by entity kind — three families, high contrast on near-black.
export const kindColor: Record<EntityKind, string> = {
  pattern: '#e8734a', // warm terracotta — engineering
  principle: '#8b7fd6', // muted violet — design principles
  'ux-pattern': '#4aa3a2', // teal — UX patterns
}

export const kindLabel: Record<EntityKind, string> = {
  pattern: 'Engineering Pattern',
  principle: 'Design Principle',
  'ux-pattern': 'UX Pattern',
}

// Edge color by relation type. Grouped families share a hue.
export const relationColor: Record<string, string> = {
  requires: '#d64b57',
  prerequisite: '#d64b57',
  enhances: '#6b7a8f',
  extends: '#5a8fb0',
  implements: '#7f9c6b',
  enables: '#7f9c6b',
  measured_by: '#b08a4a',
  triggers: '#b08a4a',
  alternative: '#a05fb0',
  conflicts: '#c94f2e',
  conflicts_with: '#c94f2e',
  prevents: '#c94f2e',
}

export function edgeColor(type: Relation['type']): string {
  return relationColor[type] || '#5a5a66'
}

// Stroke width by strength.
export const strengthWidth: Record<Relation['strength'], number> = {
  strong: 2.2,
  moderate: 1.3,
  weak: 0.7,
}
