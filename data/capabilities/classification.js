// Capability: Classification
// Category: Classification

export const classification = {
  id: 'capability-classification',
  key: 'classification',
  name: 'Classification',
  aka: ['Categorization', 'Labelling', 'Tagging', 'Routing'],
  category: 'Classification',
  whatItsGoodFor:
    'Sorting inputs into human-defined categories at scale — triage, tagging, routing, sentiment, moderation. You decide the categories; the model applies them consistently.',
  whenNotToUse:
    'When the right categories are not yet known (use clustering to discover them first), or when categories overlap so heavily that a forced single label loses meaning.',
  dataRequirements:
    'Clearly defined, mutually understandable categories, and clean, representative, unbiased examples — biased or skewed training data produces biased labels.',
  failureModes: [
    'Category bias — skewed examples teach the model to under- or over-apply a label',
    'Confident labelling of ambiguous cases with no signal of doubt',
    'Silent drift when the real-world distribution moves away from the training data',
  ],
  failureModeKeys: ['reproduces bias'],
  patterns: [49, 13], // structured outputs, verified correction
  principles: [10, 15], // communicate limitations, guardrails against misuse
  uxPatterns: ['P4'], // confidence signal
  keywords: ['classify', 'categorize', 'label', 'tag', 'route', 'sort', 'triage', 'sentiment', 'moderate'],
  example:
    'Incoming messages are auto-routed to the right queue with a confidence score; low-confidence cases fall back to a human instead of being silently misfiled.',
}
