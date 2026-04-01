// Agentic Autonomy Taxonomy — 4 levels of agent autonomy
// Source: AI_DESIGN_PRINCIPLES.md, adapted from SAE International J3016
// Ref: Victor Yocco, "Beyond Generative: The Rise of Agentic AI and User-Centric Design" (Smashing Magazine, 2026)

export const autonomyLevels = [
  {
    id: 'level-1',
    level: 1,
    name: 'Observe & Suggest',
    agentRole: 'Monitors environment, identifies signals, surfaces notifications.',
    humanRole: 'All decisions and actions. Agent provides awareness only.',
    actionAuthority: 'Zero. Agent cannot act.',
    risk: 'Low',
    applicablePatterns: ['P4'],
  },
  {
    id: 'level-2',
    level: 2,
    name: 'Plan & Propose',
    agentRole: 'Formulates a multi-step strategy, presents it to the user, waits for approval before executing any step.',
    humanRole: 'Reviews plan, modifies steps, approves or rejects.',
    actionAuthority: 'Planning only. Execution requires explicit human approval.',
    risk: 'Low-Medium',
    applicablePatterns: ['P1', 'P4'],
  },
  {
    id: 'level-3',
    level: 3,
    name: 'Act with Confirmation',
    agentRole: 'Prepares everything needed for execution, stages the final action, and waits for a single go/no-go decision.',
    humanRole: 'Reviews the staged action and its predicted consequences, then confirms or cancels.',
    actionAuthority: 'Full preparation, but execution is gated behind human confirmation.',
    risk: 'Medium',
    applicablePatterns: ['P1', 'P2', 'P3', 'P4'],
  },
  {
    id: 'level-4',
    level: 4,
    name: 'Act Autonomously',
    agentRole: 'Executes within defined boundaries without waiting for per-action human approval. Operates on pre-authorized rules, scopes, and constraints.',
    humanRole: 'Sets boundaries, reviews history, intervenes on exceptions.',
    actionAuthority: 'Full, within defined scope. Violations trigger escalation.',
    risk: 'High',
    applicablePatterns: ['P2', 'P5', 'P6', 'P7'],
  },
]
