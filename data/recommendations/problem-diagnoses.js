// Problem Diagnoses — maps common problems to fix patterns
// Source: PROBLEM_DIAGNOSES from mcp-server/server.js

export const problemDiagnoses = {
  'too expensive': {
    title: 'Cost is too high',
    patterns: [46, 47, 63, 78, 71],
    explanation: 'Route simple queries to cheap models (46), cache repeated queries (47), lazy-load tool schemas (63), replace old tool results (78), set hard budget limits (71).',
  },
  'too slow': {
    title: 'Agent is too slow',
    patterns: [66, 15, 65, 72, 63],
    explanation: 'Run safe tools in parallel (66), parallelize independent plan steps (15), pre-compute likely results (65), cache file reads (72), defer tool loading (63).',
  },
  'hallucinate': {
    title: 'Agent hallucinates or makes things up',
    patterns: [13, 31, 32, 21, 49],
    explanation: 'Use tool-verified self-correction (13), validate retrieval quality (31), let model decide when to retrieve (32), design tools with clear errors (21), constrain output format (49).',
  },
  'forgets': {
    title: 'Agent forgets context or loses track',
    patterns: [23, 7, 68, 24, 78],
    explanation: 'Add structured working memory (23), compact old history (7), react to context state not just tokens (68), semantic recall for past conversations (24), budget tool results (78).',
  },
  'dangerous': {
    title: 'Agent takes dangerous or unwanted actions',
    patterns: [64, 20, 50, 70, 77],
    explanation: 'Multi-layer permissions (64), suspend for human approval (20), input/output guardrails (50), escalate after repeated denials (70), shell hooks for external checks (77).',
  },
  'wrong tool': {
    title: 'Agent picks wrong tools or bad parameters',
    patterns: [21, 49, 17, 63, 22],
    explanation: 'Redesign tools for agent consumption (21), structured outputs (49), validate inputs in pipeline (17), better tool descriptions via search hints (63), optimize prompts with DSPy (22).',
  },
  'complex task': {
    title: 'Agent fails on complex multi-step tasks',
    patterns: [14, 43, 75, 10, 11],
    explanation: 'Separate planning from execution (14), delegate to sub-agents (43), coordinator-worker for parallel (75), learn from failures via Reflexion (10), explore multiple reasoning paths (11).',
  },
  'scale': {
    title: 'Need to handle more users / higher load',
    patterns: [47, 46, 45, 58, 56],
    explanation: 'Semantic caching (47), route to cheapest capable model (46), fallback chains (45), circuit breaker on providers (58), composite storage (56).',
  },
  'no memory': {
    title: 'Agent needs to remember across sessions',
    patterns: [23, 24, 25, 69, 29],
    explanation: 'Structured working memory (23), semantic recall via embeddings (24), AUDN consolidation to keep memory clean (25), hierarchical memory files (69), decay old memories (29).',
  },
  'testing': {
    title: 'How to test non-deterministic agents',
    patterns: [54, 55, 53, 13, 16],
    explanation: 'Golden datasets in CI/CD (54), LLM-as-judge for subjective quality (55), observability spans for debugging (53), tool-verified correctness (13), majority voting for consistency (16).',
  },
}
