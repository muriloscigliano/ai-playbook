# Contributing to AI Agent Patterns Playbook

Thanks for your interest in contributing! This project grows through community input — new patterns, improved descriptions, better relations, and bug fixes are all welcome.

## Quick Start

```bash
git clone https://github.com/muriloscigliano/ai-playbook.git
cd ai-playbook
cd mcp-server && npm install
node build-index.js && node build-design-index.js
```

## What You Can Contribute

### Content
- **New patterns** — Add to `AI_AGENT_PATTERNS_PLAYBOOK.md` following the existing format (Problem, Solution, Architecture, Key Rules)
- **Improved descriptions** — Better explanations, examples, or pseudocode for existing patterns
- **New relations** — Add connections between patterns in `data/relations/pattern-to-pattern.js`
- **Industry guides** — New industry sections in `INDUSTRY_GUIDES.md`
- **Anti-patterns** — New failure modes in `AI_ANTI_PATTERNS.md`

### Data Layer
- **Pattern metadata** — Improve `data/patterns/*.js` files with better keywords or problem descriptions
- **Vocabulary** — Expand human tasks, constraints, or touchpoints in `data/vocabulary/`
- **Relations** — Add typed relations with `from`, `to`, `type`, `strength`, `reason`

### Tools
- **MCP server** — New tools or improved recommendation logic in `mcp-server/server.js`
- **CLI** — New commands or better output formatting in `cli/index.js`
- **Web UI** — Improvements to `web/build.js` or `web/public/index.html`

## How to Submit

1. Fork the repo
2. Create a branch (`git checkout -b add-pattern-79-whatever`)
3. Make your changes
4. If you changed markdown content, rebuild indexes:
   ```bash
   cd mcp-server && node build-index.js && node build-design-index.js
   ```
5. If you changed `data/` files, verify they load:
   ```bash
   node -e "import('./data/index.js').then(m => console.log('OK:', Object.keys(m).length, 'exports'))"
   ```
6. Commit with a clear message
7. Open a PR

## Conventions

- Patterns are numbered sequentially. Don't skip numbers.
- Design principles are numbered 1-17. UX patterns are P1-P7.
- Autonomy levels: L1 (Observe & Suggest), L2 (Plan & Propose), L3 (Act with Confirmation), L4 (Act Autonomously)
- Relations use typed edges: `requires`, `enhances`, `alternative`, `extends`, `implements`, `conflicts`
- All data files are ESM (`export`/`import`). No TypeScript build step.
- Keep PR scope focused — one pattern, one fix, one feature per PR.

## Code of Conduct

Be respectful. Focus on the work. Credit sources. That's it.
