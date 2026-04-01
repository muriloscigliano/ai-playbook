# AI Microcopy Snippets

> Copy-paste UI text for AI-powered features. Organized by interaction moment.
> Each snippet notes which UX pattern and design principle it implements.
>
> Usage: Find the interaction moment → copy the template → replace [brackets] with your specifics.

---

## Intent Preview (Before AI Acts)

*UX Pattern: P1 (Intent Preview) | Principle: 12 (Negotiate Agency)*

**Plan summary (multi-step):**
```
I'll [action]. Here's my plan:

1. [Step 1 with expected outcome]
2. [Step 2 with expected outcome]
3. [Step 3 with expected outcome]

[Proceed]  [Edit Plan]  [I'll handle this]
```

**Confirmation (single action, medium risk):**
```
Before I [action], can you confirm:
  - [Consequence 1]
  - [Consequence 2]

[Yes, proceed]  [No, cancel]
```

**Confirmation (high risk / irreversible):**
```
This will [action]. This cannot be undone.

What will happen:
  - [Irreversible consequence 1]
  - [Irreversible consequence 2]

Are you sure?  [Yes, I understand]  [Cancel]
```

---

## Confidence Signals

*UX Pattern: P4 (Confidence Signal) | Principle: 10 (Communicate Limitations)*

**High confidence:**
```
Based on [source/data], I recommend [action].
```

**Medium confidence:**
```
I think [action] is the best option, but you may want to review [specific detail].
```

**Low confidence:**
```
I'm not sure about this. Here are [N] options — which looks right to you?
```

**Multiple options with ranking:**
```
Here are [N] options, ranked by [criteria]:

1. [Best option] — [why it's recommended]
2. [Alternative] — [trade-off]
3. [Alternative] — [trade-off]

[Select]  [Show more options]  [Different criteria]
```

---

## Explainable Rationale

*UX Pattern: P3 (Explainable Rationale) | Principle: 3 (Transparent Thinking Partner)*

**Because-you-said format:**
```
Because you [preference/rule], I [action].
Data sources: [source 1], [source 2].
```

**Decision explanation:**
```
I chose [option] because:
  - [Reason 1 grounded in user data/preferences]
  - [Reason 2 grounded in constraints]

Alternatives considered: [option B] ([why not]), [option C] ([why not]).
```

---

## Error Recovery

*UX Pattern: P7 (Empathic Error Recovery) | Principle: 13 (Accountability)*

**Error with correction:**
```
Something went wrong: [specific error in plain language].

What I've done:
  - [Immediate correction taken]

What you may want to do:
  - [Suggested human action]

[Undo]  [View details]  [Contact support]
```

**Error with reduced autonomy:**
```
I made a mistake with [task type]: [what went wrong].

I've [immediate fix]. To prevent this, I've reduced my autonomy for
[task type] — I'll show you a preview before acting until we resolve
[root cause].

[View details]  [Adjust settings]
```

**Graceful degradation:**
```
I'm having trouble connecting to [service]. In the meantime:
  - Your data is safe — nothing was lost
  - You can [manual alternative]
  - I'll retry automatically and notify you when it's resolved

[Try again now]  [Continue manually]
```

---

## Undo & Recovery

*UX Pattern: P5 (Action Audit & Undo) | Principle: 13 (Accountability)*

**Action completed with undo:**
```
[Action] completed. [Undo — X minutes remaining]
```

**Undo confirmed:**
```
Action undone. [Optional: brief what-was-reversed summary]
```

**Undo expired:**
```
The undo window for [action] has expired. To reverse this manually:
  [instructions or link to support]
```

**Irreversible warning:**
```
This action cannot be undone. Please confirm:

What will happen: [specific consequences]
What will NOT be affected: [reassurance]

[Confirm]  [Cancel]
```

---

## Escalation

*UX Pattern: P6 (Escalation Pathway) | Principle: 9 (Enhance Not Replace)*

**Clarification needed:**
```
I need your help with something:
[Specific question with context]

[Option A]  [Option B]  [Let me explain more]
```

**Out of scope:**
```
This is outside what I can handle. I've flagged it for [role/team].

Context I've shared with them:
  - [Summary of situation]
  - [What was attempted]

[View escalation]  [Handle manually]  [Contact [team] directly]
```

**Low confidence — handing back:**
```
I'm not confident enough to [action] correctly.

What I've found so far: [partial results]
Where I got stuck: [specific issue]

[Try a different approach]  [I'll take it from here]
```

---

## Consent & Permissions

*UX Pattern: P2 (Autonomy Dial) | Principle: 11 (Consent as Continuous)*

**New capability request:**
```
To [capability], I need access to [resource].
This lets me [specific benefit].

[Allow]  [Not now]  [Learn more]
```

**Autonomy upgrade offer:**
```
I can now [new capability]. How would you like me to handle it?

  ○ Just suggest — you review everything
  ○ Draft for your approval
  ○ Handle automatically within [scope]

[Save preference]
```

**Consent refresh:**
```
Quick check-in: I currently have access to [resources] and can
[capabilities]. Is this still what you want?

[Keep as is]  [Review settings]  [Reduce access]
```

**First-time consent:**
```
Welcome! Before we start, a few things:
  - I'll [what the AI does]
  - I won't [what the AI doesn't do]
  - You're always in control — change settings anytime

[Get started]  [Customize settings first]
```

---

## Limitations & Disclaimers

*Principle: 10 (Communicate Limitations) | Principle: 3 (Transparency)*

**Source attribution:**
```
I generated this from [sources]. Please verify [specific aspect]
before [action].
```

**Data freshness:**
```
This is based on data through [date]. Recent changes may not
be reflected.
```

**Scope declaration:**
```
I can help with [X, Y, Z]. For [out of scope], please [alternative].
```

**Capability boundary:**
```
I'm designed for [specific use case]. I work best when
[optimal conditions]. I'm not suited for [explicit limitations].
```

---

## Onboarding & Value Demonstration

*Principle: 2 (Metacognition) | Anti-Pattern: Blank Prompt Trap*

**Contextual starters (instead of blank prompt):**
```
Based on [context], here are some things I can help with:

  → [Specific suggestion 1 based on user's data]
  → [Specific suggestion 2 based on user's data]
  → [Specific suggestion 3 based on user's data]

Or tell me what you need: [input field]
```

**Example-driven starter:**
```
Here's what others use [product name] for:

  "[Real example 1]" — saved [outcome]
  "[Real example 2]" — saved [outcome]

[Try one of these]  [Start with something else]
```

**Safe sandbox:**
```
Want to try [feature] on a sample project first?
No real data will be affected.

[Try with sample data]  [Use my real data]
```

---

## Progress & Status

*Principle: 6 (Adaptive Interfaces) | Principle: 3 (Transparency)*

**Working on it (short task):**
```
Working on it...
[progress indicator]
```

**Working on it (long task with steps):**
```
Working on your request:

  ✓ [Completed step 1]
  ✓ [Completed step 2]
  → [Current step 3] ...
  ○ [Pending step 4]

Estimated time remaining: [X]
[Cancel]
```

**Task complete:**
```
Done! Here's what I did:

  - [Action 1 with result]
  - [Action 2 with result]

[View details]  [Undo all]  [Next task]
```
