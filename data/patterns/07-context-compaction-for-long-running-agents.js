// Pattern 7: Context Compaction for Long-Running Agents
// Part: Part II: Context Assembly

export default {
  id: 'pattern-7',
  number: 7,
  name: "Context Compaction for Long-Running Agents",
  slug: "context-compaction-for-long-running-agents",
  part: "Part II: Context Assembly",
  problem: "Long-running agents accumulate massive conversation histories that eventually exceed the context window. Simply truncating loses critical information.",
  solution: "Summarize conversation history when approaching context limits, then reinitiate with compressed context.",
  keywords: ["context","compaction","long-running","agents","accumulate","massive","conversation","histories","that","eventually","exceed","window","simply","truncating","loses","critical","information","summarize","history","when"],
}
