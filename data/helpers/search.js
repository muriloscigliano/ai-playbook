// Search helpers — detection functions for project types, problems, tasks, constraints
// Extracted from mcp-server/server.js logic

import { projectKeywords } from '../recommendations/project-keywords.js'
import { problemKeywords } from '../recommendations/problem-keywords.js'
import { uxDiagnoseKeywords } from '../recommendations/ux-diagnose-keywords.js'
import { capabilityKeywords } from '../recommendations/capability-keywords.js'
import { taskKeywords } from '../vocabulary/human-tasks.js'
import { constraintKeywords } from '../vocabulary/constraints.js'

/**
 * Detect project type from a description string.
 * Returns the best-matching project type key (e.g. 'chatbot', 'coding_agent') or null.
 */
export function detectProjectType(description) {
  const lower = description.toLowerCase()
  const scores = {}

  for (const [type, keywords] of Object.entries(projectKeywords)) {
    scores[type] = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[type] += 1
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])

  if (sorted[0][1] === 0) return null
  return sorted[0][0]
}

/**
 * Detect problems from a description string.
 * Returns an array of matching problem keys (e.g. ['too expensive', 'too slow']).
 */
export function detectProblems(description) {
  const lower = description.toLowerCase()
  const matches = []

  for (const [problem, keywords] of Object.entries(problemKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        matches.push(problem)
        break
      }
    }
  }

  return matches
}

/**
 * Detect user-perceived UX complaints from a free-text string.
 * Returns matching uxDiagnoses keys ranked by number of keyword hits
 * (best match first), so a single complaint maps to its closest diagnosis.
 * @param {string} description
 * @returns {string[]}
 */
export function detectUxComplaints(description) {
  const lower = description.toLowerCase()
  const scored = []

  for (const [key, keywords] of Object.entries(uxDiagnoseKeywords)) {
    let hits = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) hits += 1
    }
    if (hits > 0) scored.push({ key, hits })
  }

  return scored.sort((a, b) => b.hits - a.hits).map(s => s.key)
}

/**
 * Detect AI capabilities from a task phrase.
 * Returns matching capability keys ranked by number of keyword hits
 * (best match first) — e.g. "group these customers" → ['clustering'].
 * @param {string} description
 * @returns {string[]}
 */
export function detectCapabilities(description) {
  const lower = description.toLowerCase()
  const scored = []

  for (const [key, keywords] of Object.entries(capabilityKeywords)) {
    let hits = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) hits += 1
    }
    if (hits > 0) scored.push({ key, hits })
  }

  return scored.sort((a, b) => b.hits - a.hits).map(s => s.key)
}

/**
 * Detect human tasks from a description string.
 * Returns an array of matching task keys (e.g. ['review_approve', 'upload_file']).
 */
export function detectHumanTasks(description) {
  const lower = description.toLowerCase()
  const matched = []

  for (const [key, keywords] of Object.entries(taskKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        matched.push(key)
        break
      }
    }
  }

  return [...new Set(matched)]
}

/**
 * Detect constraints from a description string.
 * Returns an array of matching constraint keys (e.g. ['privacy_preserving', 'cost_budget']).
 */
export function detectConstraints(description) {
  const lower = description.toLowerCase()
  const matched = []

  for (const [key, keywords] of Object.entries(constraintKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        matched.push(key)
        break
      }
    }
  }

  return [...new Set(matched)]
}
