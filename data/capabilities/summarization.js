// Capability: Summarization
// Category: Generation

export const summarization = {
  id: 'capability-summarization',
  key: 'summarization',
  name: 'Summarization',
  aka: ['Condensing', 'TL;DR', 'Digest'],
  category: 'Generation',
  whatItsGoodFor:
    'Condensing long or scattered material into the parts that matter — meeting notes, document digests, thread recaps, briefings — so people spend attention where it counts.',
  whenNotToUse:
    'When every detail is legally or clinically load-bearing and omission is dangerous, or when the source is short enough that a summary adds a distortion layer for no gain.',
  dataRequirements:
    'Source content that fits (or is chunked to fit) the context window; for grounded summaries, the retrieved passages the summary must stay faithful to.',
  failureModes: [
    'Drops or distorts a load-bearing detail while reading as complete',
    'Introduces claims not present in the source',
    'Buries the answer in a long, unstructured block',
  ],
  failureModeKeys: ['fabricates facts', 'walls of text', 'over-explains'],
  patterns: [7, 31, 13], // context compaction, corrective RAG, verified correction
  principles: [10], // communicate limitations
  uxPatterns: ['P3', 'P8'], // explainable rationale, progressive disclosure (response shaping)
  keywords: ['summarize', 'summary', 'condense', 'tldr', 'digest', 'recap', 'brief', 'shorten'],
  example:
    'A meeting tool leads with a one-line outcome and expandable "key points ▸", each linked back to the moment in the transcript it came from.',
}
