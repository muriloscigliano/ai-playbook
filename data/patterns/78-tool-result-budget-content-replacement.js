// Pattern 78: Tool Result Budget & Content Replacement
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-78',
  number: 78,
  name: "Tool Result Budget & Content Replacement",
  slug: "tool-result-budget-content-replacement",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Tool results (especially file reads and bash outputs) can be enormous — 50,000+ tokens for a single file read. If every tool result stays in context, the window fills up after a few operations.",
  solution: "Apply a per-conversation budget for tool result content. When the budget is exceeded, replace old tool results with compact summaries or tombstones.",
  keywords: ["tool","result","budget","content","replacement","results","especially","file","reads","bash","outputs","enormous","tokens","single","read","every","stays","context","window","fills"],
}
