# Industry-Specific Guides for AI Agent Systems

> Which of the 78 engineering patterns, 17 design principles, and 7 UX patterns matter most for **your** industry — with domain-specific context, phased rollout plans, and anti-pattern warnings.
>
> Companion to the [AI Agent Patterns Playbook](AI_AGENT_PATTERNS_PLAYBOOK.md) and [AI Design Principles](AI_DESIGN_PRINCIPLES.md).

---

## Table of Contents

- [How to Use This Guide](#how-to-use-this-guide)
- [1. Fintech & Banking](#1-fintech--banking)
- [2. Healthcare & Life Sciences](#2-healthcare--life-sciences)
- [3. Developer Tools & Coding Agents](#3-developer-tools--coding-agents)
- [4. Customer Support & Service](#4-customer-support--service)
- [5. E-Commerce & Retail](#5-e-commerce--retail)
- [6. Enterprise & Internal Tools](#6-enterprise--internal-tools)
- [Getting Started: Universal Checklist](#getting-started-universal-checklist)
- [Industry Comparison Matrix](#industry-comparison-matrix)
- [Common Questions](#common-questions)

---

## How to Use This Guide

This document is not a replacement for the full playbook. It is a **lens** — a way to filter the 78 patterns down to the ones that matter most for your domain, in the order you should implement them.

**For each industry you will find:**

1. **Industry Overview** — what makes this domain unique for AI agents
2. **Regulatory & Trust Requirements** — non-negotiable constraints
3. **Pattern Selection** — phased table (start here, add next, when mature)
4. **Design Principles Priority** — which of the 17 matter most and why
5. **UX Patterns Priority** — which of P1-P7 are critical
6. **Constraints Checklist** — which constraints from the taxonomy apply
7. **Example Workflow** — one concrete agent workflow with pattern references
8. **Anti-Pattern Warnings** — 2-3 industry-specific pitfalls

**Reading conventions:**

- Pattern numbers reference the playbook (e.g., "Guardrails (50)" = Pattern 50)
- Principle numbers use the P prefix for design principles (e.g., "P13 = Make Accountability Visible")
- UX pattern numbers use the UX prefix (e.g., "UX-P4 = Confidence Signal")
- Constraint names match the [Constraint Taxonomy](AI_DESIGN_PRINCIPLES.md#constraint-taxonomy)

Start with the industry closest to yours. If you span two industries (e.g., a healthcare fintech), read both and merge their Phase 1 lists.

**Why industry-specific guidance matters:**

The 78 patterns in the playbook are industry-agnostic by design. But the *order* in which you implement them, the *constraints* you prioritize, and the *anti-patterns* you watch for are deeply industry-specific. A healthcare agent and an e-commerce agent both need guardrails — but a healthcare agent needs guardrails that scrub PHI and enforce clinical disclaimers, while an e-commerce agent needs guardrails that prevent dark patterns and false urgency. Same pattern, different configuration, different priority.

This guide saves you the work of figuring out that mapping. For each industry, we have already analyzed which of the 78 patterns, 17 principles, 7 UX patterns, and 36 constraints matter most — and in what order to implement them.

**How this relates to Project Blueprints:**

The [`data/recommendations/project-blueprints.js`](data/recommendations/project-blueprints.js) file contains phased recommendations by *project type* (chatbot, coding agent, RAG app, etc.). This guide operates at a different axis: by *industry*. A fintech company building a chatbot would use both the chatbot blueprint (for architecture) and the Fintech industry guide (for regulatory and domain constraints). The two are complementary, not competing.

**Pattern count per industry:**

| Industry | Phase 1 | Phase 2 | Phase 3 | Total Unique Patterns |
|---|---|---|---|---|
| Fintech & Banking | 5 | 5 | 5 | 15 |
| Healthcare & Life Sciences | 5 | 5 | 5 | 15 |
| Developer Tools & Coding Agents | 5 | 5 | 6 | 16 |
| Customer Support & Service | 5 | 5 | 5 | 15 |
| E-Commerce & Retail | 5 | 5 | 5 | 15 |
| Enterprise & Internal Tools | 5 | 5 | 6 | 16 |

---

## 1. Fintech & Banking

### Industry Overview

Financial services agents operate in one of the most regulated environments in technology. Every action an agent takes — from surfacing a loan recommendation to flagging a suspicious transaction — has legal, financial, and reputational consequences. The cost of a wrong answer is not user frustration; it is regulatory fines, lawsuits, and loss of banking licenses. This makes fintech the domain where safety patterns are not optional extras but foundational requirements that must be in place before any agent goes live.

AI agents in this space also face unique fairness constraints. Fair lending laws (ECOA, Regulation B) mean that any model influencing credit decisions must be explainable and auditable. Agents cannot be black boxes.

### Regulatory & Trust Requirements

| Regulation | Impact on Agent Design |
|---|---|
| **SOX (Sarbanes-Oxley)** | Every material decision must have an audit trail. Requires Observability Spans (53) and Audit Logging. |
| **PCI-DSS** | Cardholder data must never appear in agent context windows, logs, or cached responses. Guardrails (50) must strip PCI data from inputs and outputs. |
| **KYC/AML** | Identity verification and suspicious activity detection. Agents must escalate, never auto-approve. Requires Tool Suspend/Resume (20). |
| **Fair Lending (ECOA, Reg B)** | Any agent involved in credit decisions must produce explainable rationale. Constitutional AI (52) principles should encode fairness rules. |
| **GDPR/CCPA** | Customer data must be deletable. Memory systems must support targeted deletion. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), Guardrail Processors (50), Multi-Layer Permissions (64), Observability Spans (53), Structured Outputs (49) | You cannot ship a fintech agent without guardrails, permissions, and full observability. Structured outputs ensure downstream systems get valid data. |
| **Phase 2: Add Next** | Tool Suspend/Resume (20), Constitutional AI (52), Golden Dataset Testing (54), Prompt Injection Defense (51), LLM-as-Judge (55) | Human-in-the-loop for high-risk actions. Constitutional principles encode regulatory rules. Golden datasets prove compliance in audits. |
| **Phase 3: When Mature** | Model Routing (46), Semantic Caching (47), Agentic RAG (35), Working Memory (23), Runtime Cost Gating (71) | Optimize costs with routing (simple balance queries to small models). Cache common queries. RAG over compliance documentation. |

**Implementation notes by phase:**

- **Phase 1** is non-negotiable before any production deployment. A fintech agent without Observability Spans (53) cannot pass a SOX audit. Without Permissions (64), any security review will reject the system. Budget 4-6 weeks for Phase 1 alone — the permission model and guardrail configuration are where most time is spent.
- **Phase 2** adds the human-in-the-loop layer. Tool Suspend/Resume (20) is the pattern that makes regulators comfortable: high-value transactions pause for human review. Golden Dataset Testing (54) should include adversarial inputs that test for fair lending violations and bias. Build at least 200 test cases before deployment.
- **Phase 3** is about cost optimization and knowledge. Most fintech agents serve a high volume of simple queries ("What is my balance?" "Show me recent transactions") alongside fewer complex ones ("Explain why this charge appeared"). Model Routing (46) lets you serve the simple queries at 1/10th the cost. Agentic RAG (35) over compliance documents lets the agent cite specific regulations.

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P13: Make Accountability Visible | Regulators will ask "who decided this?" for every agent action. Every decision needs a traceable chain from input to output to the human who approved deployment. |
| **Critical** | P16: Make Power Legible in Infrastructure | When an agent can freeze accounts or flag transactions, users and auditors must understand what power the agent has and where that power comes from. |
| **Critical** | P11: Design Consent as Continuous | Customers must be able to opt out of AI-assisted decisions at any point, not just at onboarding. Continuous consent is a regulatory expectation under GDPR and emerging US state laws. |
| **High** | P15: Establish Guardrails to Prevent Misuse | Internal actors (rogue employees, compromised credentials) are a real threat vector. Guardrails must protect against insider abuse, not just end-user misuse. |
| **High** | P10: Design to Communicate Limitations | When an agent says "your transaction appears normal," the user must understand this is a probabilistic assessment, not a guarantee. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P5: Action Audit & Undo | Every agent-initiated action (trade execution, account flag, document generation) must be auditable and reversible within a defined window. |
| **Critical** | UX-P6: Escalation Pathway | Agent must never be a dead end. Escalation to a human compliance officer must be seamless and fast. |
| **Critical** | UX-P3: Explainable Rationale | "Why was my loan denied?" is not just a UX question — it is a legal requirement. The agent must surface reasoning, not just decisions. |
| **High** | UX-P4: Confidence Signal | Low-confidence fraud alerts should be visually distinguished from high-confidence ones. Analysts triage differently based on confidence. |
| **High** | UX-P1: Intent Preview | Before executing a trade or transfer, the agent must show exactly what it plans to do and wait for confirmation. |

### Constraints Checklist

- [x] **Audit Logging** — every agent action logged with full provenance
- [x] **Human Verification** — outputs above risk threshold require human review
- [x] **Privacy Preserving** — PII/PCI data handling complies with GDPR, CCPA, PCI-DSS
- [x] **Role-Based Access** — different users have different agent authority levels
- [x] **Authentication Required** — agent actions tied to verified identity
- [x] **Encryption Required** — data at rest and in transit is encrypted
- [x] **Evaluation Coverage** — model outputs tested against golden datasets before deployment
- [x] **Data Retention** — data kept only for specified period, then deleted
- [x] **Cost Budget** — per-session spending ceiling (especially for multi-step agents)

### Example Workflow: Fraud Detection Agent

```
User: "Review transaction #TX-4892 for potential fraud"

1. [Guardrails (50)] Input processor validates user has fraud-review role
2. [Permissions (64)] Multi-layer permission check: user role + transaction access
3. [Agentic Model Loop (44)] Agent begins analysis
4. [Structured Outputs (49)] Agent produces typed FraudAssessment schema:
   { risk_score: 0.87, factors: [...], recommendation: "escalate" }
5. [Constitutional AI (52)] Output checked against fairness principles:
   - No demographic features used in scoring
   - Reasoning does not reference protected characteristics
6. [Observability Spans (53)] Full span tree logged:
   - model_call: 340ms, tokens: 1,200
   - tool_call: fetch_transaction_history, 120ms
   - guardrail_check: fairness_screen, pass
7. [Tool Suspend/Resume (20)] High-risk recommendation triggers human review:
   "Risk score 0.87 — escalating to Compliance Officer Martinez"
   Agent suspends. State persisted.
8. Compliance officer reviews, approves action
9. Agent resumes, executes account hold
10. [Audit Logging] Full decision chain written to immutable audit log
```

### Anti-Pattern Warnings

1. **Auto-executing financial actions without human gates.** Never let an agent execute trades, transfers, or account changes without a Suspend/Resume (20) gate for actions above a risk threshold. "The agent did it" is not an acceptable answer to regulators.

2. **Caching personalized financial advice.** Semantic Caching (47) is powerful for cost savings, but cached financial advice that was appropriate for one customer may be harmful for another. Cache factual lookups (exchange rates, product details), never personalized recommendations.

3. **Training on production customer data without consent.** Using real transaction data to build Golden Datasets (54) or fine-tune models requires explicit customer consent under GDPR. Use synthetic data or properly anonymized datasets. The shortcut of using production data will eventually become a regulatory incident.

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| Audit trail completeness | 100% of agent actions logged | Observability Spans (53) |
| False positive rate (fraud detection) | < 5% | Golden Dataset Testing (54), LLM-as-Judge (55) |
| Human escalation rate | 15-25% (lower = over-automated, higher = agent adds little value) | Tool Suspend/Resume (20) |
| Regulatory compliance score | 100% on automated audits | Constitutional AI (52), Guardrails (50) |
| Mean time to human review | < 5 minutes for high-risk actions | Tool Suspend/Resume (20), Observability Spans (53) |
| Cost per agent interaction | Track and optimize per quarter | Model Routing (46), Semantic Caching (47) |

---

## 2. Healthcare & Life Sciences

### Industry Overview

Healthcare AI agents operate where errors cost lives, not just revenue. A clinical documentation agent that misrecords an allergy, a drug interaction checker that misses a contraindication, or a triage agent that under-prioritizes a stroke patient — each of these failures has consequences measured in patient harm. This creates a domain where the Communicate Limitations principle (P10) is not a nice-to-have but an ethical obligation. Every agent output must clearly signal what it is (a suggestion, a lookup, a draft) and what it is not (a diagnosis, a prescription, a clinical decision).

The regulatory landscape adds another layer: HIPAA governs every piece of patient data the agent touches, and FDA increasingly scrutinizes AI/ML in clinical decision support. Agents in this space must be designed from day one with the assumption that they will be audited.

### Regulatory & Trust Requirements

| Regulation | Impact on Agent Design |
|---|---|
| **HIPAA** | PHI (Protected Health Information) must never leak into logs, caches, or model context beyond what is needed. Guardrails (50) must scrub PHI from outputs. Memory systems must support patient-specific deletion. |
| **FDA 21 CFR Part 11** | Clinical decision support software may require FDA clearance. Audit trails, electronic signatures, and validation are mandatory. Observability Spans (53) must meet FDA-grade logging. |
| **Clinical Decision Support (CDS)** | If the agent provides patient-specific recommendations, it may be classified as a medical device. Design must clearly distinguish "information retrieval" from "clinical recommendation." |
| **HITECH Act** | Breach notification requirements mean that any PHI exposure through agent systems must be detectable and reportable within 60 days. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), Guardrail Processors (50), Observability Spans (53), Structured Outputs (49), Tool Suspend/Resume (20) | Guardrails scrub PHI from outputs. Observability meets audit requirements. Structured outputs ensure clinical data integrity. HITL gates for all clinical actions. |
| **Phase 2: Add Next** | Self-RAG (32), Golden Dataset Testing (54), LLM-as-Judge (55), Prompt Injection Defense (51), Working Memory (23) | Self-RAG lets the agent decide when to retrieve (critical for clinical accuracy). Golden datasets validate against known clinical cases. Working memory tracks patient context across a session. |
| **Phase 3: When Mature** | Agentic RAG (35), RAPTOR (30), Model Routing (46), Context Compaction (7), Constitutional AI (52) | Advanced retrieval over clinical knowledge bases. RAPTOR for hierarchical medical literature search. Route simple lookups to smaller models. Constitutional principles encode clinical ethics. |

**Implementation notes by phase:**

- **Phase 1** must be in place before any clinician interaction. Tool Suspend/Resume (20) is not optional — it is the mechanism that ensures every clinical output passes through a human clinician before reaching the patient record. Structured Outputs (49) should use FHIR-compatible schemas where possible to ensure interoperability with EHR systems.
- **Phase 2** adds intelligence and reliability. Self-RAG (32) is particularly valuable in healthcare because the agent must learn to distinguish between queries it can answer from its context and queries that require retrieval from clinical guidelines. Golden Dataset Testing (54) must include known edge cases: drug-drug interactions, rare conditions, contraindications for specific populations (pediatric, geriatric, pregnant patients).
- **Phase 3** focuses on deeper knowledge access. RAPTOR (30) is the right choice for medical literature because clinical evidence is hierarchical: guidelines reference studies, studies reference mechanisms, mechanisms reference molecular pathways. A flat vector search misses these relationships. Constitutional AI (52) should encode principles like "never recommend a specific medication without citing a guideline" and "always flag off-label use."

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P10: Design to Communicate Limitations | An agent that presents a drug interaction check without confidence levels could lead a clinician to trust an incomplete result. Every output must state what it checked and what it did not. |
| **Critical** | P13: Make Accountability Visible | When an agent contributes to a clinical decision, the accountability chain must be clear: which clinician reviewed it, which model version produced it, which knowledge base was queried. |
| **Critical** | P15: Establish Guardrails to Prevent Misuse | Guardrails must prevent the agent from generating text that could be interpreted as a diagnosis or prescription when it is not authorized to do so. |
| **High** | P9: Enhance Human Work Instead of Replacing It | Clinical agents assist clinicians; they do not replace clinical judgment. The agent should surface information and flag concerns, not make decisions. |
| **High** | P17: Design Exit as Sacred Right | Clinicians must be able to override or dismiss agent suggestions at any point without friction. The agent must never create pressure to follow its recommendation. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P4: Confidence Signal | Drug interaction checks must display confidence levels. A "possible interaction" with 60% confidence is handled very differently from a "known contraindication" with 99% confidence. |
| **Critical** | UX-P6: Escalation Pathway | When the agent encounters an unfamiliar drug combination or an edge case, it must escalate to a pharmacist or specialist — not guess. |
| **Critical** | UX-P3: Explainable Rationale | Clinicians need to see the reasoning and the sources. "Based on UpToDate entry for metformin and CKD Stage 3a, dose adjustment is recommended" — not just "reduce dose." |
| **High** | UX-P7: Empathic Error Recovery | When the agent makes an error (wrong patient context, outdated guideline), recovery must be clear, fast, and non-defensive. Acknowledge the error, show what went wrong, offer the corrected path. |
| **High** | UX-P5: Action Audit & Undo | Any agent-generated documentation must be reviewable and editable before it enters the medical record. No auto-commit to EHR. |

### Constraints Checklist

- [x] **Privacy Preserving** — HIPAA-compliant PHI handling at every layer
- [x] **Human Verification** — all clinical outputs require clinician review
- [x] **Audit Logging** — FDA-grade logging with timestamps and user identity
- [x] **Content Safety** — no harmful, misleading, or off-label medical content
- [x] **Authentication Required** — agent actions tied to credentialed clinician identity
- [x] **Role-Based Access** — nurses, physicians, pharmacists have different access levels
- [x] **Data Retention** — medical record retention laws (varies by state, typically 7-10 years)
- [x] **Encryption Required** — PHI encrypted at rest and in transit
- [x] **Evaluation Coverage** — golden datasets include known clinical edge cases

### Example Workflow: Clinical Documentation Agent

```
User (Physician): "Document today's visit with patient #MRN-7723"

1. [Permissions (64)] Verify physician has access to this patient's record
2. [Guardrails (50)] Input processor confirms no prompt injection attempts
   in the patient context data being loaded
3. [Working Memory (23)] Load patient context into structured memory:
   { allergies: ["penicillin"], conditions: ["T2DM", "CKD Stage 3a"],
     current_meds: ["metformin 1000mg", "lisinopril 20mg"] }
4. [Agentic Model Loop (44)] Agent drafts clinical note from:
   - Physician's voice dictation (transcribed)
   - Current vitals from EHR
   - Working memory context
5. [Self-RAG (32)] Agent recognizes uncertainty about metformin dosing
   in CKD Stage 3a → triggers retrieval from clinical guidelines
   → retrieves: "eGFR 30-44: reduce to 500mg, monitor quarterly"
6. [Structured Outputs (49)] Agent produces typed ClinicalNote schema:
   { subjective: "...", objective: "...", assessment: "...", plan: "...",
     flags: [{ type: "medication_review", detail: "metformin dose
     adjustment recommended per eGFR", confidence: 0.92 }] }
7. [Observability Spans (53)] Full trace logged:
   - patient_context_load: 80ms (PHI access logged)
   - model_call: 890ms, tokens: 2,100
   - rag_retrieval: clinical_guidelines, 150ms
8. [UX-P4: Confidence Signal] Flag displayed to physician:
   "Medication review suggested (92% confidence) — metformin dose
   may need adjustment based on current eGFR"
9. Physician reviews, edits assessment, approves
10. Note committed to EHR with physician signature and agent attribution
```

### Anti-Pattern Warnings

1. **Presenting agent output as clinical fact.** An agent that says "The patient has pneumonia" instead of "Based on the presented symptoms and chest X-ray findings, pneumonia is a consideration for the differential diagnosis" is creating liability. Every clinical output must be framed as a suggestion, not a determination.

2. **Caching clinical lookups without versioning.** Drug interaction databases, clinical guidelines, and formularies change frequently. Semantic Caching (47) for clinical content must include version timestamps and expiration policies. A cached answer from a 2024 guideline may be wrong under a 2026 update.

3. **Allowing PHI to persist in agent memory across patients.** Working Memory (23) must be scoped to the current patient session and cleared when the clinician switches patients. Cross-patient memory contamination is both a HIPAA violation and a patient safety risk. Implement memory isolation per patient context.

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| PHI exposure incidents | 0 | Guardrails (50), Privacy Preserving constraint |
| Clinician override rate | Track trend (should stabilize, not spike) | Tool Suspend/Resume (20), UX-P5 |
| Clinical accuracy (vs. gold standard) | > 95% for supported use cases | Golden Dataset Testing (54), Self-RAG (32) |
| Guideline citation accuracy | 100% of cited guidelines must be current | RAG retrieval validation, version tracking |
| Documentation time saved | > 40% reduction in clinical note drafting time | Working Memory (23), Structured Outputs (49) |
| Agent-assisted note acceptance rate | > 80% accepted with minor edits | LLM-as-Judge (55), clinician feedback loop |

---

## 3. Developer Tools & Coding Agents

### Industry Overview

Coding agents are unique in that they operate on the user's own artifacts — source code, configuration files, infrastructure — where mistakes are not just wrong answers but broken systems. A coding agent that edits the wrong file, runs a destructive command, or pushes to the wrong branch can cause production outages. At the same time, developers are power users who want high autonomy and low friction. This creates a fundamental tension: the agent must be safe enough to trust with `rm -rf` and fast enough that the developer does not go back to doing it manually.

The pattern landscape for coding agents is among the richest in the playbook because these agents need the full stack: tool execution, file system access, sub-agent delegation, and multi-file reasoning.

### Regulatory & Trust Requirements

| Concern | Impact on Agent Design |
|---|---|
| **Code Safety** | Agent must not execute destructive commands without explicit approval. Multi-Layer Permissions (64) with escalating permission modes (ask → auto for safe ops, always-ask for destructive). |
| **Repository Isolation** | Multi-agent work on the same repo requires Fork-Based Isolation (67) to prevent merge conflicts and data races. |
| **Secrets & Credentials** | Agent must never read, log, or commit `.env` files, API keys, or credentials. Guardrails (50) must filter these from context and output. |
| **Supply Chain Security** | Agent-suggested dependencies must be validated. An agent that `npm install`s a typosquatted package is a supply chain attack vector. |
| **IP & Licensing** | Code generated or suggested by agents may have licensing implications. Output processors should flag when generated code closely matches known copyleft-licensed code. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), ReAct Loop (9), Tool Registry + Validation (17), Multi-Layer Permissions (64), Agent-Friendly Tool Design (21) | The core agent loop with tools for read/write/search/execute. Permissions are critical — a coding agent without permission layers is a liability. ACI design ensures tools are agent-optimized. |
| **Phase 2: Add Next** | Progressive Disclosure (8), Context Compaction (7), Tool Suspend/Resume (20), Runtime Cost Gating (71), Guardrail Processors (50) | Progressive disclosure lets the agent explore the codebase incrementally. Compaction manages large repos. HITL gates for destructive operations. Cost limits prevent runaway loops. |
| **Phase 3: When Mature** | Coordinator-Worker (75), Fork-Based Isolation (67), Bridge Pattern (76), Skills System (74), Deferred Tool Loading (63), Session Backgrounding (73) | Multi-agent architecture: coordinator delegates to workers in isolated worktrees. Bridge pattern enables CLI/IDE/web surfaces from one core. Skills make the agent extensible. |

**Implementation notes by phase:**

- **Phase 1** gets a single agent working with tools. The Tool Registry (17) must support the core developer operations: file read, file write, file search, grep, bash execution. Agent-Friendly Tool Design (21) is especially important here — tools should return structured, concise results (not raw terminal output) so the agent can reason efficiently. Permissions (64) should start in "ask" mode for writes and bash, "auto" for reads.
- **Phase 2** makes the agent production-safe. Progressive Disclosure (8) is how the agent explores large codebases without loading everything into context. The agent starts with a file listing, reads relevant files, and progressively builds understanding. Context Compaction (7) with Reactive Context Compaction (68) keeps the agent functional during long sessions. Cost Gating (71) prevents infinite loops where the agent keeps retrying a failing approach.
- **Phase 3** is the architecture that enables flagship coding agents like Claude Code. The Coordinator-Worker (75) pattern lets a main agent delegate subtasks (exploration, testing, refactoring) to workers with restricted tool access. Fork-Based Isolation (67) gives each worker a git worktree so they can make changes without interfering with each other. Deferred Tool Loading (63) is essential when the agent has hundreds of potential tools — load schemas on demand, not upfront. Skills (74) make the agent extensible: users can add new capabilities via prompt-based skill definitions.

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P1: Preserve Struggle When Delegation Is Effortless | Developers who offload all coding to agents atrophy their skills. The agent should assist, not replace, the developer's reasoning about architecture, trade-offs, and design decisions. |
| **Critical** | P9: Enhance Human Work Instead of Replacing It | The agent writes boilerplate, runs tests, handles refactoring — the developer makes architectural decisions, reviews the approach, and retains understanding of the codebase. |
| **Critical** | P17: Design Exit as Sacred Right | A developer must be able to stop the agent mid-execution without losing work. Session state must be preserved. `Ctrl+C` should be safe and non-destructive. |
| **High** | P12: Negotiate Agency Moment-by-Moment | The permission dial should be adjustable per-session. "For this task, auto-approve file writes but ask before bash commands." This maps directly to the Autonomy Dial (UX-P2). |
| **High** | P3: Design AI as a Transparent Thinking Partner | When the agent decides to refactor a function, the developer should see the reasoning: "This function has 4 responsibilities, I am extracting them into..." — not just the diff. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P2: Autonomy Dial | Developers need granular control: auto-approve reads, ask for writes, always-ask for bash. This maps to the permission modes in Multi-Layer Permissions (64). |
| **Critical** | UX-P1: Intent Preview | Before making changes to 15 files, the agent should show a plan: "I will update the import paths in these files, add a new utility function, and update the tests." |
| **Critical** | UX-P5: Action Audit & Undo | Every file change must be reversible. Git provides this naturally, but the agent should make it easy: "Undo last 3 changes" should work. |
| **High** | UX-P3: Explainable Rationale | When the agent chooses one approach over another, explain why. "I used a factory pattern here because the class hierarchy was growing and direct instantiation was creating coupling." |
| **Medium** | UX-P7: Empathic Error Recovery | When a command fails or a test breaks, the agent should diagnose (not just retry) and offer a clear recovery path. |

### Constraints Checklist

- [x] **Role-Based Access** — permission modes per tool category (read/write/bash/mcp)
- [x] **Cost Budget** — per-session spending limits to prevent runaway agent loops
- [x] **Human Verification** — destructive operations require explicit approval
- [x] **Content Safety** — never commit secrets, credentials, or sensitive files
- [x] **Evaluation Coverage** — golden dataset tests for common refactoring patterns
- [x] **Latency Budget** — interactive use demands sub-2s response for simple queries
- [x] **Rate Limit** — prevent excessive API calls during parallel tool execution

### Example Workflow: Code Review Agent

```
User: "Review PR #342 for security issues and code quality"

1. [Permissions (64)] Agent has read-only access to repository (review mode)
2. [Progressive Disclosure (8)] Agent starts with PR diff summary,
   then reads specific files as needed
3. [Agentic Model Loop (44)] Agent analyzes changes:
   - Reads each changed file
   - Checks for common vulnerability patterns
   - Evaluates test coverage
4. [Tool Registry (17)] Agent uses tools:
   - git_diff: get changed lines
   - file_read: read full context of changed files
   - grep_search: find related usages of changed functions
5. [Context Compaction (7)] For large PRs, compact already-reviewed
   files to keep focus on remaining changes
6. [Coordinator-Worker (75)] For large PRs, coordinator spawns workers:
   - Worker 1: security review (SQL injection, XSS, auth bypass)
   - Worker 2: code quality (complexity, naming, patterns)
   - Worker 3: test coverage analysis
7. [Fork-Based Isolation (67)] Each worker gets its own view of the repo
8. [Structured Outputs (49)] Agent produces typed ReviewResult:
   { findings: [{ file, line, severity, category, description, suggestion }],
     summary: "...", approval_recommendation: "request_changes" }
9. [Guardrails (50)] Output processor ensures no secrets from the
   codebase are included in the review comments
10. Agent posts review comments to PR via GitHub API
```

### Anti-Pattern Warnings

1. **Auto-approving all file operations for speed.** Developers who set all permissions to "auto" lose the safety net. The agent should default to asking for destructive operations (delete, overwrite, bash execution) even when the user has elevated most permissions. Denial Tracking (70) should flag when an agent is being auto-approved for risky operations too frequently.

2. **Letting context windows grow unchecked in large repos.** A coding agent exploring a large monorepo can burn through context rapidly. Without Context Compaction (7) and Tool Result Budget (78), the agent will hit context limits mid-task and lose important earlier context. Implement proactive compaction, not just reactive.

3. **Skipping test execution after changes.** An agent that refactors code without running the test suite creates a false sense of completion. The workflow should include test execution as a mandatory step, with the agent fixing failures before declaring the task done. This is where Self-Refine (12) becomes essential.

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| Permission denial rate | Track trend (high = agent too aggressive, low = permissions too loose) | Multi-Layer Permissions (64), Denial Tracking (70) |
| Task completion rate | > 85% for supported task types | Observability Spans (53) |
| Test pass rate after agent changes | > 95% | Self-Refine (12), Golden Dataset Testing (54) |
| Context window utilization | < 80% peak (leave room for reasoning) | Context Compaction (7), Tool Result Budget (78) |
| Cost per task | Track and optimize | Runtime Cost Gating (71), Model Routing (46) |
| Time saved vs. manual | > 50% for supported task types | End-to-end task timing |

---

## 4. Customer Support & Service

### Industry Overview

Customer support agents are among the most widely deployed AI agent types, and they face a unique combination of pressures: high volume, strict SLAs, multi-language requirements, and the need to maintain brand voice consistency across thousands of interactions. Unlike other domains, the primary user is often frustrated or confused before the interaction even begins. This means UX patterns around empathy, error recovery, and escalation are not enhancements — they are the core product experience.

The economics are also distinctive: support agents must be cost-efficient enough to handle routine queries at scale while being smart enough to recognize when a problem requires a human. Getting the routing wrong in either direction is expensive — either human agents handle trivial issues, or the AI agent fumbles complex ones.

### Regulatory & Trust Requirements

| Concern | Impact on Agent Design |
|---|---|
| **SLA Compliance** | Response time guarantees mean the agent must be fast. Semantic Caching (47) and Model Routing (46) are not optimizations — they are SLA requirements. |
| **Brand Voice** | Every response represents the company. Constitutional AI (52) principles should encode brand guidelines, tone, and prohibited language. |
| **Multi-Language** | Agents serving global customers must handle language detection, translation, and culturally appropriate responses. Working Memory (23) must track detected language. |
| **Data Privacy** | Customer support conversations often contain PII (account numbers, addresses, payment info). Guardrails (50) must scrub sensitive data from logs and caches. |
| **Escalation Requirements** | Many jurisdictions require that customers can reach a human agent. The AI agent must never be a dead end. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), Agentic RAG (35), Structured Outputs (49), Guardrail Processors (50), Working Memory (23) | Core loop with RAG over knowledge base. Structured outputs for ticket metadata. Guardrails for brand safety. Working memory tracks conversation context. |
| **Phase 2: Add Next** | Model Routing (46), Semantic Caching (47), Tool Suspend/Resume (20), Constitutional AI (52), Observability Spans (53) | Route simple queries to cheap models (87% cost savings). Cache frequent questions. HITL for account-modifying actions. Brand voice via constitutional principles. |
| **Phase 3: When Mature** | Model Fallback Chains (45), Corrective RAG (31), Adaptive RAG (33), Plan-and-Execute (14), Circuit Breaker (58) | Fallbacks for reliability. Advanced RAG for complex queries. Plan-and-execute for multi-step resolutions. Circuit breaker for third-party API resilience. |

**Implementation notes by phase:**

- **Phase 1** gets a support agent answering questions from a knowledge base. Agentic RAG (35) over help articles and FAQ documents is the single highest-value pattern. Working Memory (23) must track the conversation state: what the customer already tried, what their sentiment is, which products/orders are involved. Guardrails (50) enforce brand voice and prevent the agent from making unauthorized commitments ("I'll give you a full refund" when policy does not permit it).
- **Phase 2** adds cost optimization and quality control. Model Routing (46) is what makes support agents economically viable: route "what are your hours?" to a small model, route "my account was hacked and someone made unauthorized purchases" to a capable one. The typical cost saving is 70-87% compared to using a frontier model for everything. Constitutional AI (52) should encode brand voice rules, prohibited phrases, and escalation triggers.
- **Phase 3** adds resilience and sophistication. Model Fallback Chains (45) ensure the agent stays online even if the primary model provider has an outage — critical for 24/7 support operations. Corrective RAG (31) evaluates retrieval quality and tries alternative search strategies when the initial retrieval is poor. Circuit Breaker (58) protects against cascading failures when the agent calls third-party systems (order management, shipping APIs).

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P10: Design to Communicate Limitations | When the agent does not know the answer, it must say so clearly rather than confabulate. A confidently wrong answer to a support query destroys trust and creates follow-up tickets. |
| **Critical** | P9: Enhance Human Work Instead of Replacing It | The agent handles L1 (routine) queries. Human agents handle L2/L3 (complex, emotional, edge-case) queries. The agent's job is to make human agents more effective, not to eliminate them. |
| **High** | P11: Design Consent as Continuous | Customers should be able to say "let me talk to a human" at any point and get an immediate handoff — not a loop of "let me try to help you first." |
| **High** | P14: Design Beyond Immediate Utility | Support agents shape customer perception of the entire company. A cold, unhelpful agent experience has societal implications for how people perceive AI in daily life. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P7: Empathic Error Recovery | When the agent misunderstands or gives a wrong answer, recovery must be graceful: "I apologize for the confusion. Let me re-read your question..." — not a robotic "I don't understand." |
| **Critical** | UX-P6: Escalation Pathway | One-click escalation to a human agent with full conversation context transferred. The customer should never have to repeat their problem. |
| **Critical** | UX-P4: Confidence Signal | Internal confidence scores determine routing: high-confidence answers go to the customer directly; low-confidence answers go to a human agent for review before sending. |
| **High** | UX-P3: Explainable Rationale | When the agent cites a policy or suggests a resolution, it should reference the source: "Per our 30-day return policy (help article #1234)..." |
| **Medium** | UX-P2: Autonomy Dial | Internal teams should be able to adjust how much autonomy the agent has: fully autonomous for password resets, always-escalate for billing disputes. |

### Constraints Checklist

- [x] **Latency Budget** — sub-2s response time for interactive chat
- [x] **Privacy Preserving** — PII scrubbed from logs and caches
- [x] **Content Safety** — brand-safe language, no offensive or dismissive responses
- [x] **Human Verification** — account-modifying actions require human or customer confirmation
- [x] **Cost Budget** — per-conversation spending ceiling
- [x] **Rate Limit** — protect against abuse and denial-of-service through chat
- [x] **Audit Logging** — full conversation logs for QA and dispute resolution
- [x] **User Consent** — customer aware they are interacting with an AI agent

### Example Workflow: Ticket Triage and Response Agent

```
User (Customer): "I was charged twice for my order #ORD-9182 and
I want a refund immediately"

1. [Guardrails (50)] Input processor scrubs any credit card numbers
   from the message before it enters the agent context
2. [Working Memory (23)] Agent loads customer context:
   { customer_id: "C-4421", tier: "premium", language: "en",
     sentiment: "frustrated", open_tickets: 1 }
3. [Model Routing (46)] Complexity classifier: "billing dispute with
   refund request" → routes to capable model (not the cheapest)
4. [Agentic RAG (35)] Agent retrieves:
   - Order details for #ORD-9182
   - Company refund policy
   - Duplicate charge handling procedure
5. [Agentic Model Loop (44)] Agent analyzes:
   - Confirms duplicate charge exists in billing system
   - Determines refund eligibility per policy
   - Drafts response with empathetic tone
6. [Constitutional AI (52)] Output checked against brand principles:
   - Tone: empathetic, not robotic
   - No blame language ("you should have..." prohibited)
   - Apology included for inconvenience
7. [Tool Suspend/Resume (20)] Refund action requires approval:
   "Refund $47.99 to payment method ending in 4823"
   → Routed to support team lead for approval (amount > $25 threshold)
8. [Structured Outputs (49)] Agent produces:
   { action: "refund", amount: 47.99, order_id: "ORD-9182",
     resolution: "duplicate_charge", response_draft: "..." }
9. Team lead approves refund
10. Agent sends response to customer with refund confirmation
11. [Observability Spans (53)] Full trace logged for QA review
```

### Anti-Pattern Warnings

1. **Looping customers instead of escalating.** An agent that keeps trying to resolve an issue it cannot handle ("Let me try another approach...") instead of escalating to a human is the definition of Agentic Sludge. Set a maximum retry count (typically 2-3 attempts), then escalate automatically.

2. **Caching personalized responses.** Semantic Caching (47) should cache knowledge base lookups and policy references, not full responses. A cached response that says "Hi Sarah, I see your order #1234..." served to a different customer is a privacy breach and a trust disaster.

3. **Treating all queries with the same model.** Using a frontier model for "what are your store hours?" wastes money. Using a small model for "I was charged incorrectly and my account shows a negative balance" produces bad answers. Model Routing (46) is not optional — it is how you make support agents economically viable at scale.

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| First-response resolution rate | > 60% for L1 queries | Agentic RAG (35), Working Memory (23) |
| Escalation rate | 20-35% (varies by domain complexity) | Tool Suspend/Resume (20), UX-P6 |
| Customer satisfaction (CSAT) | >= human agent baseline | Constitutional AI (52), UX-P7 |
| Average response latency | < 2s for initial response | Semantic Caching (47), Model Routing (46) |
| Cost per resolution | < 30% of human agent cost | Model Routing (46), Semantic Caching (47) |
| Knowledge base coverage | > 90% of queries have relevant KB articles | Agentic RAG (35), Corrective RAG (31) |
| Repeat contact rate | < 15% (agent resolved it the first time) | Working Memory (23), Plan-and-Execute (14) |

---

## 5. E-Commerce & Retail

### Industry Overview

E-commerce agents operate in a domain defined by personalization, speed, and conversion optimization. Unlike healthcare or fintech, the primary risk is not regulatory but reputational and economic — a bad recommendation annoys a customer; an overly aggressive agent feels manipulative. The unique challenge in e-commerce is balancing business objectives (increase average order value, reduce cart abandonment) with genuine user benefit. This is where the Agentic Sludge anti-pattern from the design principles becomes especially relevant: an agent that nudges users toward purchases they do not want is a dark pattern, even if it technically improves metrics.

The technical landscape emphasizes performance: recommendation agents must respond in milliseconds, handle spiky traffic (Black Friday), and personalize across millions of products.

### Regulatory & Trust Requirements

| Concern | Impact on Agent Design |
|---|---|
| **Consumer Protection** | Agents must not make false claims about products, pricing, or availability. Constitutional AI (52) principles should encode truthfulness in product descriptions. |
| **Price Discrimination** | Personalized pricing agents must comply with anti-discrimination laws. Dynamic pricing must not use protected characteristics. |
| **GDPR/CCPA** | Behavioral data used for personalization requires consent. Tracking and profiling must be transparent and opt-outable. |
| **Accessibility** | E-commerce agents serving consumer audiences must meet WCAG guidelines. Voice and chat interfaces must be accessible. |
| **FTC Guidelines** | AI-generated product reviews or endorsements must be disclosed. Agent-generated content must be clearly labeled. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), Semantic Caching (47), Structured Outputs (49), Guardrail Processors (50), Working Memory (23) | Caching is critical for performance at scale. Structured outputs feed recommendation UIs. Working memory tracks user preferences within a session. |
| **Phase 2: Add Next** | Model Routing (46), Agentic RAG (35), Execution Hooks (62), Hook System (77), Constitutional AI (52) | Route simple queries cheaply. RAG over product catalog. Hooks enable A/B testing of agent behaviors and prompt variants. Constitutional principles prevent dark patterns. |
| **Phase 3: When Mature** | Semantic Recall (24), Adaptive RAG (33), GraphRAG (34), Model Fallback Chains (45), LLM-as-Judge (55) | Cross-session personalization via semantic recall. Graph-based product relationships ("customers who bought X also..."). LLM-as-judge for recommendation quality. |

**Implementation notes by phase:**

- **Phase 1** prioritizes performance above all else. Semantic Caching (47) is Phase 1 (not Phase 2 or 3) because e-commerce recommendation latency directly impacts conversion rates. Every 100ms of latency costs measurable revenue. Cache product category embeddings, common query patterns, and frequently requested items. Working Memory (23) tracks the current shopping session: items viewed, cart contents, stated preferences, price sensitivity signals.
- **Phase 2** adds intelligence and experimentation. Execution Hooks (62) and Hook System (77) enable A/B testing of recommendation strategies without code changes — swap prompts, adjust ranking weights, test different explanation styles. This is how you iterate on recommendation quality. Model Routing (46) sends product lookup queries to small models and conversational recommendation queries to capable ones.
- **Phase 3** adds long-term personalization. Semantic Recall (24) enables cross-session memory: the agent remembers that a customer bought running shoes three months ago and can suggest complementary items in a future visit. GraphRAG (34) models product relationships (complementary, alternative, accessory-of) and enables rich recommendation reasoning. LLM-as-Judge (55) evaluates recommendation quality: are the suggestions genuinely relevant, or are they just popular items?

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P11: Design Consent as Continuous | Users must be able to opt out of personalization, dismiss recommendations, and control how their behavioral data is used — at any point, not just at account creation. |
| **Critical** | P4: Preserve Creative Interpretation | When an agent recommends products, it should present options that invite browsing and discovery, not funnel users into a single purchase. Preserve the joy of shopping. |
| **Critical** | Agentic Sludge Awareness | The line between "helpful recommendation" and "manipulative nudge" is thin. Agents must not exploit urgency ("only 2 left!"), social proof ("1,000 people bought this"), or dark patterns to drive conversions. |
| **High** | P10: Design to Communicate Limitations | When the agent does not have enough data to personalize well (new user, sparse history), it should say so rather than making bad recommendations and losing trust. |
| **High** | P9: Enhance Human Work Instead of Replacing It | Personal shoppers and customer service teams should be augmented by agent insights, not replaced. The agent surfaces data; the human adds judgment. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P4: Confidence Signal | Recommendation confidence should influence UI presentation. High-confidence: "Based on your purchase history, you'll love..." Low-confidence: "You might also be interested in..." |
| **High** | UX-P3: Explainable Rationale | "Recommended because you bought running shoes last month" is more trustworthy than unexplained recommendations. Transparency improves click-through rates and trust. |
| **High** | UX-P7: Empathic Error Recovery | When a recommended product is out of stock or does not match expectations, the agent should recover gracefully: suggest alternatives, not just apologize. |
| **Medium** | UX-P2: Autonomy Dial | Let users control recommendation aggressiveness: "Show me more suggestions" vs. "I know what I want, just help me find it." |
| **Medium** | UX-P6: Escalation Pathway | Complex purchase decisions (electronics, furniture) should offer easy escalation to a product specialist. |

### Constraints Checklist

- [x] **Latency Budget** — sub-200ms for recommendation responses (critical for UX)
- [x] **Privacy Preserving** — behavioral data usage compliant with GDPR/CCPA
- [x] **User Consent** — opt-in for personalization and behavioral tracking
- [x] **Content Safety** — no misleading product claims or fake urgency
- [x] **Cost Budget** — per-session limits (high traffic = cost scales fast)
- [x] **Rate Limit** — protect against bot-driven abuse of recommendation endpoints
- [x] **Evaluation Coverage** — A/B testing and golden datasets for recommendation quality

### Example Workflow: Product Recommendation Agent

```
User: "I'm looking for a birthday gift for my dad who likes woodworking"

1. [Working Memory (23)] Agent checks session context:
   { user_id: "U-8832", past_purchases: ["leather wallet", "book:
   The Art of Joinery"], browsing_history: ["tool sets", "workshop
   accessories"], budget_signals: "mid-range" }
2. [Semantic Caching (47)] Check cache for similar queries:
   "woodworking gift" → cache hit for product category mapping
   (not for personalized results)
3. [Model Routing (46)] Query classified as "conversational
   recommendation" → mid-tier model (needs reasoning, not just lookup)
4. [Agentic RAG (35)] Agent retrieves from product catalog:
   - Category: woodworking tools & accessories
   - Filtered by: gift-appropriate, mid-range price, high-rated
   - Cross-referenced with: user's past purchase patterns
5. [Agentic Model Loop (44)] Agent reasons:
   - Past purchase of "The Art of Joinery" suggests interest in
     Japanese woodworking
   - Budget signals suggest $50-150 range
   - Birthday context suggests quality packaging matters
6. [Constitutional AI (52)] Output checked against principles:
   - No false urgency ("limited stock!" removed)
   - No manipulative upselling (premium option presented as option,
     not default)
   - Recommendations are genuinely relevant, not margin-optimized
7. [Execution Hooks (62)] A/B test hook logs:
   { variant: "B", experiment: "recommendation_explanation_style",
     style: "narrative" }
8. [Structured Outputs (49)] Agent produces:
   { recommendations: [
     { product_id: "P-2291", name: "Veritas Dovetail Saw",
       price: 89.99, reason: "Complements his interest in joinery",
       confidence: 0.88 },
     { product_id: "P-3104", name: "Japanese Chisel Set (4pc)",
       price: 124.00, reason: "Aligns with Japanese woodworking
       interest from past purchase", confidence: 0.82 },
     { product_id: "P-1847", name: "Woodworking Apron (Waxed Canvas)",
       price: 65.00, reason: "Highly rated gift item in this category",
       confidence: 0.71 }
   ], explanation: "Based on your dad's interest in joinery..." }
9. Agent presents recommendations with explanations and confidence
```

### Anti-Pattern Warnings

1. **Optimizing for conversion at the expense of trust.** An agent that always recommends the highest-margin product, adds items to carts without explicit consent, or creates false urgency is Agentic Sludge. Short-term conversion gains lead to long-term brand damage. Constitutional AI (52) principles should explicitly prohibit dark patterns.

2. **Over-personalizing with thin data.** A recommendation agent that makes confident suggestions based on a single purchase or page view often gets it wrong and feels creepy. Use Confidence Signals (UX-P4) to calibrate presentation: low data = low confidence = "you might like" framing, not "perfect for you."

3. **Ignoring cache invalidation for product data.** Semantic Caching (47) for product recommendations must invalidate when products go out of stock, prices change, or promotions end. Recommending an out-of-stock product or an expired deal price erodes trust. Cache TTLs for product data should be short (minutes, not hours).

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| Recommendation click-through rate | > 15% (industry benchmark) | Agentic RAG (35), GraphRAG (34) |
| Recommendation relevance score | > 4.0/5.0 (human eval or LLM-as-Judge) | LLM-as-Judge (55), Golden Dataset Testing (54) |
| P95 recommendation latency | < 200ms | Semantic Caching (47), Model Routing (46) |
| Cache hit rate | > 60% for product category queries | Semantic Caching (47) |
| Conversion rate (agent-assisted vs. baseline) | > 10% improvement | A/B testing via Execution Hooks (62) |
| Personalization opt-out rate | Track trend (rising = trust issue) | User Consent constraint, P11 |
| Average order value (agent-assisted) | Track vs. baseline | Working Memory (23), Semantic Recall (24) |

---

## 6. Enterprise & Internal Tools

### Industry Overview

Enterprise AI agents serve internal users — employees, managers, analysts — automating workflows that span document processing, knowledge management, meeting preparation, and cross-system data retrieval. The unique characteristic of this domain is that the users are repeat users with deep domain knowledge. They are not browsing; they are working. This means the agent's value is measured in time saved per task, and frustration tolerance is low. An enterprise agent that adds friction to a workflow will be abandoned in favor of the old manual process.

The integration challenge is also distinctive: enterprise agents must connect to a heterogeneous landscape of internal systems (Slack, Jira, Confluence, Salesforce, internal databases, legacy APIs), each with its own authentication and data model. Event-Driven Flows (61) and the Plan-and-Execute pattern (14) become central because enterprise workflows are inherently multi-step and often triggered by external events.

### Regulatory & Trust Requirements

| Concern | Impact on Agent Design |
|---|---|
| **Data Classification** | Enterprise data has classification levels (public, internal, confidential, restricted). Agent must respect classification in retrieval and output. Role-Based Access applies. |
| **SOC 2 / ISO 27001** | Many enterprises require SOC 2 compliance for internal tools. Audit Logging and access controls are mandatory. |
| **Data Residency** | Some enterprises require data to stay in specific geographic regions. Agent infrastructure must respect data residency requirements. |
| **SSO/SAML** | Agent must integrate with enterprise identity providers. Authentication Required constraint is non-negotiable. |
| **Change Management** | Enterprise environments often require change approval boards for new automations. Agent capabilities should be deployable incrementally. |

### Pattern Selection

| Phase | Patterns | Rationale |
|---|---|---|
| **Phase 1: Start Here** | Agentic Model Loop (44), Plan-and-Execute (14), Tool Registry + Validation (17), Working Memory (23), Structured Outputs (49) | Plan-and-execute is the natural pattern for multi-step enterprise workflows. Tool registry integrates with internal systems. Working memory tracks task state. |
| **Phase 2: Add Next** | Event-Driven Flows (61), Agentic RAG (35), GraphRAG (34), Observability Spans (53), Multi-Layer Permissions (64) | Event triggers (new Jira ticket, Slack message, calendar event) drive agent actions. RAG over internal knowledge bases. GraphRAG for organizational relationships. |
| **Phase 3: When Mature** | RAPTOR (30), Coordinator-Worker (75), Workflow Suspend/Resume (48), Model Routing (46), Hierarchical Memory Files (69), Semantic Recall (24) | RAPTOR for deep document analysis. Multi-agent coordination for complex workflows. Suspend/resume for async approvals. Memory files for team/project-specific instructions. |

**Implementation notes by phase:**

- **Phase 1** builds the foundational workflow engine. Plan-and-Execute (14) is the natural fit because enterprise tasks are inherently multi-step: "prepare a quarterly report" requires fetching data from 3 systems, analyzing trends, generating charts, and drafting a summary. The planning step makes these workflows predictable and auditable. Working Memory (23) tracks the state of in-progress tasks across tool calls.
- **Phase 2** adds event triggers and knowledge access. Event-Driven Flows (61) transform the agent from something users invoke to something that proactively assists: a new Jira ticket triggers triage, a calendar event triggers meeting prep, a Slack mention triggers information retrieval. GraphRAG (34) is especially valuable in enterprise because organizational knowledge is inherently relational: people belong to teams, teams own projects, projects have stakeholders, stakeholders have preferences.
- **Phase 3** adds depth and scale. RAPTOR (30) enables deep analysis of long documents (contracts, policies, specifications) by building hierarchical summaries that can be queried at different levels of detail. Coordinator-Worker (75) lets the agent delegate: the meeting prep coordinator spawns a CRM worker, a calendar worker, and an email search worker in parallel. Hierarchical Memory Files (69) enable team-specific and project-specific instructions that scope the agent's behavior without per-session configuration.

### Design Principles Priority

| Priority | Principle | Why It Matters Here |
|---|---|---|
| **Critical** | P7: Organize by Space-Time, Not Apps | Enterprise users work across 10+ apps daily. The agent should organize by context (this meeting, this project, this customer) not by tool (Slack, Jira, Confluence). |
| **Critical** | P8: Generate Interfaces for the Moment | Enterprise workflows are varied and evolving. The agent should generate task-specific interfaces (a summary card, an approval form, a comparison table) rather than forcing all interactions through a single chat interface. |
| **High** | P9: Enhance Human Work Instead of Replacing It | Enterprise agents augment knowledge workers. The agent drafts, the human refines. The agent surfaces data, the human decides. Replacing human judgment in enterprise decisions creates organizational risk. |
| **High** | P13: Make Accountability Visible | When an agent sends an email, updates a CRM record, or creates a Jira ticket, the audit trail must show which human authorized it and which agent executed it. |
| **High** | P12: Negotiate Agency Moment-by-Moment | Different tasks require different autonomy levels. Calendar scheduling might be fully autonomous; contract drafting requires human review at every step. The agency dial must be per-workflow, not per-agent. |

### UX Patterns Priority

| Priority | UX Pattern | Application |
|---|---|---|
| **Critical** | UX-P2: Autonomy Dial | Enterprise users need per-workflow control. "Auto-approve meeting summaries, ask before sending emails, always review contract edits." |
| **Critical** | UX-P1: Intent Preview | Before a multi-step workflow executes, the agent must show the plan: "I will: 1) Pull data from Salesforce, 2) Generate the quarterly report, 3) Email it to the team. Proceed?" |
| **High** | UX-P5: Action Audit & Undo | Enterprise actions (CRM updates, email sends, document edits) must be auditable and reversible where possible. |
| **High** | UX-P3: Explainable Rationale | When the agent prioritizes one task over another or suggests a particular approach, it must explain why. Enterprise users do not tolerate opaque decisions about their workflow. |
| **Medium** | UX-P6: Escalation Pathway | When the agent lacks access to a system or encounters an ambiguous request, it must escalate to IT support or the requesting user rather than failing silently. |

### Constraints Checklist

- [x] **Authentication Required** — SSO/SAML integration mandatory
- [x] **Role-Based Access** — data classification drives access levels
- [x] **Audit Logging** — every action logged for SOC 2 compliance
- [x] **Privacy Preserving** — employee PII and confidential data protected
- [x] **Cost Budget** — per-department or per-team spending limits
- [x] **Latency Budget** — interactive tasks sub-2s, batch tasks can be longer
- [x] **Data Retention** — retention policies per data classification level
- [x] **Encryption Required** — enterprise-grade encryption for all data

### Example Workflow: Meeting Preparation Agent

```
User: "Prepare me for my 2pm meeting with Acme Corp"

1. [Plan-and-Execute (14)] Agent creates execution plan:
   Step 1: Retrieve meeting details from calendar
   Step 2: Look up Acme Corp in CRM
   Step 3: Find recent communications
   Step 4: Check for open action items
   Step 5: Generate briefing document
2. [Permissions (64)] Agent checks user's access to:
   - Calendar: authorized
   - CRM (Salesforce): authorized for Acme Corp account
   - Email: read-only access to user's sent/received
   - Jira: authorized for shared project board
3. [Event-Driven Flows (61)] Meeting prep triggered by calendar
   event 30 minutes before meeting time
4. [Tool Registry (17)] Agent executes tools in sequence:
   - calendar_get: "2pm meeting today" → meeting with Sarah Chen,
     Tom Park from Acme, topic: "Q2 partnership review"
   - crm_lookup: "Acme Corp" → $2.3M account, renewal in 60 days,
     NPS score: 72, open support tickets: 2
   - email_search: "Acme Corp last 14 days" → 3 relevant threads
   - jira_search: "Acme project board" → 4 open items, 2 overdue
5. [GraphRAG (34)] Agent queries knowledge graph:
   - Acme Corp → relationship → Sarah Chen (VP Partnerships)
   - Sarah Chen → mentioned_in → last QBR notes (positive sentiment)
   - Acme Corp → risk_flag → 2 overdue deliverables
6. [Working Memory (23)] Agent assembles context:
   { meeting: {...}, account: {...}, recent_comms: [...],
     action_items: [...], risk_flags: [...] }
7. [Structured Outputs (49)] Agent produces MeetingBrief:
   { attendees: [...], agenda_suggestions: [...],
     key_talking_points: [
       "Renewal coming in 60 days — good time to discuss expansion",
       "2 overdue deliverables — address proactively before they raise it",
       "Sarah mentioned interest in API integration in last email"
     ],
     risks: ["Open support tickets may come up"],
     suggested_questions: [...] }
8. [UX-P8: Generate Interfaces] Brief rendered as a card in
   Slack/Teams/email — not a wall of text in a chat window
9. Agent sends briefing 25 minutes before meeting
```

### Anti-Pattern Warnings

1. **Building one monolithic enterprise agent.** Enterprise workflows are diverse — meeting prep, document processing, CRM updates, reporting. Trying to build a single agent that does everything leads to bloated context, confused routing, and poor performance. Use the Coordinator-Worker (75) pattern: a lightweight coordinator that delegates to specialized workflow agents.

2. **Ignoring existing approval workflows.** Enterprise environments have established approval chains (manager approval for PTO, legal review for contracts, finance sign-off for purchases). An agent that bypasses these workflows — even if it could technically execute the action — will be shut down by IT governance. Integrate Tool Suspend/Resume (20) with existing approval systems.

3. **Failing to scope memory by organizational context.** An agent that remembers information from a confidential board meeting and surfaces it in a general team query is a data leak. Working Memory (23) and Semantic Recall (24) must be scoped by data classification level and organizational role. Memory isolation is not optional in enterprise.

### Key Metrics to Track

| Metric | Target | Pattern That Enables It |
|---|---|---|
| Task automation rate | > 70% for targeted workflows | Plan-and-Execute (14), Event-Driven Flows (61) |
| Time saved per task | > 50% vs. manual process | End-to-end workflow timing |
| Cross-system integration success rate | > 99% for established integrations | Tool Registry (17), Circuit Breaker (58) |
| Agent adoption rate (monthly active users) | > 60% of target user base | UX-P2 Autonomy Dial, P8 Generated Interfaces |
| Meeting prep delivery rate | > 95% delivered before meeting start | Event-Driven Flows (61), Plan-and-Execute (14) |
| Data access authorization rate | 100% (no unauthorized data access) | Permissions (64), Role-Based Access constraint |
| Cost per workflow execution | Track per workflow type | Runtime Cost Gating (71), Model Routing (46) |

---

## Getting Started: Universal Checklist

Before diving into industry-specific patterns, every AI agent project should complete this checklist. These items are industry-agnostic and apply to all six domains covered in this guide.

### Pre-Development

- [ ] **Define the agent's scope.** What tasks can the agent perform? What tasks are explicitly out of scope? Write this down before writing any code. Scope creep is the most common cause of agent failure.
- [ ] **Identify the regulatory landscape.** Which regulations apply? Which constraints from the taxonomy are non-negotiable? Get legal/compliance review before the first prototype.
- [ ] **Map the trust model.** Who are the users? What is the cost of a wrong answer? How much autonomy should the agent have by default? Use the Agentic Autonomy Taxonomy from the design principles.
- [ ] **Choose the project blueprint.** Which project type from [`project-blueprints.js`](data/recommendations/project-blueprints.js) is closest to what you are building? Start with that phase plan.

### Phase 1 (All Industries)

- [ ] **Implement the Agentic Model Loop (44).** This is the core. Every agent needs it.
- [ ] **Add Structured Outputs (49).** Define schemas for every output type. Downstream systems should never have to parse free text.
- [ ] **Configure Guardrail Processors (50).** At minimum: input validation, output filtering, and PII/sensitive data scrubbing.
- [ ] **Set up Observability Spans (53).** Log every LLM call, tool use, and guardrail check. You will need this data for debugging, optimization, and compliance.
- [ ] **Define permissions.** Even if you start with a simple model, establish the permission layer early. It is much harder to add later.

### Phase 2 (All Industries)

- [ ] **Add human-in-the-loop gates.** Identify which actions require human approval. Implement Tool Suspend/Resume (20) or equivalent.
- [ ] **Build your Golden Dataset (54).** Start with 50-100 test cases. Include happy paths, edge cases, and adversarial inputs. Run in CI/CD.
- [ ] **Implement cost tracking.** Use Runtime Cost Gating (71) or equivalent. Know what each agent interaction costs.
- [ ] **Add prompt injection defense (51).** This is a security requirement, not an optimization.

### Then Apply Your Industry Guide

Once the universal foundation is in place, apply the industry-specific guidance from the relevant section above. The industry guide will tell you which additional patterns to prioritize, which constraints to enforce, and which anti-patterns to watch for.

---

## Industry Comparison Matrix

### Pattern Priority by Industry

| Pattern | Fintech | Healthcare | Dev Tools | Support | E-Commerce | Enterprise |
|---|---|---|---|---|---|---|
| Agentic Model Loop (44) | Phase 1 | Phase 1 | Phase 1 | Phase 1 | Phase 1 | Phase 1 |
| Guardrail Processors (50) | Phase 1 | Phase 1 | Phase 2 | Phase 1 | Phase 1 | Phase 2 |
| Multi-Layer Permissions (64) | Phase 1 | Phase 2 | Phase 1 | Phase 3 | Phase 3 | Phase 2 |
| Observability Spans (53) | Phase 1 | Phase 1 | Phase 3 | Phase 2 | Phase 3 | Phase 2 |
| Structured Outputs (49) | Phase 1 | Phase 1 | Phase 3 | Phase 1 | Phase 1 | Phase 1 |
| Tool Suspend/Resume (20) | Phase 2 | Phase 1 | Phase 2 | Phase 2 | Phase 3 | Phase 3 |
| Constitutional AI (52) | Phase 2 | Phase 3 | Phase 3 | Phase 2 | Phase 2 | Phase 3 |
| Golden Dataset Testing (54) | Phase 2 | Phase 2 | Phase 3 | Phase 3 | Phase 3 | Phase 3 |
| Model Routing (46) | Phase 3 | Phase 3 | Phase 3 | Phase 2 | Phase 2 | Phase 3 |
| Semantic Caching (47) | Phase 3 | Phase 3 | Phase 3 | Phase 2 | Phase 1 | Phase 3 |
| Working Memory (23) | Phase 3 | Phase 2 | Phase 3 | Phase 1 | Phase 1 | Phase 1 |
| Agentic RAG (35) | Phase 3 | Phase 3 | Phase 3 | Phase 1 | Phase 2 | Phase 2 |
| Plan-and-Execute (14) | — | — | — | Phase 3 | — | Phase 1 |
| Event-Driven Flows (61) | — | — | — | — | — | Phase 2 |
| Coordinator-Worker (75) | — | — | Phase 3 | — | — | Phase 3 |
| Fork-Based Isolation (67) | — | — | Phase 3 | — | — | — |
| GraphRAG (34) | — | — | — | — | Phase 3 | Phase 2 |
| RAPTOR (30) | — | Phase 3 | — | — | — | Phase 3 |

### Design Principle Priority by Industry

| Principle | Fintech | Healthcare | Dev Tools | Support | E-Commerce | Enterprise |
|---|---|---|---|---|---|---|
| P1: Preserve Struggle | Low | Medium | **Critical** | Low | Low | Medium |
| P4: Creative Interpretation | Low | Low | Medium | Low | **Critical** | Low |
| P7: Space-Time Not Apps | Low | Medium | Low | Low | Low | **Critical** |
| P8: Generate Interfaces | Low | Low | Medium | Medium | Medium | **Critical** |
| P9: Enhance Not Replace | High | **Critical** | **Critical** | **Critical** | High | High |
| P10: Communicate Limitations | High | **Critical** | Medium | **Critical** | High | Medium |
| P11: Continuous Consent | **Critical** | Medium | Medium | High | **Critical** | Medium |
| P13: Accountability Visible | **Critical** | **Critical** | Medium | Medium | Medium | High |
| P15: Guardrails | High | **Critical** | Medium | High | Medium | Medium |
| P16: Power Legible | **Critical** | Medium | High | Low | Low | High |
| P17: Exit as Sacred Right | Medium | **Critical** | **Critical** | High | Medium | Medium |

### Constraint Priority by Industry

| Constraint | Fintech | Healthcare | Dev Tools | Support | E-Commerce | Enterprise |
|---|---|---|---|---|---|---|
| Audit Logging | **Required** | **Required** | Recommended | Recommended | Optional | **Required** |
| Human Verification | **Required** | **Required** | **Required** | Recommended | Optional | Recommended |
| Privacy Preserving | **Required** | **Required** | Recommended | **Required** | **Required** | **Required** |
| Role-Based Access | **Required** | **Required** | **Required** | Recommended | Optional | **Required** |
| Authentication Required | **Required** | **Required** | Recommended | Recommended | Recommended | **Required** |
| Encryption Required | **Required** | **Required** | Recommended | Recommended | Recommended | **Required** |
| Content Safety | Recommended | **Required** | Recommended | **Required** | **Required** | Recommended |
| Latency Budget | Recommended | Recommended | **Required** | **Required** | **Required** | Recommended |
| Cost Budget | Recommended | Recommended | **Required** | **Required** | **Required** | **Required** |
| Evaluation Coverage | **Required** | **Required** | **Required** | Recommended | Recommended | Recommended |
| Data Retention | **Required** | **Required** | Optional | Recommended | Recommended | **Required** |
| User Consent | **Required** | **Required** | Optional | **Required** | **Required** | Recommended |
| Rate Limit | Recommended | Optional | **Required** | **Required** | **Required** | Recommended |

### Risk Profile by Industry

Understanding the risk profile of each industry helps calibrate how aggressively to implement safety patterns and how much autonomy to grant the agent by default.

| Industry | Primary Risk | Cost of Wrong Answer | Default Autonomy Level | Safety Pattern Depth |
|---|---|---|---|---|
| **Fintech** | Regulatory/Legal | Fines, lawsuits, license revocation | Low (human-in-loop for decisions) | Maximum |
| **Healthcare** | Patient Safety | Patient harm, malpractice liability | Very Low (always clinician review) | Maximum |
| **Dev Tools** | Code Safety | Production outages, data loss, security vulnerabilities | Medium (auto for reads, ask for writes) | High |
| **Support** | Brand/Trust | Customer churn, reputation damage | Medium-High (auto for L1, human for L2+) | Medium |
| **E-Commerce** | Revenue/Trust | Lost sales, brand damage, legal (dark patterns) | High (auto for recommendations) | Medium |
| **Enterprise** | Data/Compliance | Data leaks, compliance violations, workflow errors | Medium (varies by workflow) | High |

**How to read this table:**

- **Primary Risk** is the most likely source of harm if the agent fails. This determines which constraints are non-negotiable.
- **Cost of Wrong Answer** ranges from financial (lost sales) to existential (patient harm, regulatory shutdown). Higher cost = more conservative defaults.
- **Default Autonomy Level** is the starting point for the Autonomy Dial (UX-P2). Industries with higher risk start with lower autonomy and let users increase it. Industries with lower risk start higher and let users restrict it.
- **Safety Pattern Depth** indicates how many of the safety patterns (50-55) you should implement before going to production. "Maximum" means all of them. "Medium" means at minimum Guardrails (50) and Observability (53).

### Shared Patterns Across All Industries

These patterns appear in Phase 1 or Phase 2 for nearly every industry. They are the universal foundation:

| Pattern | Why It Is Universal |
|---|---|
| **Agentic Model Loop (44)** | Every agent needs a core loop. This is the foundation pattern for all industries. |
| **Structured Outputs (49)** | Every downstream system (UI, API, database) needs valid typed data from the agent. |
| **Guardrail Processors (50)** | Every agent needs input/output filtering — the specifics vary by industry, but the pattern is universal. |
| **Observability Spans (53)** | You cannot debug, audit, or improve what you cannot see. Every production agent needs tracing. |
| **Working Memory (23)** | Stateful interactions require memory. Whether it is patient context, customer history, or code state, agents need structured memory. |

### Industry-Specific Differentiators

These patterns are critical in one industry but irrelevant or optional in others:

| Pattern | Primary Industry | Why It Is Industry-Specific |
|---|---|---|
| **Fork-Based Isolation (67)** | Developer Tools | Only relevant when agents modify shared repositories. No other industry needs git worktrees. |
| **Plan-and-Execute (14)** | Enterprise | Multi-step workflows with predictable steps. Less useful in reactive domains like support. |
| **Semantic Caching (47)** | E-Commerce, Support | High-volume domains where latency and cost are existential. Lower priority in low-volume regulated domains. |
| **Self-RAG (32)** | Healthcare | The agent must decide *when* to retrieve (clinical safety). Other domains can use simpler RAG patterns. |
| **Constitutional AI (52)** | Fintech, Support | Encoding regulatory rules (fair lending) or brand voice as principles. Less critical in developer tools. |
| **Event-Driven Flows (61)** | Enterprise | Proactive agent triggered by calendar, Slack, Jira events. Most other agents are user-invoked. |

### Quick Start: If You Only Read One Section

| If your domain is... | Start with Phase 1 of... | And also read the anti-patterns in... |
|---|---|---|
| Anything regulated (finance, health) | Fintech or Healthcare | Both — regulatory pitfalls overlap |
| Building tools for developers | Developer Tools | Enterprise (for permission patterns) |
| Customer-facing at scale | Customer Support | E-Commerce (for caching and routing) |
| Selling products online | E-Commerce | Customer Support (for escalation patterns) |
| Automating internal workflows | Enterprise | Developer Tools (for multi-agent patterns) |
| Spanning multiple industries | Read all relevant sections | Merge Phase 1 lists, take the stricter constraint from each |

### Autonomy Dial Defaults by Industry

The Autonomy Dial (UX-P2) should be calibrated differently for each industry. This table shows recommended defaults for each action category:

| Action Category | Fintech | Healthcare | Dev Tools | Support | E-Commerce | Enterprise |
|---|---|---|---|---|---|---|
| Information retrieval | Auto | Auto | Auto | Auto | Auto | Auto |
| Content generation (drafts) | Auto | Auto | Auto | Auto | Auto | Auto |
| Content generation (final) | Ask | Ask | Ask | Auto* | Auto | Ask |
| Data modification | Ask | Ask | Ask | Ask | Auto | Ask |
| External communication | Always Ask | Always Ask | N/A | Ask | Ask | Ask |
| Financial transactions | Always Ask | N/A | N/A | Always Ask | Ask | Always Ask |
| System commands | Always Ask | N/A | Ask | N/A | N/A | Ask |

*Support agents auto-send responses only when confidence > threshold (set via Model Routing classification).

### Cross-Industry Migration Guide

If you are adapting an agent from one industry to another (e.g., turning an internal knowledge bot into a customer-facing support agent), these are the patterns you need to add:

| From | To | Add These Patterns | Key Concern |
|---|---|---|---|
| Enterprise | Customer Support | Semantic Caching (47), Model Routing (46), Constitutional AI (52) | Performance at scale, brand voice, cost optimization |
| Developer Tools | Enterprise | Plan-and-Execute (14), Event-Driven Flows (61), GraphRAG (34) | Multi-step workflows, proactive triggering, organizational knowledge |
| Customer Support | Healthcare | Self-RAG (32), Golden Dataset Testing (54), Tool Suspend/Resume (20) | Clinical accuracy, validation rigor, mandatory human review |
| E-Commerce | Fintech | Multi-Layer Permissions (64), Observability Spans (53), Golden Dataset Testing (54) | Regulatory compliance, audit trails, permission enforcement |
| Healthcare | Fintech | Constitutional AI (52), Runtime Cost Gating (71), Prompt Injection Defense (51) | Fair lending rules, cost controls, security hardening |
| Enterprise | E-Commerce | Semantic Caching (47), Execution Hooks (62), Model Routing (46) | Performance, A/B testing, cost optimization |

---

## Common Questions

**Q: My industry is not listed here. What should I do?**

Find the closest match by risk profile. If your domain is regulated, start with Fintech or Healthcare. If it is consumer-facing, start with E-Commerce or Customer Support. If it is internal, start with Enterprise. Then add domain-specific constraints as you identify them.

**Q: Can I skip Phase 1 patterns if I already have a working agent?**

Audit your existing agent against the Phase 1 checklist for your industry. If you are missing Guardrails (50) or Observability (53), add them before adding Phase 2 patterns. Phase 1 is the foundation — skipping it creates technical debt that compounds with each additional pattern.

**Q: How do I handle multi-tenant scenarios where different tenants are in different industries?**

Use the strictest constraint set across all tenants as your baseline. Then use Dynamic Configuration (2) and Request Context (3) to apply tenant-specific rules at runtime. For example, a SaaS platform serving both healthcare and e-commerce tenants would default to HIPAA-level data handling and relax constraints for non-healthcare tenants via configuration.

**Q: How long should each phase take?**

Rough timelines for a team of 2-4 engineers:
- Phase 1: 4-8 weeks (longer for regulated industries due to compliance review)
- Phase 2: 4-6 weeks (golden dataset creation is the bottleneck)
- Phase 3: 6-12 weeks (multi-agent patterns and advanced RAG require iteration)

These timelines assume the team is familiar with the patterns. First-time implementations typically take 1.5-2x longer.

**Q: How do I decide between Model Routing (46) and just using a single model?**

If your agent handles fewer than 1,000 interactions per day, start with a single capable model. Model Routing adds complexity and requires a classifier that itself needs tuning. The break-even point is typically around 1,000-5,000 daily interactions, where the cost savings (70-87%) justify the routing infrastructure.

---

> **Cross-references:** For the full pattern definitions, see the [AI Agent Patterns Playbook](AI_AGENT_PATTERNS_PLAYBOOK.md). For principle details, see [AI Design Principles](AI_DESIGN_PRINCIPLES.md). For programmatic access to patterns, principles, and constraints, see the [`data/`](data/) directory.
>
> **Programmatic access:** All pattern, principle, and constraint metadata is available as structured data:
> ```js
> import { patterns, principles, uxPatterns, constraints } from './data/index.js'
> import { projectBlueprints } from './data/recommendations/project-blueprints.js'
> ```
