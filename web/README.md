# AI Playbook — Relations Explorer

A standalone, static web explorer for the [AI Agent Patterns Playbook](../). It renders the typed data layer as an interactive force-directed graph and turns the `diagnose_ux` dataset into a live UX-triage tool.

Built with **Vite + Vue 3 + TypeScript** and **d3-force**. It imports the data layer directly from [`../data`](../data) via the pnpm workspace — no data is duplicated; the graph is always the current shape of the repo.

## Develop

```bash
# from the repo root
pnpm install
pnpm --filter web dev        # http://localhost:5173
```

## Build (static, deployable to Pages / Netlify — no backend)

```bash
pnpm --filter web build      # → web/dist
pnpm --filter web preview    # serve the built bundle
```

For a GitHub Pages subpath, set the base at build time:

```bash
BASE=/ai-playbook/ pnpm --filter web build
```

## What it does

- **Force-directed graph** of all 104 entities — 78 engineering patterns, 17 design principles, 9 UX patterns — with edges typed and colored by relation kind (`requires`, `enhances`, `implements`, `alternative`, `conflicts`, …) and weighted by `strength`. Node size follows degree.
- **Click a node** → side panel with its problem/summary, its neighborhood grouped by relation type, and a deep link to the source markdown. Selecting focuses the graph (neighbors lit, the rest dimmed).
- **Filters** — by entity kind, engineering Part, design theme, UX lifecycle phase, autonomy level (L1–L4), and the visibility axis (V1–V4).
- **Search** — free-text over names, codes, summaries, and keywords.
- **Diagnose UX** — type a user complaint ("walls of text", "it made it up") and get the mapped UX patterns + principles + microcopy, consuming the same `uxDiagnoses` dataset as the `diagnose_ux` MCP tool. Results deep-link back into the graph.

## Structure

```
src/
├── data.ts        # adapts @muriloscigliano/ai-playbook → graph nodes/edges + lookups
├── filters.ts     # filter state + predicate
├── theme.ts       # color scales for kinds, relation types, strengths
├── App.vue        # shell: header, search, view switch
└── components/
    ├── ForceGraph.vue   # canvas + d3-force simulation, pan/zoom/drag
    ├── NodePanel.vue     # node detail + neighborhood
    ├── FilterBar.vue     # faceted filters
    └── DiagnoseUx.vue    # complaint → UX guidance
```
