# AI Feature PRD Template

> Fill in the [PLACEHOLDERS]. Delete guidance comments (<!-- -->) before sharing.
> Reference: [AI Agent Patterns Playbook](../AI_AGENT_PATTERNS_PLAYBOOK.md) | [Design Principles](../AI_DESIGN_PRINCIPLES.md)

---

## 1. Feature Overview

| Field | Value |
|-------|-------|
| Feature Name | [e.g., Smart Meeting Scheduler] |
| One-liner | [e.g., AI agent that schedules meetings based on participant availability and preferences] |
| Target User | [e.g., Team leads managing 5+ recurring meetings/week] |
| Problem Statement | [What pain does this solve? Be specific about time/cost/quality.] |
| Success Metric | [Primary KPI, e.g., "Reduce scheduling time from 15min to <2min per meeting"] |
| Owner | [Product owner name] |
| Target Date | [Launch date] |

---

## 2. AI Behavior Specification

### What the AI Does

| Step | Input | Processing | Output |
|------|-------|-----------|--------|
| 1 | [e.g., Meeting request] | [e.g., Check calendars, apply preferences] | [e.g., 3 time slot options] |
| 2 | [e.g., User selects slot] | [e.g., Send invitations] | [e.g., Calendar events created] |

### What the AI Does NOT Do

<!-- Be explicit. This prevents scope creep and sets user expectations. -->

- [ ] [e.g., Does NOT reschedule without user confirmation]
- [ ] [e.g., Does NOT access personal calendars, only work calendars]
- [ ] [e.g., Does NOT make decisions about meeting priority or necessity]

### Autonomy Level

<!-- Choose ONE. See Autonomy Taxonomy in AI_DESIGN_PRINCIPLES.md -->

- [ ] **L1: Observe & Suggest** — AI monitors and flags, user does everything
- [ ] **L2: Plan & Propose** — AI formulates plan, user approves before execution
- [ ] **L3: Act with Confirmation** — AI prepares everything, user gives go/no-go
- [ ] **L4: Act Autonomously** — AI executes within boundaries, user reviews history

**Justification:** [Why this level? What risk does it balance?]

### Confidence Display Strategy

<!-- How will the AI communicate its certainty? See P4 (Confidence Signal) -->

- [ ] No confidence display needed (low-stakes, deterministic)
- [ ] Categorical (High / Medium / Low labels)
- [ ] Numeric (percentage or score)
- [ ] Visual (color coding, filled bars)
- [ ] Verbal qualifiers ("I'm fairly confident..." / "I'm not sure about...")

---

## 3. Interaction Flow

<!-- Map to the Draft→Control→Validate→Commit→Recover recipe -->

| Step | What Happens | UX Pattern | Risk-Appropriate UI |
|------|-------------|-----------|-------------------|
| **Draft** | AI generates [output type] | P1 (Intent Preview) | [e.g., Show plan with numbered steps] |
| **Control** | User adjusts via [controls] | P2 (Autonomy Dial) | [e.g., Drag to reorder, click to modify] |
| **Validate** | Show [sources/reasoning/uncertainty] | P3 (Rationale), P4 (Confidence) | [e.g., "Based on calendar data from..."] |
| **Commit** | User [action] to approve | — | [e.g., "Send invitations" button] |
| **Recover** | [Undo mechanism] available for [duration] | P5 (Action Audit) | [e.g., "Undo — 30 min remaining"] |

---

## 4. Human Tasks Required

<!-- Check all that apply. See Human Task Vocabulary in AI_DESIGN_PRINCIPLES.md -->

**Input & Authorization:**
- [ ] Authenticate / Identify
- [ ] Grant / Revoke Consent
- [ ] Connect Integration
- [ ] Upload File
- [ ] Type Input
- [ ] Voice Command
- [ ] Configure System

**Control & Decision:**
- [ ] Select Option
- [ ] Choose Winner (pick from alternatives)
- [ ] Start Process
- [ ] Stop Process
- [ ] Compare Options

**Evaluation & Output:**
- [ ] Review & Approve
- [ ] Validate Data
- [ ] Annotate & Mark Up
- [ ] Provide Feedback
- [ ] Flag Content
- [ ] Edit Content
- [ ] Export / Download

---

## 5. Failure Modes & Guardrails

| # | Failure Mode | Probability | Severity | Guardrail | Playbook Pattern |
|---|-------------|------------|----------|-----------|-----------------|
| 1 | [e.g., AI schedules over existing event] | [Med] | [High] | [e.g., Calendar conflict check before confirmation] | Pattern 50 (Guardrails) |
| 2 | [e.g., AI sends invite to wrong person] | [Low] | [High] | [e.g., Recipient preview before send] | Pattern 20 (Suspend/Resume) |
| 3 | [e.g., AI can't find available time] | [Med] | [Low] | [e.g., Escalate to user with explanation] | P6 (Escalation Pathway) |

**Escalation Path:** When AI fails, it [describes escalation behavior]. Maps to P6 (Escalation Pathway).

**Undo Strategy:** [e.g., Calendar invitations can be recalled within 30 minutes. After that, a cancellation notice is sent.] Maps to P5 (Action Audit & Undo).

---

## 6. Constraints Checklist

<!-- Check all that apply. See Constraint Taxonomy in AI_DESIGN_PRINCIPLES.md -->

**Quality & Safety:**
- [ ] Privacy Preserving (GDPR/CCPA compliance)
- [ ] Human Verification (required for high-stakes outputs)
- [ ] Authentication Required
- [ ] Role-Based Access
- [ ] Content Safety Policy
- [ ] Audit Logging
- [ ] User Consent (explicit opt-in)

**Performance & Resource:**
- [ ] Latency Budget: [target, e.g., <2s response time]
- [ ] Cost Budget: [target, e.g., <$0.05 per interaction]
- [ ] Rate Limit: [target, e.g., 100 requests/min]

**Model & Technical:**
- [ ] Confidence Threshold: [minimum, e.g., >80% before auto-acting]
- [ ] Context Window management needed
- [ ] Structured output format required

**UX & Interaction:**
- [ ] Tone & Voice guidelines
- [ ] Error handling strategy defined
- [ ] Streaming mode for long operations
- [ ] Accessibility (WCAG) compliance

**Attribution:**
- [ ] AI-generated content disclosed
- [ ] Data sources cited
- [ ] Model version tracked

---

## 7. Metrics & Success Criteria

| Metric | Target | Measurement | Timeframe |
|--------|--------|-------------|-----------|
| **Adoption** | [X]% of target users try the feature | Analytics event on first use | First 30 days |
| **Acceptance Rate** | >[X]% of AI suggestions accepted | Proceed vs. reject tracking | Ongoing |
| **Edit Rate** | <[X]% of outputs edited before commit | Diff tracking on user modifications | Ongoing |
| **Undo Rate** | <[X]% of committed actions undone | Undo event tracking | Ongoing |
| **Time Saved** | [X] minutes saved per [task] | Before/after comparison | First 60 days |
| **User Satisfaction** | >[X]/5 rating | In-context microsurvey | Monthly |

---

## 8. Launch Plan

<!-- See 5-Phase Launch Sequencing in AI_FIRST_BUILD_GUIDE.md -->

| Phase | Duration | What Happens | Exit Criteria |
|-------|----------|-------------|---------------|
| **Shadow** | [X] weeks | AI runs internally, no user impact | Accuracy >[X]%, no harmful outputs |
| **Suggestion** | [X] weeks | AI suggests, user decides (L1-L2) | >[X]% acceptance, <[X]% negative feedback |
| **Draft** | [X] weeks | AI drafts, user edits (L2-L3) | <[X]% edit rate, >[X]% publish rate |
| **Supervised** | [X] weeks | AI acts with confirmation (L3) | >[X]% approval, <[X]% undo |
| **Autonomous** | Ongoing | AI acts within bounds (L4) | Continuous monitoring, auto-downgrade on regression |

**Target phase:** [Most features stop at Phase 3 or 4. Phase 5 is earned.]

---

## 9. Engineering Patterns Required

<!-- List the playbook patterns this feature needs. See PATTERN_INDEX.md -->

| Pattern | Name | Why Needed |
|---------|------|-----------|
| [44] | [Agentic Model Loop] | [Core agent loop] |
| [17] | [Tool Registry] | [Tool validation] |
| [e.g., 64] | [e.g., Multi-Layer Permissions] | [e.g., Permission gates for calendar access] |

---

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Product | | | [ ] |
| Design | | | [ ] |
| Engineering | | | [ ] |
| Security (if applicable) | | | [ ] |
