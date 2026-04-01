// Pattern 62: Execution Hooks (LLM & Tool Interceptors)
// Part: Part XI: Production Orchestration (NEW — CrewAI)

export default {
  id: 'pattern-62',
  number: 62,
  name: "Execution Hooks (LLM & Tool Interceptors)",
  slug: "execution-hooks-llm-tool-interceptors",
  part: "Part XI: Production Orchestration (NEW — CrewAI)",
  problem: "You need to inspect, modify, log, or block LLM calls and tool executions at runtime — for observability, safety, cost control, or response transformation — without changing agent or tool code.",
  solution: "Aspect-oriented interceptor hooks that wrap LLM and tool calls. Each hook can inspect input, modify it, block execution, or transform the output.",
  keywords: ["execution","hooks","tool","interceptors","need","inspect","modify","block","calls","executions","runtime","observability","safety","cost","control","response","transformation","without","changing","agent"],
}
