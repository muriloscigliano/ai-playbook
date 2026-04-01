#!/usr/bin/env node

/**
 * Parses AI_AGENT_PATTERNS_PLAYBOOK.md into a structured JSON index.
 * Each pattern gets: number, name, part, problem, solution, full content, line range.
 * Run once after updating the playbook: `node build-index.js`
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PLAYBOOK_PATH = join(__dirname, '..', 'AI_AGENT_PATTERNS_PLAYBOOK.md')
const INDEX_PATH = join(__dirname, 'patterns.json')

function parsePlaybook() {
  const content = readFileSync(PLAYBOOK_PATH, 'utf-8')
  const lines = content.split('\n')

  // Build section-to-part mapping from TOC
  // TOC entries like: "### Part V: Memory System" followed by numbered items
  const sectionToPart = {}
  let tocPart = ''
  for (const line of lines) {
    const tocPartMatch = line.match(/^### (Part [IVXLC]+:.*?)$/)
    if (tocPartMatch) {
      tocPart = tocPartMatch[1].trim()
      continue
    }
    // TOC entries: "24. [Pattern 23: Working Memory..."
    const tocEntry = line.match(/^(\d+)\.\s+\[/)
    if (tocEntry && tocPart) {
      sectionToPart[parseInt(tocEntry[1])] = tocPart
    }
    // Stop at end of TOC
    if (line === '---' && tocPart) break
  }

  const patterns = []
  let currentPart = ''
  let currentPattern = null
  let patternLines = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Track Part headers (body-level # headers for Parts XIII+)
    const partMatch = line.match(/^# (Part [IVXLC]+:.*?)$/)
    if (partMatch) {
      currentPart = partMatch[1].trim()
      continue
    }

    // Match pattern headers: "## 64. Pattern 63: Deferred Tool Loading (Lazy Schema Resolution)"
    // Also match: "## 10. Pattern 9: ReAct Loop (Reason + Act)"
    // Also match: "## 1. Core Principles"
    const patternMatch = line.match(/^## (\d+)\.\s+(?:Pattern (\d+):\s+)?(.+)$/)
    if (patternMatch) {
      // Save previous pattern
      if (currentPattern) {
        currentPattern.content = patternLines.join('\n').trim()
        currentPattern.endLine = i
        patterns.push(currentPattern)
      }

      const sectionNum = parseInt(patternMatch[1])
      const patternNum = patternMatch[2] ? parseInt(patternMatch[2]) : null
      const name = patternMatch[3].trim()

      currentPattern = {
        section: sectionNum,
        pattern: patternNum,
        name,
        part: sectionToPart[sectionNum] || currentPart || 'Reference',
        startLine: i + 1,
        endLine: null,
        problem: '',
        solution: '',
        keywords: [],
        content: '',
      }
      patternLines = [line]
      continue
    }

    if (currentPattern) {
      patternLines.push(line)

      // Extract problem
      if (line === '### Problem') {
        const problemLines = []
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('### ') || lines[j].startsWith('## ')) break
          problemLines.push(lines[j])
        }
        currentPattern.problem = problemLines.join('\n').trim()
      }

      // Extract solution
      if (line === '### Solution') {
        const solutionLines = []
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('### ') || lines[j].startsWith('## ')) break
          solutionLines.push(lines[j])
        }
        currentPattern.solution = solutionLines.join('\n').trim()
      }
    }
  }

  // Save last pattern
  if (currentPattern) {
    currentPattern.content = patternLines.join('\n').trim()
    currentPattern.endLine = lines.length
    patterns.push(currentPattern)
  }

  // Build keyword index from name + problem + solution
  for (const p of patterns) {
    const text = `${p.name} ${p.problem} ${p.solution}`.toLowerCase()
    p.keywords = [...new Set(
      text
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3)
    )]
  }

  return patterns
}

const patterns = parsePlaybook()
writeFileSync(INDEX_PATH, JSON.stringify(patterns, null, 2))
console.log(`Indexed ${patterns.length} patterns → ${INDEX_PATH}`)

// Print summary
const withPatternNum = patterns.filter(p => p.pattern !== null)
const sections = patterns.filter(p => p.pattern === null)
console.log(`  ${withPatternNum.length} patterns (numbered)`)
console.log(`  ${sections.length} reference sections (Core Principles, Implementation Status, etc.)`)
