// Pattern 75: Coordinator-Worker Architecture
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-75',
  number: 75,
  name: "Coordinator-Worker Architecture",
  slug: "coordinator-worker-architecture",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Complex tasks require multiple agents working in parallel, but they need coordination — shared state, task assignment, result synthesis, and communication.",
  solution: "A coordinator agent that spawns, manages, and communicates with worker agents. Workers have restricted tool access. The coordinator has full visibility.",
  keywords: ["coordinator-worker","architecture","complex","tasks","require","multiple","agents","working","parallel","they","need","coordination","shared","state","task","assignment","result","synthesis","communication","coordinator"],
}
