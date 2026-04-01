// Pattern-to-Pattern Relations
// Comprehensive mapping of all 78 patterns — 250+ relations
// Sources: playbook cross-references, architectural dependencies, blueprint phases, problem diagnoses
//
// Relation types:
//   requires     — cannot work without the other
//   enhances     — works better with the other
//   alternative  — can be used instead of the other
//   extends      — builds on top of the other
//   prerequisite — should be implemented before the other
//   conflicts    — creates tension with the other (rare)
//
// Strength: strong | moderate | weak

export const patternToPattern = [

  // ═══════════════════════════════════════════════════════════════
  // PART I: FOUNDATION (Patterns 1-3)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 1: Central Registry with Dependency Injection
  { from: 'pattern-1', to: 'pattern-17', type: 'prerequisite', strength: 'strong', reason: 'Registry manages tool registration; tools register into it' },
  { from: 'pattern-1', to: 'pattern-56', type: 'enhances', strength: 'strong', reason: 'Registry injects shared services including composite storage' },
  { from: 'pattern-1', to: 'pattern-44', type: 'prerequisite', strength: 'moderate', reason: 'Model loop needs registry to resolve tools, memory, agents' },
  { from: 'pattern-1', to: 'pattern-18', type: 'enhances', strength: 'moderate', reason: 'Multi-source tool composition registers into central registry' },

  // Pattern 2: Dynamic Configuration
  { from: 'pattern-2', to: 'pattern-46', type: 'enhances', strength: 'strong', reason: 'Dynamic config enables runtime model routing decisions' },
  { from: 'pattern-2', to: 'pattern-44', type: 'enhances', strength: 'moderate', reason: 'Agent loop config (model, tools, instructions) can be dynamic per-request' },
  { from: 'pattern-2', to: 'pattern-3', type: 'enhances', strength: 'moderate', reason: 'Dynamic config resolves values from request context' },
  { from: 'pattern-2', to: 'pattern-40', type: 'enhances', strength: 'moderate', reason: 'CrewAI YAML-driven config is an extension of dynamic configuration' },

  // Pattern 3: Request Context with Security Keys
  { from: 'pattern-3', to: 'pattern-64', type: 'prerequisite', strength: 'strong', reason: 'Permission architecture reads user/tenant from request context' },
  { from: 'pattern-3', to: 'pattern-2', type: 'enhances', strength: 'moderate', reason: 'Context provides runtime values for dynamic configuration' },
  { from: 'pattern-3', to: 'pattern-17', type: 'enhances', strength: 'moderate', reason: 'Tool validation pipeline uses context for permission checks' },
  { from: 'pattern-3', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cost gating checks per-user/tenant budgets from context' },

  // ═══════════════════════════════════════════════════════════════
  // PART II: CONTEXT ASSEMBLY (Patterns 4-8)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 4: Processor Pipeline
  { from: 'pattern-4', to: 'pattern-50', type: 'enhances', strength: 'strong', reason: 'Guardrails are implemented as processors in the pipeline' },
  { from: 'pattern-4', to: 'pattern-24', type: 'enhances', strength: 'strong', reason: 'Semantic recall is an input processor in the pipeline' },
  { from: 'pattern-4', to: 'pattern-23', type: 'enhances', strength: 'strong', reason: 'Working memory injection is an input processor' },
  { from: 'pattern-4', to: 'pattern-28', type: 'enhances', strength: 'moderate', reason: 'Observational memory is an output processor' },
  { from: 'pattern-4', to: 'pattern-44', type: 'prerequisite', strength: 'strong', reason: 'Model loop runs input/output processors around each LLM call' },
  { from: 'pattern-4', to: 'pattern-5', type: 'enhances', strength: 'moderate', reason: 'Pipeline transforms message list between stages' },

  // Pattern 5: Message List with Source Tracking
  { from: 'pattern-5', to: 'pattern-19', type: 'enhances', strength: 'strong', reason: 'Message list converts to provider-specific formats via schema layers' },
  { from: 'pattern-5', to: 'pattern-6', type: 'enhances', strength: 'moderate', reason: 'Token counting on message list enables context budget enforcement' },
  { from: 'pattern-5', to: 'pattern-7', type: 'enhances', strength: 'moderate', reason: 'Source tracking helps compaction decide what to summarize' },
  { from: 'pattern-5', to: 'pattern-53', type: 'enhances', strength: 'weak', reason: 'Source tracking provides provenance metadata for observability spans' },

  // Pattern 6: Context Engineering
  { from: 'pattern-6', to: 'pattern-7', type: 'enhances', strength: 'strong', reason: 'Context budgets drive when compaction triggers' },
  { from: 'pattern-6', to: 'pattern-8', type: 'enhances', strength: 'strong', reason: 'Just-in-time retrieval is a context engineering principle' },
  { from: 'pattern-6', to: 'pattern-78', type: 'enhances', strength: 'strong', reason: 'Tool result budgets are part of context token management' },
  { from: 'pattern-6', to: 'pattern-44', type: 'prerequisite', strength: 'strong', reason: 'Playbook Phase 1: context engineering prevents context overflow in the model loop' },
  { from: 'pattern-6', to: 'pattern-63', type: 'enhances', strength: 'moderate', reason: 'Deferred tool loading reduces schema tokens, a context engineering strategy' },
  { from: 'pattern-6', to: 'pattern-68', type: 'enhances', strength: 'moderate', reason: 'Reactive compaction is advanced context engineering' },

  // Pattern 7: Context Compaction
  { from: 'pattern-7', to: 'pattern-68', type: 'extends', strength: 'strong', reason: 'Reactive compaction extends basic compaction with state-awareness' },
  { from: 'pattern-7', to: 'pattern-23', type: 'enhances', strength: 'moderate', reason: 'Compaction preserves working memory while summarizing history' },
  { from: 'pattern-7', to: 'pattern-78', type: 'enhances', strength: 'moderate', reason: 'Tool result clearing is the first compaction strategy' },
  { from: 'pattern-7', to: 'pattern-44', type: 'enhances', strength: 'strong', reason: 'Long-running agent loops need compaction to stay within context window' },

  // Pattern 8: Progressive Context Disclosure
  { from: 'pattern-8', to: 'pattern-6', type: 'extends', strength: 'strong', reason: 'Progressive disclosure implements the just-in-time retrieval principle' },
  { from: 'pattern-8', to: 'pattern-63', type: 'enhances', strength: 'moderate', reason: 'Deferred tool loading is progressive disclosure for tool schemas' },
  { from: 'pattern-8', to: 'pattern-69', type: 'enhances', strength: 'moderate', reason: 'Hierarchical memory files are pre-loaded as critical context per the hybrid strategy' },
  { from: 'pattern-8', to: 'pattern-35', type: 'enhances', strength: 'moderate', reason: 'Agentic RAG implements progressive discovery of retrieval context' },

  // ═══════════════════════════════════════════════════════════════
  // PART III: REASONING & PLANNING (Patterns 9-16)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 9: ReAct Loop
  { from: 'pattern-9', to: 'pattern-44', type: 'requires', strength: 'strong', reason: 'ReAct is the reasoning strategy within the agentic model loop' },
  { from: 'pattern-9', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'ReAct needs a tool registry to execute actions' },
  { from: 'pattern-9', to: 'pattern-10', type: 'enhances', strength: 'strong', reason: 'Reflexion adds learning from failures to ReAct; playbook says combine with Reflexion for error recovery' },
  { from: 'pattern-9', to: 'pattern-49', type: 'enhances', strength: 'moderate', reason: 'Structured outputs improve reliability of action parsing in ReAct' },
  { from: 'pattern-9', to: 'pattern-6', type: 'enhances', strength: 'moderate', reason: 'Context engineering keeps ReAct history within token budget' },

  // Pattern 10: Reflexion
  { from: 'pattern-10', to: 'pattern-9', type: 'extends', strength: 'strong', reason: 'Reflexion wraps ReAct with episodic memory and self-critique' },
  { from: 'pattern-10', to: 'pattern-27', type: 'enhances', strength: 'moderate', reason: 'Reflexion episodic memory is similar to memory stream importance scoring' },
  { from: 'pattern-10', to: 'pattern-12', type: 'alternative', strength: 'moderate', reason: 'Both provide iterative improvement; Reflexion uses memory across attempts, Self-Refine within one attempt' },
  { from: 'pattern-10', to: 'pattern-54', type: 'enhances', strength: 'weak', reason: 'Reflexion needs an evaluator function, similar to golden dataset metrics' },

  // Pattern 11: Tree of Thoughts
  { from: 'pattern-11', to: 'pattern-16', type: 'enhances', strength: 'moderate', reason: 'Self-consistency voting can be used to evaluate thought candidates' },
  { from: 'pattern-11', to: 'pattern-15', type: 'alternative', strength: 'moderate', reason: 'Both explore parallel reasoning paths; ToT uses BFS/DFS, LLM Compiler uses DAG' },
  { from: 'pattern-11', to: 'pattern-46', type: 'enhances', strength: 'weak', reason: 'High cost (15-25x) makes model routing important for ToT' },

  // Pattern 12: Self-Refine
  { from: 'pattern-12', to: 'pattern-13', type: 'enhances', strength: 'strong', reason: 'CRITIC adds external tool verification to self-refine critique phase' },
  { from: 'pattern-12', to: 'pattern-36', type: 'enhances', strength: 'moderate', reason: 'Self-Refine maps to Anthropic Workflow Pattern 5 (Evaluator-Optimizer)' },
  { from: 'pattern-12', to: 'pattern-55', type: 'enhances', strength: 'moderate', reason: 'LLM-as-Judge can provide the self-critique feedback' },

  // Pattern 13: CRITIC
  { from: 'pattern-13', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'CRITIC needs tools (calculator, search, code exec) for verification' },
  { from: 'pattern-13', to: 'pattern-12', type: 'extends', strength: 'strong', reason: 'CRITIC extends Self-Refine by using tools in the critique phase' },
  { from: 'pattern-13', to: 'pattern-31', type: 'enhances', strength: 'moderate', reason: 'Both verify outputs against external sources to reduce hallucination' },

  // Pattern 14: Plan-and-Execute
  { from: 'pattern-14', to: 'pattern-9', type: 'extends', strength: 'strong', reason: 'Plan-and-Execute separates planning from ReAct-style execution' },
  { from: 'pattern-14', to: 'pattern-15', type: 'enhances', strength: 'strong', reason: 'LLM Compiler adds parallelism to Plan-and-Execute by analyzing dependencies' },
  { from: 'pattern-14', to: 'pattern-43', type: 'enhances', strength: 'strong', reason: 'Complex plans benefit from sub-agents executing individual steps' },
  { from: 'pattern-14', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Coordinator can use plan-and-execute to assign tasks to workers' },
  { from: 'pattern-14', to: 'pattern-39', type: 'enhances', strength: 'moderate', reason: 'Graph orchestration can represent the plan as a state graph with re-planning edges' },

  // Pattern 15: LLM Compiler
  { from: 'pattern-15', to: 'pattern-14', type: 'extends', strength: 'strong', reason: 'LLM Compiler extends Plan-and-Execute with DAG-based parallel execution' },
  { from: 'pattern-15', to: 'pattern-66', type: 'enhances', strength: 'strong', reason: 'Streaming tool orchestration enables the parallel execution that LLM Compiler plans' },
  { from: 'pattern-15', to: 'pattern-65', type: 'enhances', strength: 'moderate', reason: 'Both reduce latency: Compiler via parallelism, Speculation via pre-computation' },

  // Pattern 16: Self-Consistency
  { from: 'pattern-16', to: 'pattern-41', type: 'enhances', strength: 'moderate', reason: 'Multi-agent debate is a multi-model extension of majority voting' },
  { from: 'pattern-16', to: 'pattern-42', type: 'enhances', strength: 'moderate', reason: 'MoA uses multiple model outputs similar to self-consistency sampling' },
  { from: 'pattern-16', to: 'pattern-46', type: 'enhances', strength: 'weak', reason: 'High cost (Nx) benefits from model routing for the sampling calls' },

  // ═══════════════════════════════════════════════════════════════
  // PART IV: TOOL SYSTEM (Patterns 17-22)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 17: Tool Registry with Validation
  { from: 'pattern-17', to: 'pattern-21', type: 'enhances', strength: 'strong', reason: 'ACI tool design principles improve the tools registered in the registry' },
  { from: 'pattern-17', to: 'pattern-44', type: 'prerequisite', strength: 'strong', reason: 'Playbook Phase 1: model loop needs tool registry to execute tool calls' },
  { from: 'pattern-17', to: 'pattern-19', type: 'enhances', strength: 'moderate', reason: 'Schema validation in registry uses compatibility layers for multi-provider support' },
  { from: 'pattern-17', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'Tool execution logging in registry feeds into observability spans' },
  { from: 'pattern-17', to: 'pattern-64', type: 'enhances', strength: 'moderate', reason: 'Permission check is step 2 in the tool validation pipeline' },
  { from: 'pattern-17', to: 'pattern-18', type: 'enhances', strength: 'moderate', reason: 'Multi-source tools all funnel through the same validation pipeline' },

  // Pattern 18: Multi-Source Tool Composition
  { from: 'pattern-18', to: 'pattern-60', type: 'enhances', strength: 'strong', reason: 'MCP servers are a primary tool source in the composition hierarchy' },
  { from: 'pattern-18', to: 'pattern-37', type: 'enhances', strength: 'moderate', reason: 'Sub-agents exposed as tools are one of the composition sources' },
  { from: 'pattern-18', to: 'pattern-63', type: 'enhances', strength: 'moderate', reason: 'Deferred tool loading can apply to composed tools from multiple sources' },
  { from: 'pattern-18', to: 'pattern-74', type: 'enhances', strength: 'moderate', reason: 'Skills system is another source of dynamically discovered tools' },

  // Pattern 19: Schema Compatibility Layers
  { from: 'pattern-19', to: 'pattern-45', type: 'enhances', strength: 'strong', reason: 'Fallback chains across providers need schema compatibility' },
  { from: 'pattern-19', to: 'pattern-49', type: 'enhances', strength: 'moderate', reason: 'Structured output constraints differ by provider, need compat layers' },
  { from: 'pattern-19', to: 'pattern-5', type: 'enhances', strength: 'moderate', reason: 'Message list conversion to provider format uses schema compatibility' },

  // Pattern 20: Tool Suspend/Resume
  { from: 'pattern-20', to: 'pattern-48', type: 'enhances', strength: 'strong', reason: 'Tool suspension integrates with workflow suspend/resume for full state persistence' },
  { from: 'pattern-20', to: 'pattern-64', type: 'enhances', strength: 'strong', reason: 'Dangerous operations trigger suspension based on permission rules' },
  { from: 'pattern-20', to: 'pattern-61', type: 'enhances', strength: 'moderate', reason: 'Event-driven flows use @human_feedback as a flow-level suspend/resume' },
  { from: 'pattern-20', to: 'pattern-50', type: 'enhances', strength: 'moderate', reason: 'Guardrail tripwire can trigger suspension instead of hard abort' },

  // Pattern 21: Agent-Friendly Tool Design (ACI)
  { from: 'pattern-21', to: 'pattern-17', type: 'enhances', strength: 'strong', reason: 'ACI principles guide how tools are built for the registry' },
  { from: 'pattern-21', to: 'pattern-49', type: 'enhances', strength: 'moderate', reason: 'ACI response_format parameter works with structured outputs' },
  { from: 'pattern-21', to: 'pattern-78', type: 'enhances', strength: 'moderate', reason: 'ACI principle of token-efficient responses (~25K limit) aligns with tool result budgets' },
  { from: 'pattern-21', to: 'pattern-54', type: 'enhances', strength: 'weak', reason: 'ACI testing approach aligns with golden dataset evaluation of tool use' },

  // Pattern 22: DSPy
  { from: 'pattern-22', to: 'pattern-9', type: 'alternative', strength: 'moderate', reason: 'DSPy ReAct module is a programmatic alternative to hand-crafted ReAct prompts' },
  { from: 'pattern-22', to: 'pattern-54', type: 'enhances', strength: 'moderate', reason: 'DSPy optimizers use metric functions similar to golden dataset evaluation' },
  { from: 'pattern-22', to: 'pattern-6', type: 'alternative', strength: 'weak', reason: 'DSPy automates prompt engineering that context engineering does manually' },

  // ═══════════════════════════════════════════════════════════════
  // PART V: MEMORY SYSTEM (Patterns 23-29)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 23: Working Memory
  { from: 'pattern-23', to: 'pattern-24', type: 'enhances', strength: 'strong', reason: 'Working memory (structured) + semantic recall (unstructured) cover different memory needs' },
  { from: 'pattern-23', to: 'pattern-7', type: 'enhances', strength: 'strong', reason: 'Compaction preserves working memory while summarizing conversation history' },
  { from: 'pattern-23', to: 'pattern-26', type: 'enhances', strength: 'moderate', reason: 'Working memory is the in-context core memory blocks in MemGPT tiered model' },
  { from: 'pattern-23', to: 'pattern-69', type: 'enhances', strength: 'moderate', reason: 'Hierarchical memory files provide persistent working memory across sessions' },
  { from: 'pattern-23', to: 'pattern-4', type: 'enhances', strength: 'moderate', reason: 'Working memory is injected via input processor in the pipeline' },

  // Pattern 24: Semantic Recall
  { from: 'pattern-24', to: 'pattern-25', type: 'enhances', strength: 'strong', reason: 'AUDN consolidation keeps semantic recall memory clean and non-contradictory' },
  { from: 'pattern-24', to: 'pattern-56', type: 'requires', strength: 'moderate', reason: 'Semantic recall needs vector store from composite storage' },
  { from: 'pattern-24', to: 'pattern-29', type: 'enhances', strength: 'moderate', reason: 'Memory decay scoring affects which recalled memories are prioritized' },

  // Pattern 25: AUDN Memory Consolidation
  { from: 'pattern-25', to: 'pattern-24', type: 'extends', strength: 'strong', reason: 'AUDN adds add/update/delete/noop lifecycle to semantic memory' },
  { from: 'pattern-25', to: 'pattern-29', type: 'enhances', strength: 'moderate', reason: 'AUDN delete action and decay scoring both handle obsolete memories' },
  { from: 'pattern-25', to: 'pattern-46', type: 'enhances', strength: 'weak', reason: 'AUDN uses cheap model (Haiku) for consolidation — model routing helps' },

  // Pattern 26: MemGPT/Letta Tiered Memory
  { from: 'pattern-26', to: 'pattern-23', type: 'extends', strength: 'strong', reason: 'MemGPT core memory blocks extend the working memory concept' },
  { from: 'pattern-26', to: 'pattern-24', type: 'extends', strength: 'strong', reason: 'MemGPT recall/archival search extends semantic recall with paging' },
  { from: 'pattern-26', to: 'pattern-7', type: 'enhances', strength: 'moderate', reason: 'Virtual memory paging is analogous to context compaction' },
  { from: 'pattern-26', to: 'pattern-6', type: 'enhances', strength: 'moderate', reason: 'OS-inspired memory management treats context window as RAM budget' },

  // Pattern 27: Generative Agents Memory Stream
  { from: 'pattern-27', to: 'pattern-28', type: 'enhances', strength: 'strong', reason: 'Observational memory reflection is derived from generative agents reflection process' },
  { from: 'pattern-27', to: 'pattern-29', type: 'enhances', strength: 'strong', reason: 'Memory stream uses importance scoring and recency decay for retrieval' },
  { from: 'pattern-27', to: 'pattern-24', type: 'extends', strength: 'moderate', reason: 'Memory stream extends semantic recall with importance × recency × relevance scoring' },

  // Pattern 28: Observational Memory
  { from: 'pattern-28', to: 'pattern-27', type: 'extends', strength: 'moderate', reason: 'Observational memory is a simplified version of generative agents reflection' },
  { from: 'pattern-28', to: 'pattern-4', type: 'enhances', strength: 'moderate', reason: 'Observation generation runs as an output processor in the pipeline' },
  { from: 'pattern-28', to: 'pattern-23', type: 'enhances', strength: 'moderate', reason: 'Observations complement working memory with higher-level insights' },

  // Pattern 29: Memory Decay & Importance Scoring
  { from: 'pattern-29', to: 'pattern-27', type: 'enhances', strength: 'strong', reason: 'Generative agents importance scoring is the source of this pattern' },
  { from: 'pattern-29', to: 'pattern-25', type: 'enhances', strength: 'moderate', reason: 'Contradicted memories trigger AUDN update cycle' },
  { from: 'pattern-29', to: 'pattern-24', type: 'enhances', strength: 'moderate', reason: 'Decay scoring filters stale memories from semantic recall results' },

  // ═══════════════════════════════════════════════════════════════
  // PART VI: RAG (Patterns 30-35)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 30: RAPTOR
  { from: 'pattern-30', to: 'pattern-34', type: 'enhances', strength: 'moderate', reason: 'RAPTOR hierarchical summaries complement GraphRAG entity relationships' },
  { from: 'pattern-30', to: 'pattern-33', type: 'enhances', strength: 'moderate', reason: 'Complex queries in Adaptive RAG can route to RAPTOR for cross-section synthesis' },
  { from: 'pattern-30', to: 'pattern-56', type: 'requires', strength: 'moderate', reason: 'RAPTOR needs vector store for multi-level embedding storage' },

  // Pattern 31: Corrective RAG (CRAG)
  { from: 'pattern-31', to: 'pattern-32', type: 'enhances', strength: 'strong', reason: 'Both add self-reflection to retrieval; CRAG evaluates docs, Self-RAG evaluates generation' },
  { from: 'pattern-31', to: 'pattern-33', type: 'enhances', strength: 'strong', reason: 'Adaptive RAG can route to CRAG path for ambiguous queries' },
  { from: 'pattern-31', to: 'pattern-13', type: 'enhances', strength: 'moderate', reason: 'Both use external verification to correct errors and reduce hallucination' },
  { from: 'pattern-31', to: 'pattern-55', type: 'enhances', strength: 'weak', reason: 'Retrieval evaluator in CRAG is similar to LLM-as-judge assessment' },

  // Pattern 32: Self-RAG
  { from: 'pattern-32', to: 'pattern-31', type: 'alternative', strength: 'strong', reason: 'Both improve RAG quality via self-reflection; CRAG evaluates docs, Self-RAG uses reflection tokens' },
  { from: 'pattern-32', to: 'pattern-33', type: 'enhances', strength: 'moderate', reason: 'Self-RAG [Retrieve?] token is a form of adaptive retrieval routing' },
  { from: 'pattern-32', to: 'pattern-49', type: 'enhances', strength: 'moderate', reason: 'Reflection tokens are structured output constraints on generation' },

  // Pattern 33: Adaptive RAG
  { from: 'pattern-33', to: 'pattern-36', type: 'enhances', strength: 'moderate', reason: 'Adaptive RAG query routing maps to Anthropic Workflow Pattern 2 (Routing)' },
  { from: 'pattern-33', to: 'pattern-46', type: 'enhances', strength: 'moderate', reason: 'Query complexity classification is similar to model routing classification' },
  { from: 'pattern-33', to: 'pattern-35', type: 'enhances', strength: 'moderate', reason: 'Complex queries in adaptive RAG can route to agentic RAG for iterative retrieval' },

  // Pattern 34: GraphRAG
  { from: 'pattern-34', to: 'pattern-30', type: 'enhances', strength: 'moderate', reason: 'Knowledge graph relationships complement RAPTOR hierarchical summaries' },
  { from: 'pattern-34', to: 'pattern-35', type: 'enhances', strength: 'moderate', reason: 'Agentic RAG can use graph traversal as one of its retrieval tools' },
  { from: 'pattern-34', to: 'pattern-56', type: 'requires', strength: 'moderate', reason: 'GraphRAG needs both graph database and vector store from composite storage' },

  // Pattern 35: Agentic RAG
  { from: 'pattern-35', to: 'pattern-9', type: 'requires', strength: 'strong', reason: 'Agentic RAG uses ReAct-style loop to decide retrieval strategy' },
  { from: 'pattern-35', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'Agent-driven retrieval needs retrieval tools registered in the tool registry' },
  { from: 'pattern-35', to: 'pattern-31', type: 'enhances', strength: 'moderate', reason: 'Agent can implement corrective RAG by evaluating and re-retrieving' },
  { from: 'pattern-35', to: 'pattern-8', type: 'enhances', strength: 'moderate', reason: 'Agentic RAG is progressive context discovery applied to retrieval' },

  // ═══════════════════════════════════════════════════════════════
  // PART VII: MULTI-AGENT ORCHESTRATION (Patterns 36-43)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 36: Workflow Patterns (Anthropic's 5)
  { from: 'pattern-36', to: 'pattern-43', type: 'enhances', strength: 'strong', reason: 'Orchestrator-Workers (Pattern 36.4) maps directly to Sub-Agent Architecture' },
  { from: 'pattern-36', to: 'pattern-37', type: 'enhances', strength: 'moderate', reason: 'Orchestrator-Workers delegates to sub-agents exposed as tools' },
  { from: 'pattern-36', to: 'pattern-12', type: 'enhances', strength: 'moderate', reason: 'Evaluator-Optimizer (Pattern 36.5) is the workflow form of Self-Refine' },
  { from: 'pattern-36', to: 'pattern-61', type: 'enhances', strength: 'moderate', reason: 'Event-driven flows provide state and persistence for workflow patterns' },
  { from: 'pattern-36', to: 'pattern-39', type: 'alternative', strength: 'moderate', reason: 'Graph orchestration is a more powerful alternative for complex workflows' },

  // Pattern 37: Agent-as-Tool Delegation
  { from: 'pattern-37', to: 'pattern-43', type: 'enhances', strength: 'strong', reason: 'Sub-agents are wrapped as tools the primary agent can invoke' },
  { from: 'pattern-37', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'Delegated agents must be registered in the tool registry' },
  { from: 'pattern-37', to: 'pattern-18', type: 'enhances', strength: 'moderate', reason: 'Agent tools are one source in multi-source tool composition' },
  { from: 'pattern-37', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Coordinator-worker is a more structured form of agent delegation' },

  // Pattern 38: Swarm Handoffs
  { from: 'pattern-38', to: 'pattern-39', type: 'alternative', strength: 'moderate', reason: 'Swarm handoffs are a lightweight alternative to graph-based orchestration' },
  { from: 'pattern-38', to: 'pattern-3', type: 'enhances', strength: 'moderate', reason: 'Swarm context variables are shared state similar to request context' },
  { from: 'pattern-38', to: 'pattern-40', type: 'alternative', strength: 'moderate', reason: 'Swarm handoffs and CrewAI crews are alternative multi-agent approaches' },
  { from: 'pattern-38', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Coordinator can hand off to specialized workers using swarm-style transfers' },

  // Pattern 39: Graph-Based Orchestration (LangGraph)
  { from: 'pattern-39', to: 'pattern-48', type: 'enhances', strength: 'strong', reason: 'LangGraph checkpointing enables workflow suspend/resume at any node' },
  { from: 'pattern-39', to: 'pattern-20', type: 'enhances', strength: 'moderate', reason: 'LangGraph interrupt_before/after implements human-in-the-loop at graph nodes' },
  { from: 'pattern-39', to: 'pattern-61', type: 'alternative', strength: 'moderate', reason: 'Event-driven flows are a medium-complexity alternative to full graph orchestration' },
  { from: 'pattern-39', to: 'pattern-14', type: 'enhances', strength: 'moderate', reason: 'Plan-and-Execute can be modeled as a LangGraph state graph with re-planning edges' },

  // Pattern 40: Role-Based Crews (CrewAI)
  { from: 'pattern-40', to: 'pattern-61', type: 'enhances', strength: 'strong', reason: 'Flows orchestrate crews: flows handle control flow, crews handle autonomous work' },
  { from: 'pattern-40', to: 'pattern-50', type: 'enhances', strength: 'moderate', reason: 'Task-level guardrails in crews complement pipeline-level guardrails' },
  { from: 'pattern-40', to: 'pattern-62', type: 'enhances', strength: 'moderate', reason: 'Execution hooks intercept every LLM/tool call within crew tasks' },
  { from: 'pattern-40', to: 'pattern-2', type: 'enhances', strength: 'moderate', reason: 'YAML-driven agent definitions are an extension of dynamic configuration' },
  { from: 'pattern-40', to: 'pattern-23', type: 'enhances', strength: 'moderate', reason: 'CrewAI scoped memory unifies patterns 23-29 under a single API' },

  // Pattern 41: Multi-Agent Debate
  { from: 'pattern-41', to: 'pattern-16', type: 'extends', strength: 'moderate', reason: 'Multi-agent debate extends self-consistency from sampling to multi-model revision' },
  { from: 'pattern-41', to: 'pattern-42', type: 'alternative', strength: 'moderate', reason: 'Both use multiple models; debate uses revision rounds, MoA uses layers' },
  { from: 'pattern-41', to: 'pattern-55', type: 'enhances', strength: 'weak', reason: 'A verifier model in heterogeneous debate acts as LLM-as-judge' },

  // Pattern 42: Mixture-of-Agents
  { from: 'pattern-42', to: 'pattern-41', type: 'alternative', strength: 'moderate', reason: 'Both combine multiple model outputs; MoA layers vs debate rounds' },
  { from: 'pattern-42', to: 'pattern-45', type: 'enhances', strength: 'weak', reason: 'MoA uses multiple models that could share fallback chain infrastructure' },
  { from: 'pattern-42', to: 'pattern-46', type: 'enhances', strength: 'weak', reason: 'MoA uses cheap proposer models and stronger aggregators — model routing principle' },

  // Pattern 43: Sub-Agent Architecture
  { from: 'pattern-43', to: 'pattern-7', type: 'enhances', strength: 'strong', reason: 'Sub-agents get clean context windows, avoiding main agent compaction pressure' },
  { from: 'pattern-43', to: 'pattern-67', type: 'enhances', strength: 'strong', reason: 'Fork-based isolation gives sub-agents safe file system copies' },
  { from: 'pattern-43', to: 'pattern-66', type: 'enhances', strength: 'strong', reason: 'Independent sub-agents can run concurrently via streaming orchestration' },
  { from: 'pattern-43', to: 'pattern-75', type: 'enhances', strength: 'strong', reason: 'Coordinator-worker is the production-scale version of sub-agent architecture' },
  { from: 'pattern-43', to: 'pattern-37', type: 'enhances', strength: 'strong', reason: 'Sub-agents are invoked as tools via agent-as-tool delegation' },
  { from: 'pattern-43', to: 'pattern-78', type: 'enhances', strength: 'moderate', reason: 'Sub-agents return condensed summaries (1-2K tokens), implementing result budgets' },
  { from: 'pattern-43', to: 'pattern-14', type: 'enhances', strength: 'moderate', reason: 'Plan steps can be delegated to focused sub-agents' },

  // ═══════════════════════════════════════════════════════════════
  // PART VIII: EXECUTION ENGINE (Patterns 44-49)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 44: Agentic Model Loop
  { from: 'pattern-44', to: 'pattern-9', type: 'enhances', strength: 'strong', reason: 'ReAct is the reasoning strategy driving the model loop' },
  { from: 'pattern-44', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'Model loop needs tool registry to execute tool calls' },
  { from: 'pattern-44', to: 'pattern-6', type: 'requires', strength: 'strong', reason: 'Context engineering prevents context overflow during iteration' },
  { from: 'pattern-44', to: 'pattern-71', type: 'enhances', strength: 'strong', reason: 'Cost gating enforces budget limits in the model loop safeguards' },
  { from: 'pattern-44', to: 'pattern-49', type: 'enhances', strength: 'strong', reason: 'Structured outputs make tool call parsing reliable in the loop' },
  { from: 'pattern-44', to: 'pattern-4', type: 'enhances', strength: 'moderate', reason: 'Model loop runs input/output processor pipeline around LLM calls' },
  { from: 'pattern-44', to: 'pattern-14', type: 'enhances', strength: 'moderate', reason: 'Model loop can orchestrate plan-and-execute strategy' },

  // Pattern 45: Model Fallback Chains
  { from: 'pattern-45', to: 'pattern-58', type: 'enhances', strength: 'strong', reason: 'Circuit breaker detects provider outages that trigger fallback' },
  { from: 'pattern-45', to: 'pattern-19', type: 'requires', strength: 'strong', reason: 'Fallback across providers needs schema compatibility layers' },
  { from: 'pattern-45', to: 'pattern-46', type: 'enhances', strength: 'moderate', reason: 'Model routing and fallback chains both select which model to use' },
  { from: 'pattern-45', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'Log which fallback model actually served each request for observability' },

  // Pattern 46: Model Routing
  { from: 'pattern-46', to: 'pattern-47', type: 'enhances', strength: 'strong', reason: 'Routing + caching together yield maximum cost reduction' },
  { from: 'pattern-46', to: 'pattern-71', type: 'enhances', strength: 'strong', reason: 'Model routing implements the cost awareness that cost gating enforces' },
  { from: 'pattern-46', to: 'pattern-45', type: 'enhances', strength: 'moderate', reason: 'Routing selects ideal model; fallback chains handle failures' },
  { from: 'pattern-46', to: 'pattern-33', type: 'enhances', strength: 'moderate', reason: 'Both classify query complexity for routing decisions' },

  // Pattern 47: Semantic Caching
  { from: 'pattern-47', to: 'pattern-46', type: 'enhances', strength: 'strong', reason: 'Caching eliminates repeat calls that routing already made cheap' },
  { from: 'pattern-47', to: 'pattern-56', type: 'requires', strength: 'moderate', reason: 'Semantic cache needs vector search + KV store from composite storage' },
  { from: 'pattern-47', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cache hits reduce API costs tracked by cost gating' },
  { from: 'pattern-47', to: 'pattern-63', type: 'enhances', strength: 'weak', reason: 'Both reduce token/cost overhead through different mechanisms' },

  // Pattern 48: Workflow Suspend/Resume
  { from: 'pattern-48', to: 'pattern-20', type: 'extends', strength: 'strong', reason: 'Workflow suspend/resume extends tool-level suspend to full workflow state' },
  { from: 'pattern-48', to: 'pattern-73', type: 'enhances', strength: 'strong', reason: 'Session backgrounding uses workflow state persistence for teleport resume' },
  { from: 'pattern-48', to: 'pattern-61', type: 'enhances', strength: 'moderate', reason: 'Event-driven flows use @persist for durable workflow suspend/resume' },
  { from: 'pattern-48', to: 'pattern-56', type: 'requires', strength: 'moderate', reason: 'Suspended workflow state needs persistent storage' },

  // Pattern 49: Structured Outputs
  { from: 'pattern-49', to: 'pattern-44', type: 'enhances', strength: 'strong', reason: 'Reliable tool calling in the model loop depends on structured outputs' },
  { from: 'pattern-49', to: 'pattern-19', type: 'enhances', strength: 'moderate', reason: 'Structured output constraints differ by provider — need schema compat' },
  { from: 'pattern-49', to: 'pattern-9', type: 'enhances', strength: 'moderate', reason: 'ReAct action parsing is more reliable with constrained generation' },
  { from: 'pattern-49', to: 'pattern-40', type: 'enhances', strength: 'moderate', reason: 'CrewAI output_pydantic enforces structured outputs per task' },

  // ═══════════════════════════════════════════════════════════════
  // PART IX: SAFETY & QUALITY (Patterns 50-55)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 50: Guardrail-as-Processor (Tripwire)
  { from: 'pattern-50', to: 'pattern-51', type: 'enhances', strength: 'strong', reason: 'Prompt injection detection is implemented as an input guardrail processor' },
  { from: 'pattern-50', to: 'pattern-4', type: 'requires', strength: 'strong', reason: 'Guardrails are processors in the input/output pipeline' },
  { from: 'pattern-50', to: 'pattern-52', type: 'enhances', strength: 'moderate', reason: 'Constitutional principles can be checked as output guardrails' },
  { from: 'pattern-50', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cost gate is listed as an input guardrail type' },
  { from: 'pattern-50', to: 'pattern-62', type: 'enhances', strength: 'moderate', reason: 'Guardrail processors (pipeline-level) complement execution hooks (per-call level)' },

  // Pattern 51: Prompt Injection Defense
  { from: 'pattern-51', to: 'pattern-50', type: 'extends', strength: 'strong', reason: 'Injection defense is a specific type of input guardrail' },
  { from: 'pattern-51', to: 'pattern-52', type: 'enhances', strength: 'moderate', reason: 'Constitutional principles reinforce system-level instruction hierarchy' },
  { from: 'pattern-51', to: 'pattern-64', type: 'enhances', strength: 'moderate', reason: 'Instruction hierarchy defense integrates with permission architecture' },

  // Pattern 52: Constitutional AI
  { from: 'pattern-52', to: 'pattern-50', type: 'enhances', strength: 'moderate', reason: 'Constitutional principles applied in system prompts act as output guardrails' },
  { from: 'pattern-52', to: 'pattern-55', type: 'enhances', strength: 'moderate', reason: 'AI-generated constitutional feedback is a form of LLM-as-judge' },
  { from: 'pattern-52', to: 'pattern-12', type: 'enhances', strength: 'weak', reason: 'Constitutional critique-revise cycle resembles self-refine' },

  // Pattern 53: Observability Span Hierarchy
  { from: 'pattern-53', to: 'pattern-54', type: 'enhances', strength: 'strong', reason: 'Observability traces feed into evaluation metrics for golden datasets' },
  { from: 'pattern-53', to: 'pattern-17', type: 'enhances', strength: 'moderate', reason: 'Every tool execution in the registry produces an observability span' },
  { from: 'pattern-53', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cost tracking (tokens, USD) is metadata on LLM spans' },
  { from: 'pattern-53', to: 'pattern-44', type: 'enhances', strength: 'moderate', reason: 'Each iteration of the model loop produces nested spans' },

  // Pattern 54: Golden Dataset Testing
  { from: 'pattern-54', to: 'pattern-55', type: 'enhances', strength: 'strong', reason: 'LLM-as-judge is one of the evaluation metrics for golden datasets' },
  { from: 'pattern-54', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'Test results feed observability dashboards for regression tracking' },
  { from: 'pattern-54', to: 'pattern-21', type: 'enhances', strength: 'moderate', reason: 'Golden datasets test tool selection accuracy per ACI testing principles' },

  // Pattern 55: LLM-as-Judge
  { from: 'pattern-55', to: 'pattern-54', type: 'enhances', strength: 'strong', reason: 'Judge evaluations are the statistical metrics in golden dataset testing' },
  { from: 'pattern-55', to: 'pattern-52', type: 'enhances', strength: 'moderate', reason: 'Constitutional AI RL phase uses AI judge to select better responses' },
  { from: 'pattern-55', to: 'pattern-12', type: 'enhances', strength: 'moderate', reason: 'LLM judge can provide the critique feedback in self-refine loops' },

  // ═══════════════════════════════════════════════════════════════
  // PART X: INFRASTRUCTURE & PROTOCOLS (Patterns 56-60)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 56: Composite Domain Storage
  { from: 'pattern-56', to: 'pattern-57', type: 'enhances', strength: 'strong', reason: 'Auto-init proxy wraps storage backends for lazy initialization' },
  { from: 'pattern-56', to: 'pattern-24', type: 'enhances', strength: 'moderate', reason: 'Vector domain provides embedding storage for semantic recall' },
  { from: 'pattern-56', to: 'pattern-47', type: 'enhances', strength: 'moderate', reason: 'Cache domain provides KV + vector for semantic caching' },
  { from: 'pattern-56', to: 'pattern-48', type: 'enhances', strength: 'moderate', reason: 'Workflow domain stores suspended workflow state' },

  // Pattern 57: Auto-Initialization Proxy
  { from: 'pattern-57', to: 'pattern-56', type: 'enhances', strength: 'strong', reason: 'Proxy ensures each composite storage domain initializes on first use' },
  { from: 'pattern-57', to: 'pattern-1', type: 'enhances', strength: 'moderate', reason: 'Registry can use proxy pattern for lazy component initialization' },

  // Pattern 58: Provider Health & Circuit Breaker
  { from: 'pattern-58', to: 'pattern-45', type: 'enhances', strength: 'strong', reason: 'Circuit breaker triggers fallback chain when provider fails' },
  { from: 'pattern-58', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'Health metrics (latency, error rate) are observability data' },
  { from: 'pattern-58', to: 'pattern-46', type: 'enhances', strength: 'moderate', reason: 'Provider health can influence routing decisions' },

  // Pattern 59: A2A Protocol
  { from: 'pattern-59', to: 'pattern-60', type: 'enhances', strength: 'strong', reason: 'A2A (agent-to-agent) and MCP (model-to-tool) are complementary protocols' },
  { from: 'pattern-59', to: 'pattern-38', type: 'enhances', strength: 'moderate', reason: 'A2A enables cross-organization handoffs between agents' },
  { from: 'pattern-59', to: 'pattern-37', type: 'enhances', strength: 'moderate', reason: 'A2A agent cards describe capabilities for agent-as-tool delegation' },

  // Pattern 60: MCP
  { from: 'pattern-60', to: 'pattern-18', type: 'enhances', strength: 'strong', reason: 'MCP servers are a primary tool source in multi-source composition' },
  { from: 'pattern-60', to: 'pattern-17', type: 'enhances', strength: 'strong', reason: 'MCP tools register into the tool registry with standard schemas' },
  { from: 'pattern-60', to: 'pattern-63', type: 'enhances', strength: 'moderate', reason: 'MCP tool schemas can be deferred until needed' },
  { from: 'pattern-60', to: 'pattern-74', type: 'enhances', strength: 'moderate', reason: 'MCP servers provide dynamically discoverable skills' },
  { from: 'pattern-60', to: 'pattern-59', type: 'enhances', strength: 'strong', reason: 'MCP and A2A together cover tool access and agent interoperability' },

  // ═══════════════════════════════════════════════════════════════
  // PART XI: PRODUCTION ORCHESTRATION (Patterns 61-62)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 61: Event-Driven Flow Orchestration
  { from: 'pattern-61', to: 'pattern-40', type: 'enhances', strength: 'strong', reason: 'Flows orchestrate crews — flows handle control flow, crews handle agent work' },
  { from: 'pattern-61', to: 'pattern-48', type: 'extends', strength: 'strong', reason: 'Event-driven flows use @persist for durable state, extending workflow suspend/resume' },
  { from: 'pattern-61', to: 'pattern-20', type: 'enhances', strength: 'moderate', reason: '@human_feedback decorator makes suspend/resume a first-class flow primitive' },
  { from: 'pattern-61', to: 'pattern-36', type: 'extends', strength: 'moderate', reason: 'Event-driven flows add typed state and persistence to Anthropic workflow patterns' },
  { from: 'pattern-61', to: 'pattern-39', type: 'alternative', strength: 'moderate', reason: 'Medium complexity alternative: event flows vs full graph orchestration' },

  // Pattern 62: Execution Hooks
  { from: 'pattern-62', to: 'pattern-77', type: 'enhances', strength: 'strong', reason: 'In-process hooks (62) and shell hooks (77) are complementary interception layers' },
  { from: 'pattern-62', to: 'pattern-50', type: 'enhances', strength: 'strong', reason: 'Hooks are the most granular layer; guardrail processors are the broadest' },
  { from: 'pattern-62', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'before_llm hook can implement cost gating per-call' },
  { from: 'pattern-62', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'Hooks can log LLM/tool calls for observability' },
  { from: 'pattern-62', to: 'pattern-40', type: 'enhances', strength: 'moderate', reason: 'Crew-scoped hooks intercept within role-based crew tasks' },

  // ═══════════════════════════════════════════════════════════════
  // PART XIII: PRODUCTION-HARDENED (Patterns 63-78)
  // ═══════════════════════════════════════════════════════════════

  // Pattern 63: Deferred Tool Loading
  { from: 'pattern-63', to: 'pattern-6', type: 'extends', strength: 'strong', reason: 'Deferred loading implements context engineering by saving 10K+ schema tokens' },
  { from: 'pattern-63', to: 'pattern-8', type: 'extends', strength: 'strong', reason: 'Tool schema resolution on demand is progressive context disclosure for tools' },
  { from: 'pattern-63', to: 'pattern-78', type: 'enhances', strength: 'moderate', reason: 'Both reduce context token usage through different mechanisms' },
  { from: 'pattern-63', to: 'pattern-74', type: 'enhances', strength: 'moderate', reason: 'Skills and deferred tools both resolve capabilities on demand' },

  // Pattern 64: Multi-Layer Permission Architecture
  { from: 'pattern-64', to: 'pattern-70', type: 'enhances', strength: 'strong', reason: 'Denial tracking feeds back into permission escalation in the permission system' },
  { from: 'pattern-64', to: 'pattern-77', type: 'enhances', strength: 'strong', reason: 'Shell hooks are Layer 3 (pre-execution hooks) in the permission architecture' },
  { from: 'pattern-64', to: 'pattern-20', type: 'enhances', strength: 'strong', reason: 'Permission system decides when to suspend for human approval' },
  { from: 'pattern-64', to: 'pattern-3', type: 'requires', strength: 'strong', reason: 'Permission checks need user/tenant context from request context' },
  { from: 'pattern-64', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cost-based denial is one permission layer' },
  { from: 'pattern-64', to: 'pattern-50', type: 'enhances', strength: 'moderate', reason: 'Permission checks and guardrails are complementary safety layers' },

  // Pattern 65: Speculative Execution
  { from: 'pattern-65', to: 'pattern-72', type: 'enhances', strength: 'strong', reason: 'Speculated file reads populate the file state cache' },
  { from: 'pattern-65', to: 'pattern-66', type: 'enhances', strength: 'moderate', reason: 'Both reduce latency: speculation via prediction, streaming via parallelism' },
  { from: 'pattern-65', to: 'pattern-15', type: 'enhances', strength: 'moderate', reason: 'Both address latency — speculation predicts, LLM Compiler parallelizes' },

  // Pattern 66: Streaming Tool Orchestration
  { from: 'pattern-66', to: 'pattern-15', type: 'enhances', strength: 'strong', reason: 'Streaming tool orchestration enables the parallel execution that LLM Compiler plans' },
  { from: 'pattern-66', to: 'pattern-43', type: 'enhances', strength: 'strong', reason: 'Sub-agents marked concurrency_safe can run in parallel' },
  { from: 'pattern-66', to: 'pattern-67', type: 'enhances', strength: 'moderate', reason: 'Parallel sub-agents need isolation (worktrees) to avoid conflicts' },
  { from: 'pattern-66', to: 'pattern-44', type: 'enhances', strength: 'moderate', reason: 'Streaming orchestration optimizes tool execution within the model loop' },

  // Pattern 67: Fork-Based Agent Isolation
  { from: 'pattern-67', to: 'pattern-43', type: 'enhances', strength: 'strong', reason: 'Sub-agents work in isolated worktrees to prevent file conflicts' },
  { from: 'pattern-67', to: 'pattern-75', type: 'enhances', strength: 'strong', reason: 'Workers in coordinator-worker architecture can use worktree isolation' },
  { from: 'pattern-67', to: 'pattern-66', type: 'enhances', strength: 'moderate', reason: 'Worktree isolation makes parallel tool execution safe for write operations' },

  // Pattern 68: Reactive Context Compaction
  { from: 'pattern-68', to: 'pattern-7', type: 'extends', strength: 'strong', reason: 'Reactive compaction extends basic compaction with state-aware triggers' },
  { from: 'pattern-68', to: 'pattern-77', type: 'enhances', strength: 'moderate', reason: 'pre_compact/post_compact shell hooks integrate with reactive compaction' },
  { from: 'pattern-68', to: 'pattern-78', type: 'enhances', strength: 'moderate', reason: 'Context collapse deduplicates repeated tool results alongside result budgets' },
  { from: 'pattern-68', to: 'pattern-6', type: 'extends', strength: 'moderate', reason: 'Advanced context engineering with state-aware compaction strategies' },

  // Pattern 69: Hierarchical Memory Files
  { from: 'pattern-69', to: 'pattern-23', type: 'extends', strength: 'moderate', reason: 'Memory files provide persistent cross-session working memory' },
  { from: 'pattern-69', to: 'pattern-8', type: 'enhances', strength: 'moderate', reason: 'CLAUDE.md is pre-loaded as critical context in progressive disclosure hybrid strategy' },
  { from: 'pattern-69', to: 'pattern-74', type: 'enhances', strength: 'moderate', reason: 'Memory files and skills are both hierarchically scoped project configurations' },
  { from: 'pattern-69', to: 'pattern-2', type: 'enhances', strength: 'weak', reason: 'Memory files provide per-project instructions that shape dynamic agent behavior' },

  // Pattern 70: Denial Tracking & Permission Escalation
  { from: 'pattern-70', to: 'pattern-64', type: 'extends', strength: 'strong', reason: 'Denial tracking is the feedback loop within the permission architecture' },
  { from: 'pattern-70', to: 'pattern-77', type: 'enhances', strength: 'moderate', reason: 'Denial counts can trigger hook-based escalation or fallback strategies' },
  { from: 'pattern-70', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Subagent local denial tracking prevents wasted iterations in workers' },

  // Pattern 71: Runtime Cost Gating
  { from: 'pattern-71', to: 'pattern-46', type: 'enhances', strength: 'strong', reason: 'Model routing reduces costs that cost gating enforces' },
  { from: 'pattern-71', to: 'pattern-53', type: 'enhances', strength: 'strong', reason: 'Per-model cost tracking is observability metadata on LLM spans' },
  { from: 'pattern-71', to: 'pattern-44', type: 'enhances', strength: 'strong', reason: 'Cost limits are a safeguard in the model loop (stop if budget exceeded)' },
  { from: 'pattern-71', to: 'pattern-73', type: 'enhances', strength: 'moderate', reason: 'Cost state persists across session backgrounding and resume' },
  { from: 'pattern-71', to: 'pattern-47', type: 'enhances', strength: 'moderate', reason: 'Cache hits reduce costs tracked by the gating system' },
  { from: 'pattern-71', to: 'pattern-62', type: 'enhances', strength: 'moderate', reason: 'before_llm execution hook can implement per-call cost gating' },

  // Pattern 72: File State Caching
  { from: 'pattern-72', to: 'pattern-65', type: 'enhances', strength: 'strong', reason: 'Speculative execution pre-populates the file state cache' },
  { from: 'pattern-72', to: 'pattern-43', type: 'enhances', strength: 'moderate', reason: 'Sub-agents get a clone of parent file cache for fast reads' },
  { from: 'pattern-72', to: 'pattern-44', type: 'enhances', strength: 'moderate', reason: 'File caching reduces I/O latency within the model loop iterations' },

  // Pattern 73: Session Backgrounding & Teleport Resume
  { from: 'pattern-73', to: 'pattern-48', type: 'extends', strength: 'strong', reason: 'Session backgrounding extends workflow suspend/resume to full session state' },
  { from: 'pattern-73', to: 'pattern-71', type: 'enhances', strength: 'moderate', reason: 'Cost state restored on resume for continuous budget tracking' },
  { from: 'pattern-73', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Coordinator mode matching on resume preserves multi-agent session state' },

  // Pattern 74: Skills System
  { from: 'pattern-74', to: 'pattern-60', type: 'enhances', strength: 'moderate', reason: 'MCP servers can provide dynamically discovered skills' },
  { from: 'pattern-74', to: 'pattern-18', type: 'enhances', strength: 'moderate', reason: 'Skills extend multi-source tool composition with prompt-based capabilities' },
  { from: 'pattern-74', to: 'pattern-69', type: 'enhances', strength: 'moderate', reason: 'Skills stored in .claude/skills/ follow hierarchical file discovery pattern' },
  { from: 'pattern-74', to: 'pattern-63', type: 'enhances', strength: 'moderate', reason: 'Skills and deferred tools both resolve dynamically at runtime' },

  // Pattern 75: Coordinator-Worker Architecture
  { from: 'pattern-75', to: 'pattern-43', type: 'extends', strength: 'strong', reason: 'Coordinator-worker is the production-scale version of sub-agent spawning' },
  { from: 'pattern-75', to: 'pattern-67', type: 'enhances', strength: 'strong', reason: 'Workers use worktree isolation for safe parallel file modifications' },
  { from: 'pattern-75', to: 'pattern-38', type: 'enhances', strength: 'moderate', reason: 'Workers can be coordinated via message passing similar to swarm handoffs' },
  { from: 'pattern-75', to: 'pattern-76', type: 'enhances', strength: 'moderate', reason: 'Coordinator mode must match across bridge sessions' },
  { from: 'pattern-75', to: 'pattern-66', type: 'enhances', strength: 'moderate', reason: 'Independent workers execute in parallel via streaming orchestration' },
  { from: 'pattern-75', to: 'pattern-64', type: 'enhances', strength: 'moderate', reason: 'Workers have restricted tool access enforced by permission architecture' },

  // Pattern 76: Bridge Pattern
  { from: 'pattern-76', to: 'pattern-75', type: 'enhances', strength: 'moderate', reason: 'Bridge abstracts coordinator/worker UI across CLI, IDE, web surfaces' },
  { from: 'pattern-76', to: 'pattern-64', type: 'enhances', strength: 'moderate', reason: 'Permission prompt callbacks are delivered through the bridge layer' },
  { from: 'pattern-76', to: 'pattern-77', type: 'enhances', strength: 'moderate', reason: 'Hook-based configuration syncs across bridge surfaces' },
  { from: 'pattern-76', to: 'pattern-44', type: 'enhances', strength: 'moderate', reason: 'Agent core is UI-agnostic; bridge connects it to any interface' },

  // Pattern 77: Hook System (Shell)
  { from: 'pattern-77', to: 'pattern-62', type: 'extends', strength: 'strong', reason: 'Shell hooks extend in-process hooks with external program execution' },
  { from: 'pattern-77', to: 'pattern-64', type: 'enhances', strength: 'strong', reason: 'pre_tool_use hooks implement Layer 3 permission checks' },
  { from: 'pattern-77', to: 'pattern-68', type: 'enhances', strength: 'moderate', reason: 'pre_compact/post_compact hooks integrate with reactive compaction lifecycle' },
  { from: 'pattern-77', to: 'pattern-53', type: 'enhances', strength: 'moderate', reason: 'post_tool_use hooks can log audit trails for observability' },

  // Pattern 78: Tool Result Budget
  { from: 'pattern-78', to: 'pattern-6', type: 'extends', strength: 'strong', reason: 'Tool result budgets implement context engineering token management for tool outputs' },
  { from: 'pattern-78', to: 'pattern-7', type: 'enhances', strength: 'strong', reason: 'Result replacement is the first and safest compaction strategy' },
  { from: 'pattern-78', to: 'pattern-68', type: 'enhances', strength: 'moderate', reason: 'Result budget and reactive compaction are complementary token management strategies' },
  { from: 'pattern-78', to: 'pattern-21', type: 'enhances', strength: 'moderate', reason: 'ACI token-efficient response principle (~25K limit) aligns with result budgets' },
  { from: 'pattern-78', to: 'pattern-43', type: 'enhances', strength: 'moderate', reason: 'Sub-agent result replacement state is cloned for child agents' },

  // ═══════════════════════════════════════════════════════════════
  // CROSS-CUTTING: Blueprint & Decision Tree relations
  // ═══════════════════════════════════════════════════════════════

  // From the "Where do I start?" decision tree (Playbook Section 81)
  { from: 'pattern-44', to: 'pattern-17', type: 'requires', strength: 'strong', reason: 'Phase 1 core: model loop + tool registry are the first two patterns to implement' },
  { from: 'pattern-44', to: 'pattern-6', type: 'requires', strength: 'strong', reason: 'Phase 1 core: context engineering prevents overflow in the model loop' },

  // "My agent hallucinates" decision path
  { from: 'pattern-21', to: 'pattern-49', type: 'enhances', strength: 'strong', reason: 'Decision tree: ACI tool design + structured outputs fix tool parameter hallucination' },

  // "My agent forgets" decision path
  { from: 'pattern-23', to: 'pattern-69', type: 'enhances', strength: 'moderate', reason: 'Decision tree: working memory + memory files for cross-session memory' },

  // "My RAG is not working" escalation path
  { from: 'pattern-31', to: 'pattern-32', type: 'enhances', strength: 'moderate', reason: 'Decision tree: CRAG → Self-RAG → Adaptive → GraphRAG → Agentic RAG escalation' },
  { from: 'pattern-32', to: 'pattern-33', type: 'enhances', strength: 'moderate', reason: 'RAG escalation: Self-RAG adds retrieval decisions, Adaptive RAG adds routing' },
  { from: 'pattern-33', to: 'pattern-34', type: 'enhances', strength: 'moderate', reason: 'RAG escalation: Adaptive RAG → GraphRAG for entity relationship queries' },
  { from: 'pattern-34', to: 'pattern-35', type: 'enhances', strength: 'moderate', reason: 'RAG escalation: GraphRAG → Agentic RAG for fully agent-driven retrieval' },

  // "I need multiple UI surfaces" path
  { from: 'pattern-76', to: 'pattern-77', type: 'enhances', strength: 'moderate', reason: 'Decision tree: bridge pattern + hook system for multi-surface + external integrations' },

  // "Agents communicate with other systems" path
  { from: 'pattern-59', to: 'pattern-60', type: 'enhances', strength: 'strong', reason: 'Decision tree: A2A + MCP for inter-system agent communication' },

  // ═══════════════════════════════════════════════════════════════
  // CONFLICTS (rare but real)
  // ═══════════════════════════════════════════════════════════════

  { from: 'pattern-11', to: 'pattern-9', type: 'conflicts', strength: 'weak', reason: 'Tree of Thoughts exploration conflicts with ReAct single-trajectory approach; use one or the other' },
  { from: 'pattern-65', to: 'pattern-20', type: 'conflicts', strength: 'weak', reason: 'Speculative execution conflicts with human-approval tools; cannot speculate on operations requiring approval' },
  { from: 'pattern-67', to: 'pattern-72', type: 'conflicts', strength: 'weak', reason: 'Worktree isolation means file cache from main agent may be stale in sub-agent context' },
]
