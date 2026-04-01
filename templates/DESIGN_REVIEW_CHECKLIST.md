# AI Feature Design Review Checklist

> Use this checklist when reviewing the design of any AI-powered feature.
> Each item maps to a principle or pattern from the playbook. Items marked (!) are blocking — the feature should not ship without them.
>
> Reference: [Design Principles](../AI_DESIGN_PRINCIPLES.md) | [UX Patterns](../AI_DESIGN_PRINCIPLES.md#part-b-ux-patterns-for-agentic-systems) | [Anti-Patterns](../AI_ANTI_PATTERNS.md)

---

## Feature: _________________________ Date: _________

---

## Trust & Transparency

- [ ] (!) User can see WHY the AI made this recommendation — Principle 3, P3 (Explainable Rationale)
- [ ] (!) Confidence level is visible when stakes are medium or high — P4 (Confidence Signal)
- [ ] Sources and data used are attributable — Principle 3, Constraint: Data Provenance
- [ ] AI-generated content is distinguishable from human content — Constraint: Attribution Required
- [ ] Uncertainty is shown, not hidden — Principle 10 (Communicate Limitations)
- [ ] The AI does not sound more confident than it is — Anti-Pattern: Sycophancy Spiral

## Control & Consent

- [ ] (!) User can modify or override AI output at every step — Principle 12 (Negotiate Agency)
- [ ] (!) Autonomy level is appropriate for the risk tier — Autonomy Taxonomy
- [ ] Consent is scoped narrowly, not bundled — Principle 11 (Consent as Continuous)
- [ ] User can reduce AI autonomy at any time — P2 (Autonomy Dial)
- [ ] Accepting, rejecting, and editing are equally easy — Anti-Pattern: Agentic Sludge
- [ ] No actions happen before the user understands what will happen — P1 (Intent Preview)

## Safety & Recovery

- [ ] (!) Undo is available for all reversible AI actions — P5 (Action Audit & Undo)
- [ ] (!) Irreversible actions require explicit confirmation — Constraint: Human Verification
- [ ] Error recovery acknowledges the error specifically and provides a fix path — P7 (Error Recovery)
- [ ] Escalation to human support is always accessible — P6 (Escalation Pathway)
- [ ] The agent has clear boundaries it cannot exceed — Principle 15 (Guardrails)
- [ ] Failure states are designed, not afterthoughts — Anti-Pattern: Ship and Pray

## Cognitive Impact

- [ ] AI preserves productive struggle where learning matters — Principle 1 (Preserve Struggle)
- [ ] Interface promotes thinking, not just consumption — Principle 2 (Metacognition)
- [ ] Multiple options or variations are offered, not just one "answer" — Principle 4 (Creative Interpretation)
- [ ] AI metaphors are appropriate — not anthropomorphic — Principle 5 (Non-Human Metaphors)
- [ ] Users develop skills through AI interaction, not dependency — Principle 1

## Interface Quality

- [ ] The feature does NOT start with a blank prompt — Anti-Pattern: Blank Prompt Trap
- [ ] Value is demonstrated before asking for user intent — Opening Moves (Build Guide)
- [ ] The interaction follows Draft → Control → Validate → Commit → Recover — Standard Recipe (Build Guide)
- [ ] Output modality matches information type (tables for data, not paragraphs) — Principle 6 (Adaptive Interfaces)
- [ ] Structured controls (not just free text) for refinement — Principle 6, Friedman's Precision Knobs

## Accessibility & Inclusion

- [ ] Works across relevant touchpoints (desktop, mobile, voice if applicable) — Touchpoint Vocabulary
- [ ] Accessible (WCAG compliant) even when generated dynamically — Principle 8, Constraint: Accessibility
- [ ] Tested with diverse user populations — Principle 14 (Societal Impact)
- [ ] Language is clear, jargon-free, and localized if needed — Constraint: Localization

## Anti-Pattern Scan

- [ ] Not a God Agent — feature is scoped to specific capability, not "do everything"
- [ ] Not a Black Box — reasoning is visible to the user
- [ ] Not Agentic Sludge — friction is symmetric (accept/reject/modify equally easy)
- [ ] Not Automation Surprise — user knows what will happen before it happens
- [ ] Not Permission Theater — permissions are genuinely respected, not just asked for
- [ ] Not Trust Cliff — autonomy is graduated (L1→L2→L3), not binary (off/full)
- [ ] No Infinite Loop risk — agent has termination conditions and cost limits

## Data & Privacy

- [ ] PII is handled per policy — Constraint: Privacy Preserving
- [ ] Data retention period is defined — Constraint: Data Retention
- [ ] User can export their data — Principle 17 (Exit as Sacred Right)
- [ ] User can delete their data — Principle 17

---

## Summary

| Category | Pass | Fail | N/A | Notes |
|----------|------|------|-----|-------|
| Trust & Transparency | | | | |
| Control & Consent | | | | |
| Safety & Recovery | | | | |
| Cognitive Impact | | | | |
| Interface Quality | | | | |
| Accessibility | | | | |
| Anti-Pattern Scan | | | | |
| Data & Privacy | | | | |

**Overall:** [ ] Approved [ ] Approved with conditions [ ] Needs revision

**Blocking issues:**
1.
2.
3.

---

**Reviewers:**

| Role | Name | Date |
|------|------|------|
| Design Lead | | |
| Product | | |
| Engineering | | |
