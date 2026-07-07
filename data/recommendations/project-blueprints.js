// Project Blueprints — maps project types to phased pattern recommendations
// Source: PROJECT_BLUEPRINTS from mcp-server/server.js

export const projectBlueprints = {
  chatbot: {
    name: 'AI Chatbot / Conversational Agent',
    phases: [
      { name: 'Core', patterns: [44, 9, 6, 49], why: 'Agent loop + ReAct reasoning + context budget + structured outputs' },
      { name: 'Memory', patterns: [23, 24, 7], why: 'Remember user context across turns and sessions' },
      { name: 'Safety', patterns: [50, 51, 71], why: 'Input filtering, injection defense, cost limits' },
      { name: 'Quality', patterns: [12, 53], why: 'Self-refine responses, track everything with spans' },
      { name: 'Scale', patterns: [46, 47, 45], why: 'Route to cheap models, cache repeated queries, fallbacks' },
    ],
  },
  coding_agent: {
    name: 'AI Coding Agent / Developer Tool',
    phases: [
      { name: 'Core', patterns: [44, 9, 17, 21, 6], why: 'Agent loop + tools (read/write/search/execute) + context budget' },
      { name: 'Safety', patterns: [64, 71, 20, 50], why: 'Permissions for file/bash ops, cost limits, human approval for destructive actions' },
      { name: 'Context', patterns: [8, 7, 68, 78], why: 'Progressive disclosure, compaction, tool result budget' },
      { name: 'Multi-Agent', patterns: [43, 66, 67, 72], why: 'Sub-agents for exploration, parallel tools, worktree isolation, file caching' },
      { name: 'Production', patterns: [63, 74, 75, 76, 73], why: 'Deferred tools, skills, coordinator-worker, IDE bridge, session resume' },
    ],
  },
  rag_app: {
    name: 'RAG Application / Knowledge Base Q&A',
    phases: [
      { name: 'Core', patterns: [44, 17, 6, 49], why: 'Agent loop + tool registry + context budget + structured outputs' },
      { name: 'Retrieval', patterns: [35, 31, 33], why: 'Start with Agentic RAG, add Corrective RAG, then Adaptive routing' },
      { name: 'Advanced RAG', patterns: [30, 34, 32], why: 'RAPTOR for cross-section questions, GraphRAG for relationships, Self-RAG for precision' },
      { name: 'Memory', patterns: [23, 24], why: 'Remember what user asked before, semantic recall across sessions' },
      { name: 'Quality', patterns: [54, 55, 53], why: 'Golden datasets, LLM-as-judge, observability' },
    ],
  },
  multi_agent: {
    name: 'Multi-Agent System / Agent Team',
    phases: [
      { name: 'Core', patterns: [44, 9, 17, 6], why: 'Get a single agent working well first' },
      { name: 'Orchestration', patterns: [36, 43, 37], why: 'Workflow patterns, sub-agents, agent-as-tool delegation' },
      { name: 'Coordination', patterns: [75, 38, 39], why: 'Coordinator-worker, swarm handoffs, graph-based orchestration' },
      { name: 'Safety', patterns: [64, 71, 70, 77], why: 'Permissions, cost gating, denial tracking, hooks' },
      { name: 'Scale', patterns: [67, 66, 15, 73], why: 'Worktree isolation, parallel tools, LLM compiler, session persistence' },
    ],
  },
  automation: {
    name: 'Workflow Automation / Business Process Agent',
    phases: [
      { name: 'Core', patterns: [44, 14, 17, 49], why: 'Agent loop + plan-and-execute (predictable steps) + structured outputs' },
      { name: 'Orchestration', patterns: [61, 48, 20], why: 'Event-driven flows, suspend/resume for async, human approval gates' },
      { name: 'Safety', patterns: [50, 64, 71, 62], why: 'Guardrails, permissions, cost limits, execution hooks' },
      { name: 'Memory', patterns: [23, 25], why: 'Working memory for state, AUDN to learn from past runs' },
      { name: 'Reliability', patterns: [45, 58, 53, 54], why: 'Fallback chains, circuit breaker, observability, golden dataset tests' },
    ],
  },
  api_agent: {
    name: 'API/Tool Integration Agent',
    phases: [
      { name: 'Core', patterns: [44, 17, 21, 19, 6], why: 'Agent loop + tool registry + ACI design + schema compat + context budget' },
      { name: 'Tool System', patterns: [18, 60, 63], why: 'Multi-source tools, MCP protocol, deferred loading' },
      { name: 'Safety', patterns: [50, 20, 64, 71], why: 'Guardrails, suspend for approval, permissions, cost limits' },
      { name: 'Reliability', patterns: [45, 58, 47], why: 'Fallback chains, circuit breaker, semantic caching' },
      { name: 'Scale', patterns: [46, 15, 66], why: 'Model routing, parallel execution, streaming tools' },
    ],
  },
  'rag-over-your-content': {
    name: 'RAG over your own content (docs, audio, video)',
    phases: [
      { name: 'Ingest & clean', patterns: [17, 49], why: 'Normalise mixed sources; entity replacement, metadata joins, chunking.' },
      { name: 'Embed & index', patterns: [24, 34], why: 'Build the embedding index that powers semantic retrieval.' },
      { name: 'Retrieve & rank', patterns: [31, 33, 35], why: 'Corrective/adaptive/agentic retrieval with a ranker.' },
      { name: 'Generate & ground', patterns: [32, 13], why: 'Self-reflective generation, verified against retrieved context.' },
      { name: 'Learn from feedback', patterns: [10, 54], why: 'Close the loop — feedback improves ranking and answers.' },
    ],
  },
  'autonomous-maintenance-loop': {
    name: 'Autonomous maintenance loop (self-driving codebase upkeep)',
    phases: [
      { name: 'Discover & triage', patterns: [73, 77, 53], why: 'Scheduled/background run reads CI failures, issues, and recent commits; hooks trigger the sweep; observability surfaces what needs attention.' },
      { name: 'Codify intent', patterns: [69, 74], why: 'Hierarchical memory files + skills so the loop retrieves shared conventions instead of re-inventing them — the antidote to comprehension debt.' },
      { name: 'Isolate & draft', patterns: [67, 43, 63], why: 'One git worktree per actionable item; a sub-agent drafts the fix in isolation; deferred tool loading keeps each worker lean.' },
      { name: 'Verify independently', patterns: [13, 75, 16, 55], why: 'A SEPARATE reviewer (different agent/model) checks against tests and skills — never let the author grade its own homework. Tool-verified correction + majority voting + LLM-as-judge.' },
      { name: 'Ship & escalate', patterns: [60, 20, 70], why: 'Connectors (MCP) open PRs and update tickets; unhandled or high-stakes items suspend for human judgment; denial tracking escalates when the loop strays outside demonstrated competence.' },
      { name: 'Keep the human in the loop', patterns: [50, 71, 64], why: 'Guardrails, cost gating, and layered permissions keep an autonomous loop bounded — you stay the engineer, not just the person who presses go.' },
    ],
  },
}
