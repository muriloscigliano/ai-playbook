// Pattern 30: RAPTOR (Hierarchical Tree Retrieval)
// Part: Part VI: RAG (Retrieval-Augmented Generation)

export default {
  id: 'pattern-30',
  number: 30,
  name: "RAPTOR (Hierarchical Tree Retrieval)",
  slug: "raptor-hierarchical-tree-retrieval",
  part: "Part VI: RAG (Retrieval-Augmented Generation)",
  problem: "Standard RAG retrieves individual chunks. Questions that require understanding across multiple sections or the \"big picture\" fail because no single chunk contains the answer.",
  solution: "Build a hierarchical tree over documents. Leaf nodes are chunks. Parent nodes are LLM-generated summaries of clustered children. Search ALL levels simultaneously.",
  keywords: ["raptor","hierarchical","tree","retrieval","standard","retrieves","individual","chunks","questions","that","require","understanding","across","multiple","sections","picture","fail","because","single","chunk"],
}
