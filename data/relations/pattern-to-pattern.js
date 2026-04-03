// Pattern-to-Pattern Relations
// Seeded from PROJECT_BLUEPRINTS (same-phase patterns enhance each other)
// and PROBLEM_DIAGNOSES (patterns that fix the same problem enhance each other)

export const patternToPattern = [
  // ── From chatbot blueprint phases ──
  { from: 'pattern-44', to: 'pattern-9', type: 'enhances', source: 'blueprint:chatbot:Core' },
  { from: 'pattern-44', to: 'pattern-6', type: 'enhances', source: 'blueprint:chatbot:Core' },
  { from: 'pattern-9', to: 'pattern-49', type: 'enhances', source: 'blueprint:chatbot:Core' },
  { from: 'pattern-23', to: 'pattern-24', type: 'enhances', source: 'blueprint:chatbot:Memory' },
  { from: 'pattern-23', to: 'pattern-7', type: 'enhances', source: 'blueprint:chatbot:Memory' },
  { from: 'pattern-50', to: 'pattern-51', type: 'enhances', source: 'blueprint:chatbot:Safety' },
  { from: 'pattern-50', to: 'pattern-71', type: 'enhances', source: 'blueprint:chatbot:Safety' },
  { from: 'pattern-46', to: 'pattern-47', type: 'enhances', source: 'blueprint:chatbot:Scale' },
  { from: 'pattern-46', to: 'pattern-45', type: 'enhances', source: 'blueprint:chatbot:Scale' },

  // ── From coding_agent blueprint phases ──
  { from: 'pattern-44', to: 'pattern-17', type: 'enhances', source: 'blueprint:coding_agent:Core' },
  { from: 'pattern-17', to: 'pattern-21', type: 'enhances', source: 'blueprint:coding_agent:Core' },
  { from: 'pattern-64', to: 'pattern-71', type: 'enhances', source: 'blueprint:coding_agent:Safety' },
  { from: 'pattern-64', to: 'pattern-20', type: 'enhances', source: 'blueprint:coding_agent:Safety' },
  { from: 'pattern-8', to: 'pattern-7', type: 'enhances', source: 'blueprint:coding_agent:Context' },
  { from: 'pattern-7', to: 'pattern-68', type: 'enhances', source: 'blueprint:coding_agent:Context' },
  { from: 'pattern-68', to: 'pattern-78', type: 'enhances', source: 'blueprint:coding_agent:Context' },
  { from: 'pattern-43', to: 'pattern-66', type: 'enhances', source: 'blueprint:coding_agent:Multi-Agent' },
  { from: 'pattern-66', to: 'pattern-67', type: 'enhances', source: 'blueprint:coding_agent:Multi-Agent' },
  { from: 'pattern-63', to: 'pattern-74', type: 'enhances', source: 'blueprint:coding_agent:Production' },
  { from: 'pattern-75', to: 'pattern-76', type: 'enhances', source: 'blueprint:coding_agent:Production' },

  // ── From rag_app blueprint phases ──
  { from: 'pattern-35', to: 'pattern-31', type: 'enhances', source: 'blueprint:rag_app:Retrieval' },
  { from: 'pattern-31', to: 'pattern-33', type: 'enhances', source: 'blueprint:rag_app:Retrieval' },
  { from: 'pattern-30', to: 'pattern-34', type: 'enhances', source: 'blueprint:rag_app:Advanced RAG' },
  { from: 'pattern-34', to: 'pattern-32', type: 'enhances', source: 'blueprint:rag_app:Advanced RAG' },
  { from: 'pattern-54', to: 'pattern-55', type: 'enhances', source: 'blueprint:rag_app:Quality' },
  { from: 'pattern-55', to: 'pattern-53', type: 'enhances', source: 'blueprint:rag_app:Quality' },

  // ── From multi_agent blueprint phases ──
  { from: 'pattern-36', to: 'pattern-43', type: 'enhances', source: 'blueprint:multi_agent:Orchestration' },
  { from: 'pattern-43', to: 'pattern-37', type: 'enhances', source: 'blueprint:multi_agent:Orchestration' },
  { from: 'pattern-75', to: 'pattern-38', type: 'enhances', source: 'blueprint:multi_agent:Coordination' },
  { from: 'pattern-38', to: 'pattern-39', type: 'enhances', source: 'blueprint:multi_agent:Coordination' },
  { from: 'pattern-64', to: 'pattern-70', type: 'enhances', source: 'blueprint:multi_agent:Safety' },
  { from: 'pattern-70', to: 'pattern-77', type: 'enhances', source: 'blueprint:multi_agent:Safety' },

  // ── From automation blueprint phases ──
  { from: 'pattern-44', to: 'pattern-14', type: 'enhances', source: 'blueprint:automation:Core' },
  { from: 'pattern-61', to: 'pattern-48', type: 'enhances', source: 'blueprint:automation:Orchestration' },
  { from: 'pattern-48', to: 'pattern-20', type: 'enhances', source: 'blueprint:automation:Orchestration' },
  { from: 'pattern-45', to: 'pattern-58', type: 'enhances', source: 'blueprint:automation:Reliability' },
  { from: 'pattern-53', to: 'pattern-54', type: 'enhances', source: 'blueprint:automation:Reliability' },

  // ── From api_agent blueprint phases ──
  { from: 'pattern-17', to: 'pattern-19', type: 'enhances', source: 'blueprint:api_agent:Core' },
  { from: 'pattern-21', to: 'pattern-19', type: 'enhances', source: 'blueprint:api_agent:Core' },
  { from: 'pattern-18', to: 'pattern-60', type: 'enhances', source: 'blueprint:api_agent:Tool System' },
  { from: 'pattern-60', to: 'pattern-63', type: 'enhances', source: 'blueprint:api_agent:Tool System' },

  // ── From problem diagnoses (patterns fixing same problem) ──
  { from: 'pattern-46', to: 'pattern-47', type: 'enhances', source: 'diagnosis:too expensive' },
  { from: 'pattern-47', to: 'pattern-63', type: 'enhances', source: 'diagnosis:too expensive' },
  { from: 'pattern-63', to: 'pattern-78', type: 'enhances', source: 'diagnosis:too expensive' },
  { from: 'pattern-66', to: 'pattern-15', type: 'enhances', source: 'diagnosis:too slow' },
  { from: 'pattern-15', to: 'pattern-65', type: 'enhances', source: 'diagnosis:too slow' },
  { from: 'pattern-13', to: 'pattern-31', type: 'enhances', source: 'diagnosis:hallucinate' },
  { from: 'pattern-31', to: 'pattern-32', type: 'enhances', source: 'diagnosis:hallucinate' },
  { from: 'pattern-23', to: 'pattern-7', type: 'enhances', source: 'diagnosis:forgets' },
  { from: 'pattern-7', to: 'pattern-68', type: 'enhances', source: 'diagnosis:forgets' },
  { from: 'pattern-64', to: 'pattern-20', type: 'enhances', source: 'diagnosis:dangerous' },
  { from: 'pattern-20', to: 'pattern-50', type: 'enhances', source: 'diagnosis:dangerous' },
  { from: 'pattern-14', to: 'pattern-43', type: 'enhances', source: 'diagnosis:complex task' },
  { from: 'pattern-43', to: 'pattern-75', type: 'enhances', source: 'diagnosis:complex task' },
]
