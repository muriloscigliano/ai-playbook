// AI Visibility Taxonomy — 4 levels of how visible the AI is in the interface.
//
// Orthogonal to the Autonomy Taxonomy (autonomy-levels.js): autonomy is about
// how much the AI is allowed to *do*; visibility is about how much the user is
// meant to *see* that it is AI at all. A feature can be highly autonomous yet
// ambient (V1 × L4), or highly visible yet passive (V4 × L1).

export const visibilityLevels = [
  {
    id: 'visibility-1',
    level: 1,
    code: 'V1',
    name: 'Ambient / Invisible',
    description: 'AI fuels a feature but is never labeled as AI. The user experiences a better outcome, not a model.',
    userPerception: 'This feature just works well.',
    examples: 'Ranking, autocorrect, smart defaults, spam filtering, noise suppression.',
    designImplications: 'Do not surface "AI" language. Design for the outcome; keep any confidence or rationale affordances subtle or absent. Trust is earned through quality, not disclosure. Failure must degrade gracefully because the user has no mental model of a system to blame.',
    primaryPrinciples: [8, 16],
  },
  {
    id: 'visibility-2',
    level: 2,
    code: 'V2',
    name: 'Assistive / Inline',
    description: 'AI is surfaced in context, at the point of work — a suggestion, a completion, a hint woven into the existing task.',
    userPerception: 'Something is helping me here.',
    examples: 'Inline code completion, smart compose, suggested replies, inline rewrite.',
    designImplications: 'Make the suggestion easy to accept, reject, or edit with equal friction (avoid agentic sludge). Keep the human in the flow; the AI proposes, the human disposes. Lightweight confidence cues (P4) and editable output (P9) fit here; heavy explanation usually does not.',
    primaryPrinciples: [9, 4],
  },
  {
    id: 'visibility-3',
    level: 3,
    code: 'V3',
    name: 'Conversational / Surfaced',
    description: 'AI has an explicit assistant surface the user addresses directly — a chat panel, a copilot, a command bar.',
    userPerception: 'I am talking to an assistant.',
    examples: 'Chat assistants, copilots, "ask" panels, conversational search.',
    designImplications: 'Now the full UX-pattern set applies: intent preview (P1), explainable rationale (P3), confidence (P4), audit and undo (P5). Visible "AI" language is appropriate here. Communicate limitations honestly (principle 10) — a named assistant invites higher expectations.',
    primaryPrinciples: [3, 10],
  },
  {
    id: 'visibility-4',
    level: 4,
    code: 'V4',
    name: 'Foreground / Agentic',
    description: 'AI is the primary interface. The user delegates goals and the system drives the work, surfacing itself as the actor.',
    userPerception: 'The agent is doing the work; I am supervising.',
    examples: 'Autonomous agents, task runners, agentic workflows, "do this for me" surfaces.',
    designImplications: 'Accountability must be visible (principle 13): every action audited and reversible (P5), escalation always available (P6), empathic recovery when it errs (P7). Consent is continuous, not one-time (principle 11), and the exit / hand-back path is sacred (principle 17). This is where trust is most fragile and most consequential.',
    primaryPrinciples: [13, 11, 17],
  },
]
