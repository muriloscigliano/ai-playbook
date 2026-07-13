# Agent Experience (AX)

The rest of this playbook assumes **you are building the agent**. This document
flips the vantage point: **your product, site, or API is the thing an agent
consumes** — on a user's behalf, alongside browsers and mobile apps. That is a
different design problem, and it has a name.

> **Agent Experience (AX)** is the experience an AI agent has when it interacts
> with your product to accomplish a user's goal — how readily it can access,
> understand, and operate your system. Concretely, it measures how well an agent
> can **discover** your service, **invoke** it reliably, and **recover** when
> something fails. As people delegate more work to agents, AX becomes a design
> surface of its own, next to UX and DX.

Model-agnostic by construction: no vendor names, adoption stats, or version
numbers — AX is a stance about *your* surface, not about which agent visits it.

Source of the framing: the open **Agent Experience** community
([agentexperience.ax](https://agentexperience.ax), pioneered with Netlify). The
ideas below are encoded in this playbook's own words and wired to its patterns.

---

## The third lens: UX · DX · AX

Software has learned to design for two audiences beyond "the computer":

- **UX** — the experience of the *end user*. This playbook's
  [design principles](AI_DESIGN_PRINCIPLES.md) and [UX patterns](AI_DESIGN_PRINCIPLES.md#part-b-ux-patterns-for-agentic-systems) cover it.
- **DX** — the experience of the *developer* integrating your product.
- **AX** — the experience of the *agent* acting for a user.

These are not in competition. An agent is **a first-class medium the end user
consumes your service through** — so good AX is in service of UX, not a
replacement for it. The user still owns the goal; the agent is how they reach
it. The mistake is designing only for the human at the keyboard when a growing
share of your "visitors" are agents dispatched by humans who never see your UI at
all.

**Where AX meets this playbook's other axes:** the [visibility axis (V1–V4)](data/taxonomy/visibility-levels.js)
describes how visible *your* AI is to *your* user. AX is orthogonal to it — it is
about how legible *your product* is to *someone else's* agent. A quiet, ambient
feature (V1) can still have excellent or terrible AX.

---

## AX serves UX; it does not replace it

AX has a sharp, fair critique worth stating plainly: the "A" in AX is an *agent*
— a non-human — while the "U" in UX is the *human*, and it is a mistake to let
"design for agents" quietly become "stop designing for humans." The failure mode
is real: a system that plans its own path with opaque logic produces a **black
box the user cannot understand, predict, or correct**; preference-modeling
treats human goals — which are contextual, contradictory, and evolving — as fixed
data points, **homogenizing voice and reinforcing bias**; and the "AI as partner"
metaphor **overclaims**, because an agent executes programmed behavior, not
judgment. Reducing transparency *as confidence grows* leaves users with
dependency and no framework for understanding failure. (This is Ezra Schwartz's
argument, and it is a good one.)

The resolution is not to abandon AX but to hold it correctly: **AX is good UX
extended to a new medium, not a replacement for human-centeredness.** The user
still owns the goal; the agent is how they reach it; and the same principles that
make a human interface trustworthy make an agent-facing one trustworthy. John
Maeda frames the upside precisely: at its best, an agentic experience lets a
person **"teleport to the goal instead of navigating an obstacle course"** —
simplicity as agency, the system carrying elaborate complexity beneath a simple
surface. The designer becomes an *orchestrator of the experience*, not merely a
crafter of screens — but the experience is still the human's.

So every AX decision in this document is bounded by a human-centered rule: **make
the agent path legible and capable, without making the human path opaque or
disposable.** The specific risks the critique names each have a home in this
playbook already:

| Risk when AX forgets the human | Where the playbook guards against it |
|---|---|
| Opaque, uncorrectable "black box" behavior | [The Black Box (#7)](AI_ANTI_PATTERNS.md); [Principle 3 (Transparent Thinking Partner)](AI_DESIGN_PRINCIPLES.md); [P3 Explainable Rationale](AI_DESIGN_PRINCIPLES.md) |
| Transparency shrinking as confidence grows | [Trust Cliff (#14)](AI_ANTI_PATTERNS.md); [Principle 10 (Communicate Limitations)](AI_DESIGN_PRINCIPLES.md) |
| Homogenized voice / flattened human expression | [Authenticity: the scarce signal](templates/MICROCOPY_SNIPPETS.md); [Principle 4 (Preserve Creative Interpretation)](AI_DESIGN_PRINCIPLES.md) |
| Reinforced bias from preference-modeling | [Principle 14 (Beyond Immediate Utility)](AI_DESIGN_PRINCIPLES.md), [Principle 15 (Guardrails)](AI_DESIGN_PRINCIPLES.md) |
| "AI as partner" overclaiming judgment it lacks | [Principle 5 (Non-Human Metaphors)](AI_DESIGN_PRINCIPLES.md); [Sycophancy Spiral (#9)](AI_ANTI_PATTERNS.md) |
| Agency lost to the system's own path-planning | [Principle 12 (Negotiate Agency)](AI_DESIGN_PRINCIPLES.md); [P2 Autonomy Dial](AI_DESIGN_PRINCIPLES.md) |

The takeaway: **the future of software design needs deeper UX expertise, not
less.** AX is where that expertise gets applied to a new class of user — the
agent — *in service of* the human who sent it.

---

## The four surfaces of AX

A useful way to structure the work (after Mathias Biilmann's framing): an agent
needs four things from your product. Design each deliberately.

### 1. Access — can the agent get in and act at all?

The agent must be able to *do* what a human can do, without a human in the loop
where one is not genuinely required.

- **API and resource parity with the human interface.** If a human can do it in
  your UI, an agent should be able to do it through a documented, stable
  interface. Capability that exists only behind a point-and-click flow is
  invisible to agents.
- **Human-only gates are an AX anti-pattern where the human is not essential.**
  A CAPTCHA, a "click here" that has no programmatic equivalent, or an
  interaction that *requires* a rendered browser blocks the delegate for no
  security gain. Reserve human-in-the-loop for the moments that genuinely need
  human judgment (see [Pattern 20 (Tool Suspend/Resume)](AI_AGENT_PATTERNS_PLAYBOOK.md)),
  not as an accidental wall.
- **Scoped, progressive authorization for agents.** An agent should be able to
  authenticate and be granted *narrow, escalating* permissions rather than
  all-or-nothing access — the [Multi-Layer Permission](AI_AGENT_PATTERNS_PLAYBOOK.md)
  and [Autonomy Dial](AI_DESIGN_PRINCIPLES.md) ideas, applied to *inbound* agents
  instead of your own.

### 2. Context — can the agent understand how to use you?

An agent arrives with no institutional knowledge. Give it structured, machine-
readable context so it does not have to guess.

- **Host context files the user can hand to their agent** — an `AGENTS.md` for
  coding agents, an `llms.txt` pointing at machine-readable docs, and support for
  emerging standards (MCP, agents.json, Arazzo) where they fit. These are the
  agent-facing equivalent of good onboarding docs.
- **Documentation that matches reality.** An agent will follow your docs
  literally; drift between docs and behaviour becomes the agent's bug. Keep them
  consistent, versioned, and specific about how the system is *meant* to be used.
- **Say where information lives and how feedback arrives** — is a result
  synchronous or does the agent poll? Where does it find state? Context locality
  and predictability matter more to an agent than to a human, who can improvise.
- This is the inbound mirror of the playbook's own
  [Hierarchical Memory Files (Pattern 69)](AI_AGENT_PATTERNS_PLAYBOOK.md): you write
  the `AGENTS.md`; the visiting agent reads it.

### 3. Tools — can the agent operate you cleanly?

Once in and oriented, the agent needs interfaces built for machine use.

- **Expose capability as tools, not just pages.** [MCP (Pattern 60)](AI_AGENT_PATTERNS_PLAYBOOK.md)
  and [A2A (Pattern 59)](AI_AGENT_PATTERNS_PLAYBOOK.md) are the protocols that turn
  a product into something an agent can call.
- **Design those tools the way you would for your own agent** — the discipline of
  [Agent-Friendly Tool Design (Pattern 21)](AI_AGENT_PATTERNS_PLAYBOOK.md) applies
  identically to tools you expose *outward*: clear names, high-signal responses,
  and errors an agent can *act on* rather than guess at.
- **Structured, predictable, machine-readable I/O** — the [Structured Outputs (Pattern 49)](AI_AGENT_PATTERNS_PLAYBOOK.md)
  and [Schema Compatibility (Pattern 19)](AI_AGENT_PATTERNS_PLAYBOOK.md) principles,
  pointed at your public surface.

### 4. Orchestration — can the agent trust and be trusted across a flow?

Multi-step, trust-critical interactions (purchase, auth, credential change) need
standardized, verifiable patterns so a delegated agent can be trusted and the
service can trust it back.

- **Standardize sensitive flows.** Predictable interaction patterns for
  purchases and authentication give both sides *verifiable trust* — the agent
  knows the shape of the flow; you can verify the agent followed it.
- **Differentiate and log agent traffic.** Track agent requests distinctly in
  logs, metrics, and audit trails (e.g. via the `User-Agent` header, or an
  agent-session flag at auth). You cannot improve AX you cannot see, and you
  cannot govern actions you cannot attribute — the inbound complement of
  [Observability (Pattern 53)](AI_AGENT_PATTERNS_PLAYBOOK.md) and
  [Denial Tracking (Pattern 70)](AI_AGENT_PATTERNS_PLAYBOOK.md).
- **Close the feedback loop.** Let agents report back what worked and what did
  not, so your AX improves the way UX improves from user feedback.

---

## The other side: how a well-behaved agent should act

AX is a two-way contract. The playbook is mostly about building agents — so if
*you* are the one building the agent that visits other people's services, the
reciprocal principles:

- **Use the optimal path, then any allowed one.** Prefer the service's
  agent-optimized interface (its tools, its `llms.txt`); fall back to general
  routes only within the boundaries the service sets. Respect its limits.
- **Identify yourself transparently.** Announce agent name, model, and modality
  (e.g. in the `User-Agent` header) so services can attribute, rate-limit, and
  improve. Anonymous agents are ungovernable agents.
- **Follow the service's trust-critical patterns** for purchases, auth, and
  credential changes rather than improvising around them.
- **Send feedback.** Quantitative and qualitative signal back to the service
  helps it raise its AX — which helps every agent, including yours, next time.

---

## Why this belongs in the playbook

Everything else here optimizes the agent you build. AX optimizes the *world your
agent operates in* — and the *product other people's agents operate on.* As the
share of traffic that is agent-dispatched grows, a product with poor AX becomes
invisible to the delegates making decisions for its users, no matter how good its
UX is for the humans who still visit directly. Designing for agents is not a
replacement for designing for people; it is how you keep serving people who now
arrive through an agent.

Put it to work with the **[AX Review Checklist](templates/AX_REVIEW_CHECKLIST.md)**.

---

## Where to go next

- **[templates/AX_REVIEW_CHECKLIST.md](templates/AX_REVIEW_CHECKLIST.md)** — an actionable Access/Context/Tools/Orchestration review for your product's AX.
- **[HARNESS.md](HARNESS.md)** — the inward view: the engineering that wraps *your* model.
- **[AI_DESIGN_PRINCIPLES.md](AI_DESIGN_PRINCIPLES.md)** — the UX lens: designing for the human.
- **[GLOSSARY.md](GLOSSARY.md)** — definitions of AX, `AGENTS.md`, `llms.txt`, and the core terms.
