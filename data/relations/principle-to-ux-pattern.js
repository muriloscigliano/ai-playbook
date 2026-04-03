// Principle-to-UX-Pattern Relations
// Seeded from the Cross-Reference table in AI_DESIGN_PRINCIPLES.md

export const principleToUxPattern = [
  // From: Cross-Reference: Principles -> Patterns -> Taxonomy -> Playbook
  { from: 'principle-12', to: 'ux-pattern-1', type: 'enables', source: 'cross-reference', autonomyLevel: 'L2-L3' },
  { from: 'principle-11', to: 'ux-pattern-2', type: 'requires', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-3', to: 'ux-pattern-3', type: 'enables', source: 'cross-reference', autonomyLevel: 'L3-L4' },
  { from: 'principle-10', to: 'ux-pattern-4', type: 'measured_by', source: 'cross-reference', autonomyLevel: 'L2-L3' },
  { from: 'principle-13', to: 'ux-pattern-5', type: 'requires', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-9', to: 'ux-pattern-6', type: 'enables', source: 'cross-reference', autonomyLevel: 'L3-L4' },
  { from: 'principle-10', to: 'ux-pattern-7', type: 'triggers', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-1', to: 'ux-pattern-2', type: 'conflicts_with', source: 'cross-reference', autonomyLevel: 'L1', note: 'conflicts with high autonomy' },
  { from: 'principle-16', to: 'ux-pattern-5', type: 'requires', source: 'cross-reference', autonomyLevel: 'L4' },
  { from: 'principle-17', to: 'ux-pattern-bridge', type: 'enables', source: 'cross-reference', autonomyLevel: 'All', note: 'architectural — data portability' },
  { from: 'principle-15', to: 'anti-agentic-sludge', type: 'prevents', source: 'cross-reference', autonomyLevel: 'All' },
]
