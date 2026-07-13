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

---

## Positioning & Naming

*Related: Visibility axis (V1–V4) | Principles: 8 (Generate Interfaces for the Moment), 16 (Make Power Legible)*

**Name the outcome, not the mechanism.** Users adopt a feature for what it does for them, not because it is "AI." Leading with "AI" can *lower* trust and conversion — it invites skepticism, raises expectations you may not meet, and describes the plumbing instead of the payoff. Reserve visible "AI" / "assistant" language for surfaces where the user is deliberately addressing an assistant (**V3 Conversational**) or delegating to an agent (**V4 Foreground**). At **V1 Ambient** and **V2 Assistive**, let the outcome speak.

**Rule of thumb by visibility level:**

| Visibility | Lead with | Avoid |
|-----------|-----------|-------|
| V1 Ambient / Invisible | The result ("Sorted by relevance") | Any "AI" label at all |
| V2 Assistive / Inline | The action ("Suggested reply", "Rewrite") | "AI-powered", "Powered by AI" badges |
| V3 Conversational | The assistant, plainly ("Ask", "Assistant") | Over-hyped naming ("Genius", "Magic") |
| V4 Foreground / Agentic | The delegation ("Run this for me") | Hiding that an agent is acting — be explicit |

**Prefer (outcome-led):**
```
✓  "Summarize this thread"
✓  "Draft a reply"
✓  "Find related documents"
✓  "Clean up this recording"
✓  "Suggested edits"
```

**Avoid (mechanism-led):**
```
✗  "Use AI to summarize this thread"
✗  "AI-powered reply generator"
✗  "AI document search"
✗  "AI noise removal"
✗  "AI suggestions"
```

**When naming *does* help:** if the "AI" label sets a needed expectation — that output may be imperfect, that it is generated and should be reviewed, or that the user is talking to a system rather than a person — then say so plainly. Honesty about what the system is (Principle 10) outranks the conversion nudge. The rule is *don't lead with the mechanism*, not *hide the mechanism*.

**One-liners:**
```
- Button:   "Summarize" — not "AI Summarize"
- Feature:  "Smart replies" — not "AI Replies"  (V2: describe the help, not the tech)
- Surface:  "Assistant" — fine at V3, where the user chose to address it
- Consent:  "This is generated by AI and may be inaccurate — review before sending."
            (say "AI" here: it sets the right expectation)
```

---

## Authenticity: the scarce signal

*Related: Positioning & Naming (above) | Principles: 4 (Preserve Creative Interpretation), 5 (Non-Human Metaphors), 9 (Enhance Human Work) | Anti-Pattern: Agentic Sludge*

As generated output saturates every surface, the default AI voice — fluent, generic, faintly the same everywhere — becomes background noise. The counter-move is not more polish; it is **the genuinely human detail, which is now the scarce and differentiating signal.** When a product's copy, defaults, and outputs all sound machine-made, the moments that are unmistakably from a person stand out and build trust precisely because they could not have been auto-generated.

This is the positive inverse of [Agentic Sludge](../AI_ANTI_PATTERNS.md): sludge is friction-free, business-serving output that flatters and homogenizes; authenticity is the human judgment, voice, and care that the machine cannot fake. Design for it deliberately.

**Where the human signal earns its keep:**

- **Preserve the user's own voice — do not flatten it.** When AI edits or rewrites, keep what is distinctively theirs rather than converging on a house style. Offer "keep my voice" as a real option (Principle 4).
- **Sign human moments as human.** Where a person actually wrote, decided, or reviewed something, let that show — a named reviewer, a hand-written note, a real example — rather than laundering it into anonymous "AI" output (Principle 9).
- **Make the generated default *a* starting point, not *the* answer.** Auto-generated copy, summaries, and replies should invite the human edit that makes them specific; the edit is where authenticity enters ([P9 Editable & Forkable Output](../AI_DESIGN_PRINCIPLES.md)).
- **Resist the uniform machine voice.** A brand's tone, an author's idiosyncrasy, a genuinely specific example — these read as trustworthy *because* they are not the generic model register (Principle 5).

**Microcopy:**
```
✓  "Draft written by AI — [Reviewed by Sam, your account lead]"
      (attribute the human check; it is the trust signal)
✓  "Keep my voice"  /  "Match the original tone"
      (offer authorship, don't overwrite it)
✓  "Here's a starting point — make it yours ▸"
      (frame generated output as a draft to be humanized)
✗  "AI-perfected for you"
      (polish is not the scarce thing; specificity and human care are)
```

**The principle underneath:** in a landscape where anyone can generate a decent-looking, decent-sounding artifact instantly, the durable differentiator is human judgment, taste, and voice — surfaced honestly, not hidden behind a uniform generated finish.

*Distilled from the authenticity counter-trend in Nielsen Norman Group's "State of UX 2026." Model-agnostic; encodes the design idea, not the industry commentary.*
