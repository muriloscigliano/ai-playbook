# The Harness

Almost everything in this playbook is, in the end, about building one thing: a
**harness**. This document names it, defines its anatomy, and maps the 78
engineering patterns onto it — so the playbook reads as one system instead of a
list.

> A **harness** is the engineering that wraps a model and turns raw intelligence
> into reliable, useful work. The model is the unit of compute; the harness is
> everything around it — how you feed it, what you connect it to, and what stops
> its mistakes from escaping. It is good software engineering applied to a
> non-deterministic core.

Model-agnostic by construction: no version numbers, no benchmarks. The harness
is the part you own regardless of which model you call.

For one-line definitions see [GLOSSARY.md](GLOSSARY.md); for the underlying
mechanics see [FOUNDATIONS.md](FOUNDATIONS.md).

---

## Why the harness matters more than the model

The instinct is to start from the model — pick the best one, prompt it, ship. It
is the wrong starting point. **How you wrap a model can matter as much as which
model you use.** The same base model, wrapped well, goes from useless to
excellent on the same task; wrapped badly, the best model in the world still
ships hallucinations to production.

So the first question is never "which model?" It is **"what is the job, and what
does reliable look like for it?"** Design from the job, not the model. The model
is a component you can swap; the harness is the product.

---

## Anatomy: the three layers

Every harness is built from three layers. Two are ordinary software engineering
and fully deterministic; the risk lives at the seams where the model's
non-determinism meets them.

```
        ┌───────────────────────────────────────────────┐
        │  VERIFICATION LAYER                             │
        │  what stops bad output from cascading           │
        │  evals · handoff checks · guardrails · undo     │
        ├───────────────────────────────────────────────┤
        │  MODEL LAYER                                    │
        │  how intelligence is consumed & flows           │
        │  prompting · context · inference · the loop     │
        ├───────────────────────────────────────────────┤
        │  DATA & API LAYER                               │
        │  what the harness consumes to do useful work    │
        │  tools · retrieval · MCP · internal services    │
        └───────────────────────────────────────────────┘
```

### 1. Model layer — *how intelligence is consumed*

The model itself, the prompting strategy, and the inference pattern — how
intelligence flows through your code. This is where "how you use the model"
lives, and it is only partly deterministic: the context you assemble is
engineering; what the model does with it is not.

**Patterns that build this layer:**

- **The loop** — [44 Agentic Model Loop](AI_AGENT_PATTERNS_PLAYBOOK.md), [9 ReAct](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Context assembly** — [6 Context Engineering](AI_AGENT_PATTERNS_PLAYBOOK.md), [4 Processor Pipeline](AI_AGENT_PATTERNS_PLAYBOOK.md), [7 Context Compaction](AI_AGENT_PATTERNS_PLAYBOOK.md), [8 Progressive Disclosure](AI_AGENT_PATTERNS_PLAYBOOK.md), [68 Reactive Compaction](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Reasoning strategy** — [10 Reflexion](AI_AGENT_PATTERNS_PLAYBOOK.md), [11 Tree of Thoughts](AI_AGENT_PATTERNS_PLAYBOOK.md), [12 Self-Refine](AI_AGENT_PATTERNS_PLAYBOOK.md), [14 Plan-and-Execute](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Prompting as engineering** — [22 DSPy (Programming, Not Prompting)](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Shaping the output** — [49 Structured Outputs](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Model economics** — [45 Fallback Chains](AI_AGENT_PATTERNS_PLAYBOOK.md), [46 Model Routing](AI_AGENT_PATTERNS_PLAYBOOK.md), [47 Semantic Caching](AI_AGENT_PATTERNS_PLAYBOOK.md), [71 Runtime Cost Gating](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Memory as context over time** — [23 Working Memory](AI_AGENT_PATTERNS_PLAYBOOK.md), [24 Semantic Recall](AI_AGENT_PATTERNS_PLAYBOOK.md), [69 Hierarchical Memory Files](AI_AGENT_PATTERNS_PLAYBOOK.md)

> A striking demonstration: research on *Recursive Language Models* wrapped an
> LLM so it treats a long context as an external environment and recursively
> sub-calls itself over snippets — and the gain came **entirely from the
> wrapper**, turning a task the bare model scored near zero on into one it
> largely solved. Same model. Different harness. ([30 RAPTOR](AI_AGENT_PATTERNS_PLAYBOOK.md) is the
> playbook's hierarchical-retrieval cousin of this idea.)

### 2. Data & API layer — *what it consumes to do useful work*

Existing data sources, third-party APIs, internal services, and the protocols
that reach them. This layer is **entirely software engineering and
deterministic** — which is exactly why it deserves heavy testing. It is the part
you can make boringly reliable, and boring reliability under a non-deterministic
core is the whole game.

**Patterns that build this layer:**

- **Tools done right** — [17 Tool Registry with Validation](AI_AGENT_PATTERNS_PLAYBOOK.md), [21 Agent-Friendly Tool Design (ACI)](AI_AGENT_PATTERNS_PLAYBOOK.md), [19 Schema Compatibility Layers](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Composition & protocols** — [18 Multi-Source Tool Composition](AI_AGENT_PATTERNS_PLAYBOOK.md), [60 MCP](AI_AGENT_PATTERNS_PLAYBOOK.md), [59 A2A](AI_AGENT_PATTERNS_PLAYBOOK.md), [63 Deferred Tool Loading](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Retrieval as a data source** — [31 Corrective RAG](AI_AGENT_PATTERNS_PLAYBOOK.md), [33 Adaptive RAG](AI_AGENT_PATTERNS_PLAYBOOK.md), [35 Agentic RAG](AI_AGENT_PATTERNS_PLAYBOOK.md), [34 GraphRAG](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Storage & reliability** — [56 Composite Domain Storage](AI_AGENT_PATTERNS_PLAYBOOK.md), [58 Provider Health & Circuit Breaker](AI_AGENT_PATTERNS_PLAYBOOK.md), [72 File State Caching](AI_AGENT_PATTERNS_PLAYBOOK.md)

**Design consequence:** this is where "the volume of tests is significant" in a
good harness. Deterministic code around a non-deterministic core should be
tested like the load-bearing wall it is — see [54 Golden Dataset Testing](AI_AGENT_PATTERNS_PLAYBOOK.md).

### 3. Verification layer — *what stops bad output from cascading*

The layer that decides whether output is trustworthy before it propagates: evals,
structured handoffs between agents, and the rule that **unverified data must not
flow downstream**. In a single-shot tool this can be thin. In a multi-agent
system it is the difference between a working harness and an expensive random
number generator.

**Patterns that build this layer:**

- **Verify against ground truth, not vibes** — [13 CRITIC (Tool-Verified Self-Correction)](AI_AGENT_PATTERNS_PLAYBOOK.md), [16 Self-Consistency](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Adversarial / independent review** — [41 Multi-Agent Debate](AI_AGENT_PATTERNS_PLAYBOOK.md), [75 Coordinator-Worker (separate reviewer)](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Evals as the feedback loop** — [54 Golden Dataset Testing](AI_AGENT_PATTERNS_PLAYBOOK.md), [55 LLM-as-Judge](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Guardrails at the boundary** — [50 Guardrail-as-Processor](AI_AGENT_PATTERNS_PLAYBOOK.md), [51 Prompt Injection Defense](AI_AGENT_PATTERNS_PLAYBOOK.md), [52 Constitutional AI](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **See what happened** — [53 Observability Span Hierarchy](AI_AGENT_PATTERNS_PLAYBOOK.md)
- **Human as the final check** — [20 Tool Suspend/Resume](AI_AGENT_PATTERNS_PLAYBOOK.md), [64 Multi-Layer Permissions](AI_AGENT_PATTERNS_PLAYBOOK.md)

> **The cascade failure.** If agent A hallucinates and the handoff to agent B
> carries the hallucinated data forward, B is burning tokens on a lie. Every
> multi-agent boundary needs a verification step, or errors compound down the
> chain. This is the mechanism behind anti-pattern
> [#15 Grading Its Own Homework](AI_ANTI_PATTERNS.md) — and the reason the
> verifier must be *independent* of the producer.

---

## The sharpest decision: is your task hard- or soft-verifiable?

How much verification layer you need is not a matter of taste — it is set by the
task. Ask one question: **when the harness produces an answer, is there a cheap,
objective way to know if it's right?**

| | **Hard-verifiable** | **Soft-verifiable** |
|---|---|---|
| **Example** | Writing code (tests pass or fail), a SQL query that runs, a schema that validates | Filing taxes, a strategy memo, a support reply, a medical summary |
| **Feedback loop** | Built-in and objective — the harness can check its own work against ground truth | None inherent — "correct" is judgment, and the harness cannot self-certify |
| **What the harness needs** | Lean verification: wire the existing check into the loop ([13 CRITIC](AI_AGENT_PATTERNS_PLAYBOOK.md)) and let it iterate | Heavy verification: [55 LLM-as-Judge](AI_AGENT_PATTERNS_PLAYBOOK.md), [16 Self-Consistency](AI_AGENT_PATTERNS_PLAYBOOK.md), [54 Golden Datasets](AI_AGENT_PATTERNS_PLAYBOOK.md), and a [human-in-the-loop gate](AI_AGENT_PATTERNS_PLAYBOOK.md) for stakes |
| **Autonomy it can earn** | Higher — objective checks make L3/L4 safer sooner | Lower by default — trust is earned slowly; keep a human on the high-stakes path |

**Rule of thumb:** the softer the verifiability, the more of your engineering
budget goes into the verification layer — and the more the interaction design
must communicate uncertainty ([Principle 10](AI_DESIGN_PRINCIPLES.md),
[P4 Confidence Signal](AI_DESIGN_PRINCIPLES.md)) rather than imply a certainty the
harness cannot back up. Many real tasks are *partly* verifiable: verify the parts
you can objectively (the numbers add up), judge or escalate the rest (is this the
right advice?).

---

## The first strategic question: build or compose?

You rarely build a harness from nothing. The choice:

- **Compose** — inherit from an orchestration library or an off-the-shelf agent
  (LangChain-style component inheritance, role-based crews, a general coding
  agent). Fastest to a working system. The cost is *downstream*: you inherit the
  library's abstractions and its release cadence, and a fast-moving dependency
  can become a maintenance tax. Best when your job is close to what the library
  was built for.
- **Build** — write the harness for your specific job. Slower upfront; you own
  every layer. Worth it when the integration your job needs — sandboxing,
  CI/CD, internal services, domain-specific verification — is something
  off-the-shelf harnesses cannot provide. Teams do this even when excellent
  general agents exist, precisely *because* the job is nuanced.

A useful lens on *whether the harness will keep earning its keep*:

- **Stable use cases** get absorbed over time by better models and richer
  application layers — the harness you build today may be a feature the platform
  ships tomorrow. Invest lightly; prefer compose.
- **Nuanced use cases** — where context saturation, proprietary data, or
  vertical-specific behaviour matters — keep needing a harness around them.
  These reward building.

Match this to the [capability layer](data/capabilities/): a stable, hard-verifiable
capability is a compose-and-move-on candidate; a nuanced, soft-verifiable one is
where a hand-built harness pays off.

---

## How to build one well

- **Design from the job.** Write down the job and what "reliable" means for it
  *before* choosing a model, library, or pattern. Everything downstream is
  determined by that definition.
- **Test the deterministic layers hard.** The Data & API layer is ordinary
  software — the volume of tests should reflect that. Non-determinism is not an
  excuse to skip testing the parts that are deterministic.
- **Make evals the loop, not an afterthought.** Without strong evals you run in
  circles: prompt changes that should help show no measurable effect, and
  regressions creep in unnoticed. A mix of behaviour-driven and eval-driven
  development keeps the non-deterministic core honest ([54](AI_AGENT_PATTERNS_PLAYBOOK.md), [55](AI_AGENT_PATTERNS_PLAYBOOK.md)).
- **Never let unverified data cross a handoff.** Put a verification step at every
  agent boundary; kill hallucinations where they start, not three agents later.
- **Keep the human where the task is soft.** Hard-verifiable work can run
  autonomously sooner; soft-verifiable, high-stakes work keeps a human on the
  path ([20](AI_AGENT_PATTERNS_PLAYBOOK.md), [Principle 12](AI_DESIGN_PRINCIPLES.md)).

---

## Where to go next

- **[AI_AGENT_PATTERNS_PLAYBOOK.md](AI_AGENT_PATTERNS_PLAYBOOK.md)** — the 78 patterns, now readable by which layer they build.
- **[AI_FIRST_BUILD_GUIDE.md](AI_FIRST_BUILD_GUIDE.md)** — decision trees and the phased build plan, including loop engineering for autonomous harnesses.
- **[data/capabilities/](data/capabilities/)** — what the harness is being pointed at, and which primitive to reach for.
- **[AI_ANTI_PATTERNS.md](AI_ANTI_PATTERNS.md)** — how harnesses fail, including the verification-cascade failures.
