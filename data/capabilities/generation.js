// Capability: Generation
// Category: Generation

export const generation = {
  id: 'capability-generation',
  key: 'generation',
  name: 'Content Generation',
  aka: ['Drafting', 'Authoring', 'Creative Generation', 'Synthesis'],
  category: 'Generation',
  whatItsGoodFor:
    'Producing new content from a brief — drafts, copy, code, images, replies. Best as a starting point that a human shapes, not a finished artifact handed down.',
  whenNotToUse:
    'When the output must be exactly correct and unattended (contracts, medical instructions) without a review gate, or when originality and authorship must be provably human.',
  dataRequirements:
    'A clear brief and any grounding material the output must respect; for on-brand or on-voice generation, examples of the target style.',
  failureModes: [
    'Fluent, confident output that is subtly wrong or fabricated',
    'Delivered as a sealed artifact the user cannot easily edit or re-roll',
    'Homogenized, generic results that flatten the user\'s own voice',
  ],
  failureModeKeys: ['fabricates facts', 'hard to edit output'],
  patterns: [12, 13], // self-refine, verified correction
  principles: [4, 5], // preserve creative interpretation, non-human metaphors
  uxPatterns: ['P3', 'P9'], // explainable rationale, editable & forkable output
  keywords: ['generate', 'draft', 'write', 'create', 'author', 'compose', 'produce', 'brainstorm'],
  example:
    'A writing tool returns a draft the user can edit inline, regenerate one paragraph at a time, or fork into a warmer variant — treating the output as a draft, not a verdict.',
}
