# @muriloscigliano/ai-playbook

Structured, framework-agnostic data for the **[AI Agent Patterns Playbook](https://github.com/muriloscigliano/ai-playbook)** — 78 production-hardened engineering patterns, 17 design principles, 9 UX patterns, interaction vocabularies, two orthogonal taxonomies, and 369 typed relations between them.

Pure ESM, zero runtime dependencies, `node >= 18`. Import the ideas as data and build tools, graphs, linters, or recommenders on top.

```bash
npm install @muriloscigliano/ai-playbook
```

```js
import {
  patterns,          // 78 engineering patterns (id, number, part, problem, solution)
  principles,        // 17 design principles
  uxPatterns,        // 9 UX patterns (P1–P9), by lifecycle phase
  uxDiagnoses,       // 19 user-complaint → UX pattern + microcopy mappings
  problemDiagnoses,  // 10 technical problem → pattern fixes
  visibilityLevels,  // V1–V4 visibility axis (orthogonal to autonomy)
  autonomyLevels,    // L1–L4 autonomy taxonomy
  allRelations,      // typed edges: requires | enhances | implements | ...
  getRelationsFor,   // (entityId) → relations touching that entity
  detectUxComplaints // (text) → ranked uxDiagnoses keys
} from '@muriloscigliano/ai-playbook'
```

## Reverse lookups

Two symmetric diagnostics — one technical, one perceptual:

```js
import { problemDiagnoses, uxDiagnoses, detectProblems, detectUxComplaints } from '@muriloscigliano/ai-playbook'

// "My agent is technically wrong"
detectProblems('it hallucinates and is too slow')       // → ['hallucinate', 'too slow']

// "Users say it feels wrong"
detectUxComplaints('it keeps giving me walls of text')  // → ['walls of text']
uxDiagnoses['walls of text'].uxPatterns                 // → ['P8']
uxDiagnoses['walls of text'].microcopy                  // → concrete copy guidance
```

A `uxDiagnoses` entry cross-references its engineering root cause when one exists (`engineeringRootCause` keys into `problemDiagnoses`), so a UX symptom can be traced to a technical fix.

## Subpath exports

Each slice is importable on its own:

| Subpath | Exports |
|---------|---------|
| `.` | everything below |
| `./patterns` | `patterns`, `patternsByNumber`, `patternsBySlug` |
| `./principles` | `principles`, `principlesByNumber`, `principlesBySlug` |
| `./ux-patterns` | `uxPatterns`, `uxPatternsByNumber`, `uxPatternsBySlug` |
| `./vocabulary` | `humanTasks`, `constraints`, `touchpoints`, `aiTasks` |
| `./recommendations` | `projectBlueprints`, `problemDiagnoses`, `uxDiagnoses`, … |
| `./relations` | `allRelations`, `getRelationsFor`, `getRelatedIds` |
| `./taxonomy` | `autonomyLevels`, `visibilityLevels` |
| `./helpers` | `detect*` utilities |

TypeScript types ship in `index.d.ts`.

## Integrity

The data layer is provably consistent — every relation endpoint and every `principles[]` / `patterns[]` / `uxPattern` cross-reference resolves to a real entity. Validate any local change:

```bash
npm run validate
```

## License

MIT © Murilo Scigliano. Full playbook, MCP server, and CLI: <https://github.com/muriloscigliano/ai-playbook>.
