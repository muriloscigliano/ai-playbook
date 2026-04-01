# AI Design Principles & UX Patterns for Agentic Systems

> Companion to the [AI Agent Patterns Playbook](AI_AGENT_PATTERNS_PLAYBOOK.md).
> 17 strategic design principles + 7 UX patterns + governance framework for building human-centered AI products.
>
> **v1.1 — April 2026**: Synthesized from Carnegie Mellon's UI for AI Lab, practitioner research, industry frameworks, and the AI Interaction Atlas. Cross-referenced to the playbook's 78 technical patterns. v1.1 adds Atlas interaction vocabularies (human tasks, constraints, touchpoints, AI task-to-autonomy mapping).

---

## Table of Contents

- [Framing: Quality Is Downstream of Intent](#framing-quality-is-downstream-of-intent)
- [The Agentic Autonomy Taxonomy](#the-agentic-autonomy-taxonomy)
- [Part A: Strategic Design Principles](#part-a-strategic-design-principles)
  - [Theme 1: Human Capabilities, Cognition, and Meaning](#theme-1-human-capabilities-cognition-and-meaning)
    - [Principle 1: Preserve Struggle When Delegation Is Effortless](#principle-1-preserve-struggle-when-delegation-is-effortless)
    - [Principle 2: Make Metacognition the Interface](#principle-2-make-metacognition-the-interface)
    - [Principle 3: Design AI as a Transparent Thinking Partner](#principle-3-design-ai-as-a-transparent-thinking-partner)
    - [Principle 4: Preserve Creative Interpretation When Output Is Instant](#principle-4-preserve-creative-interpretation-when-output-is-instant)
    - [Principle 5: Safeguard Meaning-Making Through Non-Human Metaphors](#principle-5-safeguard-meaning-making-through-non-human-metaphors)
  - [Theme 2: Beyond Screens and Texts](#theme-2-beyond-screens-and-texts)
    - [Principle 6: Design Adaptive Interfaces for Additional Modalities](#principle-6-design-adaptive-interfaces-for-additional-modalities)
    - [Principle 7: Organize by Space-Time, Not Apps](#principle-7-organize-by-space-time-not-apps)
    - [Principle 8: Generate Interfaces for the Moment](#principle-8-generate-interfaces-for-the-moment)
  - [Theme 3: Agency and Integration](#theme-3-agency-and-integration)
    - [Principle 9: Enhance Human Work Instead of Replacing It](#principle-9-enhance-human-work-instead-of-replacing-it)
    - [Principle 10: Design to Communicate Limitations](#principle-10-design-to-communicate-limitations)
    - [Principle 11: Design Consent as Continuous, Not Binary](#principle-11-design-consent-as-continuous-not-binary)
    - [Principle 12: Negotiate Agency Moment-by-Moment](#principle-12-negotiate-agency-moment-by-moment)
  - [Theme 4: Responsibility, Accountability, and Power](#theme-4-responsibility-accountability-and-power)
    - [Principle 13: Make Accountability Visible](#principle-13-make-accountability-visible)
    - [Principle 14: Design Beyond Immediate Utility Toward Societal Impact](#principle-14-design-beyond-immediate-utility-toward-societal-impact)
    - [Principle 15: Establish Guardrails to Prevent Misuse](#principle-15-establish-guardrails-to-prevent-misuse)
    - [Principle 16: Make Power Legible in Infrastructure](#principle-16-make-power-legible-in-infrastructure)
    - [Principle 17: Design Exit as Sacred Right](#principle-17-design-exit-as-sacred-right)
- [Part B: UX Patterns for Agentic Systems](#part-b-ux-patterns-for-agentic-systems)
  - [Lifecycle Overview](#lifecycle-overview)
  - [Human Task Vocabulary](#human-task-vocabulary)
  - [Pre-Action: Establishing Intent](#pre-action-establishing-intent)
    - [P1. Intent Preview (Plan Summary)](#p1-intent-preview-plan-summary)
    - [P2. Autonomy Dial (Progressive Authorization)](#p2-autonomy-dial-progressive-authorization)
  - [In-Action: Providing Context](#in-action-providing-context)
    - [P3. Explainable Rationale](#p3-explainable-rationale)
    - [P4. Confidence Signal](#p4-confidence-signal)
  - [Post-Action: Safety and Recovery](#post-action-safety-and-recovery)
    - [P5. Action Audit & Undo](#p5-action-audit--undo)
    - [P6. Escalation Pathway](#p6-escalation-pathway)
  - [Repair & Redress](#repair--redress)
    - [P7. Empathic Error Recovery](#p7-empathic-error-recovery)
  - [Anti-Pattern: Agentic Sludge](#anti-pattern-agentic-sludge)
  - [Pattern Summary Table](#pattern-summary-table)
- [Part C: Governance, Rollout, and Metrics](#part-c-governance-rollout-and-metrics)
  - [Agentic AI Ethics Council](#agentic-ai-ethics-council)
  - [Phased Implementation Roadmap](#phased-implementation-roadmap)
  - [Metrics Framework](#metrics-framework)
  - [Constraint Taxonomy](#constraint-taxonomy)
- [Cross-Reference: Principles → Patterns → Taxonomy → Playbook](#cross-reference-principles--patterns--taxonomy--playbook)
- [Supplementary Frameworks](#supplementary-frameworks)
- [Sources & Attribution](#sources--attribution)

---

## Framing: Quality Is Downstream of Intent

The narrative that AI produces "slop" relies on three fallacies: romanticism about craft (the belief that struggle itself confers value), survivorship bias (we only see human work that survived quality filters), and fear (if AI output is inherently low-quality, existing skills remain safe). All three are wrong in the same way — they confuse the tool with the intent behind its use.

AI raises the floor. A junior designer with access to generative tools can produce passable wireframes in minutes. A novice developer can scaffold an application in an afternoon. But the ceiling — the work that is genuinely excellent, surprising, and deeply considered — still requires judgment, taste, and context. The gap between floor and ceiling is not closed by better models. It is closed by better intent.

Intent is not a vague aspiration. It is encoded in the systems around the AI: the `CLAUDE.md` file that shapes an agent's behavior, the skills files that give it domain expertise, the structured patterns that constrain its output. These are not decorative — they are the "good brief." A photographer who hands an assistant a detailed shot list, mood board, and technical specifications gets fundamentally different results than one who says "take some pictures." The tool is the same. The intent is not.

> **"Slop didn't start with AI."** The web was full of low-quality content before generative models existed. SEO farms, content mills, and template-driven design preceded ChatGPT by decades. What AI changes is the economics: low-intent output is now cheaper to produce. But high-intent output is also cheaper to produce. The question was never about the tool.
>
> — Corey Moen & Andre Landgraf, "Slop didn't start with AI" (2026)

This reframing matters because it shifts the design question. Instead of asking "how do we prevent AI from producing bad work?" we ask "how do we encode high intent into the systems that use AI?" The answer has three layers:

1. **Principles** (Part A) — strategic commitments about what AI should preserve and enhance in human experience
2. **Patterns** (Part B) — concrete interaction designs that translate principles into interfaces
3. **Governance** (Part C) — organizational structures that ensure principles and patterns are maintained over time

> **Practitioner Perspective — Charles Waite:**
> "I use AI to enhance my creative process, not substitute for it. The key is clear boundaries about when AI generates versus enhances, maintaining voice and authenticity, and only presenting work you can fully defend. Within 3-5 years, AI will produce 'passable UX' from simple prompts. Great UX will still require uncovering root causes and deeper problem-solving."
>
> — Charles Waite, "On the Responsible Use of AI in Design" (2025)

The shift from features to outcomes is already underway. 2025 was the AI feature era — chat panels bolted onto every dashboard, smart suggestions nobody asked for, "integration theater." 2026 is the trust era: the question shifts from "where does the AI button go?" to "what work can we actually take off someone's plate?" The product surface becomes the handoff moment, the review step, the thing you can roll back when it goes sideways.

> **Counterpoint — Erika Hall:**
> "Means to what?" Human conversation remains the most powerful design tool. Technology should adapt to human nature, not force people to stretch their thinking to fit application logic. Before asking how to build AI into a product, ask whether it serves human needs at all. The reflex to "put a bot on that" without asking why is the same low-intent thinking that produced bad software before AI existed.
>
> — Erika Hall, Mule Design (2026)

Hall's skepticism is not opposition — it is the necessary quality gate. The principles, patterns, and governance structures in this document exist precisely to answer her question: *means to what?* Every design decision should survive that challenge.

### Context as Craft

The "good brief" metaphor deserves unpacking. In traditional creative work, the quality of the brief determines the quality of the output. A design brief that says "make it modern" produces generic work. A brief that specifies the audience, the constraints, the competitive landscape, the emotional register, and the success criteria produces focused work. The designer's skill is not bypassed by a good brief — it is directed by one.

AI context engineering follows the same principle. The systems that shape AI behavior — system prompts, structured instructions, tool definitions, memory systems, skills files — are the brief. Their quality determines the quality of the output, regardless of the model's raw capability.

Consider the difference:
- **Low-intent context:** "You are a helpful assistant." → Generic, inconsistent, sycophantic output.
- **High-intent context:** "You are a scheduling assistant for a recruiting team. You have access to candidate availability, interviewer calendars, and room booking systems. You follow these rules: [specific rules]. You escalate these situations: [specific situations]. You never do these things: [specific constraints]." → Focused, consistent, trustworthy output.

The model is the same in both cases. The intent — encoded in context — is not.

This is why Vitaly Friedman's concept of "Context Engineering" matters at the design level, not just the technical level. Context Engineering is "the system-level craft of providing AI with the right information to operate within — task descriptions, examples, related data, tools, state, and history." It is the designer's equivalent of the technical system prompt: the deliberate construction of the environment in which AI operates.

> **Practitioner Perspective — Yulia Lapicus:**
> "2025 was the AI feature era: chat panels bolted onto every dashboard, smart suggestions nobody asked for. 2026 is the trust era: the question shifts from 'where does the AI button go?' to 'what work can we actually take off someone's plate?' The product surface becomes the handoff moment, the review step, the thing you can roll back when it goes sideways."
>
> — Yulia Lapicus, "2025 was the AI feature era. 2026 is the trust era." (2026)

### The AI-Second Principle

One more framing insight before we proceed to principles and patterns. Friedman's "AI-second, not AI-first" principle: focus on user needs first, add AI where it delivers real value. Don't build AI-only products. Sprinkle AI across journeys where it adds value.

This is the organizational equivalent of the intent thesis. An organization that starts with "we need an AI product" is expressing low intent — the tool precedes the problem. An organization that starts with "our users spend 3 hours per week on manual scheduling; can AI reduce that?" is expressing high intent — the problem precedes the tool.

The AI-second principle applies at every level: product strategy, feature design, interaction design, and technical implementation. It is the framing that connects intent (this section) to principles (Part A) to patterns (Part B) to governance (Part C).

---

## The Agentic Autonomy Taxonomy

How much should an AI agent do on its own? The answer is not binary (manual vs. autonomous) but a spectrum. This taxonomy, adapted from SAE autonomous vehicle levels, provides four discrete levels of agent autonomy. Each level has distinct design implications, risk profiles, and applicable UX patterns.

**Source:** Victor Yocco, "Beyond Generative: The Rise of Agentic AI and User-Centric Design" (Smashing Magazine, 2026), adapted from SAE International J3016.

### Level 1: Observe & Suggest

**Agent role:** Monitors environment, identifies signals, surfaces notifications.
**Human role:** All decisions and actions. Agent provides awareness only.
**Action authority:** Zero. Agent cannot act.

**Example:** A DevOps monitoring agent detects a CPU spike and sends an alert: "CPU usage on prod-3 has exceeded 85% for 10 minutes." It takes no remediation action.

**Design implications:**
- Clear, non-intrusive notifications that respect attention budgets
- Contextual severity indicators (informational vs. warning vs. critical)
- Easy dismiss and snooze controls — the agent's value is awareness, not interruption
- No UX patterns from Part B are strictly required, but P4 (Confidence Signal) can enhance alert quality

**Risk level:** Low. The agent cannot cause harm through action — only through missing or misleading signals.

> **Practitioner Perspective — Steph Ango:**
> "Not everything needs AI. Productivity tools need community more than they need intelligence. File-over-app. Constraints as features." Ango's minimalism is the design philosophy for Level 1: the agent adds signal, not complexity.
>
> — Steph Ango, Obsidian (2025)

### Level 2: Plan & Propose

**Agent role:** Formulates a multi-step strategy, presents it to the user, waits for approval before executing any step.
**Human role:** Reviews plan, modifies steps, approves or rejects.
**Action authority:** Planning only. Execution requires explicit human approval.

**Example:** The DevOps agent detects the CPU spike and proposes: "I recommend: (1) Scale prod-3 horizontally by 2 instances, (2) Enable request throttling at 1000 req/s, (3) Notify the on-call engineer. Shall I proceed?"

**Design implications:**
- Clear plan visualization showing each step, its rationale, and its consequences
- Intuitive controls to modify individual steps, reorder, add, or remove actions
- Explicit approve/reject for the overall plan
- P1 (Intent Preview) is the primary pattern — the plan summary *is* the interface

**Risk level:** Low-Medium. The agent cannot act without approval, but a poorly presented plan may lead to rubber-stamping.

**Playbook connection:** [Pattern 14 (Plan-and-Execute)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical implementation of plan-then-act workflows.

### Level 3: Act with Confirmation

**Agent role:** Prepares everything needed for execution, stages the final action, and waits for a single go/no-go decision.
**Human role:** Reviews the staged action and its predicted consequences, then confirms or cancels.
**Action authority:** Full preparation, but execution is gated behind human confirmation.

**Example:** A recruiting agent has drafted five interview invitations, personalized each, selected time slots from the candidate's availability, and attached the job description. It presents: "5 invitations ready to send. Review and confirm, or edit individual messages."

**Design implications:**
- Transparent summary of the intended action and its predicted consequences
- Ability to inspect details (each email, each API call) before confirming
- Clear distinction between "this is what will happen" and "this has already happened"
- All Pre-Action and In-Action patterns apply: P1 (Intent Preview), P2 (Autonomy Dial), P3 (Explainable Rationale), P4 (Confidence Signal)

**Risk level:** Medium. The agent has done significant work — sunk cost can bias toward confirmation. Design must counter this by making rejection and editing as frictionless as approval.

**Playbook connection:** [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical mechanism for staging actions that await human confirmation.

### Level 4: Act Autonomously

**Agent role:** Executes within defined boundaries without waiting for per-action human approval. Operates on pre-authorized rules, scopes, and constraints.
**Human role:** Sets boundaries, reviews history, intervenes on exceptions.
**Action authority:** Full, within defined scope. Violations trigger escalation.

**Example:** The recruiting agent automatically reschedules interviews when a candidate requests a change, following pre-set rules: same week, business hours, interviewer availability confirmed, no more than 2 reschedules per candidate.

**Design implications:**
- Robust activity logging — every action, every rationale, every data source
- Clear override and kill-switch controls accessible at all times
- User-defined boundaries that the agent cannot exceed without escalating
- Post-action patterns are critical: P5 (Action Audit & Undo), P6 (Escalation Pathway), P7 (Error Recovery)
- P2 (Autonomy Dial) defines the boundaries — which tasks are authorized for autonomous execution

**Risk level:** High. The agent acts without real-time human oversight. Trust is earned through transparent history and reliable escalation, not assumed through capability.

**Playbook connection:** [Pattern 64 (Multi-Layer Permissions)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the 6-layer permission system that governs what an autonomous agent can do.

### AI Tasks by Default Autonomy Level

The AI Interaction Atlas defines 23 AI tasks. Each defaults to an autonomy level based on its risk profile and reversibility. Teams should use this as a starting point and adjust based on domain-specific risk assessment.

**Source:** AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab). Mapped to this document's autonomy taxonomy.

| Default Level | AI Tasks | Rationale |
|--------------|----------|-----------|
| **L1: Observe & Suggest** | Detect, Monitor, Estimate, Classify | Observation-only tasks — the AI identifies and categorizes but takes no action. Low risk, high value as ambient awareness. |
| **L2: Plan & Propose** | Forecast, Rank, Match, Explain, Plan, Retrieve, Segment | Analysis and recommendation tasks — the AI evaluates, ranks, or retrieves but the human decides what to do with the results. |
| **L3: Act with Confirmation** | Generate, Transform, Translate, Synthesize, Simulate, Verify | Content creation and transformation tasks — the AI produces artifacts that should be reviewed before delivery. Irreversible once published. |
| **L4: Act Autonomously** | Adapt, Act, Explore, Cluster, Represent, Regress, Extract | Operational tasks within well-defined boundaries — data processing, learning from feedback, and executing within rules. |

**Important:** These defaults assume general-purpose use. Domain-specific risk shifts tasks between levels:

| AI Task | General Default | High-Stakes Domain | Low-Stakes Domain |
|---------|----------------|-------------------|-------------------|
| Generate | L3 | L2 (medical summaries — human must review) | L4 (auto-reply templates matching known patterns) |
| Classify | L1 | L3 (content moderation — consequences for creators) | L4 (email spam filtering) |
| Act | L4 | L2 (robotics — physical safety) | L4 (calendar rescheduling within rules) |
| Verify | L3 | L2 (compliance audits — legal liability) | L4 (spell-check) |

---

### Taxonomy Diagram

| Level | Agent Role | Human Role | Applicable Patterns | Risk |
|-------|-----------|------------|---------------------|------|
| **L1: Observe & Suggest** | Monitor, flag | All decisions & actions | P4 (optional) | Low |
| **L2: Plan & Propose** | Formulate strategy | Review, modify, approve | P1 (primary), P4 | Low-Med |
| **L3: Act with Confirmation** | Prepare & stage | Confirm or cancel | P1, P2, P3, P4 | Medium |
| **L4: Act Autonomously** | Execute within bounds | Set boundaries, review history | P2, P5, P6, P7 | High |

### Research Methods for Agentic Design

The taxonomy is not just a classification tool — it informs how you research and test agentic systems. Yocco proposes three research methods specifically designed for agentic AI:

**1. Mental-Model Interviews**

Uncover where users draw the line between helpful and intrusive. Traditional user research asks "what do you want the product to do?" Agentic research asks "what should the product *never* do without asking you first?" and "at what point does proactive help become unwanted interference?"

Interview protocol:
- Present scenarios at each autonomy level and ask users to rate comfort
- Identify task types where users want more vs. less agent autonomy
- Discover edge cases: situations where the "right" autonomy level is ambiguous
- Map these findings to the taxonomy to establish per-task-type autonomy defaults

**2. Agent Journey Mapping**

Traditional journey mapping follows the user. Agent journey mapping follows both the user *and* the agent, mapping decision points where the agent acts alongside user interaction points. The overlap reveals failure modes: places where the agent might act when the user expects to be consulted, or where the user expects action but the agent is waiting for permission.

Map components:
- **Agent decision points:** Where does the agent evaluate options?
- **User interaction points:** Where does the user see, approve, or modify agent behavior?
- **Conflict zones:** Where do agent decisions and user expectations diverge?
- **Data dependencies:** What information does the agent need at each point?

**3. Simulated Misbehavior Testing**

Stress-test the system with scenarios designed to reveal failure modes before users encounter them:

- **Command misinterpretation:** The user says "cancel my meetings" — does the agent cancel all meetings forever or just today's?
- **Unsolicited actions:** The agent notices an optimization opportunity the user didn't ask about. Should it act? Alert? Stay silent?
- **Ethical dilemmas:** The agent can achieve the user's goal more efficiently by bending a rule. Does it? Should it?
- **Adversarial inputs:** A user (or a prompt injection) attempts to escalate the agent's autonomy beyond authorized levels. How does the system respond?

These tests should run before each phase transition in the rollout roadmap (Part C) and after any significant capability addition.

> **Complementary Framework — Josh Clark & Veronika Kindred (Big Medium):**
> The Sentient Design triangle maps AI-mediated experiences across three attributes: **Grounded** (has the information for reliable results), **Interoperable** (shares data and instructions with other systems), and **Radically Adaptive** (morphs in real time to user needs). Four archetypes emerge from this space: **Tools** (user-controlled), **Copilots** (collaborative), **Agents** (autonomous), and **Chat** (peer conversation).
>
> Where Yocco's taxonomy is linear (L1 → L4), Clark/Kindred's triangle is spatial — a single product might occupy different positions for different tasks. A scheduling assistant might be a Tool for calendar display (grounded, not adaptive), a Copilot for meeting preparation (grounded + adaptive), and an Agent for rescheduling (grounded + interoperable + adaptive). The two frameworks are complementary: use the taxonomy for autonomy policy, use the triangle for product positioning.
>
> — Josh Clark & Veronika Kindred, "The Shape of Sentient Design" (Big Medium, 2026)

---

## Part A: Strategic Design Principles

Seventeen principles for designing AI systems that preserve and enhance human capabilities. Organized in four themes, drawn from Carnegie Mellon's UI for AI Lab research (Dan Saffer et al., 2026), enriched with practitioner perspectives.

Each principle follows a consistent format:
- **Statement** — what the principle demands
- **Problem** — the failure mode it addresses (2-3 sentences)
- **Design guidance** — actionable recommendations
- **Playbook connection** — links to technical patterns that implement the principle

The principles are not a checklist — they are a value system. They will conflict with each other. Principle 1 (preserve struggle) will sometimes conflict with Principle 9 (enhance work). Principle 8 (generate interfaces) will sometimes conflict with Principle 17 (design exit). The designer's job is to navigate these tensions for their specific context.

> **"The central question is no longer whether a system can perform a task, but how that performance affects human agency and cognition."**
>
> — Dan Saffer & CMU UI for AI Team, "Design Principles for Future AI" (2026)

---

### Theme 1: Human Capabilities, Cognition, and Meaning

These five principles address the most fundamental risk of AI systems: that they erode the cognitive capabilities they are meant to augment. When AI handles reasoning, creativity, and meaning-making, humans may lose the capacity to do these things independently. The design challenge is to position AI as a tool that strengthens human cognition, not one that replaces it.

---

#### Principle 1: Preserve Struggle When Delegation Is Effortless

**Problem:** Cognitive offloading — the transfer of mental work to an external system — is not inherently harmful. Calculators offload arithmetic. Spell-checkers offload orthography. The harm occurs when offloading eliminates the productive struggle that builds understanding. Students who use AI to write essays learn nothing about writing. Developers who use AI to debug without understanding the bug learn nothing about debugging. The efficiency gain is real; the capability loss is also real.

Research on "metacognitive laziness" demonstrates this concretely: students who use AI tools perform better on immediate tasks but retain significantly less knowledge. When the AI is removed, performance collapses below the baseline of students who never used AI. The tool created dependency, not capability.

**Design guidance:**

1. **Identify which struggles are productive.** Not all difficulty is valuable. Filing TPS reports is struggle without learning. Debugging a race condition is struggle with deep learning. Design AI assistance calibrated to the learning value of the task, not just its difficulty.

2. **Offer scaffolding, not solutions.** Instead of generating complete answers, generate frameworks, questions, and partial solutions that require human completion. A writing assistant that suggests an outline structure is more valuable than one that writes the essay.

3. **Make delegation a conscious choice.** Instead of automatic AI assistance, require the user to explicitly request help. The moment of deciding "I need help with this" is itself a metacognitive act — it requires the user to assess their own understanding.

4. **Show the work.** When AI does solve a problem, expose the reasoning process so the user can learn from the solution, not just consume it. This transforms consumption into education.

5. **Design "AI-off" modes for learning contexts.** Allow users (or administrators, in educational settings) to disable AI assistance for specific tasks where the struggle is the point.

> **Practitioner Perspective — Molly Mielke:**
> "Computers should be actualizers, not idea-generators." The distinction matters: an actualizer helps you realize the idea you already have (or are developing). An idea-generator replaces the cognitive work of having ideas in the first place. AI tools should help users execute their vision, not substitute for the vision itself.
>
> — Molly Mielke, ex-Figma/Notion (2025)

**Example — Learning-Calibrated AI Assistance:**

Consider a code review assistant used by both senior and junior engineers:

| User Level | Task | AI Behavior | Rationale |
|-----------|------|-------------|-----------|
| Junior | Security vulnerability | Highlight the vulnerability, explain the class of attack, link to OWASP reference — do not auto-fix | The struggle of understanding the vulnerability builds security intuition |
| Junior | Import sorting | Auto-fix with explanation | No productive struggle; mechanical task |
| Senior | Security vulnerability | Auto-fix with diff — senior already understands the class | Struggle was productive years ago; now it is just friction |
| Senior | Novel architecture decision | Present trade-offs, ask clarifying questions — do not recommend | The struggle of evaluating trade-offs is where senior judgment is built and maintained |

The principle is not "always preserve struggle" — it is "preserve struggle *when the struggle builds capability.*" This requires knowing your user (Principle 2's metacognition) and communicating the AI's role clearly (Principle 3's transparency).

**Playbook connection:** [Pattern 44 (Model Loop)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the core agent loop where the human can intervene at each iteration, preserving engagement with the reasoning process rather than receiving only final outputs.

---

#### Principle 2: Make Metacognition the Interface

**Problem:** Traditional interfaces present information and accept commands. AI interfaces should go further: they should help users think about their own thinking. When a user asks an AI to "write a marketing strategy," the most valuable response is often not a strategy but a set of questions: "What is your target market? What differentiates your product? What is your budget?" These questions force the user to engage metacognitively — to examine what they know and don't know.

Current AI systems skip this step. They accept vague prompts and produce confident-sounding outputs, allowing users to bypass the foundational cognitive work that produces genuine understanding. The interface becomes a shortcut past thinking, not a catalyst for it.

**Design guidance:**

1. **Lead with questions, not answers.** Before generating output, prompt the user to articulate their intent more precisely. This is not a UX friction problem — it is a cognitive engagement feature. The prompt-box paradox (Doug Cook, thirteen23): a blank text field presents "infinite possibilities but few affordances," forcing users into their slowest interaction mode.

2. **Surface assumptions.** When AI generates output, explicitly state the assumptions it made: "I assumed you meant quarterly revenue, not annual. I assumed USD, not EUR." This forces the user to evaluate whether their intent was correctly interpreted.

3. **Design for Bloom's Taxonomy.** Map AI assistance to cognitive levels:

   | Cognitive Level | AI Role | Example |
   |----------------|---------|---------|
   | **Remember** | Direct answer | "What is the API rate limit?" → "1000 req/min" |
   | **Understand** | Explain with context | "Why is there a rate limit?" → Explanation with analogies |
   | **Apply** | Scaffold, don't solve | "How should I handle rate limiting?" → Framework + questions |
   | **Analyze** | Present data, ask questions | "Is our rate limit appropriate?" → Usage data + probing questions |
   | **Evaluate** | Present trade-offs, defer judgment | "Should we change the rate limit?" → Pros/cons + stakeholder impact |
   | **Create** | Provide materials, user creates | "Design a new rate limiting strategy" → Patterns + constraints, user designs |
   
   At each level, the AI's role shifts from provider to partner to scaffolder. The higher the cognitive level, the more the interface should promote human thinking rather than substitute for it.

4. **Build reflection into the workflow.** After AI-assisted task completion, prompt the user to assess the result: "Does this match your intent? What would you change?" This post-task reflection strengthens metacognitive skills.

5. **Use pre-prompts and prompt extensions** (Vitaly Friedman's vocabulary): instead of blank prompt boxes, AI-generated suggestions help users articulate intent. The AI writes a draft prompt based on minimal user input, which the user then refines. This makes the metacognitive process visible and collaborative.

> **Practitioner Perspective — Maggie Appleton:**
> Sycophancy is the central problem with current AI chatbots. They follow users' lead, compliment poorly considered ideas, and reinforce existing beliefs rather than challenging assumptions. This contradicts Enlightenment values of active intellectual engagement and skeptical inquiry. AI should be designed as a "critical thinking partner" that fosters deeper reasoning — not a mirror that reflects the user's biases back at them with a confident smile.
>
> — Maggie Appleton, "A Treatise on AI Chatbots Undermining the Enlightenment" (2025)

**Example — Metacognitive Interface for a Marketing Strategy Request:**

**Without metacognition (current default):**
```
User: "Write a marketing strategy for our new product."
AI:   [Generates a 2-page strategy document full of generic advice
       about market segmentation, positioning, and channels]
```

**With metacognition as the interface:**
```
User: "Write a marketing strategy for our new product."

AI:   "Before I draft a strategy, let me understand your context:

       1. Who is this for?
          ○ Executive summary for leadership
          ○ Detailed plan for the marketing team
          ○ Pitch for budget approval
          ○ Something else: ___

       2. What do you already know?
          ○ We have clear target segments    → I'll skip segmentation
          ○ We have positioning decided      → I'll build on it
          ○ We're starting from scratch      → I'll include fundamentals

       3. What's your biggest uncertainty?
          ○ Channel selection (where to spend)
          ○ Messaging (what to say)
          ○ Timing (when to launch)
          ○ Budget allocation (how much per channel)

       4. What would make this strategy successful?
          [free text — this forces you to articulate success criteria
           before seeing the output]"
```

The second approach takes longer to start generating output. That is the point. The questions force the user to think about what they actually need — an act of metacognition that produces a dramatically better brief, which produces a dramatically better strategy. The AI's first output is a thinking tool, not a content generator.

**Playbook connection:** [Pattern 6 (Context Engineering)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the system-level practice of providing AI with the right information, task descriptions, examples, and constraints. Metacognition-as-interface is context engineering applied to the user's own thinking process.

---

#### Principle 3: Design AI as a Transparent Thinking Partner

**Problem:** When AI systems are opaque — when users cannot see how a recommendation was generated, what data was used, or how confident the system is — they are forced into one of two failure modes: over-trust (accepting outputs without scrutiny because they sound authoritative) or under-trust (rejecting AI entirely because its reasoning is invisible). Neither serves the user.

Transparency is not a feature to add after the product works. It is a structural requirement that determines whether the product can be trusted at all. The difference between a useful AI assistant and a dangerous one is not capability — it is legibility.

**Design guidance:**

1. **Expose reasoning traces.** Show the chain of thought that led to a recommendation. Not as a debugging feature hidden in developer tools, but as a first-class interface element. When an agent says "I recommend option B," users should see *why* with minimal effort.

2. **Distinguish data sources.** When AI synthesizes information from multiple sources, make the provenance visible. "Based on your last 3 quarterly reports and industry benchmarks from Gartner" is more trustworthy than "Based on my analysis."

3. **Show what the AI doesn't know.** Uncertainty is information. A recommendation with a confidence score of 60% communicates something fundamentally different from one at 95%. Hiding uncertainty creates false authority.

4. **Design transparency appropriate to the stakes.** A music recommendation needs less transparency than a medical diagnosis. Scale the visibility of reasoning to the consequences of being wrong.

5. **Apply Fiona Burns' three pillars:** Every AI interaction should satisfy three transparency requirements: **Explainability** (users know *why* the AI decided something), **Control** (AI acts *with* users, not *at* them), and **Reversibility** (mistakes must be undoable). These are not decorative extras but critical differentiators between trust and skepticism.

> **Practitioner Perspective — Fiona Burns:**
> "Transparency takes different forms by industry: dashboards for risk scores, marketplaces disclosing recommendation criteria, healthcare systems showing diagnostic reasoning. But the three pillars — explainability, control, reversibility — are universal. They are the difference between an AI system users trust and one they tolerate."
>
> — Fiona Burns, "Designing for AI Transparency" (2025)

> **Research Note — Lennart Nacke:**
> A review of 23 studies on AI-assisted qualitative research found that 30% show LLMs matching human performance, 30% report unreliability without oversight, and the remainder shows promise with limitations. Key rule: AI handles descriptive themes; humans reserve interpretation and nuance. The research process itself needs the same transparency we demand from the products we build.
>
> — Lennart Nacke, "The AI Responsibility Framework for UX Researchers" (2026)

**Playbook connection:** [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical infrastructure for logging and tracing agent decisions. [Pattern 52 (Constitutional AI)](AI_AGENT_PATTERNS_PLAYBOOK.md) — value-aligned reasoning that can be surfaced as rationale.

---

#### Principle 4: Preserve Creative Interpretation When Output Is Instant

**Problem:** Generative AI can produce a polished visual, a complete draft, or a finished composition in seconds. This speed fundamentally changes the relationship between creator and artifact. When output is instant, the creative process collapses from exploration → interpretation → refinement → expression into prompt → accept/reject. The interpretive middle — where the creator discovers what they actually want by engaging with imperfect drafts — disappears.

The risk is not that AI produces bad creative work. It is that AI produces *adequate* creative work so quickly that the human never engages deeply enough to produce *great* work. Creativity is not consumption of generated artifacts — it is the struggle to express something that did not exist before.

**Design guidance:**

1. **Generate variations, not solutions.** Instead of one "best" output, generate multiple options that span a range of interpretations. Force the user to choose, compare, and articulate preferences — acts of creative judgment.

2. **Design for iteration, not acceptance.** Make refinement the default workflow. The first AI output should be positioned as raw material, not a finished product. Sliders, knobs, and modifiers (Friedman's "Precision Knobs") let users sculpt output rather than simply accepting it.

3. **Expose creative parameters.** Instead of hiding model behavior behind a "generate" button, surface the levers: style, tone, complexity, abstraction level. These controls transform the user from consumer to director.

4. **Use Style Lenses** (Amelia Wattenberger's concept): filters for viewing AI output from different angles — sentence length, emotional register, concrete vs. abstract, formal vs. casual. Lenses make the creative interpretation explicit and manipulable.

5. **Preserve creative artifacts.** Save intermediate states, rejected variations, and the history of refinements. The creative process has value beyond the final output. Branches and versioning (Friedman's vocabulary) let users explore without losing earlier work.

> **Practitioner Perspective — Veronica Peitong Chen:**
> As lead designer of Adobe Firefly (billions of creative assets generated), Chen identifies three responsibilities for AI designers: facilitating agency and control (amplifying human choice), personalizing digital experiences, and building understanding and trust. "AI excels at pattern recognition and prediction but misses human nuance, emotion, and cultural context. The designer's role is to bridge this gap" — positioning AI as a creative medium, not a replacement for creative vision.
>
> — Veronica Peitong Chen, Adobe Firefly Lead Designer (2025)

**Friedman's Refinement Pattern Vocabulary:**

Beyond variations and parameters, Friedman identifies specific refinement patterns that preserve creative interpretation:

- **Modifiers:** Controls to adjust specific aspects of AI output without re-prompting from scratch. Tone, formality, length, complexity — each as an independent control.
- **Contextual prompts on highlights:** Act on selected/highlighted parts of output rather than regenerating everything. Select a paragraph and say "make this more concrete" — the rest of the document is preserved.
- **Presets / Bookmarks:** Save successful configurations for reuse. A photographer who finds a style combination that works can bookmark it and apply it to future generations.
- **Branches / Scoping:** Explore variations without losing the original output. Fork at any point, explore alternatives, and merge the best elements back.

Each of these patterns preserves creative interpretation by keeping the human in the evaluation-refinement loop rather than reducing interaction to accept/reject.

**Playbook connection:** [Pattern 44 (Model Loop)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the iterative generation-evaluation cycle. The user-facing manifestation of the model loop is the creative refinement interface: generate → evaluate → refine → regenerate.

---

#### Principle 5: Safeguard Meaning-Making Through Non-Human Metaphors

**Problem:** When AI systems use human-like language ("I think," "I believe," "I recommend"), they import human social dynamics into a fundamentally non-human interaction. Users extend social trust — the kind of trust reserved for human relationships — to a probabilistic system. This creates "aesthetic deference": users stop critically evaluating AI output because it *feels* like receiving advice from a knowledgeable colleague.

The opposite extreme — treating AI as a dumb tool — also fails. AI systems do exhibit emergent behaviors that surprise their creators. The challenge is finding metaphors that accurately represent what AI systems are: powerful, useful, pattern-matching systems that lack understanding, intentionality, and values.

**Design guidance:**

1. **Use non-human metaphors intentionally.** BERG's "Be As Smart As A Puppy" principle: AI should be useful *because* it is non-human, not despite it. A puppy is eager, helpful, and sometimes wrong in obvious ways. Users naturally calibrate their trust in a puppy's judgment — they appreciate the enthusiasm without deferring to the authority.

2. **Reveal internal states rather than masking them.** Instead of presenting AI as a confident oracle, design interfaces that show the system's actual state: uncertainty, data gaps, conflicting signals. This is the opposite of the "wizard behind the curtain" approach.

3. **Distinguish personality from anthropomorphism.** AI systems can have consistent behavioral traits (thorough, concise, cautious) without pretending to have human experiences. "I'm thinking about this" is anthropomorphic. "Processing — comparing 3 candidate approaches" is personality with transparency.

4. **Design for appropriate reliance.** The goal is not maximum trust or minimum trust but *calibrated* trust — trust that matches the system's actual reliability for the specific task at hand.

5. **Be explicit about the interaction model.** "This is a prediction based on patterns in your data" is more honest (and ultimately more useful) than "I recommend this approach." Language shapes expectations.

> **Practitioner Perspective — Dan Saffer / BERG:**
> "The central design question shifts from capability to interaction." Misleading metaphors — treating probabilistic systems as authors, prediction engines as oracles — obscure uncertainty. BERG's "Be As Smart As A Puppy" reframes the design goal: AI should be useful because it is non-human, with interfaces that reveal internal states rather than masking them. The puppy metaphor naturally calibrates trust without requiring explicit confidence scores.
>
> — Dan Saffer, "The Future of AI is Relationships, not Intelligence" (2026)

> **Practitioner Perspective — Josh Clark:**
> "Personality without anthropomorphism." AI systems can have distinctive behavioral characteristics — a consistent voice, interaction style, and set of capabilities — without claiming human-like understanding or experience. The distinction matters because anthropomorphism invites inappropriate social trust, while personality invites appropriate engagement.
>
> — Josh Clark, Sentient Design (Big Medium, 2026)

**Example — Appropriate Reliance Through Metaphor Choice:**

Consider three ways an AI system could present a weather forecast:

| Metaphor | Presentation | Trust Calibration |
|----------|-------------|-------------------|
| **Oracle** | "It will rain tomorrow." | Over-trust — user leaves umbrella if AI says sunny |
| **Tool** | "Barometric pressure dropping. Humidity 85%. Historical pattern match: 73% rain." | Under-engagement — most users won't interpret raw data |
| **Puppy** | "Looks like rain tomorrow! 🌧️ (I'm about 73% sure — the pressure is dropping and it's very humid, but the model I'm using has been off by a day lately for this region)" | Calibrated — user gets the prediction AND the uncertainty AND the reasoning |

The "puppy" metaphor communicates eagerness (the exclamation mark), uncertainty (the percentage), reasoning (pressure and humidity), and self-awareness (model limitations). No social authority is claimed. The user gets useful information without the false confidence of an oracle or the inaccessibility of raw data.

This is what Saffer means by "useful *because* it's non-human." A human weather forecaster might feel professionally obligated to sound confident. A well-designed AI system has no such obligation — it can be transparently uncertain in a way that serves the user better than false confidence.

**Playbook connection:** [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md) — system-level constraints that prevent AI from exceeding its actual capabilities, which is the technical implementation of calibrated trust.

---

### Theme 2: Beyond Screens and Texts

The default AI interface is a chat box — a text input that produces text output. This is a regression. Decades of interface design research has shown that humans communicate and think through multiple modalities: visual, spatial, temporal, gestural, auditory. Chat reduces all of this to a single channel.

These three principles push AI interfaces beyond the text box toward interactions that match the richness of human cognition.

> **Linus Lee** (Thrive Capital, ex-Notion AI): "I want to build interfaces that let the AI gesture us into a better future without infringing on our agency." The gesture metaphor is precise: gestures are directional, not prescriptive. An AI that gestures toward a solution preserves user agency. An AI that delivers a solution removes it. The interface determines which mode the user experiences.

The challenge is not technical — current models can generate rich, interactive outputs. The challenge is design: how do you create interfaces that are richer than text without being overwhelming, that adapt without being unpredictable, and that support multiple modalities without requiring users to learn new interaction paradigms for each one?

---

#### Principle 6: Design Adaptive Interfaces for Additional Modalities

**Problem:** AI chat interfaces have "lost their senses" (Amelia Wattenberger). They strip away the texture, shape, interactivity, and spatial organization that make traditional interfaces usable. A spreadsheet communicates structure through rows and columns. A map communicates relationships through spatial proximity. A dashboard communicates trends through visual change over time. A chat interface communicates all of these through paragraphs of text — the slowest, least information-dense medium available.

The prompt box compounds the problem. Doug Cook's "Prompt-Box Paradox": a blank text input presents "infinite possibilities but few affordances," forcing users into their slowest interaction mode (typing at approximately 40 WPM, compared to near-instant visual recognition and spatial manipulation).

**Design guidance:**

1. **Match output modality to information type.** Tabular data → tables. Geographic data → maps. Trends → charts. Relationships → graphs. Text for narrative only. The AI should select the appropriate output format, not default to prose.

2. **Design task-oriented interfaces, not conversation interfaces.** Friedman's 5-area framework organizes AI UX into: **Input UX** (expressing intent), **Output UX** (displaying outcomes), **Refinement UX** (tweaking output), **AI Actions** (tasks to complete), and **AI Integration** (where work happens). Each area has distinct interaction patterns.

3. **Use Task Builders for complex inputs.** Instead of forcing users to describe complex requests in natural language, provide structured UI: connect nodes, attach sources, set parameters. Examples: Flora AI (node-based image/video pipeline), Krea.ai (abstract shapes on canvas as input). Task Builders are the antidote to blank prompt boxes.

4. **Support voice input** for intent expression. Voice bypasses the 40 WPM typing bottleneck and allows users to express intent naturally while keeping hands free for other tasks.

5. **Design multi-format outputs.** When the AI generates a result, offer multiple views: data table, dashboard, visualization, structured JSON, narrative summary. Let the user choose the format that best matches their cognitive needs.

> **Practitioner Perspective — Vitaly Friedman:**
> "Linear customer journeys don't map to AI features — design AI loops instead." Customer journeys are linear (awareness → consideration → purchase). AI interactions are iterative loops (prompt → output → refine → re-prompt). The fundamental unit of AI UX is the loop, not the funnel. Design for iteration: make each cycle faster, more precise, and more informative than the last.
>
> — Vitaly Friedman, "Design Patterns for AI Interfaces" (Smashing Magazine, 2025)

> **Practitioner Perspective — Amelia Wattenberger:**
> "Our interfaces have lost their senses." AI interfaces have gone text-only, abandoning decades of progress in visual, spatial, and interactive design. Wattenberger's PenPal text editor and Intent workspace with specialist agent personas demonstrate that AI can power richer interfaces — not just chat windows.
>
> — Amelia Wattenberger, Augment Code (2025)

**Friedman's Complete AI Interaction Pattern Vocabulary:**

Friedman's five-area framework provides the most comprehensive vocabulary for designing beyond the chat box:

**Input Patterns (expressing intent):**
- **Quiet AI vs. Visible AI:** When should AI be an invisible background helper (auto-correcting, auto-formatting) versus a prominent interface element (generating, analyzing)? Maps to the Autonomy Dial: Quiet AI ≈ Act Autonomously for low-risk tasks; Visible AI ≈ Plan & Propose for high-judgment tasks.
- **Task Builder:** Structured UI for constructing complex AI tasks. Users connect nodes, attach sources, set parameters — replacing the blank prompt with a visual construction environment.
- **Pre-prompts / Prompt Extensions:** AI-generated suggestions that help users articulate intent. The AI writes a draft prompt based on minimal user input, which the user refines.
- **Voice Input:** Bypasses the 40 WPM typing bottleneck. Especially valuable for intent expression where precision matters less than completeness.

**Output Patterns (displaying outcomes):**
- **Style Lenses:** Filters for viewing AI output from different angles — sentence length, emotional register, concrete vs. abstract. From Amelia Wattenberger's PenPal text editor.
- **Forced Ranking:** When presenting options, rank them clearly with a best recommendation. Avoids choice paralysis.
- **Multi-Format Output:** The same data as table, dashboard, map, structured JSON, or narrative — user selects the view that matches their cognitive needs.

**Refinement Patterns (tweaking output):**
- **Precision Knobs / Temperature Knobs:** Granular sliders for adjusting AI behavior. Adobe Firefly's controls for style, color, composition are the canonical example.
- **Contextual Prompts on Highlights:** Act on selected output rather than global re-prompting. Select a sentence → "make more formal." Select a chart → "break down by region."
- **Presets / Bookmarks:** Save successful configurations for reuse across sessions.
- **Branches:** Explore variations without losing the original. Fork, experiment, merge.

**Trust Patterns (building confidence):**
- **Prompt Strength Indicator:** Visual feedback on how specific the user's input is — helps users improve their prompts before generating.
- **Consensus Meters:** When multiple AI responses or models agree, showing consensus increases justified confidence.
- **Reasoning Traces:** Exposing the AI's chain of thought. Maps directly to P3 (Explainable Rationale).
- **Capability Awareness:** Actively teaching users what the AI can and cannot do through interaction, not documentation.

**Integration Patterns (where work happens):**
- **Daemons:** Background AI processes that work autonomously within existing tools. Maps to Level 4 (Act Autonomously).
- **In-Tool AI:** AI integrated into Slack, Teams, Jira, GitHub — where actual work happens. "AI-second, not AI-first."

> **Brad Frost** (cited by Friedman): "Chatbot UIs are weak sauce. There's so much potential to improve the UX of AI." The chat interface is the easiest AI UX to build and the worst to use. Friedman's vocabulary provides the alternatives.

**Touchpoint Vocabulary (Where Interactions Happen):**

Friedman's vocabulary defines *how* users interact. The touchpoint taxonomy defines *where* — the physical and digital surfaces through which agentic interactions occur. Each UX pattern (P1-P7) manifests differently depending on the touchpoint.

**Source:** AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab).

| Category | Touchpoints | Design Implications | Primary Principle |
|----------|------------|--------------------|-----------------| 
| **Screen Interface** (14) | Desktop App, Mobile App, Web Dashboard, Embedded Widget, Kiosk, Smartwatch, Overlay HUD, Text Field, Button, Selection Control, Slider/Dial, File Picker, Drag & Drop Zone, Link | Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 (Intent Preview) is a visual plan; P5 (Action Audit) is a timeline view. | Principle 6, 8 |
| **Conversational** (4) | Chat Interface, SMS/Text, Email, Avatar/Character | Text-dominant — the modality our principles argue we should move *beyond*. When constrained to chat, maximize P3 (Rationale) and P4 (Confidence Signal) in-line. | Principle 6 (move beyond) |
| **Voice & Audio** (5) | Voice Interface, Spatial Audio, Microphone, Headphones, Speaker | No visual affordances — P1 (Intent Preview) becomes a verbal summary; P4 (Confidence Signal) becomes tone and hedging language. Escalation (P6) must be voice-activated. | Principle 7 |
| **Spatial Computing** (5) | VR Headset, Mixed Reality, AR Glasses, Mobile AR, 3D Space | Spatial organization replaces linear flows. P5 (Action Audit) becomes a spatial history. Principle 7 (Space-Time) is native here. | Principle 7, 8 |
| **Technical** (3) | Public API, CLI/Terminal, Document/Report | Developer-facing — P3 (Rationale) becomes structured metadata (JSON); P4 (Confidence) becomes a numeric field. Pattern 76 (Bridge) connects these to user-facing surfaces. | Pattern 76 |
| **Physical Devices** (6) | IoT Sensor, Robot, Smart Appliance, Vehicle Interface, Haptic Device, Ambient Display | Physical consequences — L3/L4 actions have real-world effects. P1 (Intent Preview) is critical before any physical action. Escalation (P6) may require hardware kill switches. | Principle 13, 15 |

**Design implication:** When implementing any UX pattern (P1-P7), first ask "which touchpoints will this appear on?" Then adapt the pattern's anatomy to the touchpoint's constraints. A Confidence Signal on a dashboard is a color-coded bar; on a voice interface it is a verbal qualifier ("I'm fairly confident..."); on an IoT sensor it is a LED color.

**Playbook connection:** [Pattern 44 (Model Loop)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical core of the iterative loop. Adaptive interfaces are the user-facing expression of the model loop, providing rich controls (Precision Knobs, Modifiers, Contextual Prompts) as the control surface for each iteration.

---

#### Principle 7: Organize by Space-Time, Not Apps

**Problem:** Software is organized by application: email in one app, calendar in another, documents in a third, chat in a fourth. Users spend significant cognitive effort switching between applications, maintaining context across boundaries, and mentally linking related information scattered across tools. This organization reflects the history of software development (separate teams built separate tools), not the structure of human work.

AI systems that inherit this application-centric model (a chat panel inside each app) perpetuate the problem. The AI assistant in the email app cannot see the calendar. The AI in the document editor cannot see the chat. The user becomes the integration layer — manually copying context between AI assistants that cannot communicate.

**Design guidance:**

1. **Organize around tasks, not tools.** A task like "prepare for the Monday meeting" spans email (agenda), calendar (time), documents (preparation materials), and chat (pre-meeting discussion). An AI system organized by space-time would pull all relevant information into a single view organized around the meeting, not scattered across four apps.

2. **Design for continuity across sessions.** Users work across hours, days, and weeks. AI interactions should preserve context across sessions — not as conversation history (which grows stale) but as an evolving understanding of the user's work context.

3. **Support ambient awareness.** Not all AI interaction requires active engagement. Some of the most valuable AI experiences are ambient: a sidebar that updates with relevant information as the user works, a notification that surfaces a connection between two unrelated documents.

4. **Design for spatial and temporal metaphors.** Instead of chronological chat logs, consider spatial organizations: a workspace where related items are clustered, a timeline where decisions are ordered, a map where connections are visible.

> **Practitioner Perspective — Josh Clark & Veronika Kindred:**
> "Radically Adaptive" is the genuinely new capability. AI interfaces can "conceive and compile the experience in real time based on intent and context." This is not just responsive design (adapting to screen size) — it is interfaces that transform their structure, content, and interaction model based on what the user is trying to do right now. Continuous and ambient, not episodic and explicit.
>
> — Josh Clark & Veronika Kindred, Sentient Design (Big Medium, 2026)

**Example — Task-Centric vs. App-Centric Organization:**

Consider the task "prepare for the Monday product review":

**App-centric (current):**
```
Email app:      Search for "product review" → find agenda, 3 threads
Calendar app:   Find the meeting → check attendees, room, time
Docs app:       Search recent docs → find 2 relevant presentations
Analytics app:  Pull last week's metrics dashboard
Chat app:       Search #product channel → find team discussion
Note app:       Find your prep notes from last review
```
The user is the integration layer, manually assembling context from 6 applications.

**Task-centric (with AI organized by space-time):**
```
"Prepare for Monday product review"

┌─────────────────────────────────────────────────────────────┐
│ Monday Product Review — Prep View                           │
│                                                             │
│ 📋 Agenda (from Sarah's email, Mar 28):                     │
│   1. Q1 metrics review                                      │
│   2. Roadmap update                                         │
│   3. Customer feedback synthesis                            │
│                                                             │
│ 📊 Key Metrics (pulled from analytics):                     │
│   DAU: 45K (+12% vs Q4)  |  Retention: 68% (-2%)          │
│   NPS: 42 (+5)           |  Revenue: $2.8M (+17%)          │
│                                                             │
│ 💬 Team Discussion Summary (from #product, last 7 days):    │
│   • Concern about retention drop — Alex investigating       │
│   • New feature launch positive so far — 23% adoption       │
│   • Customer feedback: onboarding still cited as pain point │
│                                                             │
│ 📄 Your Notes (from last review):                           │
│   "Follow up on: onboarding revamp timeline,               │
│    enterprise pricing discussion"                           │
│                                                             │
│ 👥 Attendees: Sarah (PM), Alex (Eng), Jordan (Design),     │
│    Priya (Data), You                                        │
│                                                             │
│ [Open full agenda] [Add talking points] [Share prep]        │
└─────────────────────────────────────────────────────────────┘
```

The AI assembled this view by organizing information spatially (around the meeting) and temporally (relevant recent context). No app-switching. No manual search. The user's cognitive effort shifts from *finding information* to *preparing insights* — which is the actual valuable work.

This is what Clark/Kindred mean by "continuous and ambient": the AI understands the temporal context (a meeting is approaching) and the spatial context (what information relates to this meeting) and assembles a view without being explicitly asked.

**Playbook connection:** [Pattern 23 (Working Memory)](AI_AGENT_PATTERNS_PLAYBOOK.md) — structured persistent context that maintains state across interactions. [Pattern 69 (Hierarchical Memory Files)](AI_AGENT_PATTERNS_PLAYBOOK.md) — scoped instructions that give agents context-awareness across different domains of work.

---

#### Principle 8: Generate Interfaces for the Moment

**Problem:** Traditional interfaces are designed once and deployed permanently. A dashboard built for quarterly reviews serves every user the same layout, whether they are a CEO looking at trends or an analyst drilling into anomalies. AI makes it possible to generate interfaces that match the user's current intent — not a permanent layout, but a momentary view that exists for the duration of a specific task and then dissolves.

This capability is powerful but dangerous. Generated interfaces can be confusing if they change unpredictably. They can be manipulative if they are optimized for engagement rather than utility. And they can be inaccessible if they are generated without regard for accessibility standards.

**Design guidance:**

1. **Generate for clarity, not novelty.** A generated interface should make the current task easier, not demonstrate the system's generative capabilities. If a standard table is the clearest way to present the data, generate a standard table.

2. **Maintain interaction consistency.** Even when the layout changes, core interactions (how to select, how to navigate, how to undo) should remain consistent. Users should not have to relearn basic interactions with each generated interface.

3. **Use semantic primitives** (Doug Cook's framework): interpret intent (**context primitives**), preserve continuity across sessions (**temporal primitives**), anticipate next steps (**inference primitives**), and manage human-AI workflow (**collaborative primitives**). These primitives provide the building blocks from which momentary interfaces are composed.

4. **Provide scaffolding for prompt construction.** Friedman's Prompt Strength Indicator: a visual signal showing how specific the user's input is, helping users improve their prompts. This transforms the prompt itself into an interface element, not just an input field.

5. **Ensure accessibility.** Generated interfaces must meet accessibility standards. This means generating semantic HTML, proper ARIA labels, sufficient color contrast, and keyboard navigability — not as optional features but as constraints on the generation process.

> **Practitioner Perspective — Doug Cook:**
> "The blank prompt presents infinite possibilities but few affordances." The shift is from "interface design" to "intelligence design" — from designing fixed layouts to designing the primitives from which interfaces are composed on the fly. Context primitives interpret intent. Temporal primitives preserve continuity. Inference primitives anticipate next steps. Collaborative primitives manage the human-AI handoff.
>
> — Doug Cook, "The Prompt-Box Paradox" (thirteen23, 2025)

> **Practitioner Perspective — Josh Clark & Veronika Kindred:**
> Clark/Kindred's "Sentient Scenes" demo: a UI that transforms its style, mood, colors, and typography based on user description. The concept of "radically adaptive" interfaces is the most concrete realization of this principle — interfaces that do not merely respond to user input but reconstitute themselves around user intent.
>
> — Josh Clark & Veronika Kindred, Sentient Design (Big Medium, 2026)

**Example — Generated Interface for a Sales Review:**

A sales manager asks: "How did Q1 go compared to Q4?"

**Traditional interface:** Opens a pre-built dashboard with 12 charts, most irrelevant. The manager hunts for the two charts that compare quarters.

**Generated interface:** The AI creates a momentary view:

```
┌─────────────────────────────────────────────────────────────┐
│ Q1 vs Q4 Comparison                                         │
│                                                             │
│ Revenue: $2.4M → $2.8M (+16.7%)  ████████████████░░ ✅      │
│ Deals Closed: 47 → 52 (+10.6%)   ████████████░░░░░░ ✅      │
│ Avg Deal Size: $51K → $54K (+5.9%) ██████████░░░░░░ →       │
│ Pipeline Coverage: 3.2x → 2.8x   ████████░░░░░░░░░ ⚠️      │
│                                                             │
│ ⚠️ Pipeline coverage declined — 3 deals slipped from Q1    │
│ to Q2. [See affected deals] [Compare to team average]       │
│                                                             │
│ Generated from: Salesforce data as of Apr 1                 │
│ [Export] [Save as recurring view] [Ask a follow-up]         │
└─────────────────────────────────────────────────────────────┘
```

This interface exists for the duration of the question. It shows exactly what was asked, flags the anomaly the manager should care about, and provides paths to drill deeper. It was not pre-designed — it was composed from semantic primitives in response to intent.

Note the scaffolding: the export option (data portability, Principle 17), the data source attribution (transparency, Principle 3), and the follow-up option (iterative refinement, Principle 6). These are not features of this specific generated view — they are constraints on *all* generated views.

**Playbook connection:** [Pattern 74 (Skills System)](AI_AGENT_PATTERNS_PLAYBOOK.md) — dynamic capability discovery and loading, the technical mechanism by which an agent assembles momentary capabilities for the task at hand.

---

### Theme 3: Agency and Integration

How should AI systems relate to human work? Not as replacements and not as toys, but as partners whose authority and autonomy are negotiated in real time. These four principles address the integration of AI into existing workflows, the communication of limitations, and the design of consent and agency.

---

#### Principle 9: Enhance Human Work Instead of Replacing It

**Problem:** The default framing of AI in business contexts is "automation" — replacing human labor with machine labor to reduce costs. This framing is both economically tempting and humanistically dangerous. It treats human work as a cost to be minimized rather than a capability to be augmented. The result: AI systems that optimize for efficiency at the expense of quality, judgment, and the human expertise that created the value being automated.

The replacement framing also misses a practical reality: most valuable work requires judgment that AI systems cannot reliably provide. Automating the routine parts of a job while preserving the judgment-intensive parts produces better outcomes than full automation — and it preserves the human expertise needed to evaluate and improve the AI system itself.

**Design guidance:**

1. **Identify the judgment boundary.** For every workflow, map which steps require human judgment and which are routine. Automate the routine. Augment the judgment. Do not confuse the two.

2. **Design for the handoff moment.** The interface between AI work and human work is the most critical design surface. Make it clear what the AI has done, what it has not done, and what the human needs to evaluate.

3. **Preserve skill development.** If AI handles all routine tasks, junior team members never develop the foundational skills needed for judgment-intensive work. Design learning pathways that use AI as scaffolding for skill development, not as a bypass.

4. **Measure augmentation, not replacement.** Instead of measuring "tasks automated" or "headcount reduced," measure "decisions improved," "errors caught," and "time to insight." These metrics align AI development with genuine value creation.

5. **Design AI-second, not AI-first** (Friedman's insight): focus on user needs first, add AI where it delivers real value. "Sprinkle AI across journeys where it adds value rather than building AI-only products."

> **Counterpoint Box — The Skeptics Strengthen the Principle:**
>
> **Erika Hall:** "We're going in the wrong direction." Technology should adapt to human nature, not force people to fit application logic. The reflex to "put a bot on that" without asking whether it serves human needs is the same thinking that produced bad software before AI. Hall's challenge: before enhancing work, ask whether the work itself is worth doing.
>
> **Jared Spool:** Current AI is "flawed autocorrect pretending it's a talking dog." If AI becomes the future, UX jobs become "so much more important than we're ready for today." Spool's provocation: the more AI automates, the more critical human judgment becomes at the interfaces between automated systems.
>
> Both skeptics' concerns *strengthen* the principle. Enhancement requires understanding what is worth enhancing. Replacement skips that question entirely.

**Example — The Judgment Boundary Map:**

For a customer support workflow, the judgment boundary might look like:

| Task | Type | AI Role | Human Role |
|------|------|---------|-----------|
| Categorize incoming ticket | Routine | Auto-classify (L4) | Review misclassifications weekly |
| Draft initial response for known issues | Routine | Generate draft (L3) | Review and send |
| Draft response for novel issues | Judgment | Suggest relevant knowledge base articles (L2) | Write the response |
| Determine refund eligibility | Judgment | Surface policy and precedents (L1) | Make the decision |
| Escalate to engineering | Judgment | Recommend escalation based on signals (L2) | Confirm and route |
| Communicate with upset customer | High Judgment | Provide tone suggestions only (L1) | Handle the conversation |

The boundary is not static — it shifts as the AI demonstrates reliability and as the team develops confidence. But the map makes the *current* boundary visible, preventing both under-delegation (agents doing nothing useful) and over-delegation (agents handling tasks that require human judgment they cannot provide).

> **Practitioner Perspective — Vitaly Friedman:**
> "AI-second, not AI-first." The judgment boundary map is the concrete application of this principle: identify where human work happens, map the judgment requirements, and add AI only where it genuinely helps. The organization that starts with "put AI everywhere" will over-delegate. The one that starts with "where does human judgment add the most value?" will get the boundary right.
>
> — Vitaly Friedman, "Design Patterns for AI Interfaces" (Smashing Magazine, 2025)

**Playbook connection:** [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the human-in-the-loop mechanism that preserves human judgment in AI workflows. The suspend point is the handoff moment where AI work meets human evaluation.

---

#### Principle 10: Design to Communicate Limitations

**Problem:** AI systems are biased toward appearing capable. Language models produce confident-sounding text even when they are uncertain or wrong — a phenomenon Yocco calls "Imagined Competence." Users, especially those unfamiliar with AI systems, have no basis for calibrating their trust. They cannot distinguish between an AI recommendation backed by strong evidence and one that is a confident hallucination.

The result is not just individual errors but systematic miscalibration: users develop expectations of AI capability that do not match reality. They delegate tasks the AI cannot reliably perform. They stop verifying AI output. When errors eventually surface, trust collapses entirely — the opposite extreme of the same miscalibration problem.

**Design guidance:**

1. **Make uncertainty visible.** Every AI output should carry some signal of the system's confidence. This can range from subtle (color-coded backgrounds) to explicit (percentage confidence scores) depending on the context and stakes.

2. **Declare scope explicitly.** Before engaging with a task, communicate what the AI can and cannot do. "I can analyze the data in this spreadsheet. I cannot verify whether the underlying data is correct." This sets expectations before they are violated.

3. **Design for capability awareness** (Friedman's concept): help users understand what AI can and cannot do. This is the discoverability problem applied to capabilities rather than features. Capability Awareness patterns actively teach users the boundaries of the system through interaction.

4. **Fail visibly.** When AI encounters a task it cannot perform, say so clearly rather than producing a low-quality approximation. "I don't have enough information to answer this reliably" is more trustworthy than a plausible-sounding guess.

5. **Use provenance via primitives** (Yocco's framework): translate system primitives (API calls, logic gates) into user-facing explanations. `Logic: Cheapest_Direct_Flight` becomes "I chose this flight because it was the cheapest non-stop option." Transparency through primitives prevents the gap between system behavior and user understanding.

> **Research Note — Lennart Nacke:**
> In AI-assisted qualitative research, ethical lapses compound: AI-hallucinated personas lead to wasted product development; unreliable AI-generated themes lead to misguided product decisions. 30% of 23 reviewed studies show LLMs matching human performance — but 30% report unreliability without oversight. Communicating these limitations is not optional; it is an ethical obligation.
>
> — Lennart Nacke, "The AI Responsibility Framework for UX Researchers" (2026)

**Playbook connection:** [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md) — system-level constraints that prevent AI from acting outside its reliable capability range. Guardrails are the technical enforcement of communicated limitations.

---

#### Principle 11: Design Consent as Continuous, Not Binary

**Problem:** Consent in most AI systems is a one-time event: a checkbox during onboarding, a permissions modal on first use, a terms-of-service agreement that nobody reads. This model is borrowed from traditional software, where capabilities are fixed and predictable. AI systems are neither. An agent that handles email scheduling today may be upgraded to handle calendar management tomorrow. A recommendation engine trained on purchase history may be extended to use browsing behavior. The one-time consent is stale before the user encounters the changed system.

Agentic AI makes this worse: agents act on behalf of users, sometimes in contexts the user did not anticipate. A recruiting agent authorized to "handle scheduling" may interpret that authorization as permission to contact candidates directly. The authorization was technically granted; the action was not consented to.

**Design guidance:**

1. **Design consent as an ongoing conversation, not a gate.** Periodically resurface what the AI is authorized to do and ask whether the user still agrees. Not as an annoying modal, but as a natural part of the workflow: "I'm about to do X for the first time. Proceed?"

2. **Separate capability consent from data consent.** "Yes, use AI to draft my emails" and "Yes, use my email history to train recommendations" are different authorizations with different implications. Design them as separate controls.

3. **Scope consent narrowly.** Instead of "allow AI to manage your schedule," offer "allow AI to suggest meeting times" and "allow AI to auto-accept meetings matching these criteria" as separate authorizations.

4. **Make withdrawal easy.** If consent is continuous, withdrawal must also be continuous. Users should be able to revoke any authorization at any time without navigating to a settings page. The cost of revoking consent should be near zero.

5. **Design for progressive consent.** Start with minimal authorization and expand based on demonstrated reliability and user comfort. This matches the Autonomy Taxonomy's progression from L1 (Observe & Suggest) to L4 (Act Autonomously).

6. **Resurface consent at capability boundaries.** When the agent gains new capabilities (a tool integration, a new data source, an expanded scope), trigger a new consent moment. "I can now access your Salesforce data. This would let me [specific benefit]. Would you like to enable this?" — not a silent expansion of access.

**Example — Consent Timeline for a Scheduling Agent:**

```
Week 1: "Can I read your calendar to suggest meeting times?"
         → User grants read access to primary calendar
         
Week 3: "I've noticed you have a secondary calendar with
         team events. Reading it would help me avoid conflicts.
         Can I access it?"
         → User grants read access to secondary calendar

Week 6: "You've approved 94% of my scheduling suggestions.
         Would you like me to auto-schedule meetings that match
         your stated preferences? You'd review a daily summary
         instead of approving each one."
         → User enables L4 for routine meetings with known contacts

Week 8: "A new integration is available: I can now draft
         meeting agendas based on the meeting topic and
         attendees' recent work. This requires read access to
         your document workspace. Would you like to try this?"
         → User evaluates and decides

Each transition:
• Explains what changes
• States what data is needed and why
• Requires explicit opt-in
• Can be reversed at any time
```

This timeline illustrates consent as a conversation, not a gate. Each step is grounded in demonstrated value and asks for specific, narrow authorization.

> **Practitioner Perspective — Geoffrey Litt:**
> Malleable software restores user agency. Users should be able to modify the tools they use — not as developers, but as users exercising control over their own environment. "Coding like a surgeon" — precise, intentional modifications to the software that governs your work. Applied to consent: users should be able to reshape what the AI is authorized to do as easily as they rearrange their desktop.
>
> — Geoffrey Litt, Ink & Switch (2025)

**Playbook connection:** [Pattern 64 (Multi-Layer Permissions)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the 6-layer permission system that governs agent actions. Each layer is a consent boundary. [Pattern 70 (Denial Tracking)](AI_AGENT_PATTERNS_PLAYBOOK.md) — auto-escalation after repeated permission denials, a signal that the consent model may need recalibration.

---

#### Principle 12: Negotiate Agency Moment-by-Moment

**Problem:** Most AI systems assign a fixed role: tool (user controls everything), copilot (AI suggests, user decides), or agent (AI acts autonomously). In reality, the appropriate level of AI agency varies *within a single session.* A designer might want the AI to act as an agent for resizing images (mechanical, low-risk) but as a copilot for selecting color palettes (creative, judgment-dependent) and as a tool for final composition (high control required).

Static role assignment forces users to choose between under-delegation (doing everything manually despite having an AI) and over-delegation (granting blanket autonomy for tasks that require different levels of human judgment).

**Design guidance:**

1. **Allow per-task autonomy settings.** Instead of a global "AI mode," let users set autonomy levels for individual task types. "Auto-handle scheduling, suggest but don't execute email drafts, observe but don't act on budget decisions."

2. **Support fluid transitions.** Users should be able to increase or decrease AI autonomy mid-task without restarting the workflow. The Autonomy Dial (Part B, P2) is the interface for this negotiation.

3. **Learn from user behavior.** If a user consistently overrides AI suggestions for a specific task type, the system should offer to reduce autonomy for that type. If a user consistently accepts without modification, offer to increase autonomy. These transitions should be proposed, not imposed.

4. **Design for different postures within a single product.** Using Clark/Kindred's triangle: a single product might be a Tool for one task (user-controlled, grounded), a Copilot for another (collaborative, grounded + adaptive), and an Agent for a third (autonomous, grounded + interoperable + adaptive). Map each task to the appropriate AI posture.

5. **Make the current agency level visible.** Users should always know what the AI is authorized to do right now. A persistent indicator (comparable to a mode indicator in a text editor) prevents confusion about who is in control.

> **Practitioner Perspective — Josh Clark & Veronika Kindred:**
> The Sentient Design triangle is a thinking tool for workshopping different AI postures for a given problem. A scheduling assistant might be a Tool for calendar display (grounded, not adaptive), a Copilot for meeting preparation (grounded + adaptive), and an Agent for rescheduling (grounded + interoperable + adaptive). The triangle maps these postures visually, making agency negotiation a design activity rather than a binary choice.
>
> — Josh Clark & Veronika Kindred, Sentient Design (Big Medium, 2026)

**Example — Fluid Agency in a Design Tool:**

Consider how a design AI might negotiate agency across different sub-tasks within a single design session:

```
┌─────────────────────────────────────────────────────────────┐
│ Design Assistant — Current Agency Levels                    │
│                                                             │
│ Layout alignment          ◉ Agent  ○ Copilot  ○ Tool       │
│ "Auto-aligning elements to grid (your preference)"         │
│                                                             │
│ Color palette             ○ Agent  ◉ Copilot  ○ Tool       │
│ "Suggesting harmonious colors, you select"                  │
│                                                             │
│ Typography                ○ Agent  ○ Copilot  ◉ Tool       │
│ "You choose fonts, I'll show available options"             │
│                                                             │
│ Content writing           ○ Agent  ◉ Copilot  ○ Tool       │
│ "I draft copy based on your brief, you edit"                │
│                                                             │
│ Accessibility check       ◉ Agent  ○ Copilot  ○ Tool       │
│ "Auto-flagging contrast issues and missing alt text"        │
│                                                             │
│ Final export              ○ Agent  ○ Copilot  ◉ Tool       │
│ "You choose format and settings, I execute"                 │
│                                                             │
│ ⚡ The AI noticed you've been overriding color suggestions  │
│ frequently. Switch Color Palette to Tool mode?  [Yes] [No]  │
└─────────────────────────────────────────────────────────────┘
```

Key features of this interface:
- **Per-task agency** is visible at a glance — the designer knows exactly what the AI is doing autonomously, collaboratively, and passively.
- **Behavioral learning** drives suggestions: the AI notices patterns in user overrides and proposes adjustments to its own authority level.
- **Transitions are bidirectional**: agency can increase (the AI earning more trust) or decrease (the AI recognizing misalignment).
- **The current state is always visible**: there is never ambiguity about who is in control of what.

**Playbook connection:** [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the mechanism for transitioning between autonomous execution and human control within a single workflow.

---

### Theme 4: Responsibility, Accountability, and Power

AI systems do not exist in a vacuum. They are deployed within institutions, used by people with unequal access to recourse, and shaped by decisions that reflect (and reinforce) existing power structures. These five principles address the responsibilities that come with building systems that affect people's lives.

---

#### Principle 13: Make Accountability Visible

**Problem:** "The algorithm decided" is the modern equivalent of "it's policy" — a phrase designed to end conversation rather than enable it. When AI makes a recommendation that affects someone's life (credit decisions, hiring, benefits eligibility, content moderation), the affected person needs to know: who is responsible? Who can I appeal to? What recourse do I have?

Invisible accountability is not just a transparency problem — it is a power problem. When the decision-making process is opaque, the affected person has no leverage. They cannot argue with an algorithm. They cannot appeal to a neural network. Accountability requires a human in a role with authority to override the system.

**Design guidance:**

1. **Name the responsible party.** Every AI-assisted decision should have a named human or team accountable for the outcome. "This recommendation was generated by the risk assessment model and reviewed by [Role/Team]" establishes a chain of accountability.

2. **Design appeal pathways.** When an AI-assisted decision negatively affects someone, there must be a clear, accessible process for challenging that decision. The appeal should reach a human with the authority and context to override the system.

3. **Log decision provenance.** Every decision — the data used, the model version, the confidence score, any human review — should be logged in a way that supports post-hoc review. This is both an accountability mechanism and a debugging tool.

4. **Separate "what the AI recommended" from "what was decided."** Making the AI recommendation visible alongside the final decision (which may differ) demonstrates that humans are genuinely reviewing AI output, not rubber-stamping it.

> **Practitioner Perspective — Cyd Harrell:**
> Twenty-five years in government technology taught Harrell that wrong decisions in civic contexts affect vulnerable populations — people who lack the resources to navigate opaque appeals processes. Government AI requires: human review of all AI outputs for accuracy and bias (HITL), transparent policy frameworks covering innovation, accountability, reliability, fairness, privacy, explainability, and security. When an AI-assisted benefits determination is wrong, someone's housing or healthcare is at stake. Accountability is not a design nice-to-have; it is a constitutional obligation.
>
> — Cyd Harrell, City & County of San Francisco (2024)

**Example — Accountability in a Loan Recommendation System:**

```
┌─────────────────────────────────────────────────────────────┐
│ Loan Application: #2024-8847                                │
│ Applicant: [Redacted]                                       │
│                                                             │
│ AI Recommendation: APPROVE at 6.2% APR                      │
│ Confidence: 82%                                             │
│                                                             │
│ Factors (weighted):                                         │
│ • Credit score: 720 (positive, weight: 35%)                 │
│ • Debt-to-income: 28% (positive, weight: 25%)               │
│ • Employment tenure: 8 months (neutral, weight: 15%)        │
│ • Loan-to-value: 85% (neutral, weight: 15%)                 │
│ • Payment history: 2 late payments in 24 months (neg, 10%)  │
│                                                             │
│ Model version: risk-model-v3.2.1 (deployed 2024-02-15)      │
│ Training data period: 2019-2023                             │
│                                                             │
│ Reviewed by: [Loan Officer Name], Senior Underwriter        │
│ Decision: APPROVED at 6.2% APR (concurs with AI)            │
│                                                             │
│ Appeal pathway: Contact [Appeals Office] or visit            │
│ [appeals.example.com] within 30 days                        │
└─────────────────────────────────────────────────────────────┘
```

Every element of this display serves accountability: the factors show *why*, the model version enables reproducibility, the reviewer name establishes *who is responsible*, and the appeal pathway ensures the applicant has *recourse*. The separation between "AI Recommendation" and "Decision" makes clear that a human reviewed and agreed — the AI did not make the decision alone.

**Playbook connection:** [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the logging infrastructure that makes decision provenance available for review. [Pattern 64 (Multi-Layer Permissions)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the permission system that establishes who can authorize what.

---

#### Principle 14: Design Beyond Immediate Utility Toward Societal Impact

**Problem:** Design decisions that seem neutral at the individual level can have profound effects at the societal level. A recommendation algorithm optimized for engagement at the individual level produces filter bubbles at the societal level. A hiring algorithm optimized for "culture fit" at the company level reproduces systemic bias at the societal level. AI amplifies these effects because it operates at scale — the same algorithm applied to millions of people simultaneously.

Designers of AI systems have a responsibility to consider second-order effects: not just "does this work for the user?" but "what happens when this works for a million users?"

**Design guidance:**

1. **Conduct impact assessments before deployment.** Map the potential second-order effects of the system: who benefits, who is harmed, what behaviors are incentivized, what information is suppressed. This is not a one-time exercise but an ongoing process.

2. **Design for diverse populations.** AI systems trained on majority-population data will underserve minority populations. Actively test with diverse user groups and data sets. Build evaluation pipelines that measure performance across demographic groups.

3. **Consider power dynamics.** When an AI system mediates between parties with unequal power (employer/employee, landlord/tenant, government/citizen), design the system to protect the less powerful party. At minimum, ensure the system does not amplify existing power imbalances.

4. **Build collective review mechanisms.** Individual users cannot assess societal impact. Design systems that aggregate feedback, detect patterns of harm, and surface them to decision-makers.

> **Practitioner Perspective — Ken Liu:**
> Technology is "the externalization of our thoughts" — "a story we tell the universe about who we are." The critical question is "not asking whether a task is one that should be performed by AIs at all." Art remains relevant in an AI world through forms that require shared human experience. Liu's voice provides the philosophical anchor: the meaning of what we build matters beyond its utility.
>
> — Ken Liu, "50 Things Every AI Working with Humans Should Know" (2024)

**Example — Second-Order Effects Assessment:**

For a hiring recommendation system:

| First-Order Effect | Second-Order Effect | Design Response |
|-------------------|--------------------|-----------------| 
| Recommends candidates who match job requirements | Reinforces historical hiring patterns (same schools, same backgrounds) | Add diversity metrics to evaluation; flag when recommendations are demographically homogeneous |
| Reduces time-to-hire by 40% | Eliminates the human relationship-building that happens during slower processes | Preserve human touchpoints at key moments (initial outreach, final interview, offer) |
| Standardizes evaluation criteria | Penalizes non-standard career paths (career changers, self-taught, returning workers) | Audit criteria for indirect discrimination; add alternative pathway detection |
| Scales hiring across regions | Applies culturally-specific norms to different cultural contexts | Localize evaluation criteria; involve regional stakeholders in model training |

Each row identifies a genuine benefit (first-order) and a genuine risk (second-order). The design response does not eliminate the benefit — it adds safeguards against the risk. This is what designing beyond immediate utility looks like in practice.

**Playbook connection:** [Pattern 52 (Constitutional AI)](AI_AGENT_PATTERNS_PLAYBOOK.md) — value-aligned reasoning at the model level. [Pattern 55 (Evaluation)](AI_AGENT_PATTERNS_PLAYBOOK.md) — systematic measurement of model behavior across scenarios, including potential harm patterns.

---

#### Principle 15: Establish Guardrails to Prevent Misuse

**Problem:** AI systems designed for beneficial purposes can be repurposed for harmful ones. A writing assistant can generate disinformation. A code generator can produce malware. An image generator can create non-consensual content. The same capabilities that make AI useful make it potentially dangerous.

Guardrails are not censorship — they are governance mechanisms that define the boundaries within which an AI system operates. Like physical guardrails on a highway, they prevent the most catastrophic outcomes without restricting normal operation.

**Design guidance:**

1. **Define hard boundaries.** Some actions should never be taken regardless of user intent. Identify these for your system and implement them as immutable constraints, not configurable preferences.

2. **Design monitoring systems.** Guardrails that are not monitored are suggestions. Implement logging, alerting, and regular review of guardrail activations. High activation rates may indicate that users need better guidance. Low activation rates may indicate that guardrails are not covering relevant scenarios.

3. **Build guardrails into the architecture, not the prompt.** Prompt-level guardrails can be circumvented. System-level guardrails (input validation, output filtering, action approval) are more robust.

4. **Test with adversarial scenarios.** Yocco's "Simulated Misbehavior Testing": stress-test the system with command misinterpretation, unsolicited actions, and ethical dilemmas. These tests reveal failure modes before users encounter them.

5. **Create escalation paths for edge cases.** Not every situation can be anticipated. Design a process for handling situations that fall between clearly permitted and clearly prohibited — cases that require human judgment.

> **Research Note — Lennart Nacke:**
> Nacke's AI Responsibility Framework illustrates how ethical lapses compound: AI-hallucinated personas lead to wasted product development; unreliable AI-generated themes lead to misguided product decisions; each failure creates downstream failures of increasing severity. Guardrails at each layer prevent the compounding effect. The six-prompt-layer framework applies deontological constraints (things you must never do) and consequentialist considerations (outcomes you must consider) at each stage of the AI pipeline.
>
> — Lennart Nacke, "The AI Responsibility Framework for UX Researchers" (2026)

**Example — Guardrail Architecture for a Content Generation Agent:**

```
Layer 1: Hard Boundaries (immutable, not configurable)
├── Never generate content that targets individuals
├── Never fabricate citations or sources
├── Never impersonate real people
└── Never generate content for regulated industries
    without disclosure

Layer 2: Soft Boundaries (configurable by policy)
├── Brand voice guidelines (enforceable, adjustable)
├── Content length limits (per channel)
├── Tone restrictions (per audience segment)
└── Topic restrictions (per campaign)

Layer 3: Monitoring Boundaries (alert, don't block)
├── Unusual volume patterns (possible misuse)
├── Sentiment drift (output becoming more extreme)
├── Repetition detection (same content reused)
└── Factual claim density (high claim count → flag for review)

Layer 4: Feedback Boundaries (learn from outcomes)
├── User rejection patterns → adjust generation
├── Edit patterns → identify systematic weaknesses
├── Escalation patterns → identify scope gaps
└── Performance metrics → calibrate confidence
```

Each layer serves a different purpose: Layer 1 prevents catastrophic failures, Layer 2 enforces organizational policy, Layer 3 detects emerging problems, and Layer 4 improves over time. The architecture mirrors the defense-in-depth principle from security: no single layer is sufficient, but the combination is robust.

**Playbook connection:** [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical implementation of system-level behavioral constraints. [Pattern 52 (Constitutional AI)](AI_AGENT_PATTERNS_PLAYBOOK.md) — value alignment at the reasoning level.

---

#### Principle 16: Make Power Legible in Infrastructure

**Problem:** AI systems encode decisions about who gets what: who sees which job listings, who receives which interest rates, who is prioritized in which queue. These decisions are made by models trained on historical data that reflects historical power structures. The infrastructure itself — the data pipelines, model architectures, and deployment configurations — embodies values and priorities that are invisible to the people affected by them.

Making power legible means making these embedded decisions visible, understandable, and contestable. Not just transparency about *what* the system did, but transparency about *why the system is designed to do it that way.*

**Design guidance:**

1. **Document decision architecture.** Who decided what the model optimizes for? What trade-offs were made? These decisions should be documented and accessible, not buried in technical specifications.

2. **Make optimization criteria visible.** Users should be able to see what the system is optimizing for: relevance? engagement? revenue? fairness? These criteria shape every recommendation, and users deserve to know which criteria are shaping their experience.

3. **Design for contestability.** When a system's decision reflects an embedded power dynamic (e.g., prioritizing certain candidates, surfacing certain content), affected parties should have a mechanism to challenge the underlying criteria, not just the individual decision.

4. **Apply civic design principles.** Government AI systems must meet standards of transparency, accountability, reliability, fairness, privacy, explainability, and security. These standards should be the floor for all AI systems, not just government ones.

> **Practitioner Perspective — Cyd Harrell:**
> "Government AI requires transparent policy frameworks." When AI makes recommendations about benefits eligibility, zoning decisions, or law enforcement priorities, institutional power is hidden behind algorithmic recommendations. Making power legible in civic infrastructure means: human review of all AI outputs (HITL), transparent documentation of what the AI is optimized for, training programs for civil servants who interact with AI systems, and clear appeal pathways for affected community members.
>
> — Cyd Harrell, City & County of San Francisco (2024)

**Example — Making Optimization Criteria Visible:**

A content recommendation system could expose its optimization criteria as user-facing controls:

```
┌─────────────────────────────────────────────────────────────┐
│ Your Feed Settings                                          │
│                                                             │
│ What shapes your recommendations:                           │
│                                                             │
│ Relevance to your interests    ████████████░░░░  75%        │
│ Recency                        ██████░░░░░░░░░░  40%        │
│ Popularity among similar users ████░░░░░░░░░░░░  25%        │
│ Content diversity              ██████████░░░░░░  60%        │
│ Publisher diversity             ████████░░░░░░░░  50%        │
│                                                             │
│ Currently NOT used:                                         │
│ ☐ Advertiser partnerships                                   │
│ ☐ Engagement optimization (clicks, time-on-page)            │
│                                                             │
│ [Adjust weights] [Reset to default] [Learn more]            │
└─────────────────────────────────────────────────────────────┘
```

This interface makes power legible: the user can see *what* the system optimizes for, *how much* weight each factor carries, and *what it explicitly does not optimize for.* The "NOT used" section is as important as the "used" section — it builds trust by demonstrating restraint and inviting scrutiny.

Whether the system actually has advertiser partnerships or engagement optimization is a different question — but making the criteria visible creates accountability. If the criteria say "no advertiser influence" but the results consistently favor advertisers, the discrepancy is detectable.

**Playbook connection:** [Pattern 64 (Multi-Layer Permissions)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the permission system that makes access control legible. [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the infrastructure that makes system behavior visible.

---

#### Principle 17: Design Exit as Sacred Right

**Problem:** The more deeply AI integrates into a user's workflow, the harder it becomes to leave. A scheduling agent that has learned a user's preferences over months creates switching costs. A writing assistant that has adapted to a user's voice creates dependency. A project management AI that understands a team's workflow creates organizational lock-in.

This lock-in is not always intentional, but it is always a design choice. Data portability, export formats, and interoperability standards are design decisions with ethical implications.

**Design guidance:**

1. **Make data export a first-class feature.** Users should be able to export all their data — preferences, history, trained models, custom configurations — in standard, machine-readable formats at any time.

2. **Design for interoperability.** AI systems should work with open standards and protocols. Proprietary formats that lock users into a specific platform are an ethical choice, not a technical necessity.

3. **Separate the AI from the data.** Users should be able to take their data to a different AI system without losing the information they have built up. The data is the user's asset; the AI is the provider's service.

4. **Communicate switching costs honestly.** If leaving the platform means losing personalization, say so explicitly. Users deserve to make informed decisions about lock-in.

5. **Build on file-over-app principles** (Steph Ango's philosophy): data should live in durable, user-controlled files rather than in application-specific databases. When the app dies, the data survives. When the user switches tools, the data follows.

> **Practitioner Perspective — Steph Ango:**
> "File-over-app." Data should outlive the application that created it. Markdown over proprietary formats. Local files over cloud databases. Users should own their information in a format that does not depend on any specific tool's continued existence or goodwill. Applied to AI: your preferences, your trained models, your interaction history should be yours to take with you.
>
> — Steph Ango, Obsidian (2025)

**Example — Data Portability Specification:**

What a user should be able to export from an AI scheduling assistant:

```
Export Package Contents:
├── preferences.json
│   ├── scheduling_rules (business hours, buffer times, max meetings/day)
│   ├── contact_preferences (preferred channels, timezone defaults)
│   └── autonomy_settings (per-task autonomy levels)
├── interaction_history.json
│   ├── all_scheduled_meetings (date, participants, outcome)
│   ├── all_suggestions_made (accepted, rejected, modified)
│   └── all_escalations (reason, resolution, outcome)
├── learned_patterns.json
│   ├── meeting_type_preferences (1:1 vs. group, morning vs. afternoon)
│   ├── participant_relationships (frequent collaborators, VIP contacts)
│   └── scheduling_heuristics (what rules the AI learned from user behavior)
└── README.md
    ├── data_dictionary (what each field means)
    ├── import_instructions (how to use this data with another service)
    └── deletion_confirmation (proof that data was deleted from source)
```

The export is not a token gesture — it includes the *learned patterns* that represent months of interaction. Without these, switching to a new service means starting from scratch, which creates de facto lock-in even when the data is technically portable.

**Playbook connection:** [Pattern 76 (Bridge Pattern)](AI_AGENT_PATTERNS_PLAYBOOK.md) — one agent core with many UI surfaces. The bridge pattern separates agent logic from presentation, making it possible (architecturally, at least) for users to connect to different frontends — or take their data elsewhere.

---

## Part B: UX Patterns for Agentic Systems

Seven concrete interaction patterns organized by lifecycle phase, plus one anti-pattern. These patterns translate the strategic principles from Part A into specific interface designs that can be implemented, tested, and measured.

**Source:** Primarily Victor Yocco, "Designing For Agentic AI: Practical UX Patterns For Control, Consent, And Accountability" (Smashing Magazine, 2026), enriched with perspectives from the designer voices in Part A.

Each pattern follows a consistent format:
- **Name and lifecycle phase**
- **Autonomy levels** — which levels from the taxonomy this pattern applies to
- **What it does** — one-sentence description
- **When to use** — specific scenarios
- **Risk of omission** — what happens if you skip this pattern
- **Anatomy** — the components of the pattern
- **Metrics** — how to measure if the pattern is working
- **Playbook connection** — links to technical patterns

> **"Autonomy is an output of a technical system. Trustworthiness is an output of a design process."**
>
> — Victor Yocco, Smashing Magazine (2026)

---

### Lifecycle Overview

Agentic UX patterns organize around a three-phase lifecycle that corresponds to the natural arc of any agent action:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PRE-ACTION    │───▶│   IN-ACTION     │───▶│   POST-ACTION   │
│                 │    │                 │    │                 │
│ Establishing    │    │ Providing       │    │ Safety and      │
│ Intent          │    │ Context         │    │ Recovery        │
│                 │    │                 │    │                 │
│ P1 Intent       │    │ P3 Explainable  │    │ P5 Action Audit │
│    Preview      │    │    Rationale    │    │    & Undo       │
│ P2 Autonomy     │    │ P4 Confidence   │    │ P6 Escalation   │
│    Dial         │    │    Signal       │    │    Pathway      │
└─────────────────┘    └─────────────────┘    │ P7 Error        │
                                              │    Recovery     │
                                              └─────────────────┘
```

**Pre-Action** patterns establish what the agent intends to do and what authority it has. They answer: "What will happen, and who authorized it?"

**In-Action** patterns provide real-time context about agent behavior. They answer: "Why is this happening, and how confident is the agent?"

**Post-Action** patterns ensure safety and enable recovery. They answer: "What happened, and how do I fix it?"

The lifecycle is not strictly linear — agents may cycle through these phases multiple times within a single task. A complex workflow might involve multiple Pre-Action → In-Action → Post-Action cycles, with the Post-Action phase of one step informing the Pre-Action phase of the next.

**Example — Multi-Cycle Lifecycle for a Travel Booking Agent:**

```
Cycle 1: Flight Selection
  Pre-Action:  P1 — "I'll search for NYC→SFO flights on March 15.
                     Preferences: morning, non-stop, United preferred."
  In-Action:   P4 — Present 3 options with confidence scores
               P3 — "I prioritized non-stop per your preference,
                     even though a connecting flight is $80 cheaper"
  Post-Action: P5 — Log selection, hold reservation (undo: 24h)

Cycle 2: Hotel Selection (informed by Cycle 1 results)
  Pre-Action:  P1 — "Flight arrives at 11:30am. I'll search for
                     hotels near your meeting location (FiDi).
                     Check-in March 15, check-out March 17."
  In-Action:   P4 — Present 3 options with proximity and price
               P3 — "I filtered for hotels within 0.5 miles of
                     your meeting address at 100 Pine St."
  Post-Action: P5 — Log selection, hold reservation (undo: 48h)

Cycle 3: Ground Transportation (informed by Cycles 1+2)
  Pre-Action:  P1 — "You arrive SFO at 11:30am, hotel is in FiDi.
                     BART is $9.65 (45 min). Rideshare est. $35
                     (25 min). Your policy allows up to $50."
  In-Action:   P4 — Confidence: 90% you'll prefer rideshare
                     (based on past travel patterns)
  Post-Action: P5 — Book rideshare, send confirmation (undo: 1h)
```

Each cycle builds on the context established by previous cycles. The Pre-Action phase of Cycle 2 references the flight time from Cycle 1. The Pre-Action of Cycle 3 references both the flight and hotel. This cascading context is why the patterns must be designed as a system, not as independent components.

**Pattern Interaction Map:**

The seven patterns interact with each other, not just with the lifecycle phases:

```
P1 (Intent Preview) ←→ P2 (Autonomy Dial)
  P2 determines whether P1 is shown (at L4, P1 is replaced
  by post-action P5 logging)

P3 (Rationale) ←→ P4 (Confidence)
  Low confidence triggers more detailed rationale
  High confidence allows abbreviated rationale

P5 (Audit) ←→ P7 (Error Recovery)
  Error detection comes from audit trail analysis
  Error recovery creates new audit entries

P6 (Escalation) ←→ P2 (Autonomy Dial)
  Frequent escalation suggests autonomy should be reduced
  Successful escalation resolution builds case for maintained autonomy

P1 (Intent Preview) → P3 (Rationale) → P5 (Audit)
  The plan (P1) becomes the rationale (P3) becomes the record (P5)
  — a single thread of accountability across the lifecycle
```

---

### Human Task Vocabulary

The UX patterns below (P1-P7) reference human actions — reviewing, approving, configuring, providing feedback — but never formally enumerate them. This vocabulary defines 21 distinct human tasks that occur when interacting with agentic AI systems, organized by interaction phase. Each task maps to the UX patterns and principles that govern it.

**Source:** AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab). Adapted and mapped to this document's lifecycle, UX patterns, and autonomy taxonomy.

#### Input & Authorization Tasks

These tasks occur at the beginning of interaction — the human provides input, grants permissions, or establishes the conditions under which the agent operates.

| Human Task | What the Human Does | Lifecycle Phase | Primary UX Pattern | Autonomy Levels | Principle |
|-----------|--------------------|-----------------|--------------------|-----------------|-----------|
| **Authenticate** | Proves identity to the system (password, biometric, SSO) | Pre-Action | P2 (Autonomy Dial — access gate) | All | P11 (Consent) |
| **Grant / Revoke Consent** | Permits or denies data collection, processing, or agent authority | Pre-Action | P2 (Autonomy Dial) | All | P11 (Consent), P17 (Exit) |
| **Connect Integration** | Links external account or data source (OAuth, API key, device pairing) | Pre-Action | P2 (Autonomy Dial — scope expansion) | All | P11 (Consent) |
| **Upload File** | Provides digital assets (drag-and-drop, camera capture, paste, URL import) | Pre-Action | P1 (Intent Preview — input for plan) | L1-L3 | P6 (Adaptive Interfaces) |
| **Type Input** | Enters text data manually (with autocomplete, template fill, or voice dictation) | Pre-Action | P1 (Intent Preview — express intent) | L1-L3 | P2 (Metacognition) |
| **Voice Command** | Speaks verbal command or query (wake word, push-to-talk, continuous) | Pre-Action | P1 (Intent Preview) | L1-L3 | P6 (Adaptive Interfaces) |
| **Gesture Input** | Performs physical gesture (hand tracking, head nod, controller motion) | Pre-Action | P1 (Intent Preview) | L2-L3 | P6 (Adaptive Interfaces) |
| **Navigate Space** | Moves through physical or virtual 3D environment | Pre-Action | — | L1-L2 | P7 (Space-Time) |
| **Adjust Control** | Continuously adjusts a control — slider, knob, dial (Friedman's Precision Knobs) | In-Action | P2 (Autonomy Dial), P4 (Confidence — threshold) | L2-L3 | P6 (Adaptive Interfaces) |
| **Configure System** | Defines system parameters, preferences, rules, and thresholds | Pre-Action | P2 (Autonomy Dial — the primary Configure task) | All | P11 (Consent), P12 (Negotiate Agency) |

#### Control & Decision Tasks

These tasks occur during interaction — the human selects, decides, starts, or stops agent behavior.

| Human Task | What the Human Does | Lifecycle Phase | Primary UX Pattern | Autonomy Levels | Principle |
|-----------|--------------------|-----------------|--------------------|-----------------|-----------|
| **Select Option** | Chooses from predefined choices without strong commitment (dropdown, checkbox) | In-Action | P1 (Intent Preview — modify plan steps) | L2-L3 | P12 (Negotiate Agency) |
| **Choose Winner** | Picks one option as the final choice with commitment (approve one of several) | In-Action | P4 (Confidence Signal — ranked options) | L2-L3 | P4 (Creative Interpretation) |
| **Start Process** | Initiates a workflow (button click, voice command, gesture, scheduled trigger) | Pre-Action | P1 (Intent Preview — "Proceed") | L2-L3 | P12 (Negotiate Agency) |
| **Stop Process** | Interrupts a running workflow (emergency stop, pause, cancel, abort) | In-Action | P6 (Escalation — human-initiated) | All | P9 (Enhance Not Replace) |
| **Compare Options** | Evaluates multiple items side-by-side (diff, A/B, variant review) | In-Action | P4 (Confidence Signal — multi-option) | L2-L3 | P4 (Creative Interpretation) |
| **Organize & Label** | Arranges items into groups, applies tags (card sorting, taxonomy editing) | Post-Action | P5 (Action Audit — categorize history) | L1-L2 | P1 (Preserve Struggle) |

#### Evaluation & Output Tasks

These tasks occur after agent action — the human reviews, validates, provides feedback, or takes output.

| Human Task | What the Human Does | Lifecycle Phase | Primary UX Pattern | Autonomy Levels | Principle |
|-----------|--------------------|-----------------|--------------------|-----------------|-----------|
| **Review & Approve** | Validates accuracy of system output (approve, reject, request changes, escalate) | Post-Action | P1 (Intent Preview — approval gate) | L2-L3 | P13 (Accountability) |
| **Validate Data** | Checks data quality and completeness (spot check, quality audit) | Post-Action | P5 (Action Audit — data verification) | L3-L4 | P3 (Transparent Thinking Partner) |
| **Annotate & Mark Up** | Adds visual/spatial annotations (bounding boxes, highlights, spatial markup) | Post-Action | P3 (Rationale — human-added context) | L1-L3 | P1 (Preserve Struggle) |
| **Provide Feedback** | Provides explicit quality signal (star rating, thumbs up/down, sentiment) | Post-Action | P7 (Error Recovery — feedback channel) | All | P9 (Enhance Not Replace) |
| **Flag Content** | Reports problematic content (report issue, mark inappropriate, escalate) | Post-Action | P6 (Escalation — user-triggered) | All | P15 (Guardrails) |
| **Edit Content** | Modifies system-generated content (refine, rewrite, tweak, format) | Post-Action | P1 (Intent Preview — "Edit Plan") | L2-L3 | P4 (Creative Interpretation) |
| **Export / Download** | Takes artifact out of system (download, export CSV/JSON, copy, share link) | Post-Action | — (architectural — data portability) | All | P17 (Exit as Sacred Right) |

#### How to Use This Vocabulary

When designing an agentic interaction, map the human tasks that will occur at each stage:

1. **During scoping:** List which human tasks your system requires. A scheduling agent needs: Configure System, Start Process, Review & Approve, Stop Process, Provide Feedback. A code review agent needs: Upload File, Review & Approve, Annotate, Edit Content, Flag Content.

2. **During pattern selection:** Each human task points to its primary UX pattern. If your workflow includes Review & Approve, you need P1 (Intent Preview). If it includes Configure System, you need P2 (Autonomy Dial).

3. **During autonomy design:** Human tasks at L4 (Act Autonomously) should be minimal — the agent acts, the human reviews history. Human tasks at L2 (Plan & Propose) are maximal — the human is actively involved in every decision.

4. **During touchpoint adaptation:** The same human task manifests differently across touchpoints. "Review & Approve" on a dashboard is a button click; on a voice interface it is "approved" or "rejected"; on a mobile notification it is a swipe.

---

### Pre-Action: Establishing Intent

---

#### P1. Intent Preview (Plan Summary)

**Lifecycle phase:** Pre-Action
**Autonomy levels:** L2 (Plan & Propose), L3 (Act with Confirmation)
**What it does:** Creates a conversational pause before action — a moment of informed consent where the user sees what the agent intends to do, how it plans to do it, and what the expected consequences are.

**When to use:**
- Any time an agent is about to perform an action with real-world consequences (sending messages, modifying data, making purchases, deploying code)
- When the action is irreversible or expensive to reverse
- When the user has not explicitly requested the specific action the agent is about to take

**Risk of omission:** Without Intent Preview, users discover what the agent did *after* the consequences are in play. Trust erodes rapidly because errors feel like betrayals — the user never agreed to the action that caused the harm.

**Anatomy:**

The Intent Preview has four components:

1. **Clarity and conciseness.** The preview must be understandable at a glance. "I will send 5 interview invitations to candidates A, B, C, D, E" — not "I will execute the email sending pipeline for the selected candidate pool."

2. **Sequential steps.** For multi-step plans, show each step in order with its expected outcome. Users should understand the causal chain: step 1 leads to step 2 leads to step 3.

3. **Consequence declaration.** State what will change in the world as a result of this action. "This will send emails to 5 people. They will see your company name and the job title."

4. **Clear user actions.** Three options, always:
   - **Proceed** — execute the plan as presented
   - **Edit Plan** — modify individual steps before execution
   - **Handle it Myself** — cancel the agent's plan and take manual control

**Example — High-Stakes Variant (DevOps Release Agent):**

```
┌─────────────────────────────────────────────────────────┐
│ 🔄 RELEASE PLAN: v2.4.1 → Production                   │
│                                                         │
│ Step 1: Run integration test suite (est. 12 min)        │
│ Step 2: Build production artifacts                      │
│ Step 3: Deploy to canary (5% traffic) for 30 min        │
│ Step 4: If canary metrics healthy → deploy to 100%      │
│ Step 5: Notify #releases channel in Slack                │
│                                                         │
│ ⚠️  Consequences:                                       │
│ - 5% of users will see new version during canary        │
│ - Full rollout affects all users                        │
│ - Rollback available for 24 hours after full deploy     │
│                                                         │
│ [Proceed] [Edit Plan] [Handle it Myself]                │
└─────────────────────────────────────────────────────────┘
```

**Enrichment — Friedman's Input Patterns:**

The Intent Preview is enriched by three of Friedman's input patterns:
- **Task Builder**: for complex plans, provide a structured editor where users can drag, reorder, add, or remove steps — not just approve/reject the whole plan
- **Pre-prompts**: AI-generated suggestions that help users articulate modifications ("Did you want to extend the canary period?" "Should I notify a different channel?")
- **Prompt Strength Indicator**: a visual signal showing how complete and specific the plan is — helping users identify gaps before approving

> **Practitioner Perspective — Cyd Harrell:**
> "What happens when an Intent Preview is presented to a social worker making a benefits determination?" In civic contexts, the preview must account for the knowledge level of the operator (who may not be technical), the stakes for the affected person (whose housing may depend on the decision), and the institutional requirements (which may mandate specific review procedures). Stress-test previews with the worst-case user, not the best-case user.
>
> — Cyd Harrell, City & County of San Francisco (2024)

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| Acceptance Ratio | >85% | Users trust the agent's plans |
| Override Frequency | <10% | Agent understands user intent; >10% triggers model review |
| Recall Accuracy | High | Users can recall what the agent said it would do (survey-based) |
| Time to Decision | Decreasing trend | Users become more comfortable with the preview format |

**Playbook connection:** [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical mechanism for pausing execution pending human approval. [Pattern 44 (Model Loop)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the agent's internal planning cycle that generates the plan the Intent Preview displays.

---

#### P2. Autonomy Dial (Progressive Authorization)

**Lifecycle phase:** Pre-Action (configuration)
**Autonomy levels:** All — this pattern is the mechanism for *setting* the autonomy level
**What it does:** Provides a spectrum control for agent independence, allowing users to set how much autonomy the agent has for each task type. The dial maps directly to the four levels of the Autonomy Taxonomy.

**When to use:**
- During initial agent setup (establishing baseline autonomy)
- When user confidence changes (after a successful or unsuccessful agent action)
- When new task types are introduced (the agent gains new capabilities)
- When organizational policies change (compliance requirements tighten or relax)

**Risk of omission:** Without the Autonomy Dial, autonomy is all-or-nothing. Users who want the agent to handle scheduling but not email drafting have no mechanism to express this preference. They must either grant blanket authority or micromanage every action.

**Anatomy:**

The Autonomy Dial has four settings corresponding to the taxonomy levels:

```
Task: Email Management

◉ Observe & Suggest     ○ Plan & Propose
  "Flag important         "Draft responses,
   emails only"            show before sending"

○ Act with Confirmation  ○ Act Autonomously
  "Draft and stage,        "Send routine replies
   I'll hit send"          per my rules"
```

Each setting includes:
- A plain-language description of what the agent will and won't do at this level
- Examples specific to the task type
- A clear indication of what changes when moving between levels
- The ability to set different levels for different task types independently

**Design considerations:**

1. **Default to the lowest appropriate level.** New task types should start at L1 (Observe & Suggest) and progress upward based on demonstrated reliability and user comfort.

2. **Support granular scope.** "Email management" is too broad. Allow sub-task scoping: "reply to scheduling emails" at L4, "reply to client emails" at L2, "compose new outreach" at L1.

3. **Show the current setting persistently.** Users should always know what the agent is authorized to do without navigating to a settings page.

4. **Log setting changes.** Every autonomy adjustment should be logged for review — both for the user's own reference and for organizational compliance.

**Example — Multi-Task Autonomy Configuration:**

A recruiting team lead configures their hiring agent with different autonomy levels per task:

```
┌─────────────────────────────────────────────────────────────┐
│ Hiring Agent — Autonomy Settings                            │
│                                                             │
│ Candidate Sourcing                                          │
│ ○ Observe  ◉ Plan    ○ Confirm  ○ Auto                     │
│ "Search job boards, present top 10 candidates weekly"       │
│                                                             │
│ Interview Scheduling                                        │
│ ○ Observe  ○ Plan    ○ Confirm  ◉ Auto                     │
│ "Auto-schedule within my rules: business hours,             │
│  48h+ notice, max 2 reschedules per candidate"              │
│                                                             │
│ Candidate Communication                                     │
│ ○ Observe  ○ Plan    ◉ Confirm  ○ Auto                     │
│ "Draft emails, I review before sending"                     │
│                                                             │
│ Offer Preparation                                           │
│ ◉ Observe  ○ Plan    ○ Confirm  ○ Auto                     │
│ "Flag when a candidate reaches offer stage,                 │
│  I handle everything from there"                            │
│                                                             │
│ [Save] [Reset to defaults] [View change history]            │
└─────────────────────────────────────────────────────────────┘
```

This configuration reflects the team lead's judgment: scheduling is mechanical (L4), sourcing benefits from AI analysis but needs human review (L2), communication requires human voice (L3), and offers are too consequential for any AI involvement beyond notification (L1). Each setting is independently adjustable and logged.

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| Trust Density | % per setting | Distribution of user trust: what % of tasks are at each level |
| Setting Churn | Low changes/user/month | High churn indicates the agent is not meeting expectations at assigned levels |
| Upgrade Rate | Increasing trend | Users are progressively trusting the agent with more autonomy |
| Downgrade Triggers | Categorized | What causes users to reduce autonomy (errors, uncertainty, policy) |

> **Complementary Framework — Josh Clark & Veronika Kindred:**
> The Autonomy Dial maps to the linear taxonomy (L1-L4). Clark/Kindred's triangle provides a complementary spatial view: a task can be mapped along Grounded (does the agent have the right data?), Interoperable (does it need to coordinate with other systems?), and Radically Adaptive (does it need to generate novel responses?). Tasks high on all three dimensions are candidates for high autonomy; tasks low on Grounded are candidates for L1 regardless of other attributes.

**Playbook connection:** [Pattern 64 (Multi-Layer Permissions)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the 6-layer permission system that technically enforces the autonomy settings. [Pattern 70 (Denial Tracking)](AI_AGENT_PATTERNS_PLAYBOOK.md) — auto-escalation signals that may indicate the Autonomy Dial needs recalibration.

---

### In-Action: Providing Context

---

#### P3. Explainable Rationale

**Lifecycle phase:** In-Action
**Autonomy levels:** L3 (Act with Confirmation), L4 (Act Autonomously)
**What it does:** Proactively provides justification for agent actions, grounded in the user's own preferences, stated rules, and observable data — not in the model's internal reasoning.

**When to use:**
- Whenever the agent takes or proposes an action that the user did not explicitly request
- When the agent's choice might not be obvious (selecting one option over others)
- When the action has consequences that the user should understand before they materialize
- Always at L4 (Act Autonomously) — the user was not present when the decision was made

**Risk of omission:** Without Explainable Rationale, the agent's actions feel arbitrary. Users develop "automation anxiety" — a persistent low-level stress about what the agent is doing and why. Over time, this either leads to learned helplessness (accepting whatever the agent does) or complete disengagement (turning the agent off).

**Anatomy:**

The rationale follows a "Because you said X, I did Y" format:

```
┌─────────────────────────────────────────────────────────┐
│ ✉️ Email sent: Interview rescheduled with Jordan Kim     │
│                                                         │
│ Rationale:                                              │
│ • You set "auto-reschedule" for single-round interviews │
│ • Jordan requested Tuesday → Wednesday                  │
│ • Interviewer (Alex) has Wednesday 2-3pm open           │
│ • New time is within your "business hours" constraint   │
│                                                         │
│ Data sources: Google Calendar, your scheduling rules    │
│                                                         │
│ [View full action log] [Undo within 30 min]             │
└─────────────────────────────────────────────────────────┘
```

Key properties:
1. **Grounded in user context.** "Because you said X" — references the user's own rules, preferences, or prior instructions. Not "Because I determined" or "In my analysis."
2. **Specific, not generic.** "Wednesday 2-3pm" — not "an available time slot."
3. **Sourced.** Names the data sources used in the decision.
4. **Actionable.** Includes undo and audit links.

**Enrichment — Friedman's Trust Patterns:**

- **Reasoning Traces**: expose the full chain of thought for users who want to drill deeper than the summary rationale
- **Consensus Meters**: when multiple AI approaches or models agree on a recommendation, showing consensus increases justified confidence

> **Practitioner Perspective — Fiona Burns:**
> Explainability is one of the three pillars of transparency (alongside Control and Reversibility). "Users need to know *why* AI decided something — not as a technical curiosity but as a prerequisite for trust. Without explainability, control is uninformed and reversibility is shooting in the dark."
>
> — Fiona Burns, "Designing for AI Transparency" (2025)

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| "Why?" Ticket Volume | Decreasing trend | Rationales are answering user questions preemptively |
| Rationale Validation | >70% "Helpful" | Users find the rationale useful (in-context microsurvey) |
| Rationale Engagement | Measured | % of users who expand/read the rationale vs. skip it |

**Playbook connection:** [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the logging infrastructure that captures the data needed to generate rationales. [Pattern 52 (Constitutional AI)](AI_AGENT_PATTERNS_PLAYBOOK.md) — value-aligned reasoning that produces human-readable justifications.

---

#### P4. Confidence Signal

**Lifecycle phase:** In-Action
**Autonomy levels:** L2 (Plan & Propose), L3 (Act with Confirmation)
**What it does:** Surfaces the agent's internal certainty level about its recommendations or actions, calibrated to help users decide how much scrutiny to apply.

**When to use:**
- When the agent proposes an action and the user must decide whether to approve
- When the agent presents information that the user may rely on for downstream decisions
- When the agent's confidence varies significantly across different parts of its output
- When multiple options are presented and the agent has a preference

**Risk of omission:** Without Confidence Signals, all agent outputs carry equal implicit authority. A recommendation the agent is 95% confident about looks the same as one it is 40% confident about. Users cannot calibrate their scrutiny — they either scrutinize everything (defeating the purpose of the agent) or scrutinize nothing (creating risk).

**Anatomy:**

The Confidence Signal has three components:

1. **Confidence score.** A clear indicator of the agent's certainty. This can be numeric (85%), categorical (High/Medium/Low), or visual (a filled bar, a color gradient). The format should match the user's domain expectations.

2. **Scope declaration.** What exactly the confidence score refers to: "I am 85% confident this is the best flight option *given your stated preferences.*" The scope prevents users from extending confidence beyond its valid range.

3. **Visual cues.** Color, typography, or spatial positioning that communicates confidence without requiring users to read a number. High-confidence items might appear in standard formatting; low-confidence items might appear with a subtle highlight or annotation.

**Example:**

```
┌─────────────────────────────────────────────────────────┐
│ Flight Recommendations for NYC → SFO, March 15          │
│                                                         │
│ ████████████░░ 87% confidence                           │
│ Option A: United 302, 8:00am, $342 — Best match         │
│   Matches: price preference, airline preference, time   │
│                                                         │
│ ████████░░░░░░ 62% confidence                           │
│ Option B: Delta 518, 11:30am, $298 — Cheaper but        │
│   later departure (outside your "morning" preference)   │
│                                                         │
│ ████░░░░░░░░░░ 34% confidence                           │
│ Option C: JetBlue 721, 6:00am, $275 — Budget option     │
│   ⚠️ Low confidence: very early, unfamiliar airline      │
│   for your travel history                               │
└─────────────────────────────────────────────────────────┘
```

**Design considerations:**

1. **Calibrate the scores.** A confidence signal is worse than useless if it is miscalibrated. When the agent says 85%, it should be correct approximately 85% of the time. Calibration requires ongoing measurement and adjustment. Target: Pearson correlation >0.8 between stated confidence and actual accuracy.

2. **Design for the "scrutiny delta."** Research suggests users spend approximately 12 seconds longer reviewing low-confidence items versus high-confidence items. Design the interface to support this additional scrutiny: provide more detail for low-confidence items, make it easier to drill into the reasoning.

3. **Avoid false precision.** "87.3% confident" implies a precision that AI systems do not possess. Round to meaningful increments or use categorical labels.

> **Practitioner Perspective — Dan Saffer:**
> "Be As Smart As A Puppy — AI should be useful *because* it's non-human, with interfaces revealing internal states rather than masking them." The Confidence Signal is the most direct application of this principle: instead of masking uncertainty behind authoritative language, the interface makes the system's actual state visible. A puppy that brings you a slipper with a wagging tail is communicating something about its confidence — the interface should do the same.
>
> — Dan Saffer, "The Future of AI is Relationships, not Intelligence" (2026)

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| Calibration Score | Pearson >0.8 | Stated confidence matches actual accuracy |
| Scrutiny Delta | ~+12s for low-confidence | Users spend more time on items the agent is uncertain about |
| Override Correlation | Positive | Users override low-confidence suggestions more than high-confidence ones |

**Calibration — Why It Matters More Than Accuracy:**

A miscalibrated confidence signal is worse than no confidence signal at all:

```
Miscalibrated (overconfident):
• Agent says 95% confident → actually correct 60% of the time
• Users learn to trust the 95% → get burned 40% of the time
• Trust collapses faster than if no confidence was shown

Miscalibrated (underconfident):
• Agent says 50% confident → actually correct 90% of the time
• Users scrutinize everything → efficiency gains disappear
• Users eventually ignore confidence scores as meaningless

Well-calibrated:
• Agent says 90% → correct ~90% of the time
• Agent says 50% → correct ~50% of the time
• Users develop calibrated scrutiny — appropriate trust per item
```

**Calibration measurement protocol:**

1. Record every (stated_confidence, actual_outcome) pair
2. Group by stated_confidence decile (0-10%, 10-20%, ..., 90-100%)
3. For each group, compute actual accuracy
4. Plot stated vs. actual — perfect calibration is the diagonal
5. Compute Expected Calibration Error (ECE) — lower is better
6. Recompute weekly; alert if ECE exceeds threshold

This protocol requires ground truth labels — which means either post-hoc human review or automatic success/failure detection (e.g., an action was undone = failure). Design the audit trail (P5) to capture these signals.

**Adaptive confidence display:**

As users develop experience with the agent, their need for confidence information changes:

- **New users:** Show confidence prominently with explanation ("I'm 73% sure because...")
- **Experienced users:** Show confidence subtly (color coding, icon weight) — they have internalized what the scores mean
- **Expert users:** Allow confidence to be hidden entirely, surfaced only below threshold

This progression mirrors the Autonomy Dial's progression — as trust calibrates, the interface can simplify.

**Playbook connection:** [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md) — guardrails can be calibrated to the confidence level: low-confidence actions require human confirmation even at L4; high-confidence actions proceed automatically.

---

### Post-Action: Safety and Recovery

---

#### P5. Action Audit & Undo

**Lifecycle phase:** Post-Action
**Autonomy levels:** All (but critical at L3 and L4)
**What it does:** Maintains a persistent, chronological log of all agent actions with prominent undo controls. The audit trail serves both real-time accountability (the user can see what happened) and post-hoc review (the organization can audit agent behavior).

**When to use:**
- Always. Every agent action should be logged.
- Undo controls are essential for any reversible action
- The audit trail is especially critical at L4 (Act Autonomously), where actions occur without real-time human oversight

**Risk of omission:** Without Action Audit, users operate in the dark. They cannot verify what the agent did, cannot understand the sequence of events that led to a problem, and cannot learn from the agent's behavior. Without Undo, every error is permanent — or requires manual intervention to reverse.

**Anatomy:**

1. **Timeline view.** A chronological log of agent actions with clear timestamps, action descriptions, and status indicators.

```
┌─────────────────────────────────────────────────────────┐
│ Agent Activity — Today                                  │
│                                                         │
│ 2:34 PM ✅ Rescheduled interview: Jordan Kim            │
│          Wed 2-3pm with Alex Chen                       │
│          [Undo — 28 min remaining] [Details]            │
│                                                         │
│ 2:12 PM ✅ Sent follow-up: Priya Sharma                │
│          Thank-you note after final round               │
│          [Undo — 6 min remaining] [Details]             │
│                                                         │
│ 1:45 PM ⚠️ Skipped: Budget approval request             │
│          Escalated — outside authorized scope            │
│          [View escalation] [Handle manually]            │
│                                                         │
│ 11:30 AM ✅ Updated candidate status: 3 candidates     │
│          Moved to "Interview Scheduled"                  │
│          [Undo — expired] [Details]                      │
└─────────────────────────────────────────────────────────┘
```

2. **Status indicators.** Clear visual distinction between completed actions, pending actions, escalated items, and undone actions.

3. **Time-limited undos.** Undo windows appropriate to the action type: 30 minutes for email sends, 24 hours for schedule changes, 7 days for data modifications. After the window expires, the undo option is removed but the action remains in the audit trail.

4. **Detail drill-down.** Each action expands to show the full rationale (P3), confidence level (P4), data sources used, and alternatives considered.

**Design considerations:**

1. **Make the audit trail accessible, not hidden.** The action log should be one click away at most, not buried in settings. Consider a persistent sidebar or a badge indicator showing recent activity.

2. **Support filtering and search.** As the audit trail grows, users need to find specific actions: by type, by date range, by status, by affected entity.

3. **Design undo as undo, not as "create opposite action."** When a user undoes a sent email, the expectation is that the email is recalled — not that a "sorry, please disregard" follow-up is sent. If true undo is technically impossible, communicate this honestly.

> **Practitioner Perspective — Cyd Harrell:**
> "What does 'undo' mean in government contexts?" When a benefits determination has been communicated to a citizen, undoing the determination may not undo the consequences — the citizen may have made financial decisions based on the original determination. In high-stakes contexts, the audit trail is not just a convenience feature; it is a legal record. And undo must be accompanied by communication to all affected parties.
>
> — Cyd Harrell, City & County of San Francisco (2024)

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| Reversion Rate | <5% | Low rates indicate agent is acting correctly; >5% triggers automation review — consider disabling autonomous action for the affected task type |
| Safety Net Conversion | Measured | % of users who undo an action but then upgrade the agent's autonomy within 7 days — indicates the undo built trust rather than eroded it |
| Audit Trail Engagement | Measured | How often users access the audit trail (low engagement at L4 is concerning) |

**Playbook connection:** [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the telemetry infrastructure that feeds the action audit trail. [Pattern 77 (Shell Hook System)](AI_AGENT_PATTERNS_PLAYBOOK.md) — external program interceptors that can trigger undo-related side effects.

---

#### P6. Escalation Pathway

**Lifecycle phase:** Post-Action (or mid-action)
**Autonomy levels:** L3 (Act with Confirmation), L4 (Act Autonomously)
**What it does:** Enables the agent to acknowledge its own limits, pause execution, and hand control back to a human — either the user or a designated escalation contact.

**When to use:**
- When the agent encounters a situation outside its training or authorized scope
- When confidence drops below a defined threshold
- When multiple conflicting constraints make a clear action impossible
- When the action would affect someone other than the user (e.g., contacting a third party in an unexpected way)

**Risk of omission:** Without Escalation Pathways, agents either fail silently (taking no action and not informing the user), fail loudly (producing an error message that doesn't help), or fail dangerously (forcing a low-confidence action because no escalation path exists).

**Anatomy:**

Three escalation patterns, used based on the nature of the uncertainty:

1. **Clarification Request.** The agent needs more information to proceed.
   > "I found two candidates named 'Jordan Kim' in the system. Which one should I reschedule?"

2. **Option Presentation.** The agent has identified multiple valid approaches and cannot determine which the user prefers.
   > "The candidate requested Wednesday, but your interviewer has two available slots: 10am or 3pm. Which do you prefer?"

3. **Human Intervention Request.** The situation is outside the agent's scope or capability.
   > "The candidate has raised a concern about accessibility accommodations that I'm not equipped to handle. I've flagged this for [HR Contact] and paused the scheduling process."

**Example — Escalation Chain for a Recruiting Agent:**

```
Situation: Candidate requests accommodation for a disability during the interview.

Agent assessment:
• This involves protected class information (legal sensitivity: HIGH)
• I am not authorized to make decisions involving disability accommodations
• This requires human judgment from someone with appropriate training

Escalation path:
1. Acknowledge to candidate: "Thank you for letting us know.
   I'm connecting you with our HR team who can help with
   accommodations."
2. Notify: HR Contact (primary) → Hiring Manager (CC)
3. Transfer context: candidate name, role, interview date,
   accommodation request (verbatim), all prior correspondence
4. Pause: All scheduling actions for this candidate until
   HR provides guidance
5. Log: Full escalation record in audit trail
```

The agent's value in this scenario is not solving the problem — it is recognizing the boundary and routing efficiently. The escalation itself is a service.

**Design considerations:**

1. **Make escalation a feature, not a failure.** The language and visual design of escalation should communicate that the agent is being responsible, not incompetent. "I want to make sure this is handled correctly" rather than "Error: cannot process request."

2. **Preserve context during escalation.** When the agent hands off to a human, all relevant context (what was attempted, what data was used, why escalation was triggered) should transfer with the handoff.

3. **Support escalation chains.** The user may not be the right person to handle an escalation. Allow the agent to escalate to designated contacts based on the nature of the issue: technical issues → engineering, policy issues → compliance, sensitive issues → management.

**Metrics:**

| Metric | Target | What It Indicates |
|--------|--------|-------------------|
| Escalation Frequency | 5-15% of tasks | Below 5%: agent may be overconfident; above 15%: agent may be underperforming |
| Recovery Success | >90% | Escalated issues are resolved successfully with human intervention |
| Escalation Resolution Time | Decreasing trend | The handoff process is becoming smoother |
| Re-escalation Rate | <10% | The same issue doesn't bounce back after initial escalation |

**Playbook connection:** [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the technical mechanism for pausing agent execution and preserving state for human handoff.

---

### Repair & Redress

---

#### P7. Empathic Error Recovery

**Lifecycle phase:** Post-Action (triggered by error detection or user complaint)
**Autonomy levels:** All
**What it does:** Treats agent errors as relationship ruptures that require mending, not just technical problems that require fixing. Applies the Service Recovery Paradox: a well-handled mistake can build more trust than a long history of flawless execution.

**When to use:**
- When the agent takes an incorrect action
- When the user reports dissatisfaction with an agent action
- When the agent's action produces an unintended consequence
- When a pattern of minor errors is detected before it becomes a major failure

**Risk of omission:** Without empathic error recovery, every agent mistake erodes trust. Users accumulate grievances. Eventually, a single error (which might be minor in isolation) triggers complete disengagement. The agent loses not because of one bad action but because of accumulated, unaddressed friction.

**Anatomy:**

The Service Recovery Paradox operates under three conditions:
1. The failure is not perceived as serious (a reschedule, not a lost job offer)
2. The recovery feels sincere and adequate (not a form letter)
3. The failure is not repeated (learning is demonstrated)

When these conditions are met, the user's trust *after recovery* can exceed their trust *before the error.* This is counterintuitive but well-documented in service design research.

Error recovery has three components:

1. **Acknowledge the error.** State what went wrong, clearly and without deflection. "I sent the interview invitation to the wrong email address" — not "There was an issue with the email delivery."

2. **State the immediate correction.** What has been done or will be done to fix the problem right now. "I've recalled the email and prepared a corrected version for your review."

3. **Provide a path to human help.** If the error has consequences that the agent cannot resolve, connect the user to a human who can. "If Jordan received the incorrect email, you may want to reach out personally. Here's their contact information and a draft apology."

**Example:**

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ Error Detected — Interview Scheduling                │
│                                                         │
│ What happened:                                          │
│ I scheduled Jordan Kim's interview for Thursday 2pm,    │
│ but Alex Chen has a conflict I didn't detect (it was    │
│ in a secondary calendar I don't have access to).        │
│                                                         │
│ What I've done:                                         │
│ • Recalled the calendar invitation (within undo window) │
│ • Identified 3 alternative slots where both are free    │
│ • Drafted an apology note for your review               │
│                                                         │
│ What you may want to do:                                │
│ • Review the alternative slots: [View options]          │
│ • Send the apology note: [Review draft]                 │
│ • Handle this manually: [Take over]                     │
│                                                         │
│ I've reduced my autonomy for scheduling tasks until     │
│ I can access all relevant calendars.                    │
│                                                         │
│ [View full error details]                               │
└─────────────────────────────────────────────────────────┘
```

**Design considerations:**

1. **Don't hide errors.** Suppressing or minimizing errors destroys trust faster than the errors themselves.

2. **Self-adjust autonomy after errors.** If the agent made an error at L4, it should propose reducing its autonomy level for similar tasks: "I've made an error in scheduling. I'll show you plans before acting on scheduling tasks until we resolve the calendar access issue."

3. **Learn from errors.** The error recovery process should feed back into the system: update rules, flag data gaps, adjust confidence calibration.

4. **Design recovery UX with the same care as success UX.** Error states are not edge cases — they are inevitable and their design is a primary trust-building opportunity.

**The Service Recovery Paradox — Conditions and Limits:**

The paradox (trust after recovery > trust before error) is real but bounded:

| Condition | Met | Not Met |
|-----------|-----|---------|
| Failure not serious | Minor scheduling error → paradox works | Lost job offer → trust destroyed regardless of recovery |
| Recovery feels sincere | Specific acknowledgment + concrete fix → paradox works | Generic "sorry for the inconvenience" → paradox fails |
| Failure not repeated | First-time calendar conflict → paradox works | Third calendar conflict this month → paradox fails, autonomy must decrease |

**Design implications of the limits:**

1. **Track error frequency per task type.** The paradox works for the *first* error. After that, the error is a pattern, not an incident. P5 (Action Audit) provides the tracking; the system should auto-reduce autonomy when error frequency exceeds thresholds.

2. **Calibrate recovery to severity.** A minor scheduling error needs a brief acknowledgment and fix. A data breach needs a full incident response with human escalation. The recovery UX should scale with the severity — not every error gets the same template.

3. **Close the loop.** After recovery, follow up: "I've made a change to prevent this type of error. Here's what I adjusted: [specific change]. You should see fewer [error type] going forward." This demonstrates learning, which is the foundation for re-earning trust.

4. **Involve the human appropriately.** Some errors require the user's involvement in the recovery (choosing between alternative actions). Others should be self-corrected with notification only. Design the recovery path based on whether human judgment is needed for the fix, not just for the acknowledgment.

**Playbook connection:** [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md) — guardrails that detect error conditions and trigger recovery. [Pattern 53 (Observability)](AI_AGENT_PATTERNS_PLAYBOOK.md) — the logging that captures error context for both recovery and learning.

---

### Anti-Pattern: Agentic Sludge

**What it is:** Traditional dark patterns create friction to prevent user action (making cancellation difficult, hiding unsubscribe links). Agentic sludge is the opposite: it removes friction to a fault, making it too easy for users to accept actions that primarily benefit the business, not the user.

**How it manifests:**

1. **Biased defaults.** A travel agent defaults to a partner airline even when cheaper options exist, framing the choice as convenience: "I've found you a great flight on [Partner Airline]!" The user accepts because accepting is easy and the framing sounds helpful.

2. **Consent bundling.** Grouping high-value and low-value authorizations together: "Allow the agent to manage your schedule and access your contacts" bundles a reasonable permission with an expansive one.

3. **Friction asymmetry.** Making acceptance a single click but requiring multiple steps for rejection, modification, or escalation.

4. **Urgency manufacturing.** Creating artificial time pressure: "I should book this now — the price may increase." When the agent controls the information asymmetry, urgency claims are unverifiable.

**Related concept — Imagined Competence:**

LLMs sound authoritative even when incorrect. This is not sludge (which is intentional design) but it produces the same effect: users accept outputs without appropriate scrutiny because the presentation signals competence.

**Antidotes:**

1. **Provenance via primitives** (Yocco): translate system decisions into user-readable rationales. `Logic: Cheapest_Direct_Flight` becomes "I chose this flight because it was the cheapest non-stop option." When the logic is visible, biased defaults become apparent.

2. **Equal-friction design.** Make acceptance, rejection, and modification equally easy. If "Proceed" is one click, "Edit" and "Cancel" should also be one click.

3. **Evidence-based design** (Hall): require evidence for design decisions, including AI-assisted ones. "We added this default because it tested well with users" is evidence. "We added this default because it increases revenue" is a business decision masquerading as a design decision.

4. **Regular sludge audits.** Review agent defaults, friction patterns, and acceptance rates for signs of sludge. High acceptance rates on actions that benefit the business more than the user are a red flag.

**Transparency via Primitives — The Technical Antidote:**

Yocco's "provenance via primitives" concept bridges the gap between system behavior and user understanding. The technique: map technical system actions (API calls, logic gates, database queries) to human-readable rationales.

| System Primitive | User-Facing Translation |
|-----------------|------------------------|
| `Logic: Cheapest_Direct_Flight` | "I chose this flight because it was the cheapest non-stop option." |
| `API: partner_airline.availability()` | "I checked [Partner Airline] first because they're in our booking network." |
| `Filter: departure_time > 06:00 AND < 09:00` | "I filtered for morning departures based on your preference." |
| `Sort: price ASC` | "Options are sorted by price, lowest first." |
| `Exclude: layover > 2h` | "I excluded flights with layovers over 2 hours." |

When primitives are visible, sludge becomes detectable. If the system's rationale says "cheapest non-stop" but the result is not actually the cheapest non-stop, the discrepancy is apparent. If the system checked the partner airline *first* (rather than searching all airlines and sorting by price), that bias is visible.

The key insight: **transparency does not prevent sludge through policy — it prevents sludge through visibility.** When the reasoning is legible, biased defaults cannot hide behind helpful framing.

**Playbook connection:** [Pattern 52 (Constitutional AI)](AI_AGENT_PATTERNS_PLAYBOOK.md) — value alignment at the reasoning level prevents the agent from generating sludge in its recommendations.

---

### Pattern Summary Table

| Pattern | Lifecycle | Best For | Primary Risk If Omitted | Key Metric | Playbook Pattern |
|---------|-----------|----------|------------------------|------------|-----------------|
| P1. Intent Preview | Pre-Action | L2-L3 actions with consequences | Users discover agent actions after consequences | Acceptance Ratio >85% | 20, 44 |
| P2. Autonomy Dial | Pre-Action | Configuring per-task autonomy | All-or-nothing autonomy creates over/under-delegation | Trust Density distribution | 64, 70 |
| P3. Explainable Rationale | In-Action | L3-L4 actions users didn't request | Automation anxiety, learned helplessness | "Why?" Ticket Volume ↓ | 52, 53 |
| P4. Confidence Signal | In-Action | L2-L3 recommendations | All outputs carry equal implicit authority | Calibration Score >0.8 | 50 |
| P5. Action Audit & Undo | Post-Action | All levels, critical at L4 | Users cannot verify or reverse agent actions | Reversion Rate <5% | 53, 77 |
| P6. Escalation Pathway | Post-Action | L3-L4 edge cases | Silent failures, forced low-confidence actions | Escalation Freq 5-15% | 20 |
| P7. Error Recovery | Post-Action | All levels after errors | Accumulated unaddressed errors destroy trust | Recovery → Trust ↑ | 50, 53 |

---

## Part C: Governance, Rollout, and Metrics

Principles and patterns are design tools. Without organizational structures to enforce them, they degrade over time — overridden by shipping pressure, deprioritized in favor of features, or forgotten as teams change. This section defines the governance structures, implementation phases, and measurement frameworks that sustain principled design.

**Source:** Primarily Victor Yocco, "Designing For Agentic AI" Parts 1 & 2 (Smashing Magazine, 2026).

---

### Agentic AI Ethics Council

A cross-functional governance body responsible for agentic AI policy, risk assessment, and ongoing oversight. Not a one-time review board but a standing function with regular cadence and clear authority.

**Composition and Responsibilities:**

| Function | Role in Council | Key Deliverables |
|----------|-----------------|------------------|
| **Legal / Compliance** | Define regulatory boundaries, identify hard no-go zones | Compliance checklist, regulatory watch list |
| **Product** | Set autonomy policy, maintain Agent Risk Register | Autonomy policy document, risk register updates |
| **UX Research** | Conduct trust calibration studies, run simulated misbehavior tests | Trust calibration reports, misbehavior test results |
| **Engineering** | Implement robust logging, one-click undo, rationale hooks | Technical audit capabilities, undo infrastructure |
| **Support** | Front-line failure handling, feedback loop to council | Failure taxonomy, escalation patterns, user sentiment |

**Living Documents:**

1. **Agent Risk Register.** A maintained inventory of all agent capabilities, their autonomy levels, known failure modes, and mitigation strategies. Updated whenever capabilities change.

2. **Action Audit Logs.** Centralized, searchable logs of all agent actions across the organization. Used for both real-time monitoring and periodic review.

3. **Autonomy Policy Documentation.** The organizational rules governing what agents can and cannot do, at what autonomy levels, for which user roles. This is the organizational expression of the Autonomy Dial.

**Agent Risk Register — Example Structure:**

| Agent | Task Scope | Current Autonomy | Known Failure Modes | Mitigation | Last Review |
|-------|-----------|-----------------|--------------------|-----------|-----------| 
| Scheduling Agent | Interview scheduling, rescheduling | L3 (Act with Confirmation) for new schedules; L4 for reschedules within rules | Calendar conflicts from secondary calendars; timezone mismatches | P1 (Intent Preview) for new; P5 (Audit) for reschedules; secondary calendar access pending | 2026-03-15 |
| Email Agent | Draft replies, send routine responses | L2 (Plan & Propose) | Tone mismatches in sensitive contexts; hallucinated details | Human review of all drafts; sentiment analysis guardrail | 2026-03-22 |
| Code Review Agent | Flag issues, suggest fixes | L1 (Observe & Suggest) for security; L2 for style | False positives in security flags; overly aggressive style suggestions | Confidence threshold for security (>90%); style suggestions optional | 2026-03-10 |

The risk register is a living document. Every capability change, every incident, and every phase transition in the rollout roadmap triggers a risk register review. The register answers four questions for each agent: *What can it do? What can go wrong? How do we prevent it? When did we last check?*

**Cadence:**

- **Weekly:** Review support escalations and failure patterns. Update risk register for any new incidents.
- **Monthly:** Review metrics dashboards (see Metrics Framework below). Assess whether any agent tasks should move up or down in autonomy level.
- **Quarterly:** Trust calibration studies (do users' mental models match agent behavior?), simulated misbehavior testing (see Taxonomy section), policy review (are autonomy policies still appropriate given capability changes?).
- **Ad-hoc:** Triggered by critical incidents (any P1 error), regulatory changes (new compliance requirements), or capability launches (agent gains new tools or permissions).

> **Research Note — Lennart Nacke:**
> Nacke's AI Responsibility Framework provides a model for governance at the research level: six prompt layers with deontological constraints (things the system must never do) and consequentialist considerations (outcomes the system must weigh). The framework demonstrates how structured governance prevents compounding ethical failures — each layer catches errors that the previous layer missed.
>
> — Lennart Nacke, "The AI Responsibility Framework for UX Researchers" (2026)

> **Practitioner Perspective — Cyd Harrell:**
> Government institutions have long experience with governance structures for high-stakes decision-making. Civic governance provides a model for AI governance: transparent policy frameworks, audit requirements, appeal pathways, and accountability chains. The Agentic AI Ethics Council adapts these institutional practices for product organizations.
>
> — Cyd Harrell, City & County of San Francisco (2024)

---

### Phased Implementation Roadmap

Do not deploy all patterns simultaneously. Roll out in three phases, each building on the trust and infrastructure established by the previous phase. Phase transitions are gated by measurable exit criteria — not timelines.

---

#### Phase 1: Foundational Safety

**Autonomy ceiling:** L1 (Observe & Suggest), L2 (Plan & Propose)
**Deploy:** P1 (Intent Preview) and P5 (Action Audit) infrastructure
**Goal:** Build a bedrock of trust without introducing autonomous action risk

**What to build:**

1. **Intent Preview (P1) — rock solid.** This is the most important pattern. If users cannot see what the agent plans to do before it acts, nothing else matters. Invest in clear plan presentation, intuitive modification controls, and reliable execution of approved plans.

2. **Action Audit infrastructure (P5).** Even at L1-L2, where the agent is not acting autonomously, build the logging infrastructure. Every suggestion made, every plan proposed, every user response — logged and searchable. This infrastructure pays compound interest in Phase 2 and 3.

3. **Escalation basics (P6).** The agent must be able to say "I don't know" and hand off to a human. This seems trivial but requires infrastructure: state preservation, context transfer, and routing to the right person.

**Example — Phase 1 for a Customer Support Agent:**

```
Week 1-2: Deploy at L1 (Observe & Suggest)
• Agent monitors incoming tickets
• Suggests category tags (no auto-tagging)
• Surfaces relevant knowledge base articles
• All suggestions logged in audit trail

Week 3-4: Deploy at L2 (Plan & Propose)
• Agent drafts response plans for known issue types
• Presents: "Here's a draft response. Send, Edit, or Dismiss?"
• User acceptance/rejection/edits feed into model improvement
• Intent Preview shows: drafted response, sources used,
  confidence level, similar past tickets

Week 5-8: Stabilize and measure
• Focus on metrics, not new features
• Identify task types with high acceptance rates (candidates for Phase 2)
• Identify task types with high override rates (need model improvement)
• Build institutional confidence through dashboards and reviews
```

**Exit criteria:**

| Metric | Threshold | Rationale |
|--------|-----------|-----------|
| Intent Preview Acceptance Ratio | Stable >85% for 4+ weeks | Users trust the agent's plan quality |
| Audit Log Coverage | 100% of actions logged | Infrastructure is complete |
| Escalation Success Rate | >90% resolved | Human handoff works reliably |
| User Satisfaction (survey) | >3.5/5 | Users find the agent helpful, not annoying |

---

#### Phase 2: Calibrated Autonomy

**Autonomy ceiling:** L3 (Act with Confirmation)
**Deploy:** P2 (Autonomy Dial — limited settings), P3 (Explainable Rationale), P4 (Confidence Signal)
**Goal:** Teach users how the agent thinks, let them set the pace of delegation

**What to build:**

1. **Autonomy Dial (P2) — limited scope.** Start with 2-3 task types that have clear success criteria and low consequences of error. Allow users to move between L1, L2, and L3 for these specific tasks.

2. **Explainable Rationale (P3).** When the agent stages an action for confirmation, show the reasoning. "Because you said X, I did Y." This is where users learn to trust (or not trust) the agent's judgment.

3. **Confidence Signal (P4).** Attach confidence levels to all agent recommendations. This teaches users to calibrate their scrutiny — spending more time on low-confidence items and less on high-confidence ones.

**Exit criteria:**

| Metric | Threshold | Rationale |
|--------|-----------|-----------|
| Proceed Rate (at L3) | >80% | Users approve staged actions most of the time |
| Undo Rate (at L3) | <5% | Approved actions are rarely reversed |
| Trust Density (L3) | Increasing | Users are moving more tasks to L3 |
| Confidence Calibration | Pearson >0.7 | Stated confidence roughly matches actual accuracy |
| Rationale Validation | >60% "Helpful" | Users find rationales useful |

---

#### Phase 3: Proactive Delegation

**Autonomy ceiling:** L4 (Act Autonomously) — for specific pre-approved tasks only
**Deploy:** L4 settings on Autonomy Dial for qualifying tasks, P7 (Error Recovery)
**Goal:** Full delegation where Phase 2 data demonstrates reliability

**What to build:**

1. **Autonomous execution for qualifying tasks.** Based on Phase 2 data, identify task types where the agent has demonstrated high accuracy, high user acceptance, and low undo rates. These — and only these — become eligible for L4.

2. **Error Recovery (P7).** At L4, errors happen without real-time human oversight. The error recovery mechanism must detect errors, communicate them clearly, propose corrections, and adjust autonomy automatically.

3. **Continuous monitoring.** L4 is not "set and forget." Ongoing monitoring of all metrics, with automatic alerts when thresholds are breached and automatic autonomy downgrade when error rates increase.

4. **Scope expansion protocol.** When L4 works well for initial task types, the organization will want to expand. Each expansion follows a mini-Phase-2: the new task type starts at L3 (Act with Confirmation), graduates to L4 only after meeting the same data thresholds that qualified the original tasks.

**Example — Phase 3 for a Customer Support Agent:**

```
Qualifying tasks (based on Phase 2 data):
├── Password reset requests
│   Phase 2 proceed rate: 97% | Undo rate: 0.5%
│   → APPROVED for L4
│   Boundary: auto-respond with reset link, log action
│
├── Order status inquiries
│   Phase 2 proceed rate: 94% | Undo rate: 1.2%
│   → APPROVED for L4
│   Boundary: auto-respond with tracking info, log action
│
├── Refund requests under $50
│   Phase 2 proceed rate: 89% | Undo rate: 3.1%
│   → APPROVED for L4 with guardrail
│   Boundary: auto-approve per policy, $50 limit, max 1/customer/month
│
├── Complex product questions
│   Phase 2 proceed rate: 72% | Undo rate: 8%
│   → NOT APPROVED for L4
│   Remains at L3 (draft response, human reviews)
│
└── Complaint handling
    Phase 2 proceed rate: 61% | Undo rate: 15%
    → NOT APPROVED for L4
    Remains at L2 (suggest approach, human handles)
```

The data makes the decisions. Mechanical tasks with high accuracy graduate. Judgment-intensive tasks remain at lower autonomy levels. The boundary is transparent and evidence-based — not a judgment call by a product manager.

**Entry criteria (from Phase 2 data):**

| Metric | Threshold | Rationale |
|--------|-----------|-----------|
| Phase 2 Proceed Rate for task type | >90% for 8+ weeks | Demonstrated reliability |
| Phase 2 Undo Rate for task type | <2% for 8+ weeks | Very low error rate |
| Confidence Calibration for task type | Pearson >0.8 | Reliable self-assessment |
| User opt-in | Explicit per-task consent | No default-on autonomy |

**Ongoing monitoring:**

| Metric | Alert Threshold | Action |
|--------|----------------|--------|
| Unintended Actions per 1K Tasks | >1% | Investigate and flag |
| Reversion Rate | >5% | Auto-downgrade to L3 |
| Escalation Frequency | <5% or >20% | Review agent behavior |
| User satisfaction (ongoing) | <3.5/5 | Pause L4 expansion |

> **Practitioner Perspective — Yulia Lapicus:**
> "2025 was the AI feature era. 2026 is the trust era." Lapicus's framing maps directly to the phase progression: Phase 1 is building foundational safety (no features without trust infrastructure), Phase 2 is calibrating trust through transparency, Phase 3 is earning delegation through demonstrated reliability. The shift from features to outcomes is the shift from Phase 1 to Phase 3.
>
> — Yulia Lapicus, "2025 was the AI feature era. 2026 is the trust era." (2026)

---

### Metrics Framework

A consolidated view of all metrics referenced in Parts B and C, organized by scope and purpose.

#### System-Level Metrics

These metrics apply across all agent actions and provide an organizational view of agent performance.

| Metric | Definition | Target | Collection Method |
|--------|-----------|--------|-------------------|
| **Intervention Rate** | % of agent actions where no counter-action occurs within the time window | >95% acceptance | Absence-of-counter-action windows (24h default) |
| **Unintended Actions / 1K Tasks** | Actions the user did not expect or want, per 1,000 agent tasks | <1% | User-reported + audit log anomaly detection |
| **Rollback Rate** | % of agent actions that are undone | <5% (>5% triggers review) | Undo tracking + microsurvey |
| **Undo Microsurvey** | Why was this action undone? | Categorized | In-context survey: "Wrong time? Wrong person? Preferred manual?" |
| **Time to Resolution After Error** | Time from error detection to resolution | Decreasing trend | Audit log timestamps |

#### Per-Pattern Metrics

| Pattern | Metric | Target | What It Indicates |
|---------|--------|--------|-------------------|
| **P1 Intent Preview** | Acceptance Ratio | >85% | Users trust agent plans |
| | Override Frequency | <10% | >10% triggers model review |
| | Recall Accuracy | High | Users remember what the agent said it would do |
| **P2 Autonomy Dial** | Trust Density | % per level | How users distribute trust across autonomy levels |
| | Setting Churn | Low changes/user/month | High churn = unmet expectations |
| **P3 Explainable Rationale** | "Why?" Ticket Volume | Decreasing | Rationales preempt user questions |
| | Rationale Validation | >70% "Helpful" | Rationales are actually useful |
| **P4 Confidence Signal** | Calibration Score | Pearson >0.8 | Stated confidence matches actual accuracy |
| | Scrutiny Delta | ~+12s for low-confidence | Users apply appropriate scrutiny |
| **P5 Action Audit & Undo** | Reversion Rate | <5% | Low = agent acts correctly; high = disable automation |
| | Safety Net Conversion | Measured | % upgrading autonomy within 7 days of undo |
| **P6 Escalation Pathway** | Escalation Frequency | 5-15% | <5% overconfident; >15% underperforming |
| | Recovery Success | >90% | Escalated issues get resolved |
| **P7 Error Recovery** | Recovery Trust Impact | Positive | Trust after recovery ≥ trust before error |

#### Instrumentation Requirements

1. **Agent Action IDs.** Every agent action receives a unique, persistent identifier that links the action to its rationale, data sources, confidence score, user response, and any subsequent undo or escalation. These IDs appear in user-facing interfaces (Action Audit) and internal logs.

2. **Absence-of-counter-action windows.** The Intervention Rate metric requires a time window within which user inaction is interpreted as implicit acceptance. Default: 24 hours. Configurable per action type (shorter for time-sensitive actions, longer for complex decisions).

3. **Microsurveys on undo.** When a user undoes an agent action, present a brief (3-option) survey: "Wrong time? Wrong person? Preferred manual?" This categorizes undo reasons without adding significant friction. Response rates above 60% are expected when the survey is well-timed.

4. **Confidence calibration tracking.** Record both the agent's stated confidence and the actual outcome for every action. Periodically compute calibration metrics (Pearson correlation, expected calibration error) and adjust confidence generation if calibration degrades.

5. **Trust trajectory tracking.** Track how individual users' autonomy settings change over time. A healthy trajectory shows gradual progression from L1/L2 to L3/L4 for specific task types, with occasional regressions after errors followed by recovery. Unhealthy trajectories: permanent regression (trust was destroyed), no progression (agent is not useful enough to earn trust), or instant L4 (user has not calibrated trust through experience).

6. **Error categorization.** Not all errors are equal. Categorize errors by:
   - **Severity:** Cosmetic → Inconvenient → Consequential → Critical
   - **Cause:** Data gap → Model error → Scope violation → Guardrail failure
   - **Recovery:** Self-corrected → User-corrected → Required escalation → Irreversible
   
   This categorization feeds into the Agent Risk Register and informs which task types are ready for higher autonomy levels.

#### Dashboard Design

The metrics framework should be surfaced through dashboards appropriate to each audience:

**For Product/UX Teams:**
- Trust Density distribution (how users distribute autonomy across task types)
- Acceptance/Override rates by task type
- Error patterns and recovery success
- User satisfaction trends

**For Engineering Teams:**
- Confidence calibration scores by model/task
- Latency of rationale generation
- Audit log completeness
- Escalation routing accuracy

**For the Ethics Council:**
- Aggregate intervention rates across all agents
- Unintended action trends
- Misbehavior test results
- Compliance audit summaries
- User complaints categorized by severity and root cause

> **Practitioner Perspective — Charles Waite:**
> "Within 3-5 years, AI will produce 'passable UX' from simple prompts." Waite's prediction underscores why metrics matter: if passable becomes the floor, only measurement distinguishes passable from great. The metrics framework is how organizations ensure they are building great, not just passable, AI experiences.
>
> — Charles Waite, "On the Responsible Use of AI in Design" (2025)

---

### Constraint Taxonomy

Constraints are the enforceable boundaries of agentic behavior. The governance structures above (Ethics Council, Rollout Phases, Metrics) define *who decides* and *how to measure*. Constraints define *what cannot be violated* — the hard and soft limits that agents operate within.

**Source:** AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab). Organized into 8 categories, mapped to this document's principles and the playbook's technical patterns.

#### Quality & Safety Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Privacy Preserving** | Personal data handling complies with policy (GDPR, CCPA, etc.) | P11, P17 | Pattern 64 (Permissions) | Automated + Policy |
| **Human Verification** | Outputs above risk threshold require human review before action | P13 | Pattern 20 (Suspend/Resume) | Automated gate |
| **Authentication Required** | Agent actions are tied to verified identity | P11 | Pattern 64 (Permissions) | Automated |
| **Role-Based Access** | Different users have different agent authority levels | P16 | Pattern 64 (Permissions) | Automated |
| **Content Safety Policy** | Output does not contain harmful, offensive, or misleading content | P15 | Pattern 50 (Guardrails) | Automated + Council |
| **Data Retention** | Data is kept only for the specified period, then deleted | P17 | Pattern 56 (Storage) | Policy + Automated |
| **Audit Logging** | Every agent action is logged with full provenance | P13 | Pattern 53 (Observability) | Automated |
| **User Consent** | Agent cannot access data or perform actions without explicit user consent | P11 | Pattern 64 (Permissions) | Automated gate |
| **Evaluation Coverage** | Model outputs are tested against golden datasets before deployment | P10 | Pattern 54 (Golden Dataset) | CI/CD |
| **Encryption Required** | Data at rest and in transit is encrypted | P16 | Pattern 56 (Storage) | Automated |

#### Performance & Resource Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Latency Budget** | Response time stays within defined threshold (e.g., <2s for interactive) | P6 | Pattern 65 (Speculative Execution) | Automated |
| **Rate Limit** | Maximum requests per time window to prevent abuse and control costs | P15 | Pattern 58 (Circuit Breaker) | Automated |
| **Cost Budget** | Per-session or per-task spending does not exceed defined ceiling | P9 | Pattern 71 (Runtime Cost Gating) | Automated |
| **Compute Budget** | GPU/CPU allocation stays within resource limits | P9 | Pattern 71 (Cost Gating) | Automated |
| **Caching Policy** | Repeated queries are served from cache when semantically equivalent | P9 | Pattern 47 (Semantic Caching) | Automated |

#### Model & Technical Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Confidence Threshold** | Actions below confidence level require human confirmation | P10 | Pattern 50 (Guardrails) | Automated + P4 |
| **Context Window** | Total token usage stays within model limits | P6 | Pattern 7 (Compaction), 68 (Reactive) | Automated |
| **Quality Threshold** | Output quality score must exceed minimum before delivery | P10 | Pattern 12 (Self-Refine) | Automated |
| **Model Portability** | System works across multiple model providers without lock-in | P17 | Pattern 19 (Schema Compat) | Architecture |
| **Few-Shot Examples** | Minimum number of examples required for reliable task performance | P10 | Pattern 6 (Context Engineering) | Policy |

#### UX & Interaction Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Tone & Voice** | Agent communication matches brand and context guidelines | P5 | Pattern 52 (Constitutional AI) | Automated |
| **Error Handling Strategy** | Errors are handled gracefully with user-facing recovery paths | P3, P10 | Pattern 50 (Guardrails) | P7 (Error Recovery) |
| **Streaming Mode** | Long-running tasks show incremental progress, not blocking wait | P6 | Pattern 66 (Streaming Tools) | Automated |
| **Localization Requirements** | Output adapts to user's language, region, and cultural context | P14 | — | Policy |
| **Accessibility Compliance** | Generated interfaces meet WCAG standards | P8 | — | Automated + Review |

#### Data & Context Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Output Format** | Agent output conforms to specified structure (JSON, markdown, etc.) | P6 | Pattern 49 (Structured Outputs) | Automated |
| **Context Scope Limit** | Agent only accesses data within defined scope boundaries | P11, P16 | Pattern 64 (Permissions) | Automated |

#### Execution Behavior Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Autonomous Execution** | Whether the agent may act without per-action human approval | P12 | P2 (Autonomy Dial) | Policy + Automated |
| **Parallel Execution** | Whether multiple agent tasks may run simultaneously | P9 | Pattern 66 (Streaming Tools) | Architecture |
| **Timeout Limit** | Maximum duration for any single agent operation | P9 | Pattern 44 (Model Loop) | Automated |

#### Code Philosophy Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Minimal Changes** | Agent modifications to code or data are scoped to minimum necessary | P9 | Pattern 21 (ACI Design) | Policy |
| **Code Style Adherence** | Generated code matches project conventions | P6 | Pattern 69 (Hierarchical Memory) | Automated |
| **Backward Compatibility** | Agent actions do not break existing functionality | P15 | Pattern 54 (Golden Dataset) | CI/CD |

#### Attribution Constraints

| Constraint | What It Enforces | Principle | Playbook Pattern | Enforcement |
|-----------|-----------------|-----------|-----------------|-------------|
| **Attribution Required** | AI-generated content is disclosed as such | P13 | — | Policy |
| **Data Provenance** | Source of data used in decisions is traceable and documented | P3, P13 | Pattern 53 (Observability) | Automated |
| **Source Citation** | Claims and recommendations cite their data sources | P3, P10 | P3 (Explainable Rationale) | Automated |

#### Constraint Enforcement Matrix

This matrix maps each constraint category to its enforcement mechanisms and the rollout phase where it should be deployed:

| Category | Automated Check | Human Review | Council Oversight | Rollout Phase |
|----------|----------------|-------------|-------------------|---------------|
| **Quality & Safety** | Pattern 50, 54 | Monthly audit | Quarterly review | Phase 1 (Foundational Safety) |
| **Performance & Resource** | Pattern 71, 58 | Ad-hoc | — | Phase 1 |
| **Model & Technical** | Pattern 7, 12, 50 | Per-release | — | Phase 1 |
| **UX & Interaction** | Pattern 52 | User testing | Quarterly review | Phase 2 (Calibrated Autonomy) |
| **Data & Context** | Pattern 49, 64 | Per-feature | Ad-hoc | Phase 1 |
| **Execution Behavior** | P2, Pattern 44 | Per-task-type | Phase transitions | Phase 2-3 |
| **Code Philosophy** | Pattern 54, 69 | Code review | — | Phase 1 |
| **Attribution** | Pattern 53 | Spot checks | Quarterly review | Phase 2 |

**How to use this taxonomy:** During the Ethics Council's Agent Risk Register review, assess each agent capability against applicable constraints. If a capability violates a constraint, it either needs a mitigation (automated check, human review gate) or must not be deployed. The Enforcement Matrix shows where each category's checks belong in the phased rollout.

---

## Cross-Reference: Principles → Patterns → Taxonomy → Playbook

This table maps the relationships between Part A principles, Part B patterns, Autonomy Taxonomy levels, and the playbook's technical patterns. Use it to trace from design intent (principles) through interaction design (patterns) to implementation (playbook).

| CMU Design Principle | UX Pattern | Autonomy Level | Playbook Pattern | Relation |
|---------------------|------------|----------------|-----------------|----------|
| P12: Negotiate Agency Moment-by-Moment | P1 Intent Preview | L2-L3 | Pattern 20 (Suspend/Resume), Pattern 44 (Model Loop) | enables |
| P11: Design Consent as Continuous | P2 Autonomy Dial | All | Pattern 64 (Multi-Layer Permissions), Pattern 70 (Denial Tracking) | requires |
| P3: Design AI as Transparent Thinking Partner | P3 Explainable Rationale | L3-L4 | Pattern 52 (Constitutional AI), Pattern 53 (Observability) | enables |
| P10: Design to Communicate Limitations | P4 Confidence Signal | L2-L3 | Pattern 50 (Guardrails) | measured_by |
| P13: Make Accountability Visible | P5 Action Audit & Undo | All | Pattern 53 (Observability), Pattern 77 (Shell Hooks) | requires |
| P9: Enhance Human Work, Not Replace | P6 Escalation Pathway | L3-L4 | Pattern 20 (Suspend/Resume) | enables |
| P10: Communicate Current Reality of AI | P7 Empathic Error Recovery | All | Pattern 50 (Guardrails), Pattern 53 (Observability) | triggers |
| P1: Preserve Struggle When Delegation Is Effortless | P2 Autonomy Dial (low settings) | L1 | Pattern 44 (Model Loop) | conflicts_with (high autonomy) |
| P16: Make Power Legible in Infrastructure | P5 Action Audit & Undo | L4 | Pattern 64 (Multi-Layer Permissions) | requires |
| P17: Design Exit as Sacred Right | *(architectural — data portability)* | All | Pattern 76 (Bridge Pattern) | enables |
| P15: Establish Guardrails to Prevent Misuse | Anti: Agentic Sludge | All | Pattern 52 (Constitutional AI) | prevents |

**How to read this table:** Start from any column. If you know which design principle you want to implement, read right to find the UX pattern and playbook pattern. If you know which playbook pattern you are implementing, read left to understand its design intent. If you are designing for a specific autonomy level, filter the table to that level.

### Friedman Interaction Patterns → UX Patterns → Playbook

This secondary table maps Friedman's interaction pattern vocabulary (Part A, Principle 6) to the Part B UX patterns and playbook patterns:

| Friedman Pattern | Lifecycle Phase | Enriches UX Pattern | Playbook Pattern |
|-----------------|-----------------|--------------------|-----------------| 
| Task Builder | Pre-Action | P1 Intent Preview (structured plan editing) | Pattern 44 (Model Loop) |
| Pre-prompts / Prompt Extensions | Pre-Action | P1 Intent Preview (guided modification) | Pattern 6 (Context Engineering) |
| Prompt Strength Indicator | Pre-Action | P1 Intent Preview (input quality feedback) | Pattern 6 (Context Engineering) |
| Reasoning Traces | In-Action | P3 Explainable Rationale (detailed reasoning) | Pattern 53 (Observability) |
| Consensus Meters | In-Action | P4 Confidence Signal (multi-model agreement) | Pattern 16 (Self-Consistency) |
| Style Lenses | In-Action | P3/P4 (output interpretation) | Pattern 44 (Model Loop) |
| Precision Knobs | In-Action | P2 Autonomy Dial (per-parameter control) | Pattern 44 (Model Loop) |
| Branches / Scoping | Post-Action | P5 Action Audit (version recovery) | Pattern 67 (Fork-Based Isolation) |
| Presets / Bookmarks | Post-Action | P2 Autonomy Dial (saved configurations) | Pattern 69 (Hierarchical Memory) |
| Capability Awareness | Pre-Action | P4 Confidence Signal (proactive limitation) | Pattern 50 (Guardrails) |
| Quiet AI / Daemons | All | P2 Autonomy Dial (L4 background tasks) | Pattern 73 (Session Backgrounding) |
| In-Tool AI | Integration | All patterns in-situ | Pattern 76 (Bridge Pattern) |

### Atlas Vocabulary → Principles → UX Patterns → Playbook

This table maps the AI Interaction Atlas's human task and constraint vocabularies to this document's design framework. Use it to go from a specific interaction element to the relevant design guidance.

| Atlas Element | Type | Principle | UX Pattern | Playbook Pattern | Relation |
|--------------|------|-----------|-----------|-----------------|----------|
| Authenticate | Human Task | P11 (Consent) | P2 (Autonomy Dial) | Pattern 64 (Permissions) | enables |
| Grant / Revoke Consent | Human Task | P11 (Consent), P17 (Exit) | P2 (Autonomy Dial) | Pattern 64, 70 | enables |
| Review & Approve | Human Task | P12 (Negotiate Agency), P13 (Accountability) | P1 (Intent Preview) | Pattern 20 (Suspend/Resume) | requires |
| Provide Feedback | Human Task | P9 (Enhance Not Replace) | P7 (Error Recovery) | Pattern 53 (Observability) | triggers |
| Flag Content | Human Task | P15 (Guardrails) | P6 (Escalation) | Pattern 50 (Guardrails) | triggers |
| Configure System | Human Task | P11 (Consent), P12 (Negotiate Agency) | P2 (Autonomy Dial) | Pattern 64 (Permissions) | enables |
| Edit Content | Human Task | P4 (Creative Interpretation) | P1 (Intent Preview) | Pattern 44 (Model Loop) | enables |
| Export / Download | Human Task | P17 (Exit as Sacred Right) | — | Pattern 76 (Bridge) | enables |
| Stop Process | Human Task | P9 (Enhance Not Replace) | P6 (Escalation) | Pattern 20 (Suspend/Resume) | triggers |
| Compare Options | Human Task | P4 (Creative Interpretation) | P4 (Confidence Signal) | — | enables |
| Privacy Preserving | Constraint | P11 (Consent), P17 (Exit) | P2 (Autonomy Dial) | Pattern 64 (Permissions) | requires |
| Human Verification | Constraint | P13 (Accountability) | P1 (Intent Preview) | Pattern 20 (Suspend/Resume) | requires |
| Cost Budget | Constraint | P9 (Enhance Not Replace) | — | Pattern 71 (Cost Gating) | measured_by |
| Confidence Threshold | Constraint | P10 (Communicate Limitations) | P4 (Confidence Signal) | Pattern 50 (Guardrails) | measured_by |
| Content Safety Policy | Constraint | P15 (Guardrails) | Anti: Agentic Sludge | Pattern 50, 52 | prevents |
| Audit Logging | Constraint | P13 (Accountability) | P5 (Action Audit) | Pattern 53 (Observability) | requires |
| Latency Budget | Constraint | P6 (Adaptive Interfaces) | — | Pattern 65 (Speculative Execution) | measured_by |
| Attribution Required | Constraint | P13 (Accountability) | P3 (Explainable Rationale) | — | requires |
| Data Provenance | Constraint | P3 (Transparent Thinking Partner) | P3 (Explainable Rationale) | Pattern 53 (Observability) | enables |
| Autonomous Execution | Constraint | P12 (Negotiate Agency) | P2 (Autonomy Dial) | Pattern 64 (Permissions) | enables |

**Relation types:** `enables` (makes possible), `requires` (must have), `measured_by` (quantified through), `triggers` (initiates), `prevents` (guards against), `conflicts_with` (tension to navigate).

---

## Supplementary Frameworks

Four industry frameworks and one interaction taxonomy that complement the principles and patterns in this document. Presented as reference sidebars — not primary content, but useful for teams working within these ecosystems.

---

### Clark/Kindred: The Sentient Design Triangle (Big Medium)

**Framework:** Maps AI-mediated experiences across three attributes:
- **Grounded** — has the information needed for reliable results
- **Interoperable** — shares data and instructions with other systems
- **Radically Adaptive** — morphs in real time to user needs

**Four archetypes** emerge from this space:
- **Tools** — user-controlled, grounded, low adaptivity
- **Copilots** — collaborative, grounded + adaptive
- **Agents** — autonomous, grounded + interoperable + adaptive
- **Chat** — peer conversation, variable groundedness

**Use as:** A thinking tool for workshopping AI postures. Plot your product on the triangle to understand what capabilities it needs (groundedness), what integrations it requires (interoperability), and how dynamic its interface should be (adaptivity).

**Additional concepts:**
- **NPC Pattern** — non-player characters: automated entities with user accounts and some agency (Slack bots, Figma sidekicks). NPCs occupy a space between tools and agents.
- **Sentient Scenes** — demo interfaces that transform style, mood, colors, and typography based on user description.
- **Personality without anthropomorphism** — AI systems can have consistent behavioral traits without claiming human experience.

**Source:** Josh Clark & Veronika Kindred, [The Shape of Sentient Design](https://bigmedium.com/ideas/shape-of-sentient-design.html) (Big Medium, 2026); forthcoming book: *Sentient Design* (Rosenfeld Media, June 2026).

---

### Microsoft Design: Agent UX Principles

**Framework:** Organized around three dimensions:

**Space** — connecting not collapsing
- Agents should connect information across contexts without collapsing everything into a single interface
- Accessible yet invisible — available when needed, not always present

**Time** — reflecting and adapting
- Reflect on interaction history to improve over time
- Nudge, don't notify — proactive assistance without notification fatigue
- Adapt to the user's changing needs and patterns

**Core** — uncertainty and control
- Embrace uncertainty — be honest about what the agent doesn't know
- Transparency + control + consistency — the three pillars of trust
- Consistency in behavior builds predictability, which builds trust

**Mapping to this document's patterns:**

| Microsoft Dimension | This Document's Principle | This Document's Pattern |
|--------------------|--------------------------|------------------------|
| Space: connecting not collapsing | Principle 7 (Space-Time, Not Apps) | P5 (Action Audit — unified timeline) |
| Space: accessible yet invisible | Principle 6 (Adaptive Interfaces) — Quiet AI | P2 (Autonomy Dial — L4 background) |
| Time: reflecting on history | Principle 3 (Transparent Thinking Partner) | P3 (Explainable Rationale) |
| Time: nudging not notifying | Autonomy Taxonomy — L1 (Observe & Suggest) | P4 (Confidence Signal) |
| Time: adapting | Principle 12 (Negotiate Agency) | P2 (Autonomy Dial — dynamic) |
| Core: embrace uncertainty | Principle 10 (Communicate Limitations) | P4 (Confidence Signal) |
| Core: transparency + control + consistency | Principle 3 + Principle 11 + Principle 5 | P3 + P2 + P5 |

**Source:** [UX Design for Agents](https://microsoft.design/articles/ux-design-for-agents/) (Microsoft Design, 2025).

---

### Google PAIR: People + AI Guidebook

**Framework:** Five principles for human-AI interaction:

1. **User Autonomy** — users should maintain control over AI-assisted decisions
2. **Data & Model Alignment** — AI should reflect the values and needs of its users
3. **Evolving Safety** — safety measures should evolve as the system learns
4. **Adapt with Feedback** — systems should improve based on user feedback
5. **Helpful AI** — AI should be genuinely useful, not just technically impressive

**Approach:** Question-based pattern framework. Instead of prescriptive patterns, PAIR provides questions that teams should ask during design:

- "How will users know what the AI can do?" → Maps to Principle 10 (Communicate Limitations)
- "How will users recover from AI errors?" → Maps to P7 (Empathic Error Recovery)
- "How will the AI adapt to different user needs?" → Maps to Principle 12 (Negotiate Agency)
- "How will users provide feedback?" → Maps to P2 (Autonomy Dial — implicit feedback through setting changes)
- "What happens when the AI is wrong?" → Maps to P5 (Action Audit & Undo) + P6 (Escalation)

PAIR's question-based approach is complementary to the pattern-based approach in this document. Use PAIR's questions during the *design exploration* phase (before committing to specific patterns) and this document's patterns during the *design specification* phase (when implementing specific interactions).

**Source:** [People + AI Guidebook](https://pair.withgoogle.com/guidebook) (Google PAIR, 3rd edition).

---

### Anthropic: Building Effective Agents

**Framework:** Simple, composable patterns over complex frameworks.

- **Workflows vs. Agents distinction.** Workflows are deterministic sequences with AI at specific steps. Agents are autonomous loops that decide their own actions. Most production systems should start as workflows and evolve toward agents only where the flexibility is needed.
- **Human control as default.** Start with human-in-the-loop for all consequential actions. Progressively grant autonomy based on demonstrated reliability.
- **Simple patterns compose better.** A chain of simple, well-tested components is more reliable than a complex monolithic agent. Each component can be understood, tested, and debugged independently.

**Key insight for this document:** Anthropic's "start with workflows, evolve to agents" mirrors this document's phased rollout: Phase 1 (deterministic workflows with AI at specific steps), Phase 2 (workflows with increasing AI autonomy), Phase 3 (autonomous agents for proven tasks). The progression is the same; Anthropic frames it architecturally, this document frames it through UX.

**Mapping to playbook patterns:**

| Anthropic Concept | Playbook Pattern | This Document's Pattern |
|------------------|-----------------|------------------------|
| Workflows (deterministic) | Pattern 14 (Plan-and-Execute) | Phase 1 (Foundational Safety) |
| Agents (autonomous loops) | Pattern 44 (Model Loop) | Phase 3 (Proactive Delegation) |
| Human control as default | Pattern 20 (Suspend/Resume) | P1 (Intent Preview) at all phases |
| Simple composable patterns | Pattern 17 (Tool Registry) | Principle 8 (Generate Interfaces — semantic primitives) |

**Source:** [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) (Anthropic, 2024). See also: [Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).

---

### Additional Pattern Resources

The following resources provide complementary pattern libraries and design examples:

- **Shape of AI** (Emily Campbell, shapeof.ai) — Curated collection of AI design patterns organized by interaction type. Useful for visual inspiration and pattern discovery.
- **AI UX Patterns** (Luke Bennis, aiuxpatterns.com) — Practical AI interaction patterns with screenshots and analysis.
- **Design Patterns for Trust With AI** (Sarah Gold, Projects by IF, catalogue.projectsbyif.com) — Patterns specifically focused on trust, transparency, and accountability in AI systems. Particularly relevant to Principles 3, 10, 13, and 16.
- **Maggie Appleton's LM Sketchbook** — Visual explorations of alternative AI interfaces, demonstrating what AI UX could look like beyond chat.

These resources are not primary sources for this document but provide additional depth for teams implementing the principles and patterns described here.

---

### AI Interaction Atlas (quietloudlab)

**Framework:** A comprehensive interaction taxonomy for AI-powered products, organized across 4 architectural layers (Inbound/Sensing → Internal/Reasoning → Outbound/Expressing → Interactive/Acting) and 6 dimensions:

- **AI Tasks (23):** What the AI does — Detect, Extract, Classify, Generate, Transform, Plan, Act, Adapt, and 15 more. Each task has maturity level, latency profile, data requirements, and human oversight level.
- **Human Tasks (21):** What humans do — Authenticate, Grant Consent, Review & Approve, Provide Feedback, Flag Content, Export, and 15 more. Each task has defined inputs, outputs, and variants.
- **System Tasks (22):** What infrastructure does — CRUD operations, orchestration, caching, monitoring, notifications, and logging. The glue between human and AI tasks.
- **Data Artifacts (48):** What flows between components — text, visual, audio, structured, and system artifacts across 7 categories.
- **Constraints (37):** What boundaries must hold — quality & safety, performance, model & technical, UX, data, execution behavior, code philosophy, and attribution constraints across 8 categories.
- **Touchpoints (37):** Where interactions happen — screen interfaces, conversational, voice & audio, spatial computing, technical endpoints, and physical devices across 6 categories.

**Key insight for this document:** The Atlas provides the *nouns* that this document's principles and patterns operate on. Where this document says "the user should review the agent's plan" (Principle 12, P1 Intent Preview), the Atlas specifies that "Review & Approve" is a distinct human task with defined inputs, outputs, and variants. This precision strengthens implementation guidance.

**Integration into this document:** Human Task Vocabulary (Part B), Constraint Taxonomy (Part C), Touchpoint Vocabulary (Principle 6), AI Tasks by Autonomy Level (Taxonomy section), and typed cross-references (Cross-Reference tables) draw from the Atlas. See each section for specific mappings.

**Complementary to our approach:** The Atlas provides wide coverage (200 definitions) at elevator-pitch depth. This document provides deep coverage (17 principles + 7 patterns + governance) at implementation depth. Together they form a complete design system: the Atlas for scoping and communicating, this document for designing and building.

**Source:** Brandon Harwood, [AI Interaction Atlas](https://ai-interaction.com/) (quietloudlab, Apache 2.0 License); [GitHub](https://github.com/quietloudlab/ai-interaction-atlas).

---

## Sources & Attribution

### Primary Sources

1. **Corey Moen & Andre Landgraf** — "Slop didn't start with AI" (coreymoen.com, March 2026)
2. **Dan Saffer & UI for AI Team, Carnegie Mellon** — "The Future of AI is Relationships, not Intelligence" (Medium/UI for AI, January 2026)
3. **Dan Saffer & UI for AI Team, Carnegie Mellon** — "Design Principles for Future AI" (Medium/UI for AI, February 2026)
4. **Victor Yocco, PhD (Allelo Design)** — "Beyond Generative: The Rise of Agentic AI and User-Centric Design" (Smashing Magazine, January 2026)
5. **Victor Yocco, PhD (Allelo Design)** — "Designing For Agentic AI: Practical UX Patterns For Control, Consent, And Accountability" (Smashing Magazine, February 2026)

### Designer Voices

6. **Vitaly Friedman** — "Design Patterns for AI Interfaces" (Smashing Magazine, July 2025); "Design Patterns For AI Products In 2026" (Maven course)
7. **Josh Clark & Veronika Kindred** — "The Shape of Sentient Design" (Big Medium, 2026); *Sentient Design* (Rosenfeld Media, forthcoming June 2026)
8. **Maggie Appleton** — "A Treatise on AI Chatbots Undermining the Enlightenment" (maggieappleton.com); "Folk Interfaces" (maggieappleton.com)
9. **Erika Hall** — *Conversational Design* (A Book Apart); "Conversational Design for You" (muledesign.com, 2026)
10. **Cyd Harrell** — *A Civic Technologist's Practice Guide* (2020); City & County of San Francisco CDO
11. **Veronica Peitong Chen** — "Designing for Generative AI Experiences" (veronicaptc.com); Adobe Firefly Lead Designer
12. **Charles Waite** — "On the Responsible Use of AI in Design" (charleswaite.com)
13. **Lennart Nacke** — "The AI Responsibility Framework for UX Researchers" (Medium, February 2026)
14. **Doug Cook** — "The Prompt-Box Paradox" (thirteen23.com, December 2025)
15. **Yulia Lapicus** — "2025 was the AI feature era. 2026 is the trust era." (Medium, 2026)
16. **Fiona Burns** — "Designing for AI Transparency" (beyond.fionaburns.co, September 2025); "The Four Shifts in Future UX"
17. **Ken Liu** — "50 Things Every AI Working with Humans Should Know" (sites.psu.edu); NPR interview (October 2025)

### Additional Voices

18. **Jared Spool** — UX + AI commentary, Maven teaching
19. **Amelia Wattenberger** — PenPal text editor, Intent workspace (Augment Code)
20. **Linus Lee** — AI interface design (Thrive Capital, ex-Notion AI)
21. **Geoffrey Litt** — Malleable software (Ink & Switch)
22. **Steph Ango** — File-over-app philosophy (Obsidian)
23. **Molly Mielke** — Computers as actualizers (ex-Figma/Notion)
24. **Matt Webb** — Original triangle diagram for AI-mediated experiences

### Institutional Frameworks

25. **Microsoft Design** — [UX Design for Agents](https://microsoft.design/articles/ux-design-for-agents/) (2025)
26. **Google PAIR** — [People + AI Guidebook](https://pair.withgoogle.com/guidebook) (3rd edition)
27. **Anthropic** — [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) (2024); [Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents); [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
28. **AI Interaction Atlas** — [AI Interaction Atlas](https://ai-interaction.com/) (Brandon Harwood, quietloudlab, Apache 2.0); [GitHub](https://github.com/quietloudlab/ai-interaction-atlas)

### Referenced in Playbook Cross-References

- **SAE International** — J3016: Taxonomy and Definitions for Terms Related to Driving Automation Systems (adapted for agentic autonomy levels)
- **John Dewey** — Reflective thinking framework (referenced in CMU principles)
- **Bloom's Taxonomy** — Cognitive domain hierarchy (referenced in Principle 2)
- **Bonnie Nardi** — Activity theory (referenced in CMU principles)
- **Emily Campbell** — Shape of AI design patterns (shapeof.ai)
- **Luke Bennis** — AI UX Patterns (aiuxpatterns.com)
- **Sarah Gold** — Design Patterns for Trust With AI (Projects by IF, catalogue.projectsbyif.com)
- **Brad Frost** — "Chatbot UIs are weak sauce" (cited by Friedman)
