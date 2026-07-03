// Capability: Language Modeling
// Category: Language

export const languageModeling = {
  id: 'capability-language-modeling',
  key: 'language-modeling',
  name: 'Language Modeling',
  aka: ['Next-Token Prediction', 'Text Completion', 'Conversational AI'],
  category: 'Language',
  whatItsGoodFor:
    'The base capability underneath most of the others — fluent understanding and generation of natural language: answering, conversing, completing, rewriting, and following instructions.',
  whenNotToUse:
    'As a source of truth. A language model predicts the next token from patterns; it does not look facts up. For anything current, private, or high-stakes, supply the facts (retrieval, tools) and verify.',
  dataRequirements:
    'For general language, none beyond the prompt. For accurate, current, or domain-specific answers, run-time grounding — the model\'s built-in knowledge is frozen at its cutoff.',
  failureModes: [
    'Predicts fluent text with no guarantee of truth — confident hallucination',
    'Reflects biases present in its training data',
    'Can be steered off its guardrails by adversarial prompting',
  ],
  failureModeKeys: ['fabricates facts', 'reproduces bias', 'easily manipulated'],
  patterns: [6, 9], // context engineering, react loop
  principles: [5, 10], // non-human metaphors, communicate limitations
  uxPatterns: ['P4'], // confidence signal
  keywords: ['language', 'chat', 'complete', 'converse', 'answer', 'rewrite', 'text', 'llm', 'prompt'],
  example:
    'A chat surface frames the assistant with honest, non-human language and shows a confidence signal on factual claims, so users read output as a prediction to check, not a fact to trust.',
}
