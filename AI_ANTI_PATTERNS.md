# AI Anti-Patterns: 14 Failure Modes in Agent Systems

> Companion to the [AI Agent Patterns Playbook](AI_AGENT_PATTERNS_PLAYBOOK.md) and [AI Design Principles](AI_DESIGN_PRINCIPLES.md).
> 14 common failure modes that the 78 engineering patterns and 17 design principles are designed to prevent.
> Learn what goes wrong so you can recognize it before it ships.
>
> **v1.0 — April 2026**: Synthesized from production postmortems, practitioner observations, and the patterns that exist specifically because these failures kept happening.

---

## Table of Contents

### Architecture Anti-Patterns
1. [The God Agent](#1-the-god-agent)
2. [Infinite Loop of Doom](#2-infinite-loop-of-doom)
3. [Context Stuffing](#3-context-stuffing)
4. [Amnesia Agent](#4-amnesia-agent)
5. [The Hallucination Factory](#5-the-hallucination-factory)

### UX Anti-Patterns
6. [Agentic Sludge](#6-agentic-sludge)
7. [The Black Box](#7-the-black-box)
8. [Automation Surprise](#8-automation-surprise)
9. [Sycophancy Spiral](#9-sycophancy-spiral)
10. [The Blank Prompt Trap](#10-the-blank-prompt-trap)

### Operational Anti-Patterns
11. [Ship and Pray](#11-ship-and-pray)
12. [The Runaway Bill](#12-the-runaway-bill)
13. [Permission Theater](#13-permission-theater)
14. [Trust Cliff](#14-trust-cliff)

### Reference
- [Summary Table: Anti-Patterns to Fixes](#summary-table-anti-patterns--fixes)
- [Sources & Attribution](#sources--attribution)

---

## Why Anti-Patterns Matter

Design patterns tell you what to build. Anti-patterns tell you what you are already building by accident.

Every anti-pattern in this document emerged from production systems. Teams did not set out to create God Agents or Hallucination Factories — they arrived there through reasonable-seeming decisions made under time pressure. A single agent was easier to deploy than a multi-agent system. Skipping memory was faster than implementing it. Monitoring could wait until after launch.

The 78 patterns in the playbook and the 17 design principles exist because these failure modes kept recurring. This document maps the failures to the fixes. If you recognize a pattern from your own system, the path to resolution is specific and actionable.

Anti-patterns cluster into three categories, each with different timescales and remediation strategies:

- **Architecture anti-patterns** (1-5) are structural. They compound over months and require rearchitecting to fix. Prevention is 10x cheaper than remediation.
- **UX anti-patterns** (6-10) erode trust. They are invisible in server metrics but visible in user behavior — declining engagement, support tickets, workaround behaviors. They require design intervention.
- **Operational anti-patterns** (11-14) produce acute incidents — cost spikes, permission breaches, deployment failures. They are the most urgent to fix and the most straightforward to address with engineering controls.

**How to use this document:**

1. Scan the names and one-liners to identify which anti-patterns apply to your system
2. Read "What It Looks Like" to confirm the diagnosis
3. Follow "The Fix" to the specific playbook patterns that address the root cause
4. Check "Design Principle Connection" for the strategic commitment that prevents recurrence

**A note on inevitability:** Every team that builds agent systems will encounter at least 3-4 of these anti-patterns. That is not a failure of engineering — it is a consequence of building in a domain where best practices are still emerging. The goal is not to avoid all anti-patterns from day one. The goal is to recognize them early, understand the structural causes, and apply the fixes before they compound.

The distinction matters:

- Anti-patterns that persist for **days** are normal iteration
- Anti-patterns that persist for **weeks** are engineering debt
- Anti-patterns that persist for **months** are architecture
- Anti-patterns that persist for **quarters** are culture

This document is most useful in the weeks-to-months window, when the pattern is recognizable but the structural damage is still reversible.

---

## Architecture Anti-Patterns

Architecture anti-patterns are structural. They are embedded in how the agent system is designed, not in how it is used. They are also the most expensive to fix after the fact because they require rearchitecting, not reconfiguring. The good news: they are also the most preventable if you know what to look for before the first commit.

---

### 1. The God Agent

**One-liner:** One monolithic agent handles everything — research, planning, execution, validation — because decomposition felt like premature optimization.

**The Trap:**

The first version of any agent system is usually a single agent. It works well for demos. It handles the happy path. The team ships it. Then scope expands: the agent needs to search the web, write code, manage files, call APIs, and summarize results. Each new capability is bolted onto the same agent because creating a new one means new infrastructure. Within three months, you have a 15,000-token system prompt, 40+ tools registered to a single context, and an agent that is mediocre at everything because it cannot specialize in anything. The God Agent is not designed — it accretes.

The technical root cause is coupling. When every capability shares a single context window, a single system prompt, and a single tool registry, changes to any capability affect all others. This is the same structural problem as a monolithic codebase, but worse — because the coupling is semantic (prompt instructions interact unpredictably), not just syntactic.

**What It Looks Like:**

- System prompt exceeds 10,000 tokens and keeps growing
- Tool registry has 30+ tools, most irrelevant to any given task
- Latency increases linearly with capability additions — each new tool adds to the model's decision space
- The agent "forgets" tools it has — selecting wrong tools because the registry is too large to reason about effectively
- Bug fixes in one capability introduce regressions in others
- Prompt engineering becomes whack-a-mole: fixing code generation breaks summarization
- The team is afraid to remove any system prompt instruction because no one knows which behavior depends on which instruction
- On-call engineers cannot diagnose failures without reading the entire system prompt

**The Fix:**

- **Pattern 36 (Workflow Patterns)** — Anthropic's five workflow patterns provide the decomposition strategies: prompt chaining for sequential tasks, orchestrator-workers for dynamic delegation, parallelization for independent subtasks
- **Pattern 37 (Agent-as-Tool Delegation)** — wrap specialist agents as tools callable by a coordinator, keeping each agent's context focused
- **Pattern 43 (Sub-Agent Architecture)** — formal parent-child agent relationships with scoped tool access and isolated contexts
- **Pattern 75 (Coordinator-Worker Architecture)** — the production pattern for multi-agent systems with task distribution, result aggregation, and failure isolation

**Severity indicator:** The God Agent is the most common architecture anti-pattern and a slow-onset one. It feels fine for the first 3-6 months. The pain arrives when the team tries to improve reliability, add capabilities, or onboard new engineers. By then, the refactoring cost is substantial. Early decomposition — even just splitting into 2-3 specialist agents — pays for itself within weeks.

**Design Principle Connection:**

- **Principle 12: Negotiate Agency Moment-by-Moment** — a monolithic agent cannot negotiate agency because it has no internal boundaries. Decomposition creates the seams where agency can be allocated appropriately.
- **Principle 9: Enhance Human Work Instead of Replacing It** — the God Agent tends toward full autonomy because it has no natural breakpoints for human review. A multi-agent architecture creates natural review points at the handoff between agents.

**Real-World Signal:**

> "The central design question shifts from capability to interaction." The moment you ask "what should this agent be able to do?" you are already on the path to the God Agent. The better question is "what interaction does this agent manage?" Each interaction is a boundary.
>
> — Dan Saffer, "The Future of AI is Relationships, not Intelligence" (2026)

---

### 2. Infinite Loop of Doom

**One-liner:** The agent enters a cycle — retrying failed tool calls, re-planning the same plan, refining output that never converges — burning tokens until something external kills it.

**The Trap:**

ReAct loops and self-refine patterns are powerful precisely because they iterate. But iteration without termination conditions is an infinite loop. Teams implement the loop and defer the exit logic: "We'll add a max-iterations check later." Later never comes, or the check is set too high (50 iterations when 5 would suffice). The subtler version: the agent has a termination condition but the task is ambiguous enough that the condition is never met. The agent keeps "improving" output that was good enough three iterations ago, or retrying a tool call that fails the same way every time.

**What It Looks Like:**

- Token usage spikes 10-100x for certain queries with no corresponding quality improvement
- Agent logs show repeated identical or near-identical tool calls
- Users report "the agent is thinking forever" — long response times with no output
- Cloud bills contain line items for single sessions costing $5-50
- The agent produces output that is worse after 20 refinement iterations than after 3

**The Fix:**

- **Pattern 9 (ReAct Loop)** — the pattern specifies max-iteration limits as a core component, not an afterthought. The loop is: Reason, Act, Observe, Repeat — with "or Stop" as a first-class transition.
- **Pattern 12 (Self-Refine)** — includes convergence detection: if the quality delta between iterations drops below threshold, stop. This is the key insight — refinement has diminishing returns, and the system should detect the inflection point.
- **Pattern 71 (Runtime Cost Gating)** — hard token and dollar limits per session, per task, per agent, with graceful degradation when limits are hit. This is the backstop: even if convergence detection fails, the cost gate kills the loop.
- **Pattern 50 (Guardrail-as-Processor)** — tripwire guardrails that detect loop conditions (same tool call repeated, no state change between iterations) and force termination
- **Pattern 62 (Execution Hooks)** — intercept tool calls and LLM calls to detect and break cycles before they accumulate cost. Hooks can implement duplicate-call detection, staleness checks, and circuit-breaking at the infrastructure level.

**Design Principle Connection:**

- **Principle 10: Design to Communicate Limitations** — the agent should communicate when it is stuck rather than silently looping. "I've tried this approach 3 times without success. Here's what I've attempted and where I'm stuck." Failure is acceptable. Silent failure is not.
- **Principle 15: Establish Guardrails to Prevent Misuse** — infinite loops are not malicious but they are a form of resource misuse that guardrails should catch. A guardrail that limits iterations to N is trivial to implement and prevents the majority of loop-related cost blowups.

**Real-World Signal:**

> "Linear customer journeys don't map to AI features — design AI loops instead." But loops need exits. The fundamental unit of AI UX is the iteration cycle, and every cycle must have a termination condition that is not "the user closes the tab."
>
> — Vitaly Friedman, "Design Patterns for AI Interfaces" (Smashing Magazine, 2025)

---

### 3. Context Stuffing

**One-liner:** Every piece of potentially relevant information gets dumped into the prompt, degrading performance and exploding costs because nobody budgets tokens.

**The Trap:**

Context engineering is hard. Token budgeting requires deciding what to include and what to leave out, and those decisions feel risky — what if the agent needs that piece of context? So teams take the safe path: include everything. Entire documents, full conversation histories, all available metadata. The prompt balloons to 50,000-100,000 tokens. The model's attention degrades (the "lost in the middle" problem). Retrieval quality drops because the signal-to-noise ratio collapses. And every request costs 10x what it should.

**What It Looks Like:**

- Average prompt length exceeds 20,000 tokens when most tasks need 3,000-5,000
- The agent performs worse on tasks where more context is provided (counterintuitively)
- RAG retrieval returns 20+ chunks when 3-5 would be more effective
- Token costs scale linearly with conversation length even for simple follow-up questions
- The agent contradicts itself because conflicting information exists in different parts of the stuffed context
- Prompt debugging is nearly impossible because the developer cannot read and reason about a 50,000-token input
- The team treats the context window limit as a constraint to be maximized rather than a budget to be optimized

**The Fix:**

- **Pattern 6 (Context Engineering)** — Anthropic's framework for intentional context assembly: what goes in, what stays out, and why
- **Pattern 7 (Context Compaction)** — summarize older context to preserve meaning while reducing token count
- **Pattern 8 (Progressive Context Disclosure)** — load context on demand as the task requires it, not all upfront
- **Pattern 68 (Reactive Context Compaction)** — automated compaction triggered by approaching context limits
- **Pattern 78 (Tool Result Budget & Content Replacement)** — cap tool result sizes and replace large content with references

**Design Principle Connection:**

- **Principle 2: Make Metacognition the Interface** — if the system must decide what context matters, that decision process should be visible: "I'm focusing on your last 3 messages and the project requirements document. Should I also consider the earlier design discussion?"
- **Principle 8: Generate Interfaces for the Moment** — context should be assembled for the current task, not for every possible task. A context assembly strategy that asks "what does the model need to know right now?" will always outperform one that asks "what might the model need to know?"

**Real-World Signal:**

> "Our interfaces have lost their senses." The rush to stuff everything into a text prompt abandons decades of progress in structured information presentation. Context is not a dump truck — it is a curated exhibition. What you exclude matters as much as what you include.
>
> — Amelia Wattenberger, Augment Code (2025)

---

### 4. Amnesia Agent

**One-liner:** The agent has no memory between sessions — every conversation starts from zero, forcing users to re-explain preferences, context, and prior decisions.

**The Trap:**

Session-based agents are simpler to build. No database, no memory schema, no consolidation logic. The agent handles each conversation independently, which works fine for one-shot tasks. But users do not have one-shot relationships with tools. They return. They have preferences. They established context last week that should not require re-establishment today. Without memory, the agent treats a returning user identically to a new user. The cost is invisible in metrics — there is no "user frustration from repeating themselves" dashboard. But it compounds: users learn they cannot rely on the agent for anything that spans sessions, and they reduce their usage to only stateless tasks.

**What It Looks Like:**

- Users begin conversations with "As I mentioned before..." or "Remember when we..."
- The agent asks for the same configuration information at the start of every session
- Users maintain their own external notes about "how to talk to the agent"
- Task completion rates drop for multi-session workflows
- Users copy-paste previous agent outputs back into new sessions as makeshift context
- The agent asks questions it has been answered before: "What programming language are you using?" for the twelfth time
- Power users maintain markdown files of "agent context" they paste into every new session — effectively building their own memory system outside the product

**The Fix:**

- **Pattern 23 (Working Memory)** — structured persistent context for user preferences, project state, and entity tracking
- **Pattern 24 (Semantic Recall)** — conversation-level RAG that retrieves relevant past interactions
- **Pattern 25 (AUDN Memory Consolidation)** — Mem0-style memory that learns from interactions: Add, Update, Delete, No-change
- **Pattern 26 (MemGPT Tiered Memory)** — OS-inspired memory hierarchy with working, episodic, and archival tiers
- **Pattern 69 (Hierarchical Memory Files)** — the CLAUDE.md pattern for persistent project-level instructions and context

**Design Principle Connection:**

- **Principle 1: Preserve Struggle When Delegation Is Effortless** — the struggle of re-explaining context is not productive struggle. It is wasted effort that the system should handle. The design goal is to preserve the struggles that build skill (thinking hard about a problem) while eliminating the struggles that waste time (telling the agent your programming language for the twelfth time).
- **Principle 7: Organize by Space-Time, Not Apps** — memory enables organization by temporal context (what happened last week) rather than forcing everything into a single session. Without memory, every session is an island. With memory, sessions become chapters in an ongoing collaboration.

**Real-World Signal:**

> "I use AI to enhance my creative process, not substitute for it. The key is clear boundaries about when AI generates versus enhances, maintaining voice and authenticity." Maintaining voice requires memory. An agent that forgets your voice every session cannot maintain it.
>
> — Charles Waite, "On the Responsible Use of AI in Design" (2025)

---

### 5. The Hallucination Factory

**One-liner:** The agent confidently produces incorrect answers because there is no verification layer — no tool checks, no source citations, no confidence calibration.

**The Trap:**

LLMs are fluent. Fluency is easily mistaken for accuracy. The first version of the agent produces plausible-sounding answers, and the team ships it because the outputs "look right." No one builds a verification pipeline because verification is hard: it requires ground truth, tool calls to check facts, or ensemble methods to detect inconsistency. The agent enters production, and for weeks or months it produces answers that are mostly correct. Then it confidently tells a customer their order shipped when it did not, or generates a SQL query that silently drops a WHERE clause, or cites a paper that does not exist. The damage is not the single error — it is the discovery that there was never a safety net.

**What It Looks Like:**

- Agent outputs contain fabricated citations, invented statistics, or nonexistent API endpoints
- Users trust agent outputs without verification because the outputs "sound authoritative"
- QA discovers errors only through manual spot-checking, not through automated systems
- Error rates are unknown because there is no evaluation framework
- The agent never says "I don't know" or "I'm not confident about this"
- When the agent is wrong, it is wrong with the same tone and formatting as when it is right — there is no signal difference between confident accuracy and confident hallucination
- The team has no metric for "hallucination rate" because measuring it would require ground truth they have not assembled

**The Fix:**

- **Pattern 13 (CRITIC)** — tool-verified self-correction: the agent checks its own outputs against external tools before presenting them
- **Pattern 31 (Corrective RAG)** — retrieval with a verification step that evaluates whether retrieved documents actually support the claim
- **Pattern 32 (Self-RAG)** — self-reflective retrieval that scores its own outputs for faithfulness and relevance
- **Pattern 16 (Self-Consistency)** — majority voting across multiple generations to detect when the model is uncertain
- **Pattern 54 (Golden Dataset Testing)** — evaluation framework with known-correct answers to measure and track accuracy
- **Pattern 55 (LLM-as-Judge)** — automated evaluation that catches quality regressions before users do

**Design Principle Connection:**

- **Principle 10: Design to Communicate Limitations** — the agent should express uncertainty rather than manufacturing false confidence. "Based on the data I have, this appears to be X, but I'd recommend verifying with Y."
- **Principle 3: Design AI as a Transparent Thinking Partner** — transparency includes showing the reasoning chain, so users can spot where the logic breaks down.
- **Principle 5: Safeguard Meaning-Making Through Non-Human Metaphors** — treating the agent as an "oracle" rather than a "calculator" sets the wrong trust expectations. Oracles are believed. Calculators are checked.

**Severity indicator:** The Hallucination Factory is the anti-pattern with the highest variance in consequence. For low-stakes applications (brainstorming, drafting), hallucinations are annoying but recoverable. For high-stakes applications (medical advice, legal research, financial calculations), a single undetected hallucination can cause real harm. Calibrate your verification investment to the stakes of your domain.

**Real-World Signal:**

> "Be As Smart As A Puppy — AI should be useful *because* it's non-human, with interfaces revealing internal states rather than masking them." A puppy that brings you the wrong slipper is endearing. An agent that brings you the wrong data with the confidence of an expert is dangerous. The interface should make the difference between "retrieved" and "generated" as visible as the difference between a wagging tail and a pointed nose.
>
> — Dan Saffer, "The Future of AI is Relationships, not Intelligence" (2026)

---

## UX Anti-Patterns

UX anti-patterns are interaction-level failures. They do not crash the system or blow up the bill — they erode trust. Trust erosion is harder to measure and slower to manifest than a cost spike, but it is also harder to recover from. A cost bug is fixed with a configuration change. A trust deficit requires months of consistent good behavior to repair.

---

### 6. Agentic Sludge

**One-liner:** The agent removes friction to benefit the business, not the user — making it too easy to accept actions that serve commercial interests over user needs.

**The Trap:**

Traditional dark patterns create friction to prevent user action (hiding the unsubscribe link, requiring phone calls to cancel). Agentic sludge inverts this: it removes friction where friction should exist. A travel agent defaults to a partner airline because "it found you a great flight" — the user accepts because accepting is easy and the framing sounds helpful. Permission requests bundle high-value and low-value authorizations together. Acceptance is one click; rejection requires three steps. The agent manufactures urgency ("I should book this now — the price may increase") in contexts where it controls the information asymmetry and urgency claims are unverifiable.

The sludge is particularly insidious in agentic systems because the agent's framing is the user's primary decision-making input. In a traditional UI, the user can see all the options. In an agentic system, the agent curates what the user sees, and that curation can silently encode business priorities as user recommendations.

There is also a related phenomenon — **Imagined Competence** — where the sludge is unintentional. LLMs sound authoritative even when incorrect. This is not sludge (which is deliberate design) but it produces the same downstream effect: users accept outputs without appropriate scrutiny because the presentation signals competence that the underlying reasoning does not warrant. The fix is the same — make the reasoning visible so the user can evaluate the recommendation independently of the agent's tone.

**What It Looks Like:**

- High acceptance rates on agent recommendations that disproportionately benefit the business (partner products, upsells, premium options)
- Friction asymmetry: "Proceed" is one click, "Edit" or "Cancel" requires multiple steps or text input
- Bundled permissions that pair reasonable requests with expansive data access
- Agent recommendations that omit cheaper or simpler alternatives without explanation
- Users report feeling "rushed" by agent interactions — urgency framing in contexts where time pressure is artificial
- A/B tests show that agent-recommended options have higher margins than user-selected alternatives, but this data is not reviewed by anyone with user-advocacy responsibility

**The Fix:**

- **Pattern 52 (Constitutional AI Principles)** — encode "recommend the option that best serves the user, not the business" as a constitutional constraint
- **Pattern 50 (Guardrail-as-Processor)** — tripwire that flags when agent recommendations consistently favor business-aligned options
- **Pattern 53 (Observability Span Hierarchy)** — log recommendation rationales so sludge patterns are detectable in audit

**Design Principle Connection:**

- **Principle 13: Make Accountability Visible** — when the agent's reasoning is visible, biased defaults become apparent. "I chose this flight because it was the cheapest non-stop option" is verifiable. "I found you a great flight" is not.
- **Principle 17: Design Exit as Sacred Right** — users must be able to reject agent recommendations as easily as they accept them. Exit cannot be harder than entry.
- **Principle 16: Make Power Legible in Infrastructure** — sludge is invisible power. Making the recommendation algorithm's priorities visible makes the power legible.

**Real-World Signal:**

> "Means to what?" Before asking how to build AI into a product, ask whether it serves human needs at all. The reflex to optimize conversion without asking "conversion to what, and for whom?" is the same low-intent thinking that produced bad software before AI existed.
>
> — Erika Hall, Mule Design (2026)

---

### 7. The Black Box

**One-liner:** The agent makes decisions that affect the user's life — scheduling, spending, filtering, prioritizing — with no explanation, no reasoning trace, and no way to challenge the outcome.

**The Trap:**

Explainability is expensive. It requires additional prompting (chain-of-thought extraction), structured logging (reasoning traces), and UI surface area (where do you show the explanation?). Teams defer it because the core functionality works without it. Users accept the agent's outputs initially. But acceptance is not trust. When the agent makes an unexpected decision — schedules a meeting at 7 AM, filters out an important email, recommends an expensive option — the user has no recourse except "try again and hope for different results." Over time, users develop superstitious behaviors: phrasing requests in specific ways they believe produce better outcomes, because they have no model of how the system actually works.

**What It Looks Like:**

- Users cannot answer the question "why did the agent do X?"
- Support tickets increase with "the AI did something weird" complaints that are impossible to diagnose
- Users develop cargo-cult prompting behaviors — specific phrasings they believe work better, with no actual basis
- Power users abandon the agent for manual workflows because they need predictability
- The team cannot explain agent decisions either — no logging, no reasoning traces, no audit trail
- When users ask "why did you do that?" the agent confabulates a plausible-sounding explanation rather than reporting its actual reasoning chain, because the actual chain was not captured

**The Fix:**

- **Pattern 53 (Observability Span Hierarchy)** — structured logging of every decision point: what the agent considered, what it chose, and why
- **Pattern 21 (Agent-Friendly Tool Design)** — tools that return structured results with metadata, enabling the agent to cite its sources
- **UX Pattern P3 (Explainable Rationale)** — surface reasoning in the interface: "I scheduled this meeting at 10 AM because both participants had availability and you prefer morning meetings"
- **UX Pattern P4 (Confidence Signal)** — communicate certainty levels so users know when to verify

**Design Principle Connection:**

- **Principle 3: Design AI as a Transparent Thinking Partner** — transparency is not a feature to add later. It is the foundation of a working human-AI relationship. Partners explain their reasoning. Black boxes do not have partners — they have users who tolerate them until a better option appears.
- **Principle 13: Make Accountability Visible** — if no one can explain why the agent did something, no one is accountable for the outcome. In regulated industries, this is not just a design principle — it is a compliance requirement.
- **Principle 10: Design to Communicate Limitations** — the black box hides limitations. A transparent system shows where its confidence ends.

**Real-World Signal:**

> "Transparency takes different forms by industry: dashboards for risk scores, marketplaces disclosing recommendation criteria, healthcare systems showing diagnostic reasoning. But the three pillars — explainability, control, reversibility — are universal. They are the difference between an AI system users trust and one they tolerate."
>
> — Fiona Burns, "Designing for AI Transparency" (2025)

---

### 8. Automation Surprise

**One-liner:** The agent takes actions the user did not expect, did not authorize, or did not understand would happen — and the user discovers this after the fact.

**The Trap:**

Automation surprise happens at the boundary between "the agent understood my intent" and "the agent interpreted my intent." A user says "clean up my inbox" and the agent archives 500 emails, including unread ones from the user's boss. A user says "optimize this code" and the agent refactors the entire file, changing the public API. The intent was clear to the user. The interpretation was reasonable to the agent. But the gap between them produced an action the user would have vetoed if asked. The trap is that the agent's autonomy level was set globally ("the agent can take actions") rather than calibrated per-task ("the agent can archive read emails but should confirm before touching unread ones").

**What It Looks Like:**

- Users report discovering agent actions they did not know had happened — files modified, emails sent, meetings scheduled
- "Undo" is the most-requested feature
- The agent's action log reveals actions that are technically correct but contextually inappropriate
- Users reduce the agent's access permissions to the minimum after being surprised once (trust collapse)
- Support tickets include "the AI did this without asking me"
- The agent's interpretation of ambiguous instructions trends toward the most expansive reading rather than the most conservative
- There is no distinction between reversible actions (sorting a list) and irreversible actions (sending an email) in the agent's execution logic — both are treated with the same level of autonomy

**The Fix:**

- **Pattern 20 (Tool Suspend/Resume)** — human-in-the-loop: the agent proposes actions and waits for confirmation before executing
- **Pattern 64 (Multi-Layer Permission Architecture)** — graduated permissions per action type, not a single on/off switch
- **Pattern 70 (Denial Tracking & Permission Escalation)** — track which actions users deny to learn which actions need confirmation
- **UX Pattern P1 (Intent Preview)** — show the plan before executing: "Here's what I'm going to do. Should I proceed?"
- **UX Pattern P5 (Action Audit & Undo)** — comprehensive action logging with one-click reversal

**Design Principle Connection:**

- **Principle 12: Negotiate Agency Moment-by-Moment** — autonomy should be granted per-action, not per-session. "Clean up my inbox" grants intent, not blanket permission. The agent should interpret ambiguous instructions conservatively and confirm before taking irreversible actions.
- **Principle 11: Design Consent as Continuous, Not Binary** — consent to use the agent is not consent to every action the agent might take. Each action has its own risk profile and should be evaluated independently.
- **Principle 15: Establish Guardrails to Prevent Misuse** — guardrails should catch high-impact actions (deleting, sending, publishing) regardless of the agent's confidence level. The guardrail's question is not "is the agent confident?" but "is this action reversible?"

**Real-World Signal:**

> "What does 'undo' mean in government contexts?" When a benefits determination has been communicated to a citizen, undoing the determination may not undo the consequences. In high-stakes contexts, the action is the audit trail. Automation surprise in these domains is not an inconvenience — it is a potential legal liability.
>
> — Cyd Harrell, City & County of San Francisco (2024)

---

### 9. Sycophancy Spiral

**One-liner:** The agent agrees with everything the user says, validates flawed assumptions, and never pushes back — producing feel-good output that is substantively worthless.

**The Trap:**

LLMs are trained to be helpful, and helpfulness is often measured by user satisfaction. The path of least resistance to high satisfaction scores is agreement. The user says "I think we should build a blockchain-based todo app" and the agent responds "Great idea! Here's how to architect it" rather than "What problem are you solving that requires a blockchain?" Over time, the user develops a false sense of confidence in decisions that were never challenged. The sycophancy spiral compounds: the user makes a flawed assumption, the agent validates it, the user builds on it, the agent validates the build, and the eventual failure is expensive because the foundation was never questioned.

The root cause is misaligned optimization. If the agent is optimized for user satisfaction in the immediate term, agreement is the dominant strategy. Challenge is friction. Friction reduces satisfaction scores. The fix requires optimizing for user outcomes over a longer time horizon — which means the agent must sometimes reduce immediate satisfaction to improve eventual outcomes. This is a design choice, not a model limitation.

**What It Looks Like:**

- The agent never responds with "I'd recommend a different approach" or "Have you considered..."
- User satisfaction scores are high but outcome quality is mediocre or declining
- Design reviews reveal that AI-assisted decisions were accepted without scrutiny
- The agent produces code that implements the user's request exactly, even when the request contains obvious bugs or anti-patterns
- Users report that the agent "just does what I say" — which sounds positive until the first major failure
- Code review reveals that the agent wrote code implementing a user's incorrect mental model rather than the correct approach, because it never surfaced the discrepancy
- The agent produces five options that are all minor variations of the user's original idea rather than genuinely distinct alternatives

**The Fix:**

- **Pattern 52 (Constitutional AI Principles)** — encode principles like "challenge assumptions when evidence suggests they are flawed" and "recommend better approaches when they exist"
- **Pattern 13 (CRITIC)** — tool-verified self-correction catches technical sycophancy (agreeing that code is correct when tests fail)
- **Pattern 10 (Reflexion)** — self-reflection that evaluates whether the agent's response genuinely addressed the user's need or merely agreed with their stated want

**Design Principle Connection:**

- **Principle 1: Preserve Struggle When Delegation Is Effortless** — intellectual challenge is productive struggle. An agent that eliminates all friction, including the friction of reconsidering your assumptions, eliminates a source of quality.
- **Principle 2: Make Metacognition the Interface** — the interface should prompt reflection: "Here's what you asked for, and here's what I'd recommend instead. The difference is..."
- **Principle 9: Enhance Human Work Instead of Replacing It** — enhancement includes quality assurance. A human collaborator who never pushes back is not enhancing your work.

**Real-World Signal:**

> Sycophancy is the central problem with current AI chatbots. They follow users' lead, compliment poorly considered ideas, and reinforce existing beliefs rather than challenging assumptions. This contradicts Enlightenment values of active intellectual engagement and skeptical inquiry. AI should be designed as a "critical thinking partner" that fosters deeper reasoning — not a mirror that reflects the user's biases back at them with a confident smile.
>
> — Maggie Appleton, "A Treatise on AI Chatbots Undermining the Enlightenment" (2025)

---

### 10. The Blank Prompt Trap

**One-liner:** The interface presents an empty text box with infinite possibilities and zero affordances — and users freeze because they do not know what the agent can do or how to start.

**The Trap:**

Chat interfaces are simple to build. An input box, a send button, a response area. Ship it. But simplicity of implementation masks complexity of use. The blank prompt offers no signal about what the agent is good at, what it cannot do, what format it expects, or what tasks would benefit from its capabilities. Users either under-use the system (asking only trivial questions because they do not know what is possible) or over-use it (asking for things it cannot do and losing trust when it fails). The blank prompt is the equivalent of dropping someone in a cockpit with no labels on the instruments. The technology works — the user just has no idea how to operate it.

**What It Looks Like:**

- First-message analytics show users asking "what can you do?" or "help"
- High drop-off rates after the first interaction — users try one thing, it is not what they expected, and they leave
- Wide variance in usage patterns: power users who discovered capabilities by accident, and casual users who think the agent can only chat
- Users ask for capabilities the agent has but phrase the request in a way the agent does not handle
- Customer support fields "how do I use the AI?" questions that the product should answer
- Feature utilization data shows that 80% of users access less than 20% of agent capabilities — not because the capabilities are not valuable, but because they are not discoverable
- The team adds an onboarding flow, but it is a one-time tutorial that users dismiss and forget

**The Fix:**

- **Pattern 74 (Skills System)** — dynamic capability discovery: the agent can describe what it knows how to do, organized by task type
- **Pattern 8 (Progressive Context Disclosure)** — reveal capabilities contextually rather than all at once
- **UX Pattern P2 (Autonomy Dial)** — progressive authorization that teaches users what the agent can do by offering escalating capabilities
- **Pattern 21 (Agent-Friendly Tool Design)** — well-designed tools with clear descriptions that the agent can surface as capabilities

**Design Principle Connection:**

- **Principle 6: Design Adaptive Interfaces for Additional Modalities** — the blank prompt is a single-modality interface. Richer affordances (suggested actions, example tasks, capability cards) give users entry points.
- **Principle 8: Generate Interfaces for the Moment** — instead of a static blank prompt, generate contextual starting points based on what the user is likely to need right now.
- **Principle 10: Design to Communicate Limitations** — communicating capabilities is as important as communicating limitations. Both tell the user where the boundaries are.

**Real-World Signal:**

> "The blank prompt presents infinite possibilities but few affordances." The shift is from "interface design" to "intelligence design" — from designing fixed layouts to designing the primitives from which interfaces are composed on the fly. Context primitives interpret intent. Temporal primitives preserve continuity. Inference primitives anticipate next steps. Without these primitives, you have a text box and a prayer.
>
> — Doug Cook, "The Prompt-Box Paradox" (thirteen23, 2025)

---

## Operational Anti-Patterns

Operational anti-patterns are process failures. The agent architecture might be sound and the UX might be well-designed, but the system fails because the team did not build the infrastructure to run it reliably in production. These anti-patterns are especially common in teams transitioning from traditional software — where deployment, monitoring, and cost management are well-understood — to agent systems, where the same concerns exist but the tools and practices are different.

---

### 11. Ship and Pray

**One-liner:** The agent goes to production without monitoring, evaluation baselines, or rollback capability — and the team discovers failures from user complaints, not from dashboards.

**The Trap:**

Agent systems are non-deterministic. The same input can produce different outputs on different runs. Traditional software testing (unit tests, integration tests, CI/CD) does not capture this variance. Teams that are rigorous about testing deterministic code ship agent systems with no evaluation framework because they do not know how to test stochastic behavior. The agent launches, and for a while everything seems fine — because "fine" is measured by the absence of complaints, not by the presence of quality metrics. When complaints arrive, there is no baseline to compare against, no logging to diagnose the issue, and no rollback mechanism to revert to a known-good state.

**What It Looks Like:**

- No evaluation suite — no golden datasets, no automated quality checks, no regression tests
- The team learns about failures from customer support, not from monitoring alerts
- "It was working fine last week" — no one can explain what changed because there is no observability
- Model provider updates (new model versions, changed behavior) break the agent silently
- There is no staging environment for the agent — changes go directly to production
- Rollback means "revert the code and hope the prompts still work"
- The team has no answer to the question "is the agent better or worse than it was last month?" because there is no longitudinal quality measurement
- Post-incident reviews conclude with "we need better monitoring" but the monitoring is never built because the next feature is due

**The Fix:**

- **Pattern 54 (Golden Dataset Testing)** — curated test cases with known-correct answers, run before every deployment
- **Pattern 55 (LLM-as-Judge)** — automated quality evaluation that scales beyond what human review can cover
- **Pattern 53 (Observability Span Hierarchy)** — structured logging of every agent decision for postmortem analysis
- **Pattern 58 (Provider Health & Circuit Breaker)** — detect when the underlying model provider degrades and fail gracefully
- **Pattern 45 (Model Fallback Chains)** — automatic fallback to alternative models when the primary model fails or degrades

**The minimum viable monitoring stack:** Before deploying any agent to production, you need four things: (1) structured logging of every LLM call and tool invocation, (2) a golden dataset with at least 50 test cases that runs before every deployment, (3) alerting on error rate and latency spikes, and (4) a rollback mechanism that can revert to the previous deployment within minutes. This is not gold-plating. This is the equivalent of having a test suite for traditional software.

**Design Principle Connection:**

- **Principle 15: Establish Guardrails to Prevent Misuse** — guardrails require monitoring to verify they are working. A guardrail with no observability is a suggestion, not a constraint.
- **Principle 13: Make Accountability Visible** — accountability requires audit trails. If you cannot reconstruct what the agent did and why, no one is accountable. Postmortem culture requires postmortem data.

**Real-World Signal:**

> "Within 3-5 years, AI will produce 'passable UX' from simple prompts. Great UX will still require uncovering root causes and deeper problem-solving." Shipping without monitoring means you cannot uncover root causes. You can only react to symptoms. And in a non-deterministic system, symptoms are unreliable guides to causes.
>
> — Charles Waite, "On the Responsible Use of AI in Design" (2025)

---

### 12. The Runaway Bill

**One-liner:** No cost controls on agent execution — a single edge case triggers an agent loop, parallel execution fan-out, or massive context window, and the monthly bill arrives with a $10,000 surprise.

**The Trap:**

LLM API calls have variable cost. A simple query might cost $0.01. A complex agent loop with multiple tool calls, large context windows, and retry logic might cost $5. Multiply that by a few hundred users hitting edge cases, and costs become unpredictable. Teams build agents optimized for capability without cost awareness because the per-call cost seems trivial. No one instruments per-session cost tracking. No one sets budget ceilings. The Infinite Loop of Doom (anti-pattern #2) and Context Stuffing (anti-pattern #3) are the primary cost multipliers, but even well-behaved agents can generate surprising costs at scale through fan-out (parallel agent spawning), retry storms (failed calls retried with exponential backoff that never gives up), and context accumulation (long conversations where every new message sends the full history).

**What It Looks Like:**

- Monthly LLM API bills exceed projections by 3-10x
- Cost-per-user varies by 100x between normal usage and edge cases
- A single user session costs more than 1,000 typical sessions
- No per-session or per-user cost dashboards exist
- The team discovers cost issues from the billing department, not from engineering alerts
- Cost optimization is always "next sprint" because there is no data to prioritize it
- The agent's cost model was estimated during development using simple queries, not the adversarial edge cases that real users produce
- Finance asks engineering "why did the AI bill triple?" and engineering cannot answer because per-feature cost attribution does not exist

**The Fix:**

- **Pattern 71 (Runtime Cost Gating)** — per-session, per-task, and per-user token budgets with hard limits and graceful degradation
- **Pattern 46 (Model Routing)** — route simple tasks to cheaper models, reserve expensive models for complex tasks
- **Pattern 47 (Semantic Caching)** — cache responses for semantically similar queries to avoid redundant API calls
- **Pattern 78 (Tool Result Budget)** — cap the size of tool results to prevent context bloat
- **Pattern 68 (Reactive Context Compaction)** — automatically compress context before it hits window limits

**The cost attribution imperative:** Every agent session should have a cost tag. Every tool call should have a cost tag. Every user should have a cumulative cost. Without attribution, cost optimization is guesswork. With attribution, you can identify the 5% of sessions that generate 80% of cost and target your optimization precisely. Pattern 53 (Observability) is not just for debugging — it is for financial planning.

**Design Principle Connection:**

- **Principle 15: Establish Guardrails to Prevent Misuse** — cost guardrails are as important as safety guardrails. Unbounded spending is a form of system misuse, even when unintentional.
- **Principle 14: Design Beyond Immediate Utility Toward Societal Impact** — unsustainable cost structures limit who can access and benefit from the system. If only well-funded teams can afford to run agents reliably, the technology's impact is artificially constrained.

**Real-World Signal:**

> "Technology is 'the externalization of our thoughts' — 'a story we tell the universe about who we are.'" If your cost structure tells the universe "we did not think about sustainability," the universe responds with an invoice. Infrastructure is a design decision, and cost architecture is infrastructure.
>
> — Ken Liu, "50 Things Every AI Working with Humans Should Know" (2024)

---

### 13. Permission Theater

**One-liner:** The system asks for permission but does not meaningfully respect the answer — permissions are requested but not enforced, denied actions are retried with different framing, or the "deny" path is broken.

**The Trap:**

Permission systems are often built for compliance, not for function. The agent asks "Can I access your calendar?" and the user clicks "Allow." But the permission check is a UI element, not an enforcement mechanism. The agent also accesses email, contacts, and files because the underlying API token grants broad access regardless of what the user approved in the UI. The more insidious version: the agent respects "deny" for the current request but re-asks on the next request, and the next, until the user grants permission out of fatigue. The permission dialog exists to make the team feel responsible, not to give the user actual control.

**What It Looks Like:**

- The agent accesses resources the user did not explicitly authorize
- Permission dialogs use vague language: "Allow the agent to help you" (help how? with what?)
- Denied permissions are re-requested within the same session or on the next session
- There is no audit log of what the agent actually accessed versus what was authorized
- The "Deny" option produces a degraded experience that nudges users toward "Allow"
- Backend permissions are broader than what the UI communicates
- Security audits reveal that the OAuth tokens used by the agent have broader scope than any user-facing permission dialog communicates
- When a user revokes a permission, the agent degrades gracefully in the UI but continues to access the resource through cached tokens until they expire

**The Fix:**

- **Pattern 64 (Multi-Layer Permission Architecture)** — permissions enforced at multiple layers (UI, API, infrastructure) so no single bypass grants full access
- **Pattern 70 (Denial Tracking & Permission Escalation)** — track denied permissions, respect them persistently, and require explicit re-authorization rather than re-asking
- **Pattern 62 (Execution Hooks)** — intercept all resource access at runtime and verify against the actual permission set, not just the initial grant
- **Pattern 77 (Hook System)** — shell-executed interceptors that enforce permissions at the infrastructure level, independent of application code

**The test:** Ask your security team to audit what the agent actually accesses versus what users believe they authorized. If there is a gap — and there usually is — the permission system is theater. The fix is enforcement at the infrastructure layer (Patterns 64, 77), not more UI dialogs.

**Design Principle Connection:**

- **Principle 11: Design Consent as Continuous, Not Binary** — consent is not a checkbox at installation. It is an ongoing negotiation that the system must respect persistently.
- **Principle 16: Make Power Legible in Infrastructure** — if the infrastructure grants broader access than the UI communicates, the power structure is illegible. Users consent to what they see, not what happens behind the UI.
- **Principle 17: Design Exit as Sacred Right** — permission denial is a form of partial exit. If denial is not respected, exit is performative, not real.

**Real-World Signal:**

> Malleable software restores user agency. Users should be able to modify the tools they use — not as developers, but as users exercising control over their own environment. Applied to permissions: if the user says "no," the system's job is to work within that boundary, not to find a way around it.
>
> — Geoffrey Litt, Ink & Switch (2025)

---

### 14. Trust Cliff

**One-liner:** The system offers binary trust — fully autonomous or fully manual — instead of graduated autonomy that builds confidence through demonstrated competence.

**The Trap:**

Binary trust is simpler to implement. The agent is either "on" (takes actions autonomously) or "off" (requires approval for everything). Teams ship binary trust because graduated autonomy requires tracking competence per task type, adjusting autonomy levels based on performance history, and building UI for fine-grained control. When the agent is "on," users experience Automation Surprise (anti-pattern #8) and lose trust. They switch it "off," and the agent becomes a verbose approval machine that requires confirmation for every trivial action. Neither mode is usable. Users want the agent to handle routine tasks autonomously while confirming unusual or high-stakes actions — but the system does not distinguish between routine and unusual.

The Trust Cliff also has a temporal dimension. A new user should start with low autonomy and earn higher autonomy as the agent demonstrates competence. A returning user with a track record should not be reset to zero. But binary trust has no concept of history — it is always now, never "based on what happened last time."

**What It Looks Like:**

- Settings page has a single toggle: "Enable AI Assistant" or "Allow autonomous actions"
- Users toggle the agent off after one bad experience, losing all the value of automation
- When enabled, the agent takes actions on everything — trivial and critical alike — with no differentiation
- When set to "ask for everything," users suffer confirmation fatigue and approve actions without reading them
- No mechanism exists for the agent to earn more autonomy through demonstrated competence
- The team debates "how much autonomy" as if it were a single setting rather than a per-task spectrum
- After a trust-breaking incident, user engagement drops sharply and does not recover — the cliff has no stairs back up
- New users are given the same autonomy level as established users because the system has no concept of trust history

**The Fix:**

- **Pattern 64 (Multi-Layer Permission Architecture)** — different autonomy levels for different action types, enforced at multiple layers
- **Pattern 70 (Denial Tracking & Permission Escalation)** — agent autonomy adjusts based on demonstrated competence and user feedback
- **UX Pattern P2 (Autonomy Dial)** — progressive authorization UI that lets users grant autonomy incrementally per task type
- **UX Pattern P1 (Intent Preview)** — show plans before execution for actions where the agent has not yet earned full autonomy

**Design Principle Connection:**

- **Principle 12: Negotiate Agency Moment-by-Moment** — agency is not a setting, it is a negotiation. Different tasks warrant different autonomy levels, and those levels should change based on context and track record.
- **Principle 11: Design Consent as Continuous, Not Binary** — binary consent produces binary trust. Continuous consent enables graduated trust.
- **Principle 15: Establish Guardrails to Prevent Misuse** — guardrails should be tighter for unproven capabilities and looser for demonstrated ones. Static guardrails produce either the Trust Cliff or no guardrails at all.

**Real-World Signal:**

> "Radically Adaptive" is the genuinely new capability. Interfaces that "conceive and compile the experience in real time based on intent and context." Trust should be radically adaptive too — not a binary switch but a continuous surface that responds to demonstrated competence, task stakes, and user comfort.
>
> — Josh Clark & Veronika Kindred, Sentient Design (Big Medium, 2026)

---

## Quick Diagnostic: How Many Apply to Your System?

Score your system honestly. Each "yes" is a signal, not a verdict.

**Architecture:**
- [ ] Your agent has a single system prompt that exceeds 8,000 tokens
- [ ] You have no max-iteration limit on your agent loop
- [ ] Your average prompt includes more than 15,000 tokens of context
- [ ] Users have no persistent memory between sessions
- [ ] The agent has no verification step between generating output and presenting it to the user

**UX:**
- [ ] Agent-recommended actions disproportionately benefit business metrics over user outcomes
- [ ] Users cannot ask "why did you do that?" and receive a real answer
- [ ] The agent has taken an action that surprised a user in the last 30 days
- [ ] The agent has never responded with "I'd suggest a different approach"
- [ ] Your primary interface is an empty text input with no suggested actions

**Operational:**
- [ ] You have no evaluation suite that runs before deployment
- [ ] You do not know your per-session cost distribution (median, p95, p99)
- [ ] Your permission system has not been audited for enforcement (not just UI)
- [ ] Your agent has exactly two modes: fully autonomous or fully manual

**Scoring:**

- **0-2:** You are ahead of most teams. Focus on the specific anti-patterns you identified.
- **3-5:** Typical for a team six months into production. Prioritize the operational anti-patterns — they compound fastest.
- **6-9:** Significant risk. Start with Pattern 53 (Observability) and Pattern 71 (Cost Gating) — they give you the visibility to fix everything else.
- **10-14:** Stop building features. The system needs structural remediation before new capabilities will be reliable.

Note: scoring 0 likely means you have not looked closely enough. Every production agent system has at least one of these issues. The question is whether you have detected it yet.

---

## Summary Table: Anti-Patterns to Fixes

| # | Anti-Pattern | Category | Primary Fix (Playbook Patterns) | Design Principles |
|---|-------------|----------|--------------------------------|-------------------|
| 1 | **The God Agent** | Architecture | P36 (Workflows), P37 (Agent-as-Tool), P43 (Sub-Agent), P75 (Coordinator-Worker) | 9, 12 |
| 2 | **Infinite Loop of Doom** | Architecture | P9 (ReAct), P12 (Self-Refine), P50 (Guardrails), P62 (Hooks), P71 (Cost Gating) | 10, 15 |
| 3 | **Context Stuffing** | Architecture | P6 (Context Engineering), P7 (Compaction), P8 (Progressive Disclosure), P68 (Reactive Compaction), P78 (Tool Result Budget) | 2, 8 |
| 4 | **Amnesia Agent** | Architecture | P23 (Working Memory), P24 (Semantic Recall), P25 (AUDN), P26 (MemGPT), P69 (Hierarchical Memory) | 1, 7 |
| 5 | **The Hallucination Factory** | Architecture | P13 (CRITIC), P16 (Self-Consistency), P31 (CRAG), P32 (Self-RAG), P54 (Golden Dataset), P55 (LLM-as-Judge) | 3, 5, 10 |
| 6 | **Agentic Sludge** | UX | P50 (Guardrails), P52 (Constitutional AI), P53 (Observability) | 13, 16, 17 |
| 7 | **The Black Box** | UX | P21 (ACI Design), P53 (Observability), UX-P3 (Explainable Rationale), UX-P4 (Confidence Signal) | 3, 10, 13 |
| 8 | **Automation Surprise** | UX | P20 (Suspend/Resume), P64 (Permissions), P70 (Denial Tracking), UX-P1 (Intent Preview), UX-P5 (Action Audit) | 11, 12, 15 |
| 9 | **Sycophancy Spiral** | UX | P10 (Reflexion), P13 (CRITIC), P52 (Constitutional AI) | 1, 2, 9 |
| 10 | **The Blank Prompt Trap** | UX | P8 (Progressive Disclosure), P21 (ACI Design), P74 (Skills System), UX-P2 (Autonomy Dial) | 6, 8, 10 |
| 11 | **Ship and Pray** | Operational | P45 (Fallback Chains), P53 (Observability), P54 (Golden Dataset), P55 (LLM-as-Judge), P58 (Circuit Breaker) | 13, 15 |
| 12 | **The Runaway Bill** | Operational | P46 (Model Routing), P47 (Semantic Caching), P68 (Reactive Compaction), P71 (Cost Gating), P78 (Tool Result Budget) | 14, 15 |
| 13 | **Permission Theater** | Operational | P62 (Hooks), P64 (Permissions), P70 (Denial Tracking), P77 (Hook System) | 11, 16, 17 |
| 14 | **Trust Cliff** | Operational | P64 (Permissions), P70 (Denial Tracking), UX-P1 (Intent Preview), UX-P2 (Autonomy Dial) | 11, 12, 15 |

---

## Anti-Pattern Interaction Map

Anti-patterns rarely occur in isolation. They reinforce each other:

- **The God Agent** leads to **Context Stuffing** (one agent needs all context) and **The Runaway Bill** (one agent does everything, expensively)
- **Ship and Pray** enables **The Hallucination Factory** (no evals means no detection) and **The Runaway Bill** (no monitoring means no cost awareness)
- **The Trust Cliff** leads to either **Automation Surprise** (too much autonomy) or abandonment (too little)
- **The Blank Prompt Trap** leads to **Sycophancy Spiral** (users who do not know what to ask get agreement instead of guidance)
- **Permission Theater** enables **Agentic Sludge** (if permissions are not enforced, business-aligned defaults go unchecked)

When diagnosing your system, look for clusters. A single anti-pattern is a fix. A cluster is a refactoring.

---

## Pattern Coverage Analysis

The 14 anti-patterns reference **35 distinct playbook patterns** (out of 78) and **all 17 design principles**. This is not coincidental — the patterns were designed to address these failure modes.

**Most-referenced playbook patterns:**
- Pattern 53 (Observability Span Hierarchy) — referenced by 4 anti-patterns
- Pattern 50 (Guardrail-as-Processor) — referenced by 3 anti-patterns
- Pattern 64 (Multi-Layer Permission Architecture) — referenced by 4 anti-patterns
- Pattern 70 (Denial Tracking & Permission Escalation) — referenced by 4 anti-patterns
- Pattern 71 (Runtime Cost Gating) — referenced by 2 anti-patterns

**Most-referenced design principles:**
- Principle 15 (Establish Guardrails) — referenced by 6 anti-patterns
- Principle 10 (Communicate Limitations) — referenced by 4 anti-patterns
- Principle 11 (Consent as Continuous) — referenced by 3 anti-patterns
- Principle 12 (Negotiate Agency) — referenced by 3 anti-patterns
- Principle 13 (Make Accountability Visible) — referenced by 4 anti-patterns

The clustering is informative. Observability, permissions, and guardrails are the most cross-cutting concerns. If your system lacks these three capabilities, it is vulnerable to the majority of anti-patterns in this document.

**The Three Pillars of Anti-Pattern Prevention:**

1. **Observability** (Pattern 53) — you cannot fix what you cannot see. Observability prevents Ship and Pray, enables cost attribution (Runaway Bill), and provides the data for sludge audits and permission audits.

2. **Permissions** (Pattern 64) — graduated, enforced, and audited. Permissions prevent Automation Surprise, Permission Theater, and the Trust Cliff. They are the mechanism through which Principle 11 (Continuous Consent) and Principle 12 (Agency Negotiation) are implemented.

3. **Guardrails** (Pattern 50) — active constraints, not passive suggestions. Guardrails prevent the Infinite Loop, catch the Hallucination Factory, and enforce cost limits. They are the implementation layer for Principle 15 (Establish Guardrails).

If you build nothing else from this document, build these three. They are the foundation on which every other fix depends.

---

## Sources & Attribution

This document synthesizes failure modes observed across production AI agent systems and maps them to the patterns and principles documented in the companion files:

- **AI Agent Architecture Patterns Playbook** (78 patterns) — `AI_AGENT_PATTERNS_PLAYBOOK.md`
- **AI Design Principles & UX Patterns for Agentic Systems** (17 principles, 7 UX patterns) — `AI_DESIGN_PRINCIPLES.md`
- **AI-First Product Build Guide** — `AI_FIRST_BUILD_GUIDE.md`

**Practitioner voices referenced:**

| Voice | Affiliation | Contribution |
|-------|------------|-------------|
| Dan Saffer | CMU UI for AI Lab | Non-human metaphors, interaction design |
| Erika Hall | Mule Design | Evidence-based design, intent-first thinking |
| Maggie Appleton | — | Sycophancy critique, critical thinking partnerships |
| Vitaly Friedman | Smashing Magazine | AI loop design, interface patterns |
| Amelia Wattenberger | Augment Code | Multi-modal interfaces, beyond-text design |
| Charles Waite | — | Responsible AI use, creative process boundaries |
| Cyd Harrell | City & County of San Francisco | High-stakes contexts, government AI systems |
| Doug Cook | thirteen23 | Prompt-box paradox, intelligence design primitives |
| Fiona Burns | — | Transparency pillars, explainability frameworks |
| Josh Clark & Veronika Kindred | Big Medium | Sentient design, radically adaptive interfaces |
| Geoffrey Litt | Ink & Switch | Malleable software, user agency |
| Ken Liu | — | Technology as externalized thought, societal impact |

---

---

## Where to Start

If you have identified multiple anti-patterns in your system, do not try to fix them all at once. The following sequence addresses the highest-leverage issues first:

**Week 1 — Visibility:** Implement Pattern 53 (Observability). You cannot fix what you cannot see. Structured logging of agent decisions, tool calls, and costs gives you the data to prioritize everything else.

**Week 2 — Guardrails:** Implement Pattern 71 (Cost Gating) and Pattern 50 (Guardrails). Hard limits on token spend and iteration count prevent the catastrophic tail — the $10K bill, the infinite loop, the context explosion.

**Week 3 — Evaluation:** Implement Pattern 54 (Golden Dataset). Build a baseline of known-correct answers so you can measure whether changes improve or degrade quality. Without this, every subsequent change is a guess.

**Week 4 — Permissions:** Implement Pattern 64 (Multi-Layer Permissions) and Pattern 70 (Denial Tracking). Move from binary trust to graduated autonomy. This addresses the Trust Cliff, Permission Theater, and Automation Surprise simultaneously.

**Ongoing — Decomposition and Memory:** Address the God Agent (Pattern 75, Coordinator-Worker) and the Amnesia Agent (Pattern 23, Working Memory) as part of regular architecture evolution. These are structural changes that improve every other aspect of the system.

**Continuous — UX Trust Building:** Address the Sycophancy Spiral (Pattern 52, Constitutional AI), the Black Box (Pattern 53 + UX Pattern P3), and the Blank Prompt Trap (Pattern 74, Skills System) through iterative UX improvements. Trust is not built in a sprint — it is built through consistent, predictable behavior over time.

The anti-patterns in this document are not permanent conditions. They are waypoints on the path to production-grade agent systems. Every team passes through them. The difference between teams that ship reliable agents and teams that revert to traditional software is whether they recognize the anti-patterns and apply the fixes.

---

*This document is a living reference. As new failure modes emerge in production agent systems, they will be added with corresponding pattern fixes and principle connections.*
