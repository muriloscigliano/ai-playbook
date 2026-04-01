#!/usr/bin/env node

/**
 * AI Playbook MCP Server
 *
 * Provides 6 tools for retrieving patterns from the AI Agent Patterns Playbook
 * without loading the full 170KB file into context.
 *
 * Tools:
 *   - recommend_patterns(description, level)  → "I'm building X" → phased plan
 *   - diagnose_agent(problem)                 → "My agent does Y wrong" → fixes
 *   - search_patterns(query)                  → Find patterns by keyword
 *   - get_pattern(number)                     → Get full content of a pattern
 *   - list_patterns(part?)                    → List all patterns by Part
 *   - get_build_guide(section?)               → Decision trees & phases
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load pre-built index
let patterns
try {
  patterns = JSON.parse(readFileSync(join(__dirname, 'patterns.json'), 'utf-8'))
} catch {
  console.error('patterns.json not found. Run: node build-index.js')
  process.exit(1)
}

// Load build guide
let buildGuide
try {
  buildGuide = readFileSync(join(__dirname, '..', 'AI_FIRST_BUILD_GUIDE.md'), 'utf-8')
} catch {
  buildGuide = 'AI_FIRST_BUILD_GUIDE.md not found.'
}

// ── Recommendation Engine ──

/**
 * Maps project types to the patterns they need, in priority order.
 * Each phase has: name, patterns (numbers), and why.
 */
const PROJECT_BLUEPRINTS = {
  chatbot: {
    name: 'AI Chatbot / Conversational Agent',
    phases: [
      { name: 'Core', patterns: [44, 9, 6, 49], why: 'Agent loop + ReAct reasoning + context budget + structured outputs' },
      { name: 'Memory', patterns: [23, 24, 7], why: 'Remember user context across turns and sessions' },
      { name: 'Safety', patterns: [50, 51, 71], why: 'Input filtering, injection defense, cost limits' },
      { name: 'Quality', patterns: [12, 53], why: 'Self-refine responses, track everything with spans' },
      { name: 'Scale', patterns: [46, 47, 45], why: 'Route to cheap models, cache repeated queries, fallbacks' },
    ],
  },
  coding_agent: {
    name: 'AI Coding Agent / Developer Tool',
    phases: [
      { name: 'Core', patterns: [44, 9, 17, 21, 6], why: 'Agent loop + tools (read/write/search/execute) + context budget' },
      { name: 'Safety', patterns: [64, 71, 20, 50], why: 'Permissions for file/bash ops, cost limits, human approval for destructive actions' },
      { name: 'Context', patterns: [8, 7, 68, 78], why: 'Progressive disclosure, compaction, tool result budget' },
      { name: 'Multi-Agent', patterns: [43, 66, 67, 72], why: 'Sub-agents for exploration, parallel tools, worktree isolation, file caching' },
      { name: 'Production', patterns: [63, 74, 75, 76, 73], why: 'Deferred tools, skills, coordinator-worker, IDE bridge, session resume' },
    ],
  },
  rag_app: {
    name: 'RAG Application / Knowledge Base Q&A',
    phases: [
      { name: 'Core', patterns: [44, 17, 6, 49], why: 'Agent loop + tool registry + context budget + structured outputs' },
      { name: 'Retrieval', patterns: [35, 31, 33], why: 'Start with Agentic RAG, add Corrective RAG, then Adaptive routing' },
      { name: 'Advanced RAG', patterns: [30, 34, 32], why: 'RAPTOR for cross-section questions, GraphRAG for relationships, Self-RAG for precision' },
      { name: 'Memory', patterns: [23, 24], why: 'Remember what user asked before, semantic recall across sessions' },
      { name: 'Quality', patterns: [54, 55, 53], why: 'Golden datasets, LLM-as-judge, observability' },
    ],
  },
  multi_agent: {
    name: 'Multi-Agent System / Agent Team',
    phases: [
      { name: 'Core', patterns: [44, 9, 17, 6], why: 'Get a single agent working well first' },
      { name: 'Orchestration', patterns: [36, 43, 37], why: 'Workflow patterns, sub-agents, agent-as-tool delegation' },
      { name: 'Coordination', patterns: [75, 38, 39], why: 'Coordinator-worker, swarm handoffs, graph-based orchestration' },
      { name: 'Safety', patterns: [64, 71, 70, 77], why: 'Permissions, cost gating, denial tracking, hooks' },
      { name: 'Scale', patterns: [67, 66, 15, 73], why: 'Worktree isolation, parallel tools, LLM compiler, session persistence' },
    ],
  },
  automation: {
    name: 'Workflow Automation / Business Process Agent',
    phases: [
      { name: 'Core', patterns: [44, 14, 17, 49], why: 'Agent loop + plan-and-execute (predictable steps) + structured outputs' },
      { name: 'Orchestration', patterns: [61, 48, 20], why: 'Event-driven flows, suspend/resume for async, human approval gates' },
      { name: 'Safety', patterns: [50, 64, 71, 62], why: 'Guardrails, permissions, cost limits, execution hooks' },
      { name: 'Memory', patterns: [23, 25], why: 'Working memory for state, AUDN to learn from past runs' },
      { name: 'Reliability', patterns: [45, 58, 53, 54], why: 'Fallback chains, circuit breaker, observability, golden dataset tests' },
    ],
  },
  api_agent: {
    name: 'API/Tool Integration Agent',
    phases: [
      { name: 'Core', patterns: [44, 17, 21, 19, 6], why: 'Agent loop + tool registry + ACI design + schema compat + context budget' },
      { name: 'Tool System', patterns: [18, 60, 63], why: 'Multi-source tools, MCP protocol, deferred loading' },
      { name: 'Safety', patterns: [50, 20, 64, 71], why: 'Guardrails, suspend for approval, permissions, cost limits' },
      { name: 'Reliability', patterns: [45, 58, 47], why: 'Fallback chains, circuit breaker, semantic caching' },
      { name: 'Scale', patterns: [46, 15, 66], why: 'Model routing, parallel execution, streaming tools' },
    ],
  },
}

/**
 * Keywords that map to project types.
 */
const PROJECT_KEYWORDS = {
  chatbot: ['chat', 'chatbot', 'conversational', 'assistant', 'support', 'customer', 'helpdesk', 'dialogue'],
  coding_agent: ['code', 'coding', 'developer', 'ide', 'programming', 'software', 'refactor', 'debug', 'cli'],
  rag_app: ['rag', 'knowledge', 'search', 'document', 'qa', 'question', 'retrieval', 'wiki', 'docs'],
  multi_agent: ['multi-agent', 'multi agent', 'team', 'crew', 'swarm', 'coordinate', 'agents', 'collaborate'],
  automation: ['workflow', 'automate', 'automation', 'pipeline', 'process', 'business', 'task', 'orchestrat'],
  api_agent: ['api', 'integration', 'tool', 'connect', 'webhook', 'service', 'endpoint', 'mcp'],
}

/**
 * Common problems and which patterns fix them.
 */
const PROBLEM_DIAGNOSES = {
  'too expensive': {
    title: 'Cost is too high',
    patterns: [46, 47, 63, 78, 71],
    explanation: 'Route simple queries to cheap models (46), cache repeated queries (47), lazy-load tool schemas (63), replace old tool results (78), set hard budget limits (71).',
  },
  'too slow': {
    title: 'Agent is too slow',
    patterns: [66, 15, 65, 72, 63],
    explanation: 'Run safe tools in parallel (66), parallelize independent plan steps (15), pre-compute likely results (65), cache file reads (72), defer tool loading (63).',
  },
  'hallucinate': {
    title: 'Agent hallucinates or makes things up',
    patterns: [13, 31, 32, 21, 49],
    explanation: 'Use tool-verified self-correction (13), validate retrieval quality (31), let model decide when to retrieve (32), design tools with clear errors (21), constrain output format (49).',
  },
  'forgets': {
    title: 'Agent forgets context or loses track',
    patterns: [23, 7, 68, 24, 78],
    explanation: 'Add structured working memory (23), compact old history (7), react to context state not just tokens (68), semantic recall for past conversations (24), budget tool results (78).',
  },
  'dangerous': {
    title: 'Agent takes dangerous or unwanted actions',
    patterns: [64, 20, 50, 70, 77],
    explanation: 'Multi-layer permissions (64), suspend for human approval (20), input/output guardrails (50), escalate after repeated denials (70), shell hooks for external checks (77).',
  },
  'wrong tool': {
    title: 'Agent picks wrong tools or bad parameters',
    patterns: [21, 49, 17, 63, 22],
    explanation: 'Redesign tools for agent consumption (21), structured outputs (49), validate inputs in pipeline (17), better tool descriptions via search hints (63), optimize prompts with DSPy (22).',
  },
  'complex task': {
    title: 'Agent fails on complex multi-step tasks',
    patterns: [14, 43, 75, 10, 11],
    explanation: 'Separate planning from execution (14), delegate to sub-agents (43), coordinator-worker for parallel (75), learn from failures via Reflexion (10), explore multiple reasoning paths (11).',
  },
  'scale': {
    title: 'Need to handle more users / higher load',
    patterns: [47, 46, 45, 58, 56],
    explanation: 'Semantic caching (47), route to cheapest capable model (46), fallback chains (45), circuit breaker on providers (58), composite storage (56).',
  },
  'no memory': {
    title: 'Agent needs to remember across sessions',
    patterns: [23, 24, 25, 69, 29],
    explanation: 'Structured working memory (23), semantic recall via embeddings (24), AUDN consolidation to keep memory clean (25), hierarchical memory files (69), decay old memories (29).',
  },
  'testing': {
    title: 'How to test non-deterministic agents',
    patterns: [54, 55, 53, 13, 16],
    explanation: 'Golden datasets in CI/CD (54), LLM-as-judge for subjective quality (55), observability spans for debugging (53), tool-verified correctness (13), majority voting for consistency (16).',
  },
}

function detectProjectType(description) {
  const lower = description.toLowerCase()
  const scores = {}

  for (const [type, keywords] of Object.entries(PROJECT_KEYWORDS)) {
    scores[type] = 0
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[type] += 1
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])

  // If no strong match, return null
  if (sorted[0][1] === 0) return null
  return sorted[0][0]
}

function detectProblems(description) {
  const lower = description.toLowerCase()
  const matches = []

  const problemKeywords = {
    'too expensive': ['expensive', 'cost', 'budget', 'money', 'tokens', 'pricing', 'cheap'],
    'too slow': ['slow', 'latency', 'speed', 'fast', 'performance', 'timeout', 'waiting'],
    'hallucinate': ['hallucinate', 'hallucination', 'wrong answer', 'makes up', 'inaccurate', 'incorrect', 'invents'],
    'forgets': ['forget', 'loses context', 'lost track', 'doesn\'t remember', 'context window', 'memory', 'amnesia'],
    'dangerous': ['dangerous', 'unsafe', 'destructive', 'permission', 'security', 'risk', 'delete', 'harmful'],
    'wrong tool': ['wrong tool', 'bad parameters', 'hallucinate tool', 'tool error', 'invalid', 'misuse'],
    'complex task': ['complex', 'multi-step', 'complicated', 'fails on', 'can\'t handle', 'long task', 'breaks down'],
    'scale': ['scale', 'users', 'load', 'concurrent', 'production', 'traffic', 'throughput'],
    'no memory': ['remember', 'memory', 'sessions', 'persist', 'between conversations', 'long-term', 'across sessions'],
    'testing': ['test', 'evaluate', 'eval', 'benchmark', 'quality', 'regression', 'ci/cd', 'non-deterministic'],
  }

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
    const diag = PROBLEM_DIAGNOSES[key]
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
  version: '1.0.0',
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

    const blueprint = PROJECT_BLUEPRINTS[projectType]
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
      const available = Object.values(PROBLEM_DIAGNOSES)
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

// ── Start ──

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(console.error)
