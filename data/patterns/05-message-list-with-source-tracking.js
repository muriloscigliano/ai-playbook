// Pattern 5: Message List with Source Tracking
// Part: Part II: Context Assembly

export default {
  id: 'pattern-5',
  number: 5,
  name: "Message List with Source Tracking",
  slug: "message-list-with-source-tracking",
  part: "Part II: Context Assembly",
  problem: "Messages come from multiple sources (user, LLM, memory recall, system prompts, tools) and need to be in different formats for different providers.",
  solution: "A unified message container that tracks the source and type of every message, with converters for each provider format.",
  keywords: ["message","list","with","source","tracking","messages","come","from","multiple","sources","user","memory","recall","system","prompts","tools","need","different","formats","providers"],
}
