# Agent Experience (AX) Review Checklist

> Use this when reviewing how well your product, site, or API serves the **AI
> agents** that increasingly consume it on users' behalf — the inbound
> counterpart to a UX review.
> Organized by the four surfaces of AX: **Access · Context · Tools ·
> Orchestration**. Items marked (!) are blocking — a product with these gaps is
> effectively invisible or unusable to delegated agents.
>
> Reference: [Agent Experience (AX)](../AGENT_EXPERIENCE.md) | [Patterns](../AI_AGENT_PATTERNS_PLAYBOOK.md) | [Design Principles](../AI_DESIGN_PRINCIPLES.md)

---

## Product / surface: _________________________ Date: _________

---

## Access — can an agent get in and act at all?

- [ ] (!) Every capability a human can perform in the UI is reachable through a documented, stable interface (API/resource parity)
- [ ] (!) No human-only gate (CAPTCHA, unlabeled click-only flow, render-required step) blocks a goal where a human is not genuinely required
- [ ] Agents can authenticate without impersonating a human or scraping a browser session
- [ ] Authorization is scoped and progressive — an agent gets narrow, escalating permissions, not all-or-nothing — Pattern 64 (Multi-Layer Permissions)
- [ ] Human-in-the-loop is reserved for moments that genuinely need human judgment, not used as an accidental wall — Pattern 20 (Suspend/Resume)
- [ ] Rate limits and quotas are documented and return a machine-actionable signal, not a silent block

## Context — can an agent understand how to use you?

- [ ] (!) A machine-readable context file exists and is discoverable (`AGENTS.md` for coding agents and/or `llms.txt` pointing at docs)
- [ ] Documentation matches actual behaviour — no drift an agent would follow into a bug
- [ ] Docs state how the system is *meant* to be used, not just what endpoints exist
- [ ] It is clear where state/information lives and whether results are synchronous or require polling
- [ ] Context is local and predictable — the agent does not have to reconstruct hidden global state
- [ ] Emerging standards (MCP, agents.json, Arazzo) are supported where they fit your surface — Pattern 60 (MCP)

## Tools — can an agent operate you cleanly?

- [ ] (!) Capability is exposed as callable tools/endpoints, not only as human-facing pages
- [ ] Tool/endpoint names and descriptions are clear and high-signal — Pattern 21 (Agent-Friendly Tool Design)
- [ ] Inputs and outputs are structured, typed, and predictable — Pattern 49 (Structured Outputs), Pattern 19 (Schema Compatibility)
- [ ] (!) Errors are machine-actionable — they say what went wrong and what to do, not just "400 Bad Request"
- [ ] Responses carry enough metadata for the agent to cite or verify what it did
- [ ] Pagination, partial results, and long-running operations have a documented, agent-friendly shape

## Orchestration — can an agent be trusted across a flow?

- [ ] (!) Trust-critical flows (purchase, auth, credential change) follow a standardized, verifiable pattern — not a bespoke UI dance
- [ ] Agent traffic is identifiable and logged distinctly (e.g. `User-Agent` header, agent-session flag) — Pattern 53 (Observability)
- [ ] Agent actions are attributable in audit trails for governance and rollback — Pattern 70 (Denial Tracking)
- [ ] Multi-step flows are resumable / idempotent so a dropped agent connection does not corrupt state
- [ ] There is a channel for agents to send feedback that improves your AX over time

## The reciprocal (if YOU build the visiting agent)

- [ ] Your agent prefers the service's agent-optimized path, falling back only within the service's stated boundaries
- [ ] Your agent identifies itself transparently (name, model, modality) so services can attribute and improve
- [ ] Your agent follows the service's trust-critical patterns rather than improvising around them
- [ ] Your agent sends feedback that helps the service raise its AX

---

## Scoring

- **All (!) items pass** — your product is usable by delegated agents. Work the non-blocking items to make it *pleasant*.
- **Any (!) item fails** — agents (and the users behind them) will silently route around you. Fix the blocking gaps first.

Note: like UX, AX is never "done." As the share of agent-dispatched traffic
grows, revisit this review the way you revisit a UX audit.
