# AI Agent Patterns Playbook

This repository is a comprehensive reference for building production AI agent systems. It has three layers: engineering patterns, design principles, and a structured data layer.

## Project Structure

```
AI_AGENT_PATTERNS_PLAYBOOK.md   78 engineering patterns (foundation → production)
AI_DESIGN_PRINCIPLES.md         17 design principles + 7 UX patterns + governance
AI_ANTI_PATTERNS.md             14 anti-patterns with failure case studies and fixes
INDUSTRY_GUIDES.md              6 industry guides with phased pattern selections
AI_FIRST_BUILD_GUIDE.md         Decision trees + 5-phase implementation roadmap
PATTERN_INDEX.md                One-line pattern summaries for quick lookup

templates/                      Fill-in-the-blank artifacts for product teams
├── AI_FEATURE_PRD.md           Product requirements template for AI features
├── DESIGN_REVIEW_CHECKLIST.md  40+ item design review checklist
├── ENGINEERING_READINESS_CHECKLIST.md  Pre-launch engineering checklist
└── MICROCOPY_SNIPPETS.md       Copy-paste UI text for AI interactions

data/                           Structured data layer (npm: @muriloscigliano/ai-playbook)
├── patterns/                   78 pattern metadata files
├── principles/                 17 principle metadata files
├── ux-patterns/                7 UX pattern metadata files
├── vocabulary/                 Human tasks, constraints, touchpoints, AI tasks
├── recommendations/            Project blueprints + problem diagnoses
├── relations/                  98 typed relations between entities
├── taxonomy/                   Autonomy levels (L1-L4)
├── helpers/                    Search + detect utilities
└── scripts/                    Migration scripts (generate-patterns.js, etc.)

cli/                            CLI tool (10 commands) — terminal access without MCP
mcp-server/                     MCP server (11 tools) — imports from data/
├── server.js                   Tool handlers
├── build-index.js              Parses playbook markdown → patterns.json
├── build-design-index.js       Parses design principles → design-principles.json
├── patterns.json               Full prose content (built from markdown)
└── design-principles.json      Full prose content (built from markdown)
```

## How to Use

### Finding patterns
1. Check `PATTERN_INDEX.md` for one-line summaries
2. Use `get_pattern(N)` MCP tool or grep the playbook for the section header
3. Read ~80 lines of implementation details

### Finding design guidance
1. Check `AI_DESIGN_PRINCIPLES.md` Table of Contents
2. Use `get_design_principle(N)` or `search_design("topic")` MCP tools
3. Cross-reference with engineering patterns via the tables at the end

### Programmatic access
```js
import { patterns, humanTasks, getRelationsFor } from './data/index.js'
```

## After Updating Content

When markdown files change, rebuild the indexes:
```bash
cd mcp-server && node build-index.js && node build-design-index.js
```

When data/ files change (vocabulary, recommendations, relations), no build step needed — the MCP server imports them directly.

To regenerate pattern/principle metadata from markdown:
```bash
node data/scripts/generate-patterns.js
node data/scripts/generate-principles.js
```

## Key Conventions

- Patterns are numbered 1-78. Sections in the playbook use format `## N. Pattern M: Name`.
- Design principles are numbered 1-17. UX patterns are P1-P7.
- Autonomy levels: L1 (Observe & Suggest), L2 (Plan & Propose), L3 (Act with Confirmation), L4 (Act Autonomously).
- Relations use typed edges: `requires`, `enhances`, `alternative`, `implements`, `conflicts`.
- All data files are ESM (export/import). No TypeScript build step.

## Sources

- 10+ agent frameworks (Mastra, LangGraph, CrewAI, AutoGen, DSPy, etc.)
- 30+ academic papers (ReAct, Reflexion, RAPTOR, GraphRAG, etc.)
- Anthropic engineering guides
- Carnegie Mellon UI for AI Lab
- AI Interaction Atlas (quietloudlab, Apache 2.0)
- 15+ design practitioners
