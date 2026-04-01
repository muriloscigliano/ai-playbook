# AI-First Product Build Guide

> This is the execution guide. The playbook (`AI_AGENT_PATTERNS_PLAYBOOK.md`) is the full reference. This file tells you WHAT to build and WHEN. The playbook tells you HOW.

---

## How to Use This System

```
1. Read THIS file to decide what to build next
2. Check PATTERN_INDEX.md to find the right pattern number
3. Grep the playbook for the specific pattern details:
   → Grep "## 44. Pattern" in AI_AGENT_PATTERNS_PLAYBOOK.md
   → Read 80 lines from that offset
4. Implement the pattern
5. Move to the next phase
```

---

## Decision Trees

### "What agent loop do I need?"

```
Is the task structure predictable?
├── YES → Is it a fixed pipeline?
│   ├── YES → Prompt Chaining (Pattern 36, variant 1)
│   └── NO → Does it need branching + state?
│       ├── YES → Event-Driven Flow (Pattern 61)
│       └── NO → Simple sequential chain
└── NO → Is it a single-domain task?
    ├── YES → ReAct Loop (Pattern 9) ← START HERE
    └── NO → Does it need complex routing?
        ├── YES → Graph-Based Orchestration (Pattern 39)
        └── NO → Orchestrator-Workers (Pattern 36, variant 4)
```

### "What memory do I need?"

```
Does the agent need to persist state between turns?
├── NO → Just message history (default)
└── YES → What kind of state?
    ├── Structured (user prefs, entities) → Working Memory (Pattern 23)
    ├── Past conversations → Semantic Recall (Pattern 24)
    ├── Project instructions → Hierarchical Memory Files (Pattern 69)
    ├── Learning from experience → AUDN (Pattern 25)
    └── Unlimited knowledge → MemGPT Tiered (Pattern 26)
```

### "How do I handle safety?"

```
What's the risk level?
├── LOW (read-only, internal tool)
│   → Basic guardrails (Pattern 50) + max iterations
├── MEDIUM (writes files, sends messages)
│   → Multi-layer permissions (Pattern 64) + cost gating (Pattern 71)
├── HIGH (financial, PII, external APIs)
│   → All of above + suspend/resume (Pattern 20) + prompt injection defense (Pattern 51)
└── CRITICAL (production infra, customer data)
    → All of above + constitutional AI (Pattern 52) + human-in-the-loop mandatory
```

### "My agent is too expensive"

```
Where's the cost?
├── Too many LLM calls → Model routing (Pattern 46): 87% savings
├── Repeated queries → Semantic caching (Pattern 47): 30-69% savings
├── Tool schemas too large → Deferred tool loading (Pattern 63): 10K tokens saved
├── Context window filling up → Tool result budget (Pattern 78) + compaction (Pattern 68)
└── Wrong model for the job → Fallback chains (Pattern 45) + routing (Pattern 46)
```

### "My agent is too slow"

```
Where's the bottleneck?
├── Sequential tool calls → Streaming orchestration (Pattern 66): parallel safe tools
├── Sequential planning → LLM Compiler (Pattern 15): parallel independent steps
├── Predictable next steps → Speculative execution (Pattern 65): pre-compute results
├── Long context assembly → File state caching (Pattern 72): LRU dedup
└── Single agent overloaded → Sub-agents (Pattern 43) or coordinator-worker (Pattern 75)
```

### "My agent makes mistakes"

```
What kind of mistakes?
├── Wrong tool parameters → Better tool design (Pattern 21, ACI) + structured outputs (Pattern 49)
├── Wrong tool selected → Fewer, more powerful tools (Pattern 21) + better descriptions
├── Factual errors → CRITIC with tool verification (Pattern 13) + CRAG (Pattern 31)
├── Forgets context → Working memory (Pattern 23) + compaction (Pattern 68)
├── Doesn't learn → Reflexion (Pattern 10) + AUDN memory (Pattern 25)
└── Dangerous actions → Permissions (Pattern 64) + denial tracking (Pattern 70) + guardrails (Pattern 50)
```

---

## Implementation Phases

### Phase 1: Core Agent (MVP) — Week 1-2

**Goal**: Agent that can receive instructions, use tools, and produce results.

| Build This | Pattern | Why First |
|-----------|---------|-----------|
| Agent loop | 44 (Agentic Model Loop) | The heartbeat |
| Tool registry | 17 (Tool Registry + Validation) | Agent needs hands |
| 3-5 core tools | 21 (ACI Tool Design) | Read, write, search, execute |
| Token budget | 6 (Context Engineering) | Prevent context overflow |
| Structured outputs | 49 (Structured Outputs) | Reliable tool calling |
| ReAct reasoning | 9 (ReAct Loop) | Think before acting |

**Exit criteria**: Agent can complete a simple multi-step task (e.g., "find files matching X, read them, summarize").

---

### Phase 2: Safety & Trust — Week 3-4

**Goal**: Users can trust the agent won't break things or burn money.

| Build This | Pattern | Why Second |
|-----------|---------|-----------|
| Permission system | 64 (Multi-Layer Permissions) | Users must trust the agent |
| Input guardrails | 50 + 51 (Guardrails + Injection Defense) | Block harmful inputs |
| Cost limits | 71 (Runtime Cost Gating) | Prevent runaway spending |
| Max iterations | 44 (loop limits) | Prevent infinite loops |
| Model fallback | 45 (Fallback Chains) | Handle provider outages |
| Observability | 53 (Span Hierarchy) | Debug production issues |

**Exit criteria**: Agent has hard cost limits, permission prompts for destructive ops, and you can trace any failure.

---

### Phase 3: Memory & Context — Week 5-6

**Goal**: Agent remembers things and handles long conversations.

| Build This | Pattern | Why Third |
|-----------|---------|-----------|
| Working memory | 23 (Working Memory) | Structured state between turns |
| Memory files | 69 (Hierarchical Memory Files) | Persistent per-project instructions |
| Context compaction | 7 + 68 (Compaction + Reactive) | Handle long conversations |
| File caching | 72 (File State Caching) | Performance optimization |
| Tool result budget | 78 (Content Replacement) | Prevent context overflow |

**Exit criteria**: Agent maintains coherent state across 50+ turns, compacts gracefully, remembers project preferences.

---

### Phase 4: Multi-Agent & Scale — Week 7-8

**Goal**: Agent can delegate, parallelize, and extend.

| Build This | Pattern | Why Fourth |
|-----------|---------|-----------|
| Sub-agents | 43 (Sub-Agent Architecture) | Delegate complex subtasks |
| Skills system | 74 (Skills System) | Extensible capabilities |
| Deferred tools | 63 (Deferred Tool Loading) | Token optimization |
| Streaming execution | 66 (Streaming Orchestration) | Parallel safe tools |
| Denial tracking | 70 (Denial Tracking) | Better permission UX |

**Exit criteria**: Agent can spawn sub-agents for complex tasks, load new skills dynamically, run safe tools in parallel.

---

### Phase 5: Production Polish — Week 9+

**Goal**: Production-grade reliability, multi-surface, cost-optimized.

| Build This | Pattern | Why Last |
|-----------|---------|---------|
| Coordinator mode | 75 (Coordinator-Worker) | Multi-agent at scale |
| Bridge layer | 76 (Bridge Pattern) | Multiple UI surfaces |
| Session persistence | 73 (Session Backgrounding) | Long-running tasks |
| Hook system | 77 (Shell Hooks) | External integrations |
| Model routing | 46 (Cost Optimization) | 87% cost reduction |
| Semantic caching | 47 (Semantic Caching) | 30-69% fewer API calls |
| Golden datasets | 54 (Testing) | Regression prevention |

**Exit criteria**: Agent runs reliably in production, supports CLI + IDE + web, costs are optimized, regressions caught in CI.

---

## Pattern Combinations That Work Together

### "The Safe Agent" (minimum viable safety)
Patterns: 44 + 17 + 64 + 71 + 50
→ Agent loop + tool validation + permissions + cost limits + guardrails

### "The Smart Agent" (reasoning + memory)
Patterns: 9 + 23 + 25 + 14 + 13
→ ReAct + working memory + AUDN + plan-and-execute + tool-verified critique

### "The Fast Agent" (performance)
Patterns: 66 + 65 + 72 + 63 + 78
→ Streaming tools + speculation + file cache + deferred loading + result budget

### "The Scalable Agent" (multi-agent)
Patterns: 43 + 75 + 67 + 37 + 74
→ Sub-agents + coordinator-worker + worktree isolation + agent-as-tool + skills

### "The Enterprise Agent" (full production)
All of the above + Patterns: 76 + 73 + 77 + 53 + 54 + 55 + 46 + 47
→ Bridge + backgrounding + hooks + observability + testing + routing + caching

---

## Opening Moves: Value Before Intent

The #1 UX mistake in AI products is the blank prompt — "How can I help you?" with an empty text box. This forces users into their slowest interaction mode (typing at ~40 WPM) while providing zero affordances. Use these alternatives instead.

> See also: Anti-Pattern #10 "The Blank Prompt Trap" in [AI_ANTI_PATTERNS.md](AI_ANTI_PATTERNS.md)
> See also: Principle 2 (Make Metacognition the Interface) in [AI_DESIGN_PRINCIPLES.md](AI_DESIGN_PRINCIPLES.md)

### 1. Contextual Starters

Pre-analyze the user's current state and offer 3-7 specific, actionable suggestions.

**Example:** Code editor detects a test file → offers "Generate tests for uncovered functions", "Add edge case tests for the error handler", "Generate integration test for the API endpoint" — NOT "How can I help?"

**When to use:** You have access to the user's current context (open file, recent activity, current page).
**When NOT to use:** The user's intent is genuinely unpredictable.
**Maps to:** Principle 2 (Metacognition), Pattern 6 (Context Engineering)

### 2. Precomputed Insights

AI runs in the background at L1 (Observe & Suggest), surfaces findings proactively.

**Example:** Dashboard agent detects an anomaly → "Revenue dropped 12% in APAC this week. Related: 3 support tickets mention payment gateway issues. Want me to investigate?"

**When to use:** The AI can identify signals the user hasn't noticed yet.
**When NOT to use:** The domain has too many false positives (alert fatigue).
**Maps to:** Autonomy L1 (Observe & Suggest), P4 (Confidence Signal)

### 3. Example-Driven Starters

Show what the AI accomplished for similar users or tasks.

**Example:** "Teams like yours use this agent to: (1) auto-triage incoming tickets — saved 3h/week, (2) draft customer responses — 80% acceptance rate, (3) generate weekly reports — 90% less manual work."

**When to use:** You have usage data from similar users. Great for onboarding.
**When NOT to use:** Each user's workflow is unique enough that examples mislead.
**Maps to:** Principle 10 (Communicate Limitations)

### 4. Prefilled Drafts

Start with a plausible output the user refines — not a blank canvas.

**Example:** Meeting prep agent pre-fills the agenda from calendar invites + recent docs + last meeting's action items. User edits rather than writes from scratch.

**When to use:** There's enough context to generate a reasonable first draft.
**When NOT to use:** A bad prefill is worse than blank (e.g., creative writing, novel analysis).
**Maps to:** Principle 4 (Creative Interpretation), P1 (Intent Preview)

### 5. Safe Sandbox

Let users experiment in a consequence-free environment before committing.

**Example:** "Try the agent on a sample project before connecting your real data. Here's a demo workspace with realistic test data."

**When to use:** The AI takes consequential actions (writes files, sends messages, modifies data).
**When NOT to use:** The AI is read-only or low-stakes.
**Maps to:** Principle 11 (Consent), Autonomy L1 → L2 progression

---

## The Standard Interaction Recipe

Every AI interaction should follow five steps. Map each to the appropriate UX pattern:

```
Draft → Control → Validate → Commit → Recover
```

| Step | What Happens | UX Pattern | Key Design Rule |
|------|-------------|-----------|-----------------|
| **Draft** | AI generates an output or plan | P1 (Intent Preview) | AI does the work; user evaluates |
| **Control** | User adjusts via structured controls | P2 (Autonomy Dial) | Editing must be easier than re-prompting |
| **Validate** | Show sources, assumptions, uncertainty | P3 (Rationale), P4 (Confidence) | Diff views, uncertainty highlights, source links |
| **Commit** | User approves with risk-appropriate safeguards | P1 ("Proceed") | High-risk = explicit confirm. Low-risk = one-click |
| **Recover** | Undo, version history, audit trail | P5 (Audit), P7 (Error Recovery) | Undo must ALWAYS be available |

### Recipe by Risk Tier

| Step | Low Risk | Medium Risk | High Risk |
|------|----------|-------------|-----------|
| **Draft** | Auto-generate | Auto-generate | Generate + explain reasoning |
| **Control** | Inline edit | Structured controls + edit | Structured controls + compare alternatives |
| **Validate** | Optional | Show sources | Mandatory review + sources + diff |
| **Commit** | One-click apply | Confirm button | Explicit approval + consequences summary |
| **Recover** | Undo (24h) | Undo (7d) + version history | Undo + audit trail + escalation path |

**Rule:** If you can only build one step well, build **Recover**. Users tolerate imperfect AI if they can always undo.

---

## 5-Phase Launch Sequencing

How to launch an AI feature safely. Each phase builds on the trust earned in the previous one.

> See also: Phased Implementation Roadmap in [AI_DESIGN_PRINCIPLES.md](AI_DESIGN_PRINCIPLES.md#phased-implementation-roadmap)

### Phase 1: Shadow Mode

AI runs but only shows results to the **internal team**. No user impact.

- **Duration:** 1-2 weeks
- **Autonomy:** None (internal evaluation only)
- **Exit criteria:** Accuracy >90%, no harmful outputs in 1,000 samples, latency within budget

### Phase 2: Suggestion Mode

AI suggests, user decides. L1 and L2 only.

- **Duration:** 2-4 weeks
- **Autonomy:** L1 (Observe & Suggest), L2 (Plan & Propose)
- **Exit criteria:** >70% suggestion acceptance, <5% negative feedback, stable error rate

### Phase 3: Draft Mode

AI produces drafts the user edits. L2 and L3.

- **Duration:** 4-8 weeks
- **Autonomy:** L2 (Plan & Propose), L3 (Act with Confirmation)
- **Exit criteria:** <20% edit rate, >80% commit rate, <5% undo rate

### Phase 4: Supervised Automation

AI acts with confirmation for specific, proven task types. L3.

- **Duration:** 4-8 weeks
- **Autonomy:** L3 (Act with Confirmation)
- **Exit criteria:** >90% approval rate, <2% undo rate, stable trust metrics

### Phase 5: Autonomous

AI acts independently for proven task types only. L4.

- **Duration:** Ongoing with continuous monitoring
- **Autonomy:** L4 (Act Autonomously) — for qualifying tasks only
- **Monitoring:** Auto-downgrade to Phase 4 if undo rate exceeds 5%

**Most features should stop at Phase 3 or 4.** Phase 5 is earned through data, not assumed through capability. Only task types with 8+ weeks of Phase 4 data and <2% undo rate qualify.

---

## Templates

Practical, fill-in-the-blank artifacts for product teams:

| Template | What | When to Use |
|----------|------|-------------|
| [`AI_FEATURE_PRD.md`](templates/AI_FEATURE_PRD.md) | Product requirements for any AI feature | Starting a new AI feature |
| [`DESIGN_REVIEW_CHECKLIST.md`](templates/DESIGN_REVIEW_CHECKLIST.md) | 40+ item design review checklist | Design reviews, UX audits |
| [`ENGINEERING_READINESS_CHECKLIST.md`](templates/ENGINEERING_READINESS_CHECKLIST.md) | Pre-launch engineering checklist | Before shipping |
| [`MICROCOPY_SNIPPETS.md`](templates/MICROCOPY_SNIPPETS.md) | Copy-paste UI text by interaction moment | Writing AI interface copy |

---

## Anti-Patterns to Avoid

1. **Building multi-agent before single-agent works** — Get one agent right first
2. **Adding memory before you have working tools** — Tools are the agent's hands; memory is secondary
3. **Optimizing cost before proving value** — Build the expensive version first, optimize after
4. **Skipping permissions because "it's internal"** — Internal tools still need safety nets
5. **Loading full playbook into context** — Use it as a reference, not a dump
6. **Building custom orchestration before trying ReAct** — ReAct solves 80% of cases
7. **Using Tree of Thoughts for simple tasks** — 15-25x cost for marginal gains on simple tasks
8. **Implementing every memory type** — Start with working memory, add others when needed
