// Pattern 66: Streaming Tool Orchestration
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-66',
  number: 66,
  name: "Streaming Tool Orchestration",
  slug: "streaming-tool-orchestration",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Sequential tool execution wastes time when tools are independent. But parallel execution is risky — some tools have side effects that conflict.",
  solution: "Classify tools as concurrency-safe or not. Execute safe tools in parallel during streaming. Execute unsafe tools sequentially.",
  keywords: ["streaming","tool","orchestration","sequential","execution","wastes","time","when","tools","independent","parallel","risky","some","have","side","effects","that","conflict","classify","concurrency-safe"],
}
