# AI Feature Engineering Readiness Checklist

> Pre-launch engineering checklist for AI-powered features. Each item maps to a playbook pattern or constraint.
> Items marked (!) are blocking — do not launch without them.
>
> Reference: [Patterns Playbook](../AI_AGENT_PATTERNS_PLAYBOOK.md) | [Pattern Index](../PATTERN_INDEX.md) | [Anti-Patterns](../AI_ANTI_PATTERNS.md)

---

## Feature: _________________________ Target Launch: _________

---

## Core Architecture

- [ ] (!) Agent loop has max iteration limit — Pattern 44 (Model Loop)
- [ ] (!) Tools have input validation and schema checking — Pattern 17 (Tool Registry)
- [ ] (!) Context window budget is defined and enforced — Pattern 6 (Context Engineering)
- [ ] Structured output schemas defined for all AI responses — Pattern 49 (Structured Outputs)
- [ ] Tool error messages are clear and actionable, not stack traces — Pattern 21 (ACI Design)
- [ ] Tool descriptions are accurate and agent-friendly — Pattern 21

## Safety & Permissions

- [ ] (!) Permission system covers all destructive operations — Pattern 64 (Multi-Layer Permissions)
- [ ] (!) Cost ceiling per session and per user is configured — Pattern 71 (Runtime Cost Gating)
- [ ] (!) Prompt injection defenses in place (sandwich, classify, hierarchy) — Pattern 51 (Injection Defense)
- [ ] Input/output guardrails are active and tested — Pattern 50 (Guardrail Processors)
- [ ] Human approval gate exists for high-risk actions — Pattern 20 (Suspend/Resume)
- [ ] Denial tracking escalates after repeated permission denials — Pattern 70 (Denial Tracking)

## Observability & Debugging

- [ ] (!) Every LLM call produces a span: model, tokens in/out, latency, cost — Pattern 53 (Observability)
- [ ] (!) Every tool execution logged with inputs, outputs, duration — Pattern 53
- [ ] Errors captured with full context (conversation state, tool state, model response) — Pattern 53
- [ ] Cost tracking is per-session and per-model — Pattern 71
- [ ] Audit trail is queryable for compliance review — Constraint: Audit Logging
- [ ] Tracing connects user action → LLM call → tool execution → result

## Reliability & Failover

- [ ] Model fallback chain configured (primary → secondary → tertiary) — Pattern 45 (Fallback Chains)
- [ ] Circuit breaker protects against provider outages — Pattern 58 (Circuit Breaker)
- [ ] Graceful degradation when AI is unavailable (show cached results or manual fallback) — Pattern 45
- [ ] Session state persists across interruptions — Pattern 73 (Session Backgrounding)
- [ ] Retry logic with exponential backoff for transient failures

## Testing & Evaluation

- [ ] (!) Golden dataset with expected inputs/outputs exists — Pattern 54 (Golden Dataset Testing)
- [ ] (!) Golden dataset runs in CI/CD on every PR — Pattern 54
- [ ] LLM-as-judge evaluation for subjective quality dimensions — Pattern 55 (LLM-as-Judge)
- [ ] Adversarial test cases for prompt injection — Pattern 51
- [ ] Performance benchmarks for latency, cost per request, tokens per task
- [ ] Test coverage for edge cases: empty input, very long input, malformed input, concurrent requests

## Context & Memory

- [ ] Context compaction strategy for conversations >50 turns — Pattern 7, 68 (Compaction)
- [ ] Working memory schema defined (what state persists between turns) — Pattern 23 (Working Memory)
- [ ] Tool result budget prevents context overflow — Pattern 78 (Tool Result Budget)
- [ ] File/data caching reduces redundant reads — Pattern 72 (File State Caching)
- [ ] Memory cleanup for ended sessions

## Production Operations

- [ ] (!) Rate limiting in place — Constraint: Rate Limit
- [ ] (!) Data retention policy implemented — Constraint: Data Retention
- [ ] (!) PII handling complies with policy — Constraint: Privacy Preserving
- [ ] Rollback procedure documented and tested (can revert to previous version)
- [ ] Monitoring alerts configured for:
  - [ ] Error rate spike (>X% in Y minutes)
  - [ ] Cost spike (>$X in Y hours)
  - [ ] Latency spike (p95 > Xms)
  - [ ] Token usage anomaly
- [ ] Runbook exists for common failure scenarios
- [ ] On-call team knows about this feature and how to disable it

## Performance Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Response latency (p50) | [e.g., <1s] | | [ ] Met |
| Response latency (p95) | [e.g., <3s] | | [ ] Met |
| Cost per interaction | [e.g., <$0.05] | | [ ] Met |
| Error rate | [e.g., <1%] | | [ ] Met |
| Availability | [e.g., 99.9%] | | [ ] Met |

---

## Summary

| Category | Pass | Fail | N/A | Notes |
|----------|------|------|-----|-------|
| Core Architecture | | | | |
| Safety & Permissions | | | | |
| Observability | | | | |
| Reliability | | | | |
| Testing | | | | |
| Context & Memory | | | | |
| Production Ops | | | | |
| Performance | | | | |

**Overall:** [ ] Ready to launch [ ] Ready with conditions [ ] Not ready

**Blocking issues:**
1.
2.
3.

---

**Sign-off:**

| Role | Name | Date |
|------|------|------|
| Tech Lead | | |
| Security Review | | |
| On-call Engineer | | |
