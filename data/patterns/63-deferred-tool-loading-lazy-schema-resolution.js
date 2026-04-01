// Pattern 63: Deferred Tool Loading (Lazy Schema Resolution)
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-63',
  number: 63,
  name: "Deferred Tool Loading (Lazy Schema Resolution)",
  slug: "deferred-tool-loading-lazy-schema-resolution",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "AI agents with many tools (40+) waste context window tokens sending full schemas for tools the model may never use. At 200-500 tokens per tool schema, 40 tools = 8,000-20,000 tokens burned before the conversation starts.",
  solution: "Register tools by name only (no schema). When the model needs a tool, it calls a `tool_search` meta-tool that resolves the full schema on demand.",
  keywords: ["deferred","tool","loading","lazy","schema","resolution","agents","with","many","tools","waste","context","window","tokens","sending","full","schemas","model","never","200-500"],
}
