# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the data package (`@muriloscigliano/ai-playbook`) adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] — docs

**The Harness.** Adds `HARNESS.md` — the organizing concept the playbook had been
building toward without naming. Docs-only; no change to the `@muriloscigliano/ai-playbook`
package (no version bump). Distilled from *"What Is an AI Harness?"* (The Nuanced
Perspective, 2026); as with loop engineering, the article's mechanisms were already
patterns, so this adds the *lens*, not new entities.

### Added

- **AX serves UX; it does not replace it** — new section in `AGENT_EXPERIENCE.md`
  that stress-tests the AX framing against its strongest critique (Ezra Schwartz,
  *"Agentic Experience is just bad UX in disguise"*) and holds it correctly:
  AX is good UX extended to a new medium, not a replacement for human-centeredness.
  Encodes the critique's specific human-side failure modes (opaque black boxes,
  transparency shrinking as confidence grows, homogenized voice, reinforced bias,
  "AI as partner" overclaiming, agency lost to path-planning) as a table mapping
  each to the playbook entity that already guards against it (#7, #14, #9,
  principles 3/4/5/10/12/14/15, Authenticity). Folds in John Maeda's reconciliation
  (*Simplicity & AX* — "teleport to the goal instead of navigating an obstacle
  course"; designer as orchestrator) and sharpens the definition with Netlify's
  discover / invoke / recover framing. Model-agnostic — no vendor stats.
- **Usefulness audit — real bugs fixed.** A full audit (3 parallel review agents +
  functional testing) found surfaces that ran but didn't deliver value:
  - **`get_pattern(N)` returned the wrong pattern for all 78** (MCP) — matched the
    `section` field (pattern# + 1) as a fallback, so every lookup returned the
    neighbour. Fixed.
  - **`recommend_design` / CLI `design` dead-ended on realistic briefs** — only 10
    of 36 constraints and 15 of 23 human tasks had detection keywords. Now derived
    from each entity's own `keywords[]` (all reachable) + curated extras; added
    approve/approval/human-in-the-loop and response-time phrasings; de-greedied
    project-type detection. Also fixed a latent `constraint.playbook` (→ `.patterns`)
    crash.
  - **`get_relations(N)` — new 16th MCP tool** exposing the typed relations graph
    (the web explorer's best feature) for architecture traversal.
  - Synced stale prose counts across 6 docs (`P1-P7` → `P1-P9`, "all 17 principles"
    → "16 of 17"); installer now ships HARNESS/AGENT_EXPERIENCE/FOUNDATIONS/GLOSSARY;
    CONTRIBUTING points at the real Vite/Vue web paths.
  - **`validate.js` now greps the markdown for prose-count drift** and fails on
    contradiction with the data — the guardrail that would have caught all the
    above.
- **Authenticity: the scarce signal** — new section in `templates/MICROCOPY_SNIPPETS.md`
  (companion to Positioning & Naming). As generated output saturates every surface,
  the genuinely human detail becomes the scarce, differentiating signal — the
  positive inverse of Agentic Sludge. Concrete microcopy for preserving the user's
  voice, attributing human review, and framing generated output as a draft to
  humanize. Distilled from the authenticity counter-trend in NN/g's *State of UX
  2026* — the one timeless design idea from an otherwise industry/careers piece;
  its trends, stats, and careers commentary were deliberately left out as
  out-of-scope.
- **`HARNESS.md`** — defines the harness (the engineering that wraps a model) and
  its **three-layer anatomy**: Model layer (how intelligence is consumed), Data &
  API layer (what it consumes — deterministic, test it hard), and Verification
  layer (what stops bad output from cascading). Maps all 78 patterns onto the
  three layers, turning the playbook into one system rather than a list. Introduces
  the **hard- vs soft-verifiable task** decision (how much verification you build
  is set by the task) and the **build-vs-compose** / **stable-vs-nuanced** strategic
  framings. Model-agnostic — no version numbers or benchmarks. Every pattern,
  principle, and UX citation verified to resolve.
- **`GLOSSARY.md`** — new terms: *harness*, *hard-verifiable task*,
  *soft-verifiable task*.
- README gains a "The Harness: how it all fits together" section; `FOUNDATIONS.md`
  links to it.
- **Anti-pattern #18 — The Over-Engineering Agent** (new Code-Generation category
  in `AI_ANTI_PATTERNS.md`, now 18): the coding agent that reaches for the most
  elaborate solution that works — needless dependencies, wrappers, speculative
  abstractions — instead of the simplest. Fix is a minimalism decision-ladder
  applied *before* generation (as a Skill / memory file), never at the cost of
  validation, security, or accessibility. Threaded through ToC, summary table,
  interaction map, coverage analysis, and quick diagnostic. Credits the *Ponytail*
  minimalism skill as a real-world signal for the technique (no vendor benchmarks).
- **`AGENT_EXPERIENCE.md` — Agent Experience (AX), the outward design lens.** The
  playbook's first entry written from the inverse vantage point: *your* product is
  the thing *other people's* agents consume on a user's behalf. Defines AX as the
  third lens alongside UX and DX, organized around four surfaces — **Access**
  (API parity, no needless human-only gates), **Context** (`AGENTS.md`, `llms.txt`,
  docs that match reality), **Tools** (expose capability as callable, structured,
  error-legible interfaces), **Orchestration** (standardized trust-critical flows,
  agent-distinct logging) — plus the reciprocal principles for well-behaved
  agents. Bridged to real patterns (21, 60, 59, 49, 19, 53, 70, 20, 64) and to the
  visibility axis. New `templates/AX_REVIEW_CHECKLIST.md` gives it actionable teeth.
  GLOSSARY adds *Agent Experience (AX)*, *AGENTS.md*, *llms.txt*. Distilled from the
  open [agentexperience.ax](https://agentexperience.ax) community (with Netlify);
  model-agnostic — no vendor names, adoption stats, or version numbers.
- **`FOUNDATIONS.md` — "Having a large window is not the same as using it well"**:
  the long-context distinction between capacity and competence (the "lost in the
  middle" effect; retrieval ≠ reasoning), guidance to give long-context retrieval
  its own evals ([54](AI_AGENT_PATTERNS_PLAYBOOK.md), [55](AI_AGENT_PATTERNS_PLAYBOOK.md)),
  prefer structured retrieval over dumping ([30](AI_AGENT_PATTERNS_PLAYBOOK.md),
  [7](AI_AGENT_PATTERNS_PLAYBOOK.md)), and the note that many-shot in-context
  examples raise capability but also widen the safety surface. Model-agnostic — no
  token counts or model names.

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
