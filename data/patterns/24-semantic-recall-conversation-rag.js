// Pattern 24: Semantic Recall (Conversation RAG)
// Part: Part V: Memory System

export default {
  id: 'pattern-24',
  number: 24,
  name: "Semantic Recall (Conversation RAG)",
  slug: "semantic-recall-conversation-rag",
  part: "Part V: Memory System",
  problem: "Working memory is small. Message history is sequential. Neither handles \"what did we discuss 3 weeks ago about X?\"",
  solution: "Embed conversation messages into a vector store. On each turn, semantic-search for relevant past messages.",
  keywords: ["semantic","recall","conversation","working","memory","small","message","history","sequential","neither","handles","what","discuss","weeks","about","embed","messages","into","vector","store"],
}
