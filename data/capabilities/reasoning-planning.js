// Capability: Reasoning & Planning
// Category: Analysis

export const reasoningPlanning = {
  id: 'capability-reasoning-planning',
  key: 'reasoning-planning',
  name: 'Reasoning & Planning',
  aka: ['Multi-step Reasoning', 'Task Decomposition', 'Planning'],
  category: 'Analysis',
  whatItsGoodFor:
    'Breaking a goal into steps, weighing options, and sequencing actions — the backbone of agentic behaviour where a single answer is not enough.',
  whenNotToUse:
    'When a task is a simple lookup or single transformation (planning adds latency and failure surface for no benefit), or when every step has real-world consequences and no confirmation gate exists.',
  dataRequirements:
    'A well-scoped goal and the tools or context the plan will draw on; a way to inspect and, where stakes are high, approve the plan before it executes.',
  failureModes: [
    'Plausible-sounding plans built on a flawed or unstated assumption',
    'Compounding errors — one wrong early step derails the rest',
    'Reasoning presented as certainty, hiding where the plan is a guess',
  ],
  failureModeKeys: ['acts on unstated assumptions', 'does not challenge premises'],
  patterns: [11, 14, 10, 16], // tree-of-thoughts, plan-and-execute, reflexion, self-consistency
  principles: [2, 3], // metacognition as interface, transparent thinking partner
  uxPatterns: ['P3'], // explainable rationale
  keywords: ['reason', 'plan', 'steps', 'decompose', 'strategy', 'multi-step', 'orchestrate', 'agent'],
  example:
    'An agent shows its plan as an editable checklist before acting, marks which steps are confident versus uncertain, and pauses for approval on the irreversible ones.',
}
