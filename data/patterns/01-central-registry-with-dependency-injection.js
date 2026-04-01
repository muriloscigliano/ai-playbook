// Pattern 1: Central Registry with Dependency Injection
// Part: Part I: Foundation

export default {
  id: 'pattern-1',
  number: 1,
  name: "Central Registry with Dependency Injection",
  slug: "central-registry-with-dependency-injection",
  part: "Part I: Foundation",
  problem: "Components (agents, tools, memory, workflows) need to reference each other. Without a registry, you get circular imports, global state, and untestable code.",
  solution: "A central class that:\n- Holds references to all components\n- Injects shared services (logger, storage, etc.) into each component on registration\n- Enforces initialization order (dependencies before dependents)",
  keywords: ["central","registry","with","dependency","injection","components","agents","tools","memory","workflows","need","reference","each","other","without","circular","imports","global","state","untestable"],
}
