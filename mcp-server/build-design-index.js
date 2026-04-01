#!/usr/bin/env node

/**
 * Parses AI_DESIGN_PRINCIPLES.md into a structured JSON index.
 * Each entry gets: type (principle/pattern/section), number, name, theme, content, line range.
 * Run once after updating the design principles: `node build-design-index.js`
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOC_PATH = join(__dirname, '..', 'AI_DESIGN_PRINCIPLES.md')
const INDEX_PATH = join(__dirname, 'design-principles.json')

function parseDesignPrinciples() {
  const content = readFileSync(DOC_PATH, 'utf-8')
  const lines = content.split('\n')

  const entries = []
  let currentTheme = ''
  let currentEntry = null
  let entryLines = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Track theme headers: "### Theme 1: Human Capabilities, Cognition, and Meaning"
    const themeMatch = line.match(/^### (Theme \d+:.+)$/)
    if (themeMatch) {
      currentTheme = themeMatch[1].trim()
      continue
    }

    // Match top-level sections: "## Framing: Quality Is Downstream of Intent"
    // "## The Agentic Autonomy Taxonomy"
    // "## Part A: Strategic Design Principles"
    // "## Part B: UX Patterns for Agentic Systems"
    // "## Part C: Governance, Rollout, and Metrics"
    const sectionMatch = line.match(/^## ((?:Framing|The Agentic|Part [ABC]|Cross-Reference|Supplementary|Sources).+)$/)
    if (sectionMatch) {
      if (currentEntry) {
        currentEntry.content = entryLines.join('\n').trim()
        currentEntry.endLine = i
        entries.push(currentEntry)
      }

      currentEntry = {
        type: 'section',
        id: slugify(sectionMatch[1]),
        name: sectionMatch[1].trim(),
        theme: '',
        number: null,
        startLine: i + 1,
        endLine: null,
        summary: '',
        keywords: [],
        content: '',
      }
      entryLines = [line]
      currentTheme = ''
      continue
    }

    // Match principles: "#### Principle 1: Preserve Struggle When Delegation Is Effortless"
    const principleMatch = line.match(/^#### Principle (\d+):\s+(.+)$/)
    if (principleMatch) {
      if (currentEntry) {
        currentEntry.content = entryLines.join('\n').trim()
        currentEntry.endLine = i
        entries.push(currentEntry)
      }

      currentEntry = {
        type: 'principle',
        id: `principle-${principleMatch[1]}`,
        name: principleMatch[2].trim(),
        theme: currentTheme,
        number: parseInt(principleMatch[1]),
        startLine: i + 1,
        endLine: null,
        summary: '',
        keywords: [],
        content: '',
      }
      entryLines = [line]
      continue
    }

    // Match UX patterns: "#### P1. Intent Preview (Plan Summary)"
    const patternMatch = line.match(/^#### P(\d+)\.\s+(.+)$/)
    if (patternMatch) {
      if (currentEntry) {
        currentEntry.content = entryLines.join('\n').trim()
        currentEntry.endLine = i
        entries.push(currentEntry)
      }

      currentEntry = {
        type: 'ux-pattern',
        id: `ux-pattern-${patternMatch[1]}`,
        name: patternMatch[2].trim(),
        theme: 'UX Patterns',
        number: parseInt(patternMatch[1]),
        startLine: i + 1,
        endLine: null,
        summary: '',
        keywords: [],
        content: '',
      }
      entryLines = [line]
      continue
    }

    // Match lifecycle/governance subsections: "### Pre-Action: Establishing Intent"
    // "### Agentic AI Ethics Council", "### Phased Implementation Roadmap", "### Metrics Framework"
    // "### Anti-Pattern: Agentic Sludge"
    const subMatch = line.match(/^### ((?:Pre-Action|In-Action|Post-Action|Repair|Anti-Pattern|Lifecycle|Agentic AI Ethics|Phased Implementation|Metrics Framework|Constraint Taxonomy|Human Task Vocabulary|AI Tasks by|Level \d).*)$/)
    if (subMatch) {
      if (currentEntry) {
        currentEntry.content = entryLines.join('\n').trim()
        currentEntry.endLine = i
        entries.push(currentEntry)
      }

      const name = subMatch[1].trim()
      const isAntiPattern = name.startsWith('Anti-Pattern')
      const isGovernance = name.startsWith('Agentic AI Ethics') || name.startsWith('Phased Implementation') || name.startsWith('Metrics Framework') || name.startsWith('Constraint Taxonomy')
      const isVocabulary = name.startsWith('Human Task Vocabulary') || name.startsWith('AI Tasks by')
      const isTaxonomy = name.startsWith('Level')

      currentEntry = {
        type: isAntiPattern ? 'anti-pattern' : isVocabulary ? 'vocabulary' : isGovernance ? 'governance' : isTaxonomy ? 'taxonomy-level' : 'lifecycle',
        id: slugify(name),
        name,
        theme: isGovernance ? 'Governance' : isTaxonomy ? 'Autonomy Taxonomy' : 'UX Patterns',
        number: null,
        startLine: i + 1,
        endLine: null,
        summary: '',
        keywords: [],
        content: '',
      }
      entryLines = [line]
      continue
    }

    if (currentEntry) {
      entryLines.push(line)

      // Extract summary from **Problem:** or **What it does:** lines
      if (line.startsWith('**Problem:') || line.startsWith('**What it does:**')) {
        currentEntry.summary = line.replace(/^\*\*(?:Problem|What it does):\*\*\s*/, '').trim()
      }
      // Also try "**What it is:**"
      if (line.startsWith('**What it is:**')) {
        currentEntry.summary = line.replace(/^\*\*What it is:\*\*\s*/, '').trim()
      }
    }
  }

  // Save last entry
  if (currentEntry) {
    currentEntry.content = entryLines.join('\n').trim()
    currentEntry.endLine = lines.length
    entries.push(currentEntry)
  }

  // Extract summaries from content for entries that don't have explicit Problem/What lines
  for (const entry of entries) {
    if (!entry.summary && entry.content) {
      // Look for **Problem:** in content
      const problemMatch = entry.content.match(/\*\*Problem:\*\*\s*(.+?)(?:\n|$)/)
      if (problemMatch) {
        entry.summary = problemMatch[1].trim()
      } else {
        // Use first non-header, non-empty line
        const contentLines = entry.content.split('\n')
        for (const cl of contentLines) {
          if (cl && !cl.startsWith('#') && !cl.startsWith('**') && !cl.startsWith('>') && !cl.startsWith('---') && !cl.startsWith('|') && cl.trim().length > 20) {
            entry.summary = cl.trim().slice(0, 200)
            break
          }
        }
      }
    }
  }

  // Build keyword index
  for (const entry of entries) {
    const text = `${entry.name} ${entry.summary} ${entry.theme}`.toLowerCase()
    entry.keywords = [...new Set(
      text
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3)
    )]
  }

  return entries
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const entries = parseDesignPrinciples()
writeFileSync(INDEX_PATH, JSON.stringify(entries, null, 2))
console.log(`Indexed ${entries.length} entries → ${INDEX_PATH}`)

const principles = entries.filter(e => e.type === 'principle')
const uxPatterns = entries.filter(e => e.type === 'ux-pattern')
const sections = entries.filter(e => e.type === 'section')
const governance = entries.filter(e => e.type === 'governance')
const antiPatterns = entries.filter(e => e.type === 'anti-pattern')
const taxonomy = entries.filter(e => e.type === 'taxonomy-level')
const lifecycle = entries.filter(e => e.type === 'lifecycle')
const vocabulary = entries.filter(e => e.type === 'vocabulary')

console.log(`  ${principles.length} design principles`)
console.log(`  ${uxPatterns.length} UX patterns`)
console.log(`  ${sections.length} top-level sections`)
console.log(`  ${governance.length} governance entries`)
console.log(`  ${vocabulary.length} vocabulary entries`)
console.log(`  ${antiPatterns.length} anti-patterns`)
console.log(`  ${taxonomy.length} taxonomy levels`)
console.log(`  ${lifecycle.length} lifecycle phases`)
