# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the data package (`@muriloscigliano/ai-playbook`) adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] — 2026-07-08

**Loop engineering.** Encodes the autonomous-loop layer — the shift from prompting
an agent to designing the system that prompts it — as queryable playbook entities.
Distilled from Addy Osmani's *Loop Engineering* (2026); the article's loop
primitives already mapped onto existing production patterns (67, 69, 74, 75, 77,
13), so this adds the composition and the failure modes, not new primitives.

### Added

- **`autonomous-maintenance-loop` project blueprint** (`data/recommendations/`)
  — the discover→codify→isolate→verify→ship→escalate pipeline for a self-driving
  codebase-upkeep agent, wired to real patterns, with trigger keywords. Surfaces in
  `recommend` / `recommend_patterns`.
- **Three Autonomy Anti-Patterns** in `AI_ANTI_PATTERNS.md` (now 17 total):
  #15 **Grading Its Own Homework** (author verifies its own work), #16
  **Comprehension Debt** (ships faster than anyone reads), #17 **Cognitive
  Surrender** (a loop built to avoid thinking rather than to think better). Fully
  threaded through the ToC, summary table, interaction map, coverage analysis, and
  quick-diagnostic. Each cross-links real patterns/principles; all three trace back
  to Principle 1 (Preserve Struggle).
- **"Loop Engineering" section** in `AI_FIRST_BUILD_GUIDE.md` — a primitive→pattern
  mapping table and the human-in-the-loop guardrails, placed after Phase 5
  (Autonomous) in the launch sequence.

### Changed

- `data` package `2.1.0` → `2.2.0` (minor — additive blueprint).
- README/CLAUDE.md counts refreshed (17 anti-patterns, 8 project blueprints).

## [2.1.0] — 2026-07-03

**Capability layer.** Adds the capability→use-case bridge between *how to build*
(patterns) and *how to design* (principles): start from a task and get the right
AI primitive, its data needs, failure modes, and the entities that make it safe.
Backward-compatible additions only.

### Added

- **10 capability entities** (`data/capabilities/`, new `./capabilities`
  subpath) across five categories — semantic search, classification, clustering,
  anomaly detection, summarization, extraction, generation, reasoning & planning,
  transcription & translation, language modeling. Each carries
  `whatItsGoodFor` / `whenNotToUse` / `dataRequirements` / `failureModes` and
  resolved `patterns` / `principles` / `uxPatterns`. `Capability` type added to
  `index.d.ts`; `failureModeKeys` links a capability's failures to the matching
  `uxDiagnoses` keys (so a flagged failure routes to its UX fix via `diagnose_ux`).
- **`capability-to-pattern` relations** (`implements`, 29 edges) registered in
  the relations barrel and `allRelations`.
- **`detectCapabilities(task)`** helper + `capabilityKeywords` map — routes a
  plain task phrase ("group these", "find similar", "flag the unusual ones") to
  a capability.
- **MCP tools** `list_capabilities`, `get_capability(key)`,
  `recommend_capability(task)` (server now exposes 15 tools).
- **CLI** `capabilities`, `capability <key>`, `capability --for "<task>"`;
  `stats` now counts capabilities.
- **`rag-over-your-content` project blueprint** — the docs→embed→retrieve→
  generate→learn content pipeline — plus its trigger keywords.
- **`FOUNDATIONS.md`** (tokens, context window, embeddings, training, and
  "prediction, not understanding" framed as a design *stance*) and
  **`GLOSSARY.md`** (25 core terms). Both model-agnostic — no version numbers or
  benchmarks. Linked from the README.

### Changed

- `data` package `2.0.0` → `2.1.0` (minor — additive).
- `validate.js` extended to check capability ids/keys/categories and every
  capability `patterns` / `principles` / `uxPatterns` / `failureModeKeys`
  reference, plus the `capability-to-pattern` relations. Report now includes a
  capability count.

## [2.0.0] — 2026-07-02

Aligns the `data/` package version with the playbook release and adds a
provable-consistency layer over the 78 patterns × 17 principles × 9 UX patterns
+ relations data. Repositions the project around its production-hardening core
(patterns 63–78) and readies `@muriloscigliano/ai-playbook` for its first npm
publish.

### Added

- **Web explorer (`web/`).** A standalone Vite + Vue 3 + TypeScript app that
  renders the data layer as a d3-force graph of all 104 entities — edges typed
  and colored by relation kind, weighted by strength — with a node panel
  (neighborhood + doc deep-links), faceted filters (kind / Part / theme / UX
  lifecycle / autonomy L1–L4 / visibility V1–V4), full-text search, and a
  **Diagnose UX** page consuming the `uxDiagnoses` dataset. Imports the data
  layer live via a pnpm workspace (`workspace:*`) — single source of truth, no
  duplicated data. Static build deploys to Pages/Netlify with no backend.
- **UX patterns P8 & P9.** `P8 Progressive Disclosure (Response Shaping)`
  (In-Action — answer-first, expand-on-demand, chunk long output) and
  `P9 Editable & Forkable Output` (Post-Action — treat output as an editable
  draft with cheap partial re-roll and forking). Added as full sections in
  `AI_DESIGN_PRINCIPLES.md`, rebuilt through the design index + generator (the
  UX barrel stays generated, not hand-edited), and wired into the pattern
  summary table and ToC. `diagnose_ux` rows for over-explaining / walls of text
  now point at P8 and the hard-to-edit row at P9. New `principle→ux-pattern`
  relations for both. `get_ux_pattern` range widened 1–7 → 1–9 (MCP + CLI).
- **Visibility axis (V1–V4).** New taxonomy `visibilityLevels`
  (`data/taxonomy/visibility-levels.js`) — V1 Ambient/Invisible, V2
  Assistive/Inline, V3 Conversational/Surfaced, V4 Foreground/Agentic — with
  `designImplications` and `primaryPrinciples[]`, orthogonal to autonomy.
  Exported via `./taxonomy` (now a barrel) and the main index; `VisibilityLevel`
  type added; surfaced in the CLI `visibility` command and `stats`; validated.
- **Positioning & naming rule** ("don't lead with AI") added to
  `templates/MICROCOPY_SNIPPETS.md`, cross-linked to the visibility axis.
- **`diagnose_ux` — reverse lookup for user-perceived failures.** New data set
  `uxDiagnoses` (19 complaints) + `uxDiagnoseKeywords`, each mapping a user
  complaint to UX patterns, design principles, concrete microcopy, and — where
  one exists — a cross-reference to the engineering root cause in
  `problemDiagnoses`. Surfaced as the MCP tool `diagnose_ux({ complaint })`, the
  CLI command `diagnose-ux "<complaint>"`, and the `detectUxComplaints(desc)`
  helper. Exported from `@muriloscigliano/ai-playbook` (`uxDiagnoses`,
  `uxDiagnoseKeywords`, `detectUxComplaints`) with a `UxDiagnosis` type. The
  validator now checks every `uxDiagnoses` reference resolves.
- **Data integrity validator** (`data/scripts/validate.js`, zero deps). Asserts
  unique pattern numbers `1..78`, principle numbers `1..17`, and UX codes
  `P1..Pn`; every relation `from`/`to` resolves to a real entity id with a valid
  `type`/`strength`; every `principles[]`/`patterns[]`/`uxPattern` reference in
  vocabulary, recommendations, and taxonomy resolves; warns (does not fail) on
  orphan patterns. Exits non-zero with a readable report on any hard failure.
- `npm run validate` script in `data/package.json`.
- GitHub Actions workflow (`.github/workflows/validate.yml`) running the
  validator on every push and pull request.
- This `CHANGELOG.md`.

### Changed

- **README hero repositioned** to lead with the production-hardening core
  (patterns 63–78: deferred tool loading, hierarchical memory files, skills
  system, bridge pattern, tool-result tombstones) rather than generic ReAct/RAG,
  with an npm install line and a "What's new in 2.0" pointer to this changelog.
- **`data` package version bumped `1.0.0` → `2.0.0`** to match the playbook tag.
- **Packaging readied for publish:** added a package-level `data/README.md`
  (shown on npm), normalized `repository.url` to `git+https://…`, and confirmed
  via `npm publish --dry-run` that the `files` whitelist ships only the intended
  data dirs + types + README (132 files) — dev-only `scripts/` is excluded.
- `data/index.d.ts` `Relation.type` enum widened to the full set actually in use
  (`prerequisite`, `enables`, `triggers`, `prevents`, `conflicts_with` added);
  optional `source`, `autonomyLevel`, and `note` metadata fields documented and
  `reason` marked optional.

### Fixed

- Backfilled the missing `strength` field on all `pattern-to-principle` and
  `principle-to-ux-pattern` relations (previously `undefined`).
- Repointed the `principle-17 → data-portability` relation from the non-existent
  `ux-pattern-bridge` id to the real `pattern-76` (Bridge Pattern).
- Removed the dangling `principle-15 → anti-agentic-sludge` relation (target was
  never modeled as a data entity).
