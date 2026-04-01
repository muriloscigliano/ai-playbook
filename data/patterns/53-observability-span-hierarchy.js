// Pattern 53: Observability Span Hierarchy
// Part: Part IX: Safety & Quality

export default {
  id: 'pattern-53',
  number: 53,
  name: "Observability Span Hierarchy",
  slug: "observability-span-hierarchy",
  part: "Part IX: Safety & Quality",
  problem: "When an agent fails, you need to know exactly which step failed: Was it the LLM call? A specific tool? A memory retrieval?",
  solution: "Hierarchical spans that mirror the execution tree. Every operation creates a span linked to its parent.",
  keywords: ["observability","span","hierarchy","when","agent","fails","need","know","exactly","which","step","failed","call","specific","tool","memory","retrieval","hierarchical","spans","that"],
}
