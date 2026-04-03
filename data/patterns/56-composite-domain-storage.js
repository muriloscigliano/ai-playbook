// Pattern 56: Composite Domain Storage
// Part: Part X: Infrastructure & Protocols

export default {
  id: 'pattern-56',
  number: 56,
  name: "Composite Domain Storage",
  slug: "composite-domain-storage",
  part: "Part X: Infrastructure & Protocols",
  problem: "Different parts of the agent system need different storage characteristics: threads need relational queries, embeddings need vector search, workflow state needs key-value.",
  solution: "A composite store that routes to domain-specific backends.",
  keywords: ["composite","domain","storage","different","parts","agent","system","need","characteristics","threads","relational","queries","embeddings","vector","search","workflow","state","needs","key-value","store"],
}
