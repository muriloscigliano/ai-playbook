// Pattern 48: Workflow Suspend/Resume
// Part: Part VIII: Execution Engine

export default {
  id: 'pattern-48',
  number: 48,
  name: "Workflow Suspend/Resume",
  slug: "workflow-suspend-resume",
  part: "Part VIII: Execution Engine",
  problem: "Multi-step workflows need to pause for external events (human approval, webhook, async operation) and resume later — potentially on a different server.",
  solution: "Workflows can suspend at any step, persist their complete state, and resume from exactly where they left off.",
  keywords: ["workflow","suspend","resume","multi-step","workflows","need","pause","external","events","human","approval","webhook","async","operation","later","potentially","different","server","step","persist"],
}
