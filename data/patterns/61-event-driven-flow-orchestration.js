// Pattern 61: Event-Driven Flow Orchestration
// Part: Part XI: Production Orchestration (NEW — CrewAI)

export default {
  id: 'pattern-61',
  number: 61,
  name: "Event-Driven Flow Orchestration",
  slug: "event-driven-flow-orchestration",
  part: "Part XI: Production Orchestration (NEW — CrewAI)",
  problem: "Graph-based orchestration (LangGraph) is powerful but heavyweight — requires defining nodes, edges, and state reducers. Simple workflow patterns (Anthropic's 5) lack state management and persistence. Production systems need a middle ground: declarative event flows with typed state, branching, and durability.",
  solution: "Decorator-based event flows where methods are wired by `@start`, `@listen`, and `@router`. State is a typed Pydantic model. Logical operators (`or_`, `and_`) compose trigger conditions. `@persist` enables durable execution across restarts.",
  keywords: ["event-driven","flow","orchestration","graph-based","langgraph","powerful","heavyweight","requires","defining","nodes","edges","state","reducers","simple","workflow","patterns","anthropic","lack","management","persistence"],
}
