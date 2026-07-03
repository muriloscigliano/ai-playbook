# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the data package (`@muriloscigliano/ai-playbook`) adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2026-07-02

Aligns the `data/` package version with the playbook release and adds a
provable-consistency layer over the 78 × 17 × 7 + relations data.

### Added

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
