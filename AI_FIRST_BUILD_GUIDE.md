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

## Anti-Patterns to Avoid

1. **Building multi-agent before single-agent works** — Get one agent right first
2. **Adding memory before you have working tools** — Tools are the agent's hands; memory is secondary
3. **Optimizing cost before proving value** — Build the expensive version first, optimize after
4. **Skipping permissions because "it's internal"** — Internal tools still need safety nets
5. **Loading full playbook into context** — Use it as a reference, not a dump
6. **Building custom orchestration before trying ReAct** — ReAct solves 80% of cases
7. **Using Tree of Thoughts for simple tasks** — 15-25x cost for marginal gains on simple tasks
8. **Implementing every memory type** — Start with working memory, add others when needed
