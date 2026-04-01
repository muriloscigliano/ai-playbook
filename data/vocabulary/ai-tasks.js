// AI Tasks by Default Autonomy Level — 23 tasks from the AI Interaction Atlas
// Source: AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab)
// Mapped to the Agentic Autonomy Taxonomy from AI_DESIGN_PRINCIPLES.md

export const aiTasks = [
  // ── Level 1: Observe & Suggest ──
  { id: 'ai-task-detect', name: 'Detect', defaultLevel: 1, rationale: 'Observation-only — the AI identifies signals but takes no action. Low risk, high value as ambient awareness.' },
  { id: 'ai-task-monitor', name: 'Monitor', defaultLevel: 1, rationale: 'Observation-only — the AI watches for changes but takes no action. Low risk, high value as ambient awareness.' },
  { id: 'ai-task-estimate', name: 'Estimate', defaultLevel: 1, rationale: 'Observation-only — the AI produces estimates but takes no action. Low risk, high value as ambient awareness.' },
  { id: 'ai-task-classify', name: 'Classify', defaultLevel: 1, rationale: 'Observation-only — the AI categorizes but takes no action. Low risk, high value as ambient awareness.' },

  // ── Level 2: Plan & Propose ──
  { id: 'ai-task-forecast', name: 'Forecast', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI evaluates trends but the human decides what to do with the results.' },
  { id: 'ai-task-rank', name: 'Rank', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI ranks options but the human decides which to pursue.' },
  { id: 'ai-task-match', name: 'Match', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI finds matches but the human decides which to accept.' },
  { id: 'ai-task-explain', name: 'Explain', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI provides explanations but the human interprets them.' },
  { id: 'ai-task-plan', name: 'Plan', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI formulates plans but the human approves them.' },
  { id: 'ai-task-retrieve', name: 'Retrieve', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI retrieves information but the human evaluates relevance.' },
  { id: 'ai-task-segment', name: 'Segment', defaultLevel: 2, rationale: 'Analysis and recommendation — the AI segments data but the human validates the groupings.' },

  // ── Level 3: Act with Confirmation ──
  { id: 'ai-task-generate', name: 'Generate', defaultLevel: 3, rationale: 'Content creation — the AI produces artifacts that should be reviewed before delivery. Irreversible once published.' },
  { id: 'ai-task-transform', name: 'Transform', defaultLevel: 3, rationale: 'Content transformation — the AI modifies content that should be reviewed before delivery.' },
  { id: 'ai-task-translate', name: 'Translate', defaultLevel: 3, rationale: 'Content transformation — the AI translates content that should be reviewed before delivery.' },
  { id: 'ai-task-synthesize', name: 'Synthesize', defaultLevel: 3, rationale: 'Content creation — the AI combines information into new artifacts that need review.' },
  { id: 'ai-task-simulate', name: 'Simulate', defaultLevel: 3, rationale: 'Content creation — the AI runs simulations whose results should be verified.' },
  { id: 'ai-task-verify', name: 'Verify', defaultLevel: 3, rationale: 'Verification — the AI checks correctness but results should be confirmed before acting on them.' },

  // ── Level 4: Act Autonomously ──
  { id: 'ai-task-adapt', name: 'Adapt', defaultLevel: 4, rationale: 'Operational — data processing and learning from feedback within well-defined boundaries.' },
  { id: 'ai-task-act', name: 'Act', defaultLevel: 4, rationale: 'Operational — executing within rules and pre-authorized scopes.' },
  { id: 'ai-task-explore', name: 'Explore', defaultLevel: 4, rationale: 'Operational — searching and discovering within defined boundaries.' },
  { id: 'ai-task-cluster', name: 'Cluster', defaultLevel: 4, rationale: 'Operational — grouping data by similarity within defined parameters.' },
  { id: 'ai-task-represent', name: 'Represent', defaultLevel: 4, rationale: 'Operational — creating embeddings and representations within defined parameters.' },
  { id: 'ai-task-regress', name: 'Regress', defaultLevel: 4, rationale: 'Operational — fitting models to data within defined parameters.' },
  { id: 'ai-task-extract', name: 'Extract', defaultLevel: 4, rationale: 'Operational — pulling structured data from unstructured sources within defined parameters.' },
]
