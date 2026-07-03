# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the data package (`@muriloscigliano/ai-playbook`) adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2026-07-02

Aligns the `data/` package version with the playbook release and adds a
provable-consistency layer over the 78 × 17 × 7 + relations data.

### Added

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

- **`data` package version bumped `1.0.0` → `2.0.0`** to match the playbook tag.
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
