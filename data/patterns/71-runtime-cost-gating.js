// Pattern 71: Runtime Cost Gating
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-71',
  number: 71,
  name: "Runtime Cost Gating",
  slug: "runtime-cost-gating",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Agents can burn through API credits rapidly. A single runaway conversation (recursive sub-agents, infinite tool loops) can cost hundreds of dollars.",
  solution: "Multi-level cost tracking with hard gates that stop execution when budgets are exceeded.",
  keywords: ["runtime","cost","gating","agents","burn","through","credits","rapidly","single","runaway","conversation","recursive","sub-agents","infinite","tool","loops","hundreds","dollars","multi-level","tracking"],
}
