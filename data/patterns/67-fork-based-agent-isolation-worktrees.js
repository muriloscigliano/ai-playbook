// Pattern 67: Fork-Based Agent Isolation (Worktrees)
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-67',
  number: 67,
  name: "Fork-Based Agent Isolation (Worktrees)",
  slug: "fork-based-agent-isolation-worktrees",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Sub-agents that modify files can conflict with the main agent or other sub-agents.",
  solution: "Spawn sub-agents in git worktrees — isolated copies of the repository.",
  keywords: ["fork-based","agent","isolation","worktrees","sub-agents","that","modify","files","conflict","with","main","other","shared","file","system","race","conditions","corrupted","state","merge"],
}
