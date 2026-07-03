// Capability: Semantic Search
// Category: Retrieval

export const semanticSearch = {
  id: 'capability-semantic-search',
  key: 'semantic-search',
  name: 'Semantic Search',
  aka: ['Vector Search', 'Similarity Search', 'Find Similar'],
  category: 'Retrieval',
  whatItsGoodFor:
    'Finding content by meaning rather than exact words — "show me things like this" across text, images, or audio, even when no keyword overlaps. Powers retrieval, recommendation, and dedup.',
  whenNotToUse:
    'When the user wants an exact or structured match (an ID, a code, a legal clause verbatim) — keyword or database lookup is more precise. When the corpus is tiny, plain search is simpler.',
  dataRequirements:
    'Content chunked and embedded into a vector index; embeddings kept in sync as content changes; a similarity threshold tuned to the domain.',
  failureModes: [
    'Near in embedding space is not the same as correct — plausible-but-wrong neighbours',
    'Stale index returns outdated matches after content changes',
    'Confidently returns a "closest" result even when nothing relevant exists',
  ],
  failureModeKeys: ['fabricates facts', 'inconsistent results'],
  patterns: [24, 30, 31, 32, 33, 34, 35], // semantic recall + the RAG family
  principles: [10], // communicate limitations
  uxPatterns: ['P4'], // confidence signal
  keywords: ['search', 'find similar', 'retrieval', 'recommend', 'nearest', 'embedding', 'vector', 'related'],
  example:
    'A support tool retrieves the three most relevant past tickets by meaning, each shown with a similarity score, so an agent can see how close the match really is.',
}
