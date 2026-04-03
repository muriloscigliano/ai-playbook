# AI Agent Patterns Playbook

> **78 production-ready patterns + design principles** for building AI-first products — from agent loops and tool design to multi-agent orchestration, memory systems, production hardening, and human-centered AI design.

---

## What's Inside

| File | What | When to Use |
|------|------|------------|
| [`PATTERN_INDEX.md`](PATTERN_INDEX.md) | One-line summary of all 78 patterns | Finding the right pattern |
| [`AI_FIRST_BUILD_GUIDE.md`](AI_FIRST_BUILD_GUIDE.md) | Decision trees + 5-phase build plan | Starting a feature or project |
| [`AI_AGENT_PATTERNS_PLAYBOOK.md`](AI_AGENT_PATTERNS_PLAYBOOK.md) | Full reference (78 patterns, 4500+ lines) | Deep implementation details |
| [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md) | 17 design principles + 7 UX patterns + governance for agentic AI | Designing interactions, UX reviews, product framing, governance |

## Patterns Overview

### Part I-XII: Framework & Academic Patterns (1-62)

| Category | Patterns | Highlights |
|----------|----------|------------|
| **Foundation** | 1-3 | Registry, dynamic config, request context |
| **Context** | 4-8 | Processor pipelines, token budgets, compaction |
| **Reasoning** | 9-16 | ReAct, Reflexion, Tree of Thoughts, Plan-and-Execute |
| **Tools** | 17-22 | Tool registry, ACI design, DSPy, suspend/resume |
| **Memory** | 23-29 | Working memory, AUDN, MemGPT, memory streams |
| **RAG** | 30-35 | RAPTOR, CRAG, Self-RAG, GraphRAG, Agentic RAG |
| **Multi-Agent** | 36-43 | Workflows, swarm, crews, debate, sub-agents |
| **Execution** | 44-49 | Model loop, fallbacks, routing, caching |
| **Safety** | 50-55 | Guardrails, injection defense, observability, evals |
| **Infrastructure** | 56-62 | Storage, circuit breaker, A2A, MCP, hooks |

### Part XIII: Production-Hardened Patterns (63-78) — NEW

16 patterns derived from **real-world experience** building and operating production AI agent systems at scale:

| # | Pattern | What It Solves |
|---|---------|---------------|
| 63 | Deferred Tool Loading | Save 10K+ context tokens with lazy schema resolution |
| 64 | Multi-Layer Permissions | 6-layer permission system for safe agent actions |
| 65 | Speculative Execution | Pre-compute likely results for instant response |
| 66 | Streaming Tool Orchestration | Safe parallel tool execution during streaming |
| 67 | Fork-Based Isolation | Git worktrees for safe parallel agent work |
| 68 | Reactive Context Compaction | State-aware compaction, not just token counting |
| 69 | Hierarchical Memory Files | Scoped persistent instructions (CLAUDE.md pattern) |
| 70 | Denial Tracking | Auto-escalate after repeated permission denials |
| 71 | Runtime Cost Gating | Per-session budget with per-model tracking |
| 72 | File State Caching | LRU dedup for repeated file reads |
| 73 | Session Backgrounding | Background tasks, resume later with full state |
| 74 | Skills System | Dynamic capability discovery and loading |
| 75 | Coordinator-Worker | Multi-agent with restricted worker tools |
| 76 | Bridge Pattern | One agent core, many UI surfaces |
| 77 | Shell Hook System | External program interceptors at lifecycle points |
| 78 | Tool Result Budget | Replace old results with tombstones to save context |

### Part XIV: AI-First Product Blueprint

Not patterns — this is the **build guide**: how to combine patterns into a product.

- Complete 3-layer architecture diagram
- 5-phase implementation roadmap (Week 1 to Week 9+)
- Decision trees for agent loop, memory, safety, cost, speed
- Production checklist (30+ items)

### AI Design Principles (companion document)

17 design principles + 7 UX patterns + governance framework for building **human-centered** agentic AI. Cross-referenced to all 78 technical patterns.

| Section | What's Covered |
|---------|---------------|
| **Framing** | Quality as downstream of intent, not tooling |
| **Autonomy Taxonomy** | 4 levels: Observe & Suggest → Plan & Propose → Act with Confirmation → Act Autonomously |
| **17 Design Principles** | Cognition (preserve struggle, metacognition), Interfaces (adaptive, generative), Agency (consent, negotiation), Accountability (power, exit rights) |
| **7 UX Patterns** | Intent Preview, Autonomy Dial, Explainable Rationale, Confidence Signal, Action Audit & Undo, Escalation Pathway, Empathic Error Recovery |
| **Governance** | Ethics Council, 3-phase rollout (safety → calibrated autonomy → delegation), metrics framework |
| **Practitioner Voices** | 15+ designers from CMU, Adobe, Smashing Magazine, Big Medium, Obsidian, Mule Design |

---

## Install Into Your Project

### Option 1: Symlink (recommended — auto-updates when you pull)

```bash
git clone https://github.com/muriloscigliano/ai-playbook.git ~/.ai-playbook
cd ~/projects/my-app
~/.ai-playbook/install-ai-playbook.sh .
```

### Option 2: Copy (standalone, no dependency)

```bash
git clone https://github.com/muriloscigliano/ai-playbook.git /tmp/ai-playbook
/tmp/ai-playbook/install-ai-playbook.sh ~/projects/my-app --copy
```

### Option 3: Global (all projects on this machine)

```bash
git clone https://github.com/muriloscigliano/ai-playbook.git ~/.ai-playbook
~/.ai-playbook/install-ai-playbook.sh --global
```

### What the installer does

1. Creates `.claude/ai-playbook/` in your project with the 4 reference files
2. Adds a playbook section to your `CLAUDE.md` (creates one if missing)
3. Adds `.claude/ai-playbook/` to `.gitignore` (symlink mode only)

---

## MCP Server (Recommended)

The MCP server gives any AI agent instant access to patterns and design principles **without loading the full 170KB+ files**. 10 tools, zero context waste.

### Setup

```bash
# Clone the repo
git clone https://github.com/muriloscigliano/ai-playbook.git ~/.ai-playbook

# Install dependencies and build indexes
cd ~/.ai-playbook/mcp-server
npm install
node build-index.js
node build-design-index.js
```

### Add to your AI agent config

**Claude Code** (`~/.claude/settings.json`):
```json
{
  "mcpServers": {
    "ai-playbook": {
      "command": "node",
      "args": ["~/.ai-playbook/mcp-server/server.js"]
    }
  }
}
```

**Cursor / other MCP clients** — same format, add to your MCP config.

### Available Tools

**Engineering Patterns (6 tools):**

| Tool | Input | Output | Best for |
|------|-------|--------|----------|
| `recommend_patterns` | `"a customer support chatbot"` | Phased plan with the right patterns for your project | **Start here** — don't know which patterns you need |
| `diagnose_agent` | `"my agent is too slow and forgets context"` | Prioritized fixes matched to your problem | Agent already built but has issues |
| `search_patterns` | `"memory"` | Top 10 matching patterns (name + problem summary) | Know the topic, need the right pattern |
| `get_pattern` | `23` | Full pattern content (problem, solution, pseudocode, rules) | Ready to implement a specific pattern |
| `list_patterns` | `"safety"` (optional) | All patterns in a Part, one-line each | Browsing what's available |
| `get_build_guide` | `"phase 1"` (optional) | Build guide section or decision trees | Planning your architecture |

**Design Principles (4 tools):**

| Tool | Input | Output | Best for |
|------|-------|--------|----------|
| `get_design_principle` | `3` | Full principle (problem, guidance, examples, practitioner perspectives) | Implementing a specific design principle |
| `get_ux_pattern` | `1` | Full UX pattern (anatomy, metrics, examples, playbook connections) | Implementing agentic UX (Intent Preview, Autonomy Dial, etc.) |
| `search_design` | `"trust"` | Top 10 matching design entries (principles, patterns, governance) | Finding relevant design guidance by topic |
| `get_design_section` | `"taxonomy"` | Full section (taxonomy, governance, rollout, metrics, framing) | Reading governance frameworks or autonomy taxonomy |

### How a beginner uses it

```
User: "I want to build a chatbot for customer support"
    ↓
Agent calls: recommend_patterns("customer support chatbot", level="beginner")
    → Returns: Phase 1 (Core: patterns 44, 9, 6, 49) + Phase 2 (Memory: 23, 24, 7)
    → "Focus ONLY on Phase 1. Get that working before adding anything else."
    ↓
Agent calls: get_pattern(44)
    → Returns: Full Agentic Model Loop pattern with pseudocode
    ↓
Agent implements the core loop, then adds memory when ready
```

### How to fix a problem

```
User: "My agent is too expensive and it forgets what I said"
    ↓
Agent calls: diagnose_agent("too expensive and forgets context")
    → Returns: 2 diagnoses with prioritized pattern fixes
    → Cost: Model Routing (46) first, then Semantic Caching (47)
    → Memory: Working Memory (23) first, then Context Compaction (7)
    ↓
Agent calls: get_pattern(46)
    → Returns: Full Model Routing pattern — 87% cost reduction
```

### How to use design principles

```
User: "How should we handle user trust in our scheduling agent?"
    ↓
Agent calls: search_design("trust autonomy scheduling")
    → Returns: Principle 3 (Transparent Thinking Partner), P2 (Autonomy Dial),
      P4 (Confidence Signal), Phased Rollout
    ↓
Agent calls: get_ux_pattern(2)
    → Returns: Full Autonomy Dial pattern — per-task autonomy settings,
      anatomy, metrics, examples
    ↓
Agent calls: get_design_section("rollout")
    → Returns: 3-phase rollout with exit criteria for each phase
```

### Rebuild after updates

When you update the playbook or design principles, rebuild the indexes:
```bash
cd ~/.ai-playbook/mcp-server && node build-index.js && node build-design-index.js
```

---

## File-Based Usage (Alternative)

If you prefer not to use MCP, the playbook also works as files your AI agent can grep:

```
CLAUDE.md (always loaded, ~1KB)
    → Points to the playbook files
    → Agent knows they exist but doesn't load them

When the agent needs a pattern:
    1. Reads PATTERN_INDEX.md to find the right pattern number
    2. Greps the playbook for that pattern's section header
    3. Reads ~80 lines of implementation details
    4. Implements the pattern

Result: ~2KB loaded per conversation instead of ~170KB
```

### Example conversation

```
You: "Add memory to our agent so it remembers user preferences"

Claude:
  → Reads PATTERN_INDEX.md → finds Pattern 23 (Working Memory) and Pattern 25 (AUDN)
  → Greps playbook for "## 24. Pattern 23:"
  → Reads the implementation details
  → Implements working memory with AUDN consolidation
```

---

## Update

```bash
cd ~/.ai-playbook  # or wherever you cloned
git pull
# If symlinked: all projects auto-update
# If copied: re-run the installer
```

---

## Sources

Built from analysis of 10+ open-source agent frameworks, 30+ academic papers, production engineering guides, and 15+ design practitioner perspectives. Full source lists in [`AI_AGENT_PATTERNS_PLAYBOOK.md`](AI_AGENT_PATTERNS_PLAYBOOK.md#87-sources--research-papers) and [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md#sources--attribution).

---

## License

MIT
