# Foundations

The builder literacy the [capability layer](data/capabilities/) assumes. Enough
of *how AI works under the hood* to make good design and engineering calls —
model-agnostic, no benchmarks, no version numbers. Where a concept has a
design consequence, that consequence is called out, because that is the part
that changes what you build.

For crisp one-line definitions, see [GLOSSARY.md](GLOSSARY.md).

---

## Tokens

Models do not read characters or words — they read **tokens**, sub-word chunks
the model was trained to recognize. A rough rule of thumb in English is about
three-quarters of a word per token, but this varies: common words may be a
single token, rare words several, and other languages tokenize far less
efficiently — the same sentence can cost noticeably more tokens in one language
than another.

**Design consequences.**
- **Cost and latency scale with tokens, not words.** Long prompts, verbose
  tool results, and large retrieved contexts are literal line items. Budgeting
  tokens is budgeting money and time — see
  [Pattern 6 (Context Engineering)](AI_AGENT_PATTERNS_PLAYBOOK.md) and
  [Pattern 78 (Tool Result Budget)](AI_AGENT_PATTERNS_PLAYBOOK.md).
- **Non-English users can pay a hidden tax.** A feature that feels cheap in
  English may be slower and pricier in another language for the same task.
  Measure in the languages you actually serve.

## Context window

The **context window** is the maximum number of tokens a model can attend to at
once — everything it can "see" for a single response: system prompt, tools,
conversation history, and any retrieved material. It is finite. When a
conversation or task outgrows it, something has to give.

**Design consequences.**
- **Nothing outside the window exists to the model.** Earlier turns, prior
  decisions, and dropped detail are simply gone unless re-supplied. This is the
  mechanism behind "it forgot what I said" — a UX symptom with a technical
  root. See [Pattern 7 (Context Compaction)](AI_AGENT_PATTERNS_PLAYBOOK.md) and
  [Pattern 24 (Semantic Recall)](AI_AGENT_PATTERNS_PLAYBOOK.md).
- **More context is not free context.** Filling the window with marginally
  relevant material dilutes attention and raises cost. Retrieval quality beats
  retrieval quantity.

## Embeddings & embedding space

An **embedding** turns a piece of content — text, image, audio — into a vector:
a list of numbers positioning it in a high-dimensional **embedding space**.
Content with similar meaning lands near neighbours in that space, even when it
shares no exact words. Distance in embedding space is a proxy for similarity of
meaning.

**Design consequences.**
- **This is what makes "find similar" possible.** Semantic search, clustering,
  and retrieval all rest on embedding proximity rather than keyword matching —
  the foundation of the [semantic-search](data/capabilities/) and
  [clustering](data/capabilities/) capabilities.
- **Proximity is not correctness.** Two things can be *near* in embedding space
  and still be the wrong answer. Retrieval needs grounding and verification, not
  blind trust — see [Pattern 31 (Corrective RAG)](AI_AGENT_PATTERNS_PLAYBOOK.md).

## How models are trained: pre-training, alignment, and the knowledge cutoff

At a high level a model is built in stages. **Pre-training** exposes it to a
very large corpus so it learns the statistical structure of language and the
patterns in its data. **Alignment** (instruction tuning and reinforcement from
human feedback) then shapes the raw model into something that follows
instructions and behaves more helpfully and safely. The corpus is frozen at a
point in time — the **knowledge cutoff** — so the model has no inherent
awareness of anything after it.

**Design consequences.**
- **The model's built-in knowledge is stale by construction.** For anything
  current, company-specific, or private, you must *supply* the information at
  run time (retrieval, tools) rather than assume the model knows it.
- **Alignment shapes behaviour but does not guarantee it.** Guardrails and
  verification still belong in the system — see
  [Pattern 50 (Guardrails)](AI_AGENT_PATTERNS_PLAYBOOK.md).

## Prediction, not understanding — as a design stance

A language model generates output by repeatedly predicting the next token given
everything so far. It is extraordinarily good at this, and the results can read
as genuine comprehension. *Whether that amounts to "understanding" is a
contested question, and this playbook does not try to settle it.* What matters
for building is the **design stance** the mechanism recommends:

- **Treat fluent output as a confident prediction, not a verified fact.**
  Surface uncertainty and let users calibrate trust rather than absorb every
  answer as authoritative — [P4 Confidence Signal](AI_DESIGN_PRINCIPLES.md),
  [Principle 10 (Communicate Limitations)](AI_DESIGN_PRINCIPLES.md).
- **Verify what matters.** Where a wrong answer is costly, check the output
  against a source or a tool before acting —
  [Pattern 13 (Tool-Verified Self-Correction)](AI_AGENT_PATTERNS_PLAYBOOK.md).
- **Avoid metaphors that overclaim.** Interfaces that imply the system "knows"
  or "thinks" invite misplaced trust; non-human framing keeps expectations
  honest — [Principle 5 (Non-Human Metaphors)](AI_DESIGN_PRINCIPLES.md).

Held as a stance rather than a philosophical claim, this is the through-line of
the whole [capability layer](data/capabilities/): design for uncertainty,
ground in real data, and keep a human in the loop where the stakes justify it.

---

## Where to go next

- **[HARNESS.md](HARNESS.md)** — the engineering that wraps the model: its
  three layers, and how the 78 patterns map onto them.
- **[data/capabilities/](data/capabilities/)** — what AI is actually good at,
  and which primitive to reach for.
- **[GLOSSARY.md](GLOSSARY.md)** — one-line definitions of the core terms.
- **[AI_AGENT_PATTERNS_PLAYBOOK.md](AI_AGENT_PATTERNS_PLAYBOOK.md)** — the
  engineering patterns that implement these capabilities safely.
