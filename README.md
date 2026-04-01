# AI Agent Patterns Playbook

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![MCP Tools](https://img.shields.io/badge/MCP_Tools-11-blue.svg)](mcp-server/)
[![Patterns](https://img.shields.io/badge/Patterns-78-orange.svg)](AI_AGENT_PATTERNS_PLAYBOOK.md)
[![Principles](https://img.shields.io/badge/Design_Principles-17-purple.svg)](AI_DESIGN_PRINCIPLES.md)

> **78 engineering patterns + 17 design principles + structured data layer** for building AI-first products.
> From agent loops and tool design to multi-agent orchestration, human-centered UX, and production hardening.

---

## Get Started in 5 Minutes

**Option A — CLI (fastest)**
```bash
git clone https://github.com/muriloscigliano/ai-playbook.git
cd ai-playbook

# Get a pattern recommendation for your project
./cli/index.js recommend "a customer support chatbot"

# Search for patterns by topic
./cli/index.js search "memory"

# Read a specific pattern
./cli/index.js pattern 44

# See all connections for a pattern
./cli/index.js relations 44
```

**Option B — MCP Server (for AI agents)**
```bash
cd mcp-server && npm install && node build-index.js && node build-design-index.js
```
Then add to Claude Code (`~/.claude/settings.json`):
```json
{ "mcpServers": { "ai-playbook": { "command": "node", "args": ["~/.ai-playbook/mcp-server/server.js"] } } }
```

**Option C — Just read the files**
```
1. Open PATTERN_INDEX.md → find the right pattern
2. Grep the playbook for that pattern number
3. Read ~80 lines of implementation details
4. Ship it
```

---

## What's Inside

| File | What | When to Use |
|------|------|------------|
| [`PATTERN_INDEX.md`](PATTERN_INDEX.md) | One-line summary of all 78 patterns | Quick pattern lookup |
| [`AI_FIRST_BUILD_GUIDE.md`](AI_FIRST_BUILD_GUIDE.md) | Decision trees + 5-phase build plan | Starting a feature or project |
| [`AI_AGENT_PATTERNS_PLAYBOOK.md`](AI_AGENT_PATTERNS_PLAYBOOK.md) | Full reference (78 patterns, 4500+ lines) | Deep implementation details |
| [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md) | 17 design principles + 7 UX patterns + governance | Designing interactions, UX reviews, governance |
| [`AI_ANTI_PATTERNS.md`](AI_ANTI_PATTERNS.md) | 14 anti-patterns with failure case studies and fixes | Avoiding common pitfalls, code reviews, postmortems |
| [`INDUSTRY_GUIDES.md`](INDUSTRY_GUIDES.md) | 6 industry guides with phased pattern selections | Fintech, healthcare, dev tools, support, e-commerce, enterprise |
| [`data/`](data/) | Structured data layer (125+ files, npm package) | Programmatic access, building tools, web UIs |

---

## Engineering Patterns (78)

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

### Part XIII: Production-Hardened Patterns (63-78)

16 patterns from real-world production AI agent systems:

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

The **build guide** — how to combine patterns into a product:

- Decision trees for agent loop, memory, safety, cost, speed
- 5-phase implementation roadmap (Week 1 to Week 9+)
- Opening Moves: 5 alternatives to the blank prompt
- Standard Interaction Recipe: Draft → Control → Validate → Commit → Recover
- 5-Phase Launch Sequencing: Shadow → Suggestion → Draft → Supervised → Autonomous
- Pattern combinations that work together (Safe Agent, Smart Agent, Fast Agent, etc.)

### Templates (fill-in-the-blank artifacts)

| Template | What |
|----------|------|
| [`AI_FEATURE_PRD.md`](templates/AI_FEATURE_PRD.md) | Product requirements template for any AI feature |
| [`DESIGN_REVIEW_CHECKLIST.md`](templates/DESIGN_REVIEW_CHECKLIST.md) | 40+ item design review checklist |
| [`ENGINEERING_READINESS_CHECKLIST.md`](templates/ENGINEERING_READINESS_CHECKLIST.md) | Pre-launch engineering readiness checklist |
| [`MICROCOPY_SNIPPETS.md`](templates/MICROCOPY_SNIPPETS.md) | Copy-paste UI text for AI interactions |

---

## Design Principles & UX Patterns

17 strategic design principles + 7 UX patterns + governance framework for human-centered agentic AI. Cross-referenced to all 78 engineering patterns.

| Section | What's Covered |
|---------|---------------|
| **Framing** | Quality as downstream of intent, not tooling |
| **Autonomy Taxonomy** | 4 levels: Observe & Suggest → Plan & Propose → Act with Confirmation → Act Autonomously |
| **17 Design Principles** | Cognition, interfaces, agency, accountability — with practitioner perspectives from 15+ designers |
| **7 UX Patterns** | Intent Preview, Autonomy Dial, Explainable Rationale, Confidence Signal, Action Audit & Undo, Escalation Pathway, Empathic Error Recovery |
| **Human Task Vocabulary** | 21 human tasks mapped to UX patterns and autonomy levels |
| **Constraint Taxonomy** | 37 constraints across 8 categories with enforcement matrix |
| **Touchpoint Vocabulary** | 37 interaction surfaces across 6 categories |
| **Governance** | Ethics Council, 3-phase rollout, metrics framework |

Sources include Carnegie Mellon's UI for AI Lab, the [AI Interaction Atlas](https://ai-interaction.com/) (quietloudlab, Apache 2.0), and practitioner research from Adobe, Smashing Magazine, Big Medium, Obsidian, and Mule Design.

---

## Structured Data Layer

The `data/` directory is a structured, programmatic data layer — the source of truth for metadata, vocabulary, taxonomy, and relations. Importable as an npm package.

```js
// From the repo
import { patterns, humanTasks, constraints, getRelationsFor } from './data/index.js'

// Or as npm package (when published)
import { patterns, humanTasks, getRelationsFor } from '@muriloscigliano/ai-playbook'
```

### What's exported

| Export | Count | What |
|--------|-------|------|
| `patterns` / `patternsByNumber` / `patternsBySlug` | 78 | Pattern metadata (id, name, part, problem, solution, keywords) |
| `principles` / `principlesByNumber` | 17 | Design principle metadata (theme, summary, related patterns) |
| `uxPatterns` / `uxPatternsByNumber` | 7 | UX pattern metadata (lifecycle phase, autonomy levels) |
| `humanTasks` | 23 | Human task vocabulary with UX pattern + principle mappings |
| `constraints` / `constraintCategories` | 36 | Constraint taxonomy with enforcement types |
| `touchpoints` | 37 | Interaction surface vocabulary |
| `aiTasks` | 24 | AI tasks with default autonomy levels |
| `allRelations` | 366 | Typed relations (`requires`, `enhances`, `alternative`, `implements`, `conflicts`) |
| `autonomyLevels` | 4 | L1-L4 taxonomy definitions |
| `projectBlueprints` | 6 | Phased pattern plans by project type |
| `problemDiagnoses` | 10 | Problem-to-pattern fix mappings |
| `detectProjectType(desc)` | — | Keyword-based project type detection |
| `detectHumanTasks(desc)` | — | Keyword-based human task detection |
| `detectConstraints(desc)` | — | Keyword-based constraint detection |
| `getRelationsFor(id)` | — | Query typed relations by entity ID |
| `getRelatedIds(id, type?)` | — | Get related entity IDs, optionally filtered |

### Directory structure

```
data/
├── index.js                    # Main entry — re-exports everything
├── package.json                # @muriloscigliano/ai-playbook
├── patterns/                   # 78 pattern metadata files + _index.js
├── principles/                 # 17 principle metadata files + _index.js
├── ux-patterns/                # 7 UX pattern metadata files + _index.js
├── vocabulary/
│   ├── human-tasks.js          # 23 human tasks
│   ├── constraints.js          # 36 constraints in 8 categories
│   ├── touchpoints.js          # 37 touchpoints in 6 categories
│   └── ai-tasks.js             # 24 AI tasks by autonomy level
├── recommendations/
│   ├── project-blueprints.js   # 6 project types with phased patterns
│   └── problem-diagnoses.js    # 10 problem-to-pattern mappings
├── relations/                  # 98 typed relations + query helpers
├── taxonomy/                   # 4 autonomy levels
├── helpers/                    # search + detect utilities
└── scripts/                    # migration scripts (generate-patterns.js, etc.)
```

---

## CLI (Terminal Access)

Use the playbook from any terminal — no MCP required:

```bash
# From the cloned repo
./cli/index.js recommend "a customer support chatbot"
./cli/index.js diagnose "too slow and forgets context"
./cli/index.js search "memory"
./cli/index.js pattern 44
./cli/index.js relations 44
./cli/index.js design "scheduling agent with human approval"
./cli/index.js stats
```

All 10 commands:

| Command | What |
|---------|------|
| `recommend "description"` | Phased pattern plan for your project type |
| `diagnose "problem"` | Pattern fixes for your agent's issues |
| `search "query"` | Search patterns + principles by keyword |
| `pattern N` | Read full pattern content (1-78) |
| `principle N` | Read full design principle (1-17) |
| `ux-pattern N` | Read full UX pattern (1-7) |
| `list [part]` | List all patterns, optionally filter by part |
| `relations N` | See all typed connections for a pattern |
| `design "description"` | Unified design + engineering recommendation |
| `stats` | Project statistics |

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

1. Creates `.claude/ai-playbook/` in your project with the 6 reference files
2. Adds a playbook section to your `CLAUDE.md` (creates one if missing)
3. Adds `.claude/ai-playbook/` to `.gitignore` (symlink mode only)

---

## MCP Server (Recommended)

The MCP server gives any AI agent instant access to patterns and design principles **without loading the full 380KB+ of files**. 11 tools, zero context waste.

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
| `recommend_patterns` | `"a customer support chatbot"` | Phased plan with the right patterns | **Start here** — don't know which patterns you need |
| `diagnose_agent` | `"too slow and forgets context"` | Prioritized fixes matched to your problem | Agent already built but has issues |
| `search_patterns` | `"memory"` | Top 10 matching patterns | Know the topic, need the right pattern |
| `get_pattern` | `23` | Full pattern content (problem, solution, pseudocode) | Ready to implement a specific pattern |
| `list_patterns` | `"safety"` (optional) | All patterns in a Part, one-line each | Browsing what's available |
| `get_build_guide` | `"phase 1"` (optional) | Build guide section or decision trees | Planning your architecture |

**Design Principles (5 tools):**

| Tool | Input | Output | Best for |
|------|-------|--------|----------|
| `recommend_design` | `"a scheduling agent"` | Human tasks + constraints + principles + UX patterns + engineering patterns | **Start here** for product/UX teams |
| `get_design_principle` | `3` | Full principle (problem, guidance, examples, practitioner voices) | Implementing a specific design principle |
| `get_ux_pattern` | `1` | Full UX pattern (anatomy, metrics, examples) | Implementing agentic UX |
| `search_design` | `"trust"` | Top 10 matching design entries | Finding relevant design guidance |
| `get_design_section` | `"constraints"` | Full section (taxonomy, governance, human tasks, etc.) | Reading frameworks or vocabularies |

### Example: Build a new agent

```
User: "I want to build a chatbot for customer support"
    ↓
Agent calls: recommend_patterns("customer support chatbot", level="beginner")
    → Phase 1 (Core: patterns 44, 9, 6, 49) + Phase 2 (Memory: 23, 24, 7)
    ↓
Agent calls: get_pattern(44)
    → Full Agentic Model Loop pattern with pseudocode
    ↓
Agent implements the core loop, then adds memory when ready
```

### Example: Design an agentic feature

```
User: "Design a scheduling agent that books meetings"
    ↓
Agent calls: recommend_design("scheduling agent that books meetings")
    → Human Tasks: Configure System, Review & Approve, Start/Stop Process
    → Constraints: Privacy Preserving, Latency Budget, Autonomous Execution
    → Design Principles: P9, P11, P12
    → UX Patterns: P1 (Intent Preview), P2 (Autonomy Dial), P6 (Escalation)
    → Engineering: Patterns 44, 9, 17, 6 (Phase 1)
    ↓
Agent calls: get_ux_pattern(2)
    → Full Autonomy Dial pattern with anatomy, metrics, examples
```

### Example: Fix a problem

```
User: "My agent is too expensive and forgets what I said"
    ↓
Agent calls: diagnose_agent("too expensive and forgets context")
    → Cost: Model Routing (46) first, then Semantic Caching (47)
    → Memory: Working Memory (23) first, then Context Compaction (7)
```

### Rebuild after updates

```bash
cd ~/.ai-playbook/mcp-server && node build-index.js && node build-design-index.js
```

---

## File-Based Usage (Alternative)

If you prefer not to use MCP, the playbook works as files your AI agent can grep:

```
CLAUDE.md (always loaded, ~1KB)
    → Points to the playbook files
    → Agent knows they exist but doesn't load them

When the agent needs a pattern:
    1. Reads PATTERN_INDEX.md to find the right pattern number
    2. Greps the playbook for that pattern's section header
    3. Reads ~80 lines of implementation details
    4. Implements the pattern

Result: ~2KB loaded per conversation instead of ~380KB
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

Built from analysis of 10+ open-source agent frameworks, 30+ academic papers, production engineering guides, 15+ design practitioner perspectives, and the [AI Interaction Atlas](https://ai-interaction.com/) (quietloudlab, Apache 2.0).

Full source lists:
- Engineering patterns: [`AI_AGENT_PATTERNS_PLAYBOOK.md`](AI_AGENT_PATTERNS_PLAYBOOK.md#87-sources--research-papers)
- Design principles: [`AI_DESIGN_PRINCIPLES.md`](AI_DESIGN_PRINCIPLES.md#sources--attribution)

---

## License

MIT
