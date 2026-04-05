# Pattern Index — Quick Reference

> One-line summary of each pattern. Find the right one, then `Read` the full pattern from `AI_AGENT_PATTERNS_PLAYBOOK.md`.
>
> For **design principles** and **UX patterns**, see [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md).
> For **programmatic access**, import from [`data/`](data/) or `@muriloscigliano/ai-playbook`.

## Part I: Foundation
| # | Pattern | One-Liner |
|---|---------|-----------|
| 1 | Central Registry + DI | Single source of truth for all components, with dependency injection |
| 2 | Dynamic Configuration | Config values can be static OR functions that resolve at runtime |
| 3 | Request Context | Per-request typed context (user, tenant, keys) that flows everywhere |

## Part II: Context Assembly
| # | Pattern | One-Liner |
|---|---------|-----------|
| 4 | Processor Pipeline | Ordered input/output processors transform state before/after LLM |
| 5 | Message List + Source Tracking | Track WHERE every message came from (user, memory, RAG, system) |
| 6 | Context Engineering | Treat context window like RAM — budget every token |
| 7 | Context Compaction | Summarize old history when approaching context limits |
| 8 | Progressive Disclosure | Start minimal, let agent discover context via tools |

## Part III: Reasoning & Planning
| # | Pattern | One-Liner |
|---|---------|-----------|
| 9 | ReAct Loop | Think → Act → Observe → repeat (the fundamental agent loop) |
| 10 | Reflexion | Learn from failures via verbal self-critique stored in memory |
| 11 | Tree of Thoughts | Explore multiple reasoning paths with BFS/DFS |
| 12 | Self-Refine | Generate → critique → improve → repeat |
| 13 | CRITIC | Use external tools (calculator, code exec) to verify self-corrections |
| 14 | Plan-and-Execute | Separate planning from execution, optional re-planning |
| 15 | LLM Compiler | Analyze plan for dependencies, run independent steps in parallel |
| 16 | Self-Consistency | Sample N reasoning chains, majority vote on answer |

## Part IV: Tool System
| # | Pattern | One-Liner |
|---|---------|-----------|
| 17 | Tool Registry + Validation | 5-step pipeline: schema → permission → transform → execute → validate |
| 18 | Multi-Source Tool Composition | Merge tools from static, MCP, sub-agents, memory with precedence |
| 19 | Schema Compatibility | Canonical tool format → convert to OpenAI/Anthropic/Google at call time |
| 20 | Tool Suspend/Resume | Pause for human approval, persist state, resume after |
| 21 | Agent-Friendly Tool Design (ACI) | Design tools FOR agents: fewer tools, high-signal outputs, clear errors |
| 22 | DSPy | Declare I/O signatures, let optimizer find the best prompt |

## Part V: Memory System
| # | Pattern | One-Liner |
|---|---------|-----------|
| 23 | Working Memory | Structured key-value block in system prompt, agent can read/write |
| 24 | Semantic Recall | Embed conversations → vector search for relevant past context |
| 25 | AUDN Consolidation | Add/Update/Delete/Noop cycle to keep memory consistent |
| 26 | MemGPT Tiered Memory | OS-inspired: context window = RAM, archival = disk, agent pages in/out |
| 27 | Generative Agents Stream | Chronological log with importance scoring + periodic reflection |
| 28 | Observational Memory | LLM generates condensed insights from raw conversation |
| 29 | Memory Decay | Exponential decay unless reinforced by access or confirmation |

## Part VI: RAG
| # | Pattern | One-Liner |
|---|---------|-----------|
| 30 | RAPTOR | Hierarchical tree over docs — search all levels for detail + themes |
| 31 | Corrective RAG (CRAG) | Evaluate retrieval quality → correct/ambiguous/incorrect → different paths |
| 32 | Self-RAG | Model outputs reflection tokens to decide WHEN to retrieve |
| 33 | Adaptive RAG | Classify query complexity → route to right retrieval strategy |
| 34 | GraphRAG | Knowledge graph + vector search for relationship-aware retrieval |
| 35 | Agentic RAG | Agent has retrieval tools, decides when/what/how to retrieve |

## Part VII: Multi-Agent
| # | Pattern | One-Liner |
|---|---------|-----------|
| 36 | Workflow Patterns (Anthropic 5) | Chain → Route → Parallelize → Orchestrate → Evaluate-Optimize |
| 37 | Agent-as-Tool | Wrap sub-agents as tools the primary agent can call |
| 38 | Swarm Handoffs | Agents hand off to each other by returning another agent |
| 39 | Graph-Based Orchestration | Model agent flow as directed graph with conditional edges |
| 40 | Role-Based Crews | Agents with roles/goals/backstories organized into teams |
| 41 | Multi-Agent Debate | Multiple agents answer independently, then debate to consensus |
| 42 | Mixture-of-Agents | Layer multiple LLMs — each sees prior layer's outputs |
| 43 | Sub-Agent Architecture | Spawn focused sub-agents, they return condensed summaries |

## Part VIII: Execution Engine
| # | Pattern | One-Liner |
|---|---------|-----------|
| 44 | Agentic Model Loop | The core loop: prompt → generate → tool calls → repeat until done |
| 45 | Model Fallback Chains | Try models in order until one succeeds |
| 46 | Model Routing | Classify complexity → route to cheapest capable model (87% savings) |
| 47 | Semantic Caching | Cache responses by embedding similarity, not exact match |
| 48 | Workflow Suspend/Resume | Persist full workflow state, resume after external events |
| 49 | Structured Outputs | Constrain LLM output to guaranteed valid JSON schemas |

## Part IX: Safety & Quality
| # | Pattern | One-Liner |
|---|---------|-----------|
| 50 | Guardrail Processors | Input/output pipeline filters that can abort (tripwire) |
| 51 | Prompt Injection Defense | 5 defense layers: sandwich, delimit, classify, hierarchy, filter |
| 52 | Constitutional AI | Define principles, use AI-generated feedback for alignment |
| 53 | Observability Spans | Hierarchical spans for every LLM call, tool use, processor run |
| 54 | Golden Dataset Testing | Curated inputs + expected outputs, run in CI/CD |
| 55 | LLM-as-Judge | Use another LLM to evaluate agent outputs against criteria |

## Part X: Infrastructure
| # | Pattern | One-Liner |
|---|---------|-----------|
| 56 | Composite Domain Storage | Route to domain-specific backends (Postgres, Redis, pgvector) |
| 57 | Auto-Init Proxy | Lazy initialization — init() called before first operation |
| 58 | Circuit Breaker | Track provider health, trip breaker on failure, auto-recover |
| 59 | A2A Protocol | Google's agent-to-agent interop (Agent Cards, Tasks, Messages) |
| 60 | MCP | Anthropic's standardized protocol for tool/resource integration |

## Part XI: Production Orchestration
| # | Pattern | One-Liner |
|---|---------|-----------|
| 61 | Event-Driven Flows | Decorator-based flows: @start → @listen → @router with typed state |
| 62 | Execution Hooks | In-process before/after interceptors on LLM and tool calls |

## Part XIII: Production-Hardened
| # | Pattern | One-Liner |
|---|---------|-----------|
| 63 | Deferred Tool Loading | Register tools by name only, resolve full schema on demand via search |
| 64 | Multi-Layer Permissions | 6 layers: mode → rules → hooks → classifier → prompt → auto-deny |
| 65 | Speculative Execution | Pre-compute likely tool results before model requests them |
| 66 | Streaming Tool Orchestration | Safe parallel execution for concurrent-safe tools during streaming |
| 67 | Fork-Based Isolation | Git worktrees for sub-agents — isolated repo copies, merge back |
| 68 | Reactive Context Compaction | State-aware compaction (not just token count) with lifecycle hooks |
| 69 | Hierarchical Memory Files | CLAUDE.md pattern — scoped instructions from user → project → dir |
| 70 | Denial Tracking | Count denied permissions, escalate after threshold |
| 71 | Runtime Cost Gating | Per-session budget with per-model tracking and hard stops |
| 72 | File State Caching | LRU cache for file reads, invalidated on writes |
| 73 | Session Backgrounding | Background long tasks, resume later with full state (teleport) |
| 74 | Skills System | Dynamic capability discovery — extensible prompt-based behaviors |
| 75 | Coordinator-Worker | Coordinator spawns workers with restricted tools, manages via messages |
| 76 | Bridge Pattern | Agent core decoupled from UI — one core, many surfaces (CLI/IDE/Web) |
| 77 | Hook System (Shell) | Shell-executed interceptors at lifecycle points (settings.json config) |
| 78 | Tool Result Budget | Replace old tool results with tombstones to save context tokens |

## Design Principles & UX Patterns

See [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md) for full content.

**17 Design Principles (4 themes):**

| # | Principle | Theme |
|---|-----------|-------|
| 1 | Preserve Struggle When Delegation Is Effortless | Cognition |
| 2 | Make Metacognition the Interface | Cognition |
| 3 | Design AI as a Transparent Thinking Partner | Cognition |
| 4 | Preserve Creative Interpretation When Output Is Instant | Cognition |
| 5 | Safeguard Meaning-Making Through Non-Human Metaphors | Cognition |
| 6 | Design Adaptive Interfaces for Additional Modalities | Interfaces |
| 7 | Organize by Space-Time, Not Apps | Interfaces |
| 8 | Generate Interfaces for the Moment | Interfaces |
| 9 | Enhance Human Work Instead of Replacing It | Agency |
| 10 | Design to Communicate Limitations | Agency |
| 11 | Design Consent as Continuous, Not Binary | Agency |
| 12 | Negotiate Agency Moment-by-Moment | Agency |
| 13 | Make Accountability Visible | Accountability |
| 14 | Design Beyond Immediate Utility Toward Societal Impact | Accountability |
| 15 | Establish Guardrails to Prevent Misuse | Accountability |
| 16 | Make Power Legible in Infrastructure | Accountability |
| 17 | Design Exit as Sacred Right | Accountability |

**7 UX Patterns (lifecycle-organized):**

| # | Pattern | Lifecycle Phase |
|---|---------|----------------|
| P1 | Intent Preview (Plan Summary) | Pre-Action |
| P2 | Autonomy Dial (Progressive Authorization) | Pre-Action |
| P3 | Explainable Rationale | In-Action |
| P4 | Confidence Signal | In-Action |
| P5 | Action Audit & Undo | Post-Action |
| P6 | Escalation Pathway | Post-Action |
| P7 | Empathic Error Recovery | Repair |

## Programmatic Access

```js
import { patterns, principles, uxPatterns, humanTasks, constraints } from './data/index.js'
import { getRelationsFor, detectProjectType } from './data/index.js'
```

| Export | Count | What |
|--------|-------|------|
| `patterns` | 78 | Engineering pattern metadata |
| `principles` | 17 | Design principle metadata |
| `uxPatterns` | 7 | UX pattern metadata |
| `humanTasks` | 23 | Human task vocabulary |
| `constraints` | 36 | Constraint taxonomy |
| `touchpoints` | 37 | Interaction surfaces |
| `aiTasks` | 24 | AI tasks by autonomy level |
| `allRelations` | 98 | Typed relations between entities |
| `projectBlueprints` | 6 | Phased recommendations by project type |
| `problemDiagnoses` | 10 | Problem-to-pattern fix mappings |
