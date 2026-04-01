#!/usr/bin/env node

/**
 * AI Playbook CLI
 *
 * Usage:
 *   npx ai-playbook recommend "a customer support chatbot"
 *   npx ai-playbook diagnose "too slow and forgets context"
 *   npx ai-playbook search "memory"
 *   npx ai-playbook pattern 44
 *   npx ai-playbook principle 3
 *   npx ai-playbook ux-pattern 1
 *   npx ai-playbook list [part]
 *   npx ai-playbook relations 44
 *   npx ai-playbook design "scheduling agent that books meetings"
 *   npx ai-playbook stats
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')
const mcpDir = join(__dirname, '..', 'mcp-server')

// Dynamic imports from data layer
const { patterns, patternsByNumber } = await import(join(dataDir, 'patterns', '_index.js'))
const { principles, principlesByNumber } = await import(join(dataDir, 'principles', '_index.js'))
const { uxPatterns, uxPatternsByNumber } = await import(join(dataDir, 'ux-patterns', '_index.js'))
const { projectBlueprints } = await import(join(dataDir, 'recommendations', 'project-blueprints.js'))
const { problemDiagnoses } = await import(join(dataDir, 'recommendations', 'problem-diagnoses.js'))
const { humanTasks } = await import(join(dataDir, 'vocabulary', 'human-tasks.js'))
const { constraints } = await import(join(dataDir, 'vocabulary', 'constraints.js'))
const { allRelations, getRelationsFor } = await import(join(dataDir, 'relations', '_index.js'))
const { autonomyLevels } = await import(join(dataDir, 'taxonomy', 'autonomy-levels.js'))
const { detectProjectType, detectProblems, detectHumanTasks, detectConstraints } = await import(join(dataDir, 'helpers', 'search.js'))

// Load full prose indexes if available
let patternsJson = []
let designJson = []
try {
  patternsJson = JSON.parse(readFileSync(join(mcpDir, 'patterns.json'), 'utf-8'))
} catch { /* optional */ }
try {
  designJson = JSON.parse(readFileSync(join(mcpDir, 'design-principles.json'), 'utf-8'))
} catch { /* optional */ }

// ── Colors ──

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

function bold(s) { return `${C.bold}${s}${C.reset}` }
function dim(s) { return `${C.dim}${s}${C.reset}` }
function green(s) { return `${C.green}${s}${C.reset}` }
function yellow(s) { return `${C.yellow}${s}${C.reset}` }
function cyan(s) { return `${C.cyan}${s}${C.reset}` }
function red(s) { return `${C.red}${s}${C.reset}` }
function magenta(s) { return `${C.magenta}${s}${C.reset}` }

// ── Commands ──

function cmdRecommend(description, level = 'beginner') {
  const projectType = detectProjectType(description)
  if (!projectType) {
    console.log(yellow('\nCouldn\'t detect project type. Try describing as:'))
    console.log('  "a chatbot for customer support"')
    console.log('  "a coding agent / developer tool"')
    console.log('  "a RAG app for searching documents"')
    console.log('  "a multi-agent team for research"')
    console.log('  "a workflow automation agent"')
    console.log('  "an API integration agent"\n')
    return
  }

  const blueprint = projectBlueprints[projectType]
  const phaseCount = level === 'beginner' ? 2 : level === 'intermediate' ? 3 : blueprint.phases.length

  console.log(bold(`\n  Recommended Patterns for: ${blueprint.name}\n`))

  for (let i = 0; i < Math.min(phaseCount, blueprint.phases.length); i++) {
    const phase = blueprint.phases[i]
    const tag = i === 0 ? green('START HERE') : i === 1 ? yellow('Add next') : cyan('When ready')

    console.log(bold(`  Phase ${i + 1}: ${phase.name}`) + ` ${dim('(')}${tag}${dim(')')}`)
    console.log(dim(`  ${phase.why}\n`))

    for (const num of phase.patterns) {
      const p = patternsByNumber[num]
      if (p) {
        console.log(`    ${green(String(num).padStart(2))}  ${p.name}`)
      }
    }
    console.log()
  }

  const remaining = blueprint.phases.slice(phaseCount).map(p => p.name)
  if (remaining.length > 0) {
    console.log(dim(`  ${remaining.length} more phases: ${remaining.join(', ')}`))
    console.log(dim(`  Run with --level=advanced to see all.\n`))
  }
}

function cmdDiagnose(problem) {
  const matched = detectProblems(problem)
  if (matched.length === 0) {
    console.log(yellow('\nCouldn\'t match a problem. Try:'))
    Object.values(problemDiagnoses).forEach(d => console.log(`  - "${d.title}"`))
    console.log()
    return
  }

  console.log(bold('\n  Agent Diagnosis\n'))

  for (const key of matched) {
    const diag = problemDiagnoses[key]
    if (!diag) continue

    console.log(bold(`  Problem: ${diag.title}`))
    console.log(dim(`  ${diag.explanation}\n`))

    diag.patterns.forEach((num, i) => {
      const p = patternsByNumber[num]
      const priority = i === 0 ? green('Fix first') : i === 1 ? yellow('Then this') : dim('If needed')
      if (p) {
        console.log(`    ${priority.padEnd(20)} ${green(String(num).padStart(2))}  ${p.name}`)
      }
    })
    console.log()
  }
}

function cmdSearch(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1)

  const scored = patterns.map(p => {
    let score = 0
    for (const term of terms) {
      if (p.name.toLowerCase().includes(term)) score += 10
      if (p.problem.toLowerCase().includes(term)) score += 5
      if (p.solution.toLowerCase().includes(term)) score += 3
      if (p.keywords.some(k => k.includes(term))) score += 1
    }
    return { ...p, score }
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 10)

  // Also search principles
  const scoredPrinciples = principles.map(p => {
    let score = 0
    for (const term of terms) {
      if (p.name.toLowerCase().includes(term)) score += 10
      if (p.summary.toLowerCase().includes(term)) score += 5
      if (p.keywords.some(k => k.includes(term))) score += 1
    }
    return { ...p, score }
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 5)

  if (scored.length === 0 && scoredPrinciples.length === 0) {
    console.log(yellow(`\nNo results for "${query}". Try broader terms.\n`))
    return
  }

  if (scored.length > 0) {
    console.log(bold(`\n  Engineering Patterns matching "${query}":\n`))
    scored.forEach((p, i) => {
      console.log(`  ${dim(`${i + 1}.`)} ${green(String(p.number).padStart(2))}  ${bold(p.name)}`)
      if (p.problem) console.log(`      ${dim(p.problem.split('\n')[0].slice(0, 80))}`)
    })
  }

  if (scoredPrinciples.length > 0) {
    console.log(bold(`\n  Design Principles matching "${query}":\n`))
    scoredPrinciples.forEach((p, i) => {
      console.log(`  ${dim(`${i + 1}.`)} ${magenta(`P${p.number}`)}  ${bold(p.name)}`)
      if (p.summary) console.log(`      ${dim(p.summary.slice(0, 80))}`)
    })
  }
  console.log()
}

function cmdPattern(num) {
  const p = patternsJson.find(x => x.pattern === num)
  if (!p) {
    console.log(red(`\nPattern ${num} not found. Valid range: 1-78.\n`))
    return
  }
  console.log(`\n${p.content}\n`)
}

function cmdPrinciple(num) {
  const p = designJson.find(x => x.type === 'principle' && x.number === num)
  if (!p) {
    console.log(red(`\nPrinciple ${num} not found. Valid range: 1-17.\n`))
    return
  }
  console.log(`\n${p.content}\n`)
}

function cmdUxPattern(num) {
  const p = designJson.find(x => x.type === 'ux-pattern' && x.number === num)
  if (!p) {
    console.log(red(`\nUX Pattern ${num} not found. Valid range: 1-7.\n`))
    return
  }
  console.log(`\n${p.content}\n`)
}

function cmdList(part) {
  let filtered = patterns
  if (part) {
    const lower = part.toLowerCase()
    filtered = patterns.filter(p => p.part.toLowerCase().includes(lower) || p.name.toLowerCase().includes(lower))
  }

  if (filtered.length === 0) {
    console.log(yellow(`\nNo patterns matching "${part}".\n`))
    return
  }

  console.log(bold(`\n  ${filtered.length} patterns${part ? ` matching "${part}"` : ''}:\n`))
  filtered.forEach(p => {
    console.log(`  ${green(String(p.number).padStart(2))}  ${p.name}`)
  })
  console.log()
}

function cmdRelations(num) {
  const entityId = `pattern-${num}`
  const rels = getRelationsFor(entityId)

  if (rels.length === 0) {
    console.log(yellow(`\nNo relations found for pattern ${num}.\n`))
    return
  }

  const p = patternsByNumber[num]
  console.log(bold(`\n  Relations for Pattern ${num}: ${p ? p.name : 'Unknown'}`))
  console.log(dim(`  ${rels.length} connections\n`))

  const typeColors = {
    requires: red,
    enhances: green,
    alternative: yellow,
    extends: cyan,
    prerequisite: magenta,
    conflicts: red,
  }

  for (const rel of rels) {
    const color = typeColors[rel.type] || dim
    const otherEntity = rel.from === entityId ? rel.to : rel.from
    const otherNum = parseInt(otherEntity.split('-')[1])
    const otherPattern = patternsByNumber[otherNum]
    const direction = rel.from === entityId ? '→' : '←'

    console.log(`  ${direction} ${color(rel.type.padEnd(14))} ${green(String(otherNum).padStart(2))}  ${otherPattern ? otherPattern.name : otherEntity}`)
    if (rel.reason) console.log(`    ${dim(rel.reason)}`)
  }
  console.log()
}

function cmdDesign(description) {
  console.log(bold(`\n  Design Recommendation for: "${description}"\n`))

  const tasks = detectHumanTasks(description)
  if (tasks.length > 0) {
    console.log(bold('  Human Tasks Involved:'))
    for (const key of tasks) {
      const task = humanTasks[key]
      if (task) console.log(`    ${cyan(task.phase.padEnd(12))} ${task.name} ${dim(`→ ${task.uxPattern || '—'}`)}`)
    }
    console.log()
  }

  const cons = detectConstraints(description)
  if (cons.length > 0) {
    console.log(bold('  Applicable Constraints:'))
    for (const key of cons) {
      const c = constraints[key]
      if (c) console.log(`    ${yellow(c.categoryLabel.padEnd(22))} ${c.name}`)
    }
    console.log()
  }

  // Collect unique principles
  const principleSet = new Set()
  for (const key of tasks) {
    const task = humanTasks[key]
    if (task) task.principles.forEach(p => principleSet.add(p))
  }
  for (const key of cons) {
    const c = constraints[key]
    if (c) c.principles.forEach(p => principleSet.add(p))
  }

  if (principleSet.size > 0) {
    console.log(bold('  Design Principles:'))
    for (const num of [...principleSet].sort((a, b) => a - b)) {
      const p = principlesByNumber[num]
      if (p) console.log(`    ${magenta(`P${num}`.padEnd(4))} ${p.name}`)
    }
    console.log()
  }

  // Engineering recommendation
  const projectType = detectProjectType(description)
  if (projectType) {
    const blueprint = projectBlueprints[projectType]
    console.log(bold(`  Engineering Patterns (${blueprint.name}):`))
    const phase = blueprint.phases[0]
    console.log(dim(`  Phase 1: ${phase.why}`))
    for (const num of phase.patterns) {
      const p = patternsByNumber[num]
      if (p) console.log(`    ${green(String(num).padStart(2))}  ${p.name}`)
    }
    console.log()
  }

  if (tasks.length === 0 && cons.length === 0 && !projectType) {
    console.log(yellow('  No matches. Try being more specific about what users do and what constraints apply.\n'))
  }
}

function cmdStats() {
  console.log(bold('\n  AI Agent Patterns Playbook — Stats\n'))
  console.log(`  ${green(String(patterns.length).padStart(4))}  Engineering patterns`)
  console.log(`  ${green(String(principles.length).padStart(4))}  Design principles`)
  console.log(`  ${green(String(uxPatterns.length).padStart(4))}  UX patterns`)
  console.log(`  ${green(String(Object.keys(humanTasks).length).padStart(4))}  Human tasks`)
  console.log(`  ${green(String(Object.keys(constraints).length).padStart(4))}  Constraints`)
  console.log(`  ${green(String(allRelations.length).padStart(4))}  Typed relations`)
  console.log(`  ${green(String(Object.keys(projectBlueprints).length).padStart(4))}  Project blueprints`)
  console.log(`  ${green(String(Object.keys(problemDiagnoses).length).padStart(4))}  Problem diagnoses`)
  console.log(`  ${green(String(autonomyLevels.length).padStart(4))}  Autonomy levels`)
  console.log()
}

function cmdHelp() {
  console.log(`
${bold('  AI Agent Patterns Playbook CLI')}

${bold('  Usage:')}

    ${green('ai-playbook recommend')} ${dim('"a customer support chatbot"')}     Get phased pattern plan
    ${green('ai-playbook diagnose')}  ${dim('"too slow, forgets context"')}      Get fixes for problems
    ${green('ai-playbook search')}    ${dim('"memory"')}                         Search patterns + principles
    ${green('ai-playbook pattern')}   ${dim('44')}                               Read full pattern content
    ${green('ai-playbook principle')} ${dim('3')}                                Read full design principle
    ${green('ai-playbook ux-pattern')} ${dim('1')}                              Read full UX pattern
    ${green('ai-playbook list')}      ${dim('[part]')}                           List patterns, filter by part
    ${green('ai-playbook relations')} ${dim('44')}                               See pattern connections
    ${green('ai-playbook design')}    ${dim('"scheduling agent"')}               Unified design recommendation
    ${green('ai-playbook stats')}                                        Project statistics
    ${green('ai-playbook help')}                                         This help message

${bold('  Options:')}

    ${dim('--level=beginner|intermediate|advanced')}    Control phases shown (recommend)

${bold('  Examples:')}

    ai-playbook recommend "a RAG app for legal docs" --level=advanced
    ai-playbook diagnose "agent hallucinates and is too expensive"
    ai-playbook search "multi-agent orchestration"
    ai-playbook design "code review bot with human approval"
    ai-playbook relations 9
`)
}

// ── Main ──

const args = process.argv.slice(2)
const command = args[0]
const rest = args.slice(1).filter(a => !a.startsWith('--'))
const flags = Object.fromEntries(
  args.filter(a => a.startsWith('--')).map(a => {
    const [k, v] = a.slice(2).split('=')
    return [k, v || true]
  })
)

switch (command) {
  case 'recommend':
    cmdRecommend(rest.join(' '), flags.level || 'beginner')
    break
  case 'diagnose':
    cmdDiagnose(rest.join(' '))
    break
  case 'search':
    cmdSearch(rest.join(' '))
    break
  case 'pattern':
    cmdPattern(parseInt(rest[0]))
    break
  case 'principle':
    cmdPrinciple(parseInt(rest[0]))
    break
  case 'ux-pattern':
    cmdUxPattern(parseInt(rest[0]))
    break
  case 'list':
    cmdList(rest.join(' ') || null)
    break
  case 'relations':
    cmdRelations(parseInt(rest[0]))
    break
  case 'design':
    cmdDesign(rest.join(' '))
    break
  case 'stats':
    cmdStats()
    break
  case 'help':
  case '--help':
  case '-h':
    cmdHelp()
    break
  default:
    if (!command) {
      cmdHelp()
    } else {
      console.log(red(`\n  Unknown command: ${command}`))
      cmdHelp()
    }
}
