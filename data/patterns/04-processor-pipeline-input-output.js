// Pattern 4: Processor Pipeline (Input/Output)
// Part: Part II: Context Assembly

export default {
  id: 'pattern-4',
  number: 4,
  name: "Processor Pipeline (Input/Output)",
  slug: "processor-pipeline-input-output",
  part: "Part II: Context Assembly",
  problem: "Between receiving user input and sending it to the LLM, multiple transformations must occur: load history, inject working memory, run guardrails, embed for semantic recall. Same on output.",
  solution: "Ordered lists of input processors and output processors. Each processor receives the current state, transforms it, and passes to the next.",
  keywords: ["processor","pipeline","input","output","between","receiving","user","sending","multiple","transformations","must","occur","load","history","inject","working","memory","guardrails","embed","semantic"],
}
