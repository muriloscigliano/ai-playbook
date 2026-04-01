#!/usr/bin/env node

/**
 * AI Playbook MCP Server
 *
 * Provides 10 tools for retrieving patterns and design principles from the
 * AI Agent Patterns Playbook and AI Design Principles document.
 *
 * Engineering Patterns (6 tools):
 *   - recommend_patterns(description, level)  → "I'm building X" → phased plan
 *   - diagnose_agent(problem)                 → "My agent does Y wrong" → fixes
 *   - search_patterns(query)                  → Find patterns by keyword
 *   - get_pattern(number)                     → Get full content of a pattern
 *   - list_patterns(part?)                    → List all patterns by Part
 *   - get_build_guide(section?)               → Decision trees & phases
 *
 * Design Principles (5 tools):
 *   - get_design_principle(number)            → Get full content of a design principle (1-17)
 *   - get_ux_pattern(number)                  → Get full content of a UX pattern (1-7)
 *   - search_design(query)                    → Search design principles, UX patterns, governance
 *   - get_design_section(section)             → Get taxonomy, governance, rollout, metrics, human tasks, constraints, etc.
 *   - recommend_design(description, focus)    → Unified design + engineering recommendation
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

// Import structured data layer
import { projectBlueprints } from '../data/recommendations/project-blueprints.js'
import { projectKeywords } from '../data/recommendations/project-keywords.js'
import { problemDiagnoses } from '../data/recommendations/problem-diagnoses.js'
import { problemKeywords } from '../data/recommendations/problem-keywords.js'
import { humanTasks } from '../data/vocabulary/human-tasks.js'
import { taskKeywords } from '../data/vocabulary/human-tasks.js'
import { constraints, constraintCategories, constraintKeywords } from '../data/vocabulary/constraints.js'
import { detectProjectType, detectProblems, detectHumanTasks, detectConstraints } from '../data/helpers/search.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load pre-built index
let patterns
try {
  patterns = JSON.parse(readFileSync(join(__dirname, 'patterns.json'), 'utf-8'))
} catch {
  console.error('patterns.json not found. Run: node build-index.js')
  process.exit(1)
}

// Load design principles index
let designEntries
try {
  designEntries = JSON.parse(readFileSync(join(__dirname, 'design-principles.json'), 'utf-8'))
} catch {
  designEntries = []
  // Design principles index is optional — server works without it
}

// Load build guide
let buildGuide
try {
  buildGuide = readFileSync(join(__dirname, '..', 'AI_FIRST_BUILD_GUIDE.md'), 'utf-8')
} catch {
  buildGuide = 'AI_FIRST_BUILD_GUIDE.md not found.'
}

// ── Recommendation Engine (data imported from ../data/) ──

function formatRecommendation(blueprint, level) {
  const lines = [`# Recommended Patterns for: ${blueprint.name}\n`]

  const phaseCount = level === 'beginner' ? 2 : level === 'intermediate' ? 3 : blueprint.phases.length

  for (let i = 0; i < Math.min(phaseCount, blueprint.phases.length); i++) {
    const phase = blueprint.phases[i]
    const priority = i === 0 ? '🔴 START HERE' : i === 1 ? '🟡 Add next' : '🟢 When ready'

    lines.push(`## Phase ${i + 1}: ${phase.name} (${priority})`)
    lines.push(`**Why**: ${phase.why}\n`)
    lines.push('| Pattern | Name | What it does |')
    lines.push('|---------|------|-------------|')

    for (const num of phase.patterns) {
      const p = patterns.find(x => x.pattern === num)
      if (p) {
        const problem = p.problem ? p.problem.split('\n')[0].slice(0, 80) : ''
        lines.push(`| ${num} | ${p.name} | ${problem} |`)
      }
    }
    lines.push('')
  }

  if (level === 'beginner') {
    lines.push('---')
    lines.push('**Beginner tip**: Focus ONLY on Phase 1. Get that working before adding anything else.')
    lines.push('Use `get_pattern(N)` to read the full implementation details for any pattern.')
  } else if (level === 'intermediate') {
    lines.push('---')
    lines.push(`**Next steps**: ${blueprint.phases.length - phaseCount} more phases available. Use \`get_build_guide("phase")\` for the full roadmap.`)
  }

  lines.push('')
  lines.push(`Remaining phases not shown: ${blueprint.phases.slice(phaseCount).map(p => p.name).join(', ') || 'none'}`)

  return lines.join('\n')
}

function formatDiagnosis(problemKeys) {
  const lines = ['# Agent Diagnosis\n']

  for (const key of problemKeys) {
    const diag = problemDiagnoses[key]
    if (!diag) continue

    lines.push(`## Problem: ${diag.title}`)
    lines.push(`${diag.explanation}\n`)
    lines.push('| Priority | Pattern | Name |')
    lines.push('|----------|---------|------|')

    for (let i = 0; i < diag.patterns.length; i++) {
      const num = diag.patterns[i]
      const p = patterns.find(x => x.pattern === num)
      const priority = i === 0 ? 'Fix first' : i === 1 ? 'Then this' : 'If needed'
      if (p) {
        lines.push(`| ${priority} | ${num} | ${p.name} |`)
      }
    }
    lines.push('')
  }

  lines.push('Use `get_pattern(N)` to read the full implementation details for any pattern.')
  return lines.join('\n')
}

// ── Search Helpers ──

function searchPatterns(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1)

  const scored = patterns
    .filter(p => p.pattern !== null)
    .map(p => {
      let score = 0

      for (const term of terms) {
        if (p.name.toLowerCase().includes(term)) score += 10
        if (p.problem.toLowerCase().includes(term)) score += 5
        if (p.solution.toLowerCase().includes(term)) score += 3
        if (p.part.toLowerCase().includes(term)) score += 2
        if (p.keywords.some(k => k.includes(term))) score += 1
      }

      return { ...p, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored
}

function formatPatternSummary(p) {
  const num = p.pattern !== null ? `Pattern ${p.pattern}` : `Section ${p.section}`
  const problem = p.problem ? `\nProblem: ${p.problem.slice(0, 200)}${p.problem.length > 200 ? '...' : ''}` : ''
  return `[${num}] ${p.name} (${p.part})${problem}`
}

function getPatternByNumber(num) {
  return patterns.find(p => p.pattern === num || p.section === num)
}

function getBuildGuideSection(section) {
  if (!section) return buildGuide

  const lines = buildGuide.split('\n')
  const sectionLines = []
  let capturing = false

  for (const line of lines) {
    if (line.toLowerCase().includes(section.toLowerCase()) && (line.startsWith('## ') || line.startsWith('### '))) {
      capturing = true
      sectionLines.push(line)
      continue
    }
    if (capturing) {
      if ((line.startsWith('## ') || line.startsWith('---')) && sectionLines.length > 1) break
      sectionLines.push(line)
    }
  }

  return sectionLines.length > 0 ? sectionLines.join('\n').trim() : `No section matching "${section}" found.`
}

// ── MCP Server ──

const server = new McpServer({
  name: 'ai-playbook',
  version: '2.0.0',
})

// Tool 1: Recommend patterns for a project (beginner-friendly)
server.tool(
  'recommend_patterns',
  'Recommend AI agent patterns for a specific project. Describe what you are building and get a phased implementation plan with the right patterns in the right order. Best starting point for new projects.',
  {
    description: z.string().describe('What are you building? E.g. "a customer support chatbot", "a coding assistant", "a RAG app for legal docs", "a multi-agent research system"'),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('Experience level — controls how many phases to show. Default: beginner (2 phases)'),
  },
  async ({ description, level = 'beginner' }) => {
    // Try to detect project type from description
    const projectType = detectProjectType(description)

    if (!projectType) {
      // Can't detect — give a generic starter + ask to clarify
      const generic = [
        '# Getting Started — AI Agent Patterns\n',
        'I couldn\'t determine the specific project type from your description. Here\'s the universal starting point:\n',
        '## Every AI agent needs these (Phase 1):',
        '| Pattern | Name | What it does |',
        '|---------|------|-------------|',
        '| 44 | Agentic Model Loop | The core loop: prompt → generate → tool calls → repeat |',
        '| 9 | ReAct Loop | Think → Act → Observe reasoning cycle |',
        '| 17 | Tool Registry | Validate inputs, check permissions, execute, validate outputs |',
        '| 6 | Context Engineering | Budget tokens across system prompt, tools, history, retrieval |',
        '| 49 | Structured Outputs | Guarantee valid JSON from the LLM |',
        '',
        '## Then add safety (Phase 2):',
        '| 64 | Multi-Layer Permissions | Control what the agent can do |',
        '| 50 | Guardrail Processors | Filter harmful inputs/outputs |',
        '| 71 | Runtime Cost Gating | Prevent runaway spending |',
        '',
        'For a more specific recommendation, try describing your project as one of:',
        '- "a chatbot for customer support"',
        '- "a coding agent / developer tool"',
        '- "a RAG app for searching documents"',
        '- "a multi-agent team for research"',
        '- "a workflow automation agent"',
        '- "an API integration agent"',
        '',
        'Use `get_pattern(N)` to read the full implementation details for any pattern.',
      ].join('\n')

      return { content: [{ type: 'text', text: generic }] }
    }

    const blueprint = projectBlueprints[projectType]
    const text = formatRecommendation(blueprint, level)
    return { content: [{ type: 'text', text }] }
  },
)

// Tool 2: Diagnose agent problems
server.tool(
  'diagnose_agent',
  'Describe a problem with your AI agent and get specific patterns to fix it. E.g. "my agent is too slow", "it hallucinates answers", "it forgets what I said", "it makes dangerous changes".',
  {
    problem: z.string().describe('What is going wrong? E.g. "too expensive", "too slow", "hallucinates", "forgets context", "takes dangerous actions", "fails on complex tasks", "can\'t remember between sessions"'),
  },
  async ({ problem }) => {
    const matchedProblems = detectProblems(problem)

    if (matchedProblems.length === 0) {
      // Fallback: list all diagnosable problems
      const available = Object.values(problemDiagnoses)
        .map(d => `- "${d.title}"`)
        .join('\n')

      return {
        content: [{
          type: 'text',
          text: `I couldn't match a specific diagnosis from: "${problem}"\n\nTry describing your problem as one of:\n${available}\n\nOr use \`search_patterns("your keyword")\` for a broader search.`,
        }],
      }
    }

    const text = formatDiagnosis(matchedProblems)
    return { content: [{ type: 'text', text }] }
  },
)

// Tool 3: Search patterns by keyword
server.tool(
  'search_patterns',
  'Search AI agent patterns by keyword. Returns matching pattern summaries (name + problem), NOT full content. Use get_pattern to read the full pattern.',
  { query: z.string().describe('Search query — e.g. "memory", "cost optimization", "multi-agent", "permissions safety"') },
  async ({ query }) => {
    const results = searchPatterns(query).slice(0, 10)

    if (results.length === 0) {
      return { content: [{ type: 'text', text: `No patterns found for "${query}". Try broader terms like "memory", "tools", "safety", "rag", "agent".` }] }
    }

    const text = results.map((r, i) => `${i + 1}. ${formatPatternSummary(r)}`).join('\n\n')
    return {
      content: [{
        type: 'text',
        text: `Found ${results.length} patterns matching "${query}":\n\n${text}\n\nUse get_pattern(number) to read the full implementation details.`,
      }],
    }
  },
)

// Tool 4: Get full pattern content by number
server.tool(
  'get_pattern',
  'Get the full content of a specific AI agent pattern by its number. Includes: problem, solution, architecture, pseudocode, key rules, and source.',
  { number: z.number().describe('Pattern number (1-78) or section number from search results') },
  async ({ number }) => {
    const pattern = getPatternByNumber(number)

    if (!pattern) {
      return { content: [{ type: 'text', text: `Pattern ${number} not found. Valid range: 1-78. Use search_patterns to find patterns.` }] }
    }

    return {
      content: [{
        type: 'text',
        text: pattern.content,
      }],
    }
  },
)

// Tool 5: List all patterns (optionally filter by Part)
server.tool(
  'list_patterns',
  'List all 78 patterns with one-line summaries. Optionally filter by Part (e.g. "memory", "tools", "safety", "rag", "production").',
  { part: z.string().optional().describe('Filter by Part name keyword — e.g. "memory", "tools", "rag", "production". Omit for all.') },
  async ({ part }) => {
    let filtered = patterns.filter(p => p.pattern !== null)

    if (part) {
      const lower = part.toLowerCase()
      filtered = filtered.filter(p => p.part.toLowerCase().includes(lower))
    }

    if (filtered.length === 0) {
      return { content: [{ type: 'text', text: `No patterns found for part "${part}". Available parts: Foundation, Context, Reasoning, Tools, Memory, RAG, Multi-Agent, Execution, Safety, Infrastructure, Production.` }] }
    }

    const text = filtered.map(p => {
      const problem = p.problem ? ` — ${p.problem.split('\n')[0].slice(0, 100)}` : ''
      return `${p.pattern}. ${p.name}${problem}`
    }).join('\n')

    const header = part ? `Patterns matching "${part}" (${filtered.length}):` : `All ${filtered.length} patterns:`
    return { content: [{ type: 'text', text: `${header}\n\n${text}` }] }
  },
)

// Tool 6: Get build guide sections
server.tool(
  'get_build_guide',
  'Get the AI-First Build Guide — decision trees, implementation phases, pattern combinations, and anti-patterns. Optionally get a specific section.',
  { section: z.string().optional().describe('Section to retrieve — e.g. "decision tree", "phase 1", "anti-patterns", "cost", "safety". Omit for full guide.') },
  async ({ section }) => {
    const text = getBuildGuideSection(section)
    return { content: [{ type: 'text', text }] }
  },
)

// ── Atlas vocabulary + detect functions imported from ../data/ ──

// ── Design Principles Tools ──

function searchDesignEntries(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1)

  return designEntries
    .map(entry => {
      let score = 0
      for (const term of terms) {
        if (entry.name.toLowerCase().includes(term)) score += 10
        if (entry.summary.toLowerCase().includes(term)) score += 5
        if (entry.theme.toLowerCase().includes(term)) score += 3
        if (entry.keywords.some(k => k.includes(term))) score += 1
        // Boost principles and UX patterns in search results
        if (entry.type === 'principle' || entry.type === 'ux-pattern') score += 1
      }
      return { ...entry, score }
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
}

function formatDesignEntrySummary(entry) {
  const typeLabel = {
    'principle': 'Principle',
    'ux-pattern': 'UX Pattern',
    'section': 'Section',
    'governance': 'Governance',
    'anti-pattern': 'Anti-Pattern',
    'taxonomy-level': 'Taxonomy',
    'lifecycle': 'Lifecycle',
  }[entry.type] || entry.type

  const num = entry.number ? ` ${entry.number}` : ''
  const summary = entry.summary ? `\n  ${entry.summary.slice(0, 200)}${entry.summary.length > 200 ? '...' : ''}` : ''
  return `[${typeLabel}${num}] ${entry.name}${summary}`
}

// Tool 7: Get a specific design principle by number (1-17)
server.tool(
  'get_design_principle',
  'Get the full content of a design principle by number (1-17). Includes: problem, design guidance, practitioner perspectives, examples, and playbook connections. From the AI Design Principles companion document.',
  { number: z.number().min(1).max(17).describe('Principle number (1-17). E.g. 1 = Preserve Struggle, 3 = Transparent Thinking Partner, 9 = Enhance Not Replace, 17 = Design Exit as Sacred Right') },
  async ({ number }) => {
    if (designEntries.length === 0) {
      return { content: [{ type: 'text', text: 'Design principles index not found. Run: node build-design-index.js' }] }
    }

    const entry = designEntries.find(e => e.type === 'principle' && e.number === number)
    if (!entry) {
      return { content: [{ type: 'text', text: `Design principle ${number} not found. Valid range: 1-17.` }] }
    }

    return { content: [{ type: 'text', text: entry.content }] }
  },
)

// Tool 8: Get a specific UX pattern by number (1-7)
server.tool(
  'get_ux_pattern',
  'Get the full content of an agentic UX pattern by number (1-7). Includes: lifecycle phase, autonomy levels, anatomy, metrics, examples, and playbook connections. P1=Intent Preview, P2=Autonomy Dial, P3=Explainable Rationale, P4=Confidence Signal, P5=Action Audit & Undo, P6=Escalation Pathway, P7=Empathic Error Recovery.',
  { number: z.number().min(1).max(7).describe('UX pattern number (1-7)') },
  async ({ number }) => {
    if (designEntries.length === 0) {
      return { content: [{ type: 'text', text: 'Design principles index not found. Run: node build-design-index.js' }] }
    }

    const entry = designEntries.find(e => e.type === 'ux-pattern' && e.number === number)
    if (!entry) {
      return { content: [{ type: 'text', text: `UX pattern ${number} not found. Valid range: 1-7.` }] }
    }

    return { content: [{ type: 'text', text: entry.content }] }
  },
)

// Tool 9: Search design principles, UX patterns, and governance
server.tool(
  'search_design',
  'Search AI design principles, UX patterns, autonomy taxonomy, and governance content. Returns matching summaries. Use get_design_principle or get_ux_pattern for full content.',
  { query: z.string().describe('Search query — e.g. "trust", "transparency", "consent", "accountability", "error recovery", "autonomy", "metacognition", "sludge", "governance"') },
  async ({ query }) => {
    if (designEntries.length === 0) {
      return { content: [{ type: 'text', text: 'Design principles index not found. Run: node build-design-index.js' }] }
    }

    const results = searchDesignEntries(query).slice(0, 10)

    if (results.length === 0) {
      return { content: [{ type: 'text', text: `No design entries found for "${query}". Try: "trust", "transparency", "consent", "autonomy", "error", "governance", "metrics", "sludge", "agency".` }] }
    }

    const text = results.map((r, i) => `${i + 1}. ${formatDesignEntrySummary(r)}`).join('\n\n')
    return {
      content: [{
        type: 'text',
        text: `Found ${results.length} design entries matching "${query}":\n\n${text}\n\nUse get_design_principle(N) or get_ux_pattern(N) to read full content.`,
      }],
    }
  },
)

// Tool 10: Get a design section (taxonomy, governance, rollout, metrics, framing)
server.tool(
  'get_design_section',
  'Get a full section from the AI Design Principles document: autonomy taxonomy, governance (ethics council), phased rollout, metrics framework, framing, cross-reference table, anti-pattern (agentic sludge), human tasks, constraints, touchpoints, AI tasks by autonomy level, or Atlas framework.',
  { section: z.string().describe('Section to retrieve — e.g. "taxonomy", "governance", "rollout", "metrics", "framing", "cross-reference", "sludge", "human tasks", "constraints", "touchpoints", "ai tasks", "atlas", "lifecycle"') },
  async ({ section }) => {
    if (designEntries.length === 0) {
      return { content: [{ type: 'text', text: 'Design principles index not found. Run: node build-design-index.js' }] }
    }

    const lower = section.toLowerCase()

    // Map common queries to entry types/names
    const sectionMap = {
      'taxonomy': 'The Agentic Autonomy Taxonomy',
      'autonomy': 'The Agentic Autonomy Taxonomy',
      'framing': 'Framing: Quality Is Downstream of Intent',
      'intent': 'Framing: Quality Is Downstream of Intent',
      'quality': 'Framing: Quality Is Downstream of Intent',
      'cross-reference': 'Cross-Reference: Principles',
      'cross reference': 'Cross-Reference: Principles',
      'supplementary': 'Supplementary Frameworks',
      'frameworks': 'Supplementary Frameworks',
      'sources': 'Sources & Attribution',
    }

    // Try exact section map first
    for (const [key, name] of Object.entries(sectionMap)) {
      if (lower.includes(key)) {
        const entry = designEntries.find(e => e.name.includes(name))
        if (entry) return { content: [{ type: 'text', text: entry.content }] }
      }
    }

    // Try matching governance entries
    if (lower.includes('governance') || lower.includes('ethics') || lower.includes('council')) {
      const entry = designEntries.find(e => e.name.includes('Ethics Council'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('rollout') || lower.includes('phase') || lower.includes('implementation')) {
      const entry = designEntries.find(e => e.name.includes('Phased Implementation'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('metric')) {
      const entry = designEntries.find(e => e.name.includes('Metrics Framework'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('sludge') || lower.includes('anti-pattern') || lower.includes('anti pattern') || lower.includes('dark pattern')) {
      const entry = designEntries.find(e => e.type === 'anti-pattern')
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('human task') || lower.includes('human tasks')) {
      const entry = designEntries.find(e => e.name.includes('Human Task Vocabulary'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('constraint') || lower.includes('constraints')) {
      const entry = designEntries.find(e => e.name.includes('Constraint Taxonomy'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('touchpoint') || lower.includes('touchpoints')) {
      // Touchpoints are inside Principle 6 content, search for it
      const entry = designEntries.find(e => e.type === 'principle' && e.number === 6)
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('atlas')) {
      const entry = designEntries.find(e => e.name.includes('AI Interaction Atlas'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('ai task') || lower.includes('ai tasks') || lower.includes('autonomy level')) {
      const entry = designEntries.find(e => e.name.includes('AI Tasks by'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    if (lower.includes('lifecycle') || lower.includes('life cycle') || lower.includes('overview')) {
      const entry = designEntries.find(e => e.name.includes('Lifecycle Overview'))
      if (entry) return { content: [{ type: 'text', text: entry.content }] }
    }

    // Fuzzy match against all entries
    const results = searchDesignEntries(section)
    if (results.length > 0) {
      const best = results[0]
      return { content: [{ type: 'text', text: best.content }] }
    }

    const available = [
      'taxonomy / autonomy', 'framing / intent / quality',
      'governance / ethics council', 'rollout / phases',
      'metrics', 'constraints', 'human tasks', 'touchpoints',
      'ai tasks / autonomy level', 'atlas',
      'sludge / anti-pattern', 'lifecycle',
      'cross-reference', 'frameworks', 'sources',
    ].join(', ')

    return { content: [{ type: 'text', text: `No section matching "${section}" found. Available sections: ${available}` }] }
  },
)

// Tool 11: Unified design recommendation
server.tool(
  'recommend_design',
  'Given a workflow or feature description, recommend design principles, UX patterns, human tasks, constraints, AND engineering patterns. Combines design and engineering guidance into a unified recommendation. Best for product/UX teams scoping agentic features.',
  {
    description: z.string().describe('Describe the workflow or feature. E.g. "a scheduling agent that books meetings", "a code review bot that comments on PRs", "a document summarizer with user feedback"'),
    focus: z.enum(['design', 'engineering', 'both']).optional().describe('Focus on design principles, engineering patterns, or both. Default: both'),
  },
  async ({ description, focus = 'both' }) => {
    const lines = ['# Design & Engineering Recommendation\n']
    lines.push(`**For:** ${description}\n`)

    // Detect human tasks
    const matchedTasks = detectHumanTasks(description)
    if (matchedTasks.length > 0 && focus !== 'engineering') {
      lines.push('## Human Tasks Involved\n')
      lines.push('| Task | Phase | UX Pattern | Design Principle |')
      lines.push('|------|-------|-----------|-----------------|')
      for (const key of matchedTasks) {
        const task = humanTasks[key]
        if (!task) continue
        const principles = task.principles.map(n => `P${n}`).join(', ')
        lines.push(`| ${task.name} | ${task.phase} | ${task.uxPattern || '—'} | ${principles} |`)
      }
      lines.push('')
    }

    // Detect constraints
    const matchedConstraints = detectConstraints(description)
    if (matchedConstraints.length > 0 && focus !== 'engineering') {
      lines.push('## Applicable Constraints\n')
      lines.push('| Constraint | Category | Playbook Pattern |')
      lines.push('|-----------|----------|-----------------|')
      for (const key of matchedConstraints) {
        const constraint = constraints[key]
        if (!constraint) continue
        const pbPatterns = constraint.playbook.length > 0 ? constraint.playbook.map(n => `Pattern ${n}`).join(', ') : '—'
        lines.push(`| ${constraint.name} | ${constraint.category} | ${pbPatterns} |`)
      }
      lines.push('')
    }

    // Collect unique principles from tasks + constraints
    if (focus !== 'engineering') {
      const principleSet = new Set()
      for (const key of matchedTasks) {
        const task = humanTasks[key]
        if (task) task.principles.forEach(p => principleSet.add(p))
      }
      for (const key of matchedConstraints) {
        const constraint = constraints[key]
        if (constraint) constraint.principles.forEach(p => principleSet.add(p))
      }

      if (principleSet.size > 0) {
        const sorted = [...principleSet].sort((a, b) => a - b)
        lines.push('## Design Principles to Implement\n')
        for (const num of sorted) {
          const entry = designEntries.find(e => e.type === 'principle' && e.number === num)
          if (entry) {
            lines.push(`- **Principle ${num}: ${entry.name}**`)
          }
        }
        lines.push('')
        lines.push('Use `get_design_principle(N)` to read the full principle.\n')
      }

      // Collect unique UX patterns
      const patternSet = new Set()
      for (const key of matchedTasks) {
        const task = humanTasks[key]
        if (task && task.uxPattern) patternSet.add(task.uxPattern)
      }

      if (patternSet.size > 0) {
        const sorted = [...patternSet].sort()
        lines.push('## UX Patterns to Implement\n')
        for (const p of sorted) {
          const num = parseInt(p.replace('P', ''))
          const entry = designEntries.find(e => e.type === 'ux-pattern' && e.number === num)
          if (entry) {
            lines.push(`- **${p}: ${entry.name}**`)
          }
        }
        lines.push('')
        lines.push('Use `get_ux_pattern(N)` to read the full pattern.\n')
      }
    }

    // Engineering patterns (reuse existing logic)
    if (focus !== 'design') {
      const projectType = detectProjectType(description)
      if (projectType) {
        const blueprint = projectBlueprints[projectType]
        lines.push(`## Engineering Patterns (${blueprint.name})\n`)
        const phaseCount = 2
        for (let i = 0; i < Math.min(phaseCount, blueprint.phases.length); i++) {
          const phase = blueprint.phases[i]
          const priority = i === 0 ? 'START HERE' : 'Add next'
          lines.push(`### Phase ${i + 1}: ${phase.name} (${priority})`)
          lines.push(`**Why**: ${phase.why}\n`)
          for (const num of phase.patterns) {
            const p = patterns.find(x => x.pattern === num)
            if (p) lines.push(`- Pattern ${num}: ${p.name}`)
          }
          lines.push('')
        }
        lines.push('Use `get_pattern(N)` to read full implementation details.\n')
      }
    }

    if (lines.length <= 3) {
      lines.push('I couldn\'t detect specific human tasks or constraints from your description. Try being more specific about what users will do (e.g., "users review and approve", "export results") or what constraints apply (e.g., "privacy requirements", "real-time latency").')
      lines.push('')
      lines.push('Or use `search_design("your keyword")` and `search_patterns("your keyword")` for targeted searches.')
    }

    return { content: [{ type: 'text', text: lines.join('\n') }] }
  },
)

// ── Start ──

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(console.error)
