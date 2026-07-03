// Principle-to-UX-Pattern Relations
// Seeded from the Cross-Reference table in AI_DESIGN_PRINCIPLES.md

export const principleToUxPattern = [
  // From: Cross-Reference: Principles -> Patterns -> Taxonomy -> Playbook
  { from: 'principle-12', to: 'ux-pattern-1', type: 'enables', strength: 'strong', source: 'cross-reference', autonomyLevel: 'L2-L3' },
  { from: 'principle-11', to: 'ux-pattern-2', type: 'requires', strength: 'strong', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-3', to: 'ux-pattern-3', type: 'enables', strength: 'strong', source: 'cross-reference', autonomyLevel: 'L3-L4' },
  { from: 'principle-10', to: 'ux-pattern-4', type: 'measured_by', strength: 'strong', source: 'cross-reference', autonomyLevel: 'L2-L3' },
  { from: 'principle-13', to: 'ux-pattern-5', type: 'requires', strength: 'strong', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-9', to: 'ux-pattern-6', type: 'enables', strength: 'moderate', source: 'cross-reference', autonomyLevel: 'L3-L4' },
  { from: 'principle-10', to: 'ux-pattern-7', type: 'triggers', strength: 'moderate', source: 'cross-reference', autonomyLevel: 'All' },
  { from: 'principle-1', to: 'ux-pattern-2', type: 'conflicts_with', strength: 'weak', source: 'cross-reference', autonomyLevel: 'L1', note: 'conflicts with high autonomy' },
  { from: 'principle-16', to: 'ux-pattern-5', type: 'requires', strength: 'moderate', source: 'cross-reference', autonomyLevel: 'L4' },
  // Principle 17 (exit as a sacred right) is realized architecturally by the
  // Bridge Pattern (76) — clean data portability / egress across surfaces.
  { from: 'principle-17', to: 'pattern-76', type: 'enables', strength: 'moderate', source: 'cross-reference', autonomyLevel: 'All', note: 'architectural — data portability' },

  // P8 Progressive Disclosure (Response Shaping) — In-Action
  { from: 'principle-8', to: 'ux-pattern-8', type: 'enables', strength: 'strong', source: 'cross-reference', autonomyLevel: 'All', note: 'generate the interface for the moment → shape the response' },
  { from: 'principle-10', to: 'ux-pattern-8', type: 'enables', strength: 'weak', source: 'cross-reference', autonomyLevel: 'All', note: 'chunking communicates scope without a wall of text' },

  // P9 Editable & Forkable Output — Post-Action
  { from: 'principle-4', to: 'ux-pattern-9', type: 'enables', strength: 'strong', source: 'cross-reference', autonomyLevel: 'All', note: 'preserve creative interpretation → output is an editable draft' },
  { from: 'principle-12', to: 'ux-pattern-9', type: 'enables', strength: 'moderate', source: 'cross-reference', autonomyLevel: 'All', note: 'negotiate agency → user re-rolls and forks parts' },
]
