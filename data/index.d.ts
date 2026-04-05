// Type definitions for @muriloscigliano/ai-playbook

// ── Core Entity Types ──

export interface Pattern {
  id: string
  number: number
  name: string
  slug: string
  part: string
  problem: string
  solution: string
  keywords: string[]
}

export interface Principle {
  id: string
  number: number
  name: string
  slug: string
  theme: string
  summary: string
  keywords: string[]
}

export interface UxPattern {
  id: string
  number: number
  code: string
  name: string
  slug: string
  lifecyclePhase: string
  summary: string
  keywords: string[]
}

// ── Vocabulary Types ──

export interface HumanTask {
  id: string
  key: string
  name: string
  phase: 'Pre-Action' | 'In-Action' | 'Post-Action'
  uxPattern: string | null
  principles: number[]
  patterns: number[]
  keywords: string[]
  description: string
}

export interface Constraint {
  id: string
  key: string
  name: string
  category: string
  categoryLabel: string
  principles: number[]
  patterns: number[]
  keywords: string[]
  description: string
}

export interface ConstraintCategory {
  id: string
  name: string
  constraints: string[]
}

export interface Touchpoint {
  id: string
  name: string
  category: string
  designImplications: string
  primaryPrinciple: string
}

export interface AiTask {
  id: string
  name: string
  defaultLevel: string
  rationale: string
}

// ── Taxonomy Types ──

export interface AutonomyLevel {
  id: string
  level: number
  name: string
  agentRole: string
  humanRole: string
  actionAuthority: string
  risk: string
  applicablePatterns: string[]
}

// ── Recommendation Types ──

export interface ProjectBlueprint {
  name: string
  phases: Array<{
    name: string
    patterns: number[]
    why: string
  }>
}

export interface ProblemDiagnosis {
  title: string
  patterns: number[]
  explanation: string
}

// ── Relation Types ──

export interface Relation {
  from: string
  to: string
  type: 'requires' | 'enhances' | 'alternative' | 'extends' | 'implements' | 'conflicts' | 'measured_by'
  strength: 'strong' | 'moderate' | 'weak'
  reason: string
}

// ── Patterns ──

export declare const patterns: Pattern[]
export declare const patternsByNumber: Record<number, Pattern>
export declare const patternsBySlug: Record<string, Pattern>

// ── Principles ──

export declare const principles: Principle[]
export declare const principlesByNumber: Record<number, Principle>
export declare const principlesBySlug: Record<string, Principle>

// ── UX Patterns ──

export declare const uxPatterns: UxPattern[]
export declare const uxPatternsByNumber: Record<number, UxPattern>
export declare const uxPatternsBySlug: Record<string, UxPattern>

// ── Vocabulary ──

export declare const humanTasks: Record<string, HumanTask>
export declare const taskKeywords: Record<string, string[]>
export declare const constraints: Record<string, Constraint>
export declare const constraintCategories: Record<string, ConstraintCategory>
export declare const constraintKeywords: Record<string, string[]>
export declare const touchpoints: Touchpoint[]
export declare const aiTasks: AiTask[]

// ── Taxonomy ──

export declare const autonomyLevels: AutonomyLevel[]

// ── Recommendations ──

export declare const projectBlueprints: Record<string, ProjectBlueprint>
export declare const projectKeywords: Record<string, string[]>
export declare const problemDiagnoses: Record<string, ProblemDiagnosis>
export declare const problemKeywords: Record<string, string[]>

// ── Relations ──

export declare const allRelations: Relation[]
export declare const patternToPattern: Relation[]
export declare const patternToPrinciple: Relation[]
export declare const principleToUxPattern: Relation[]
export declare function getRelationsFor(entityId: string): Relation[]
export declare function getRelatedIds(entityId: string, type?: string): string[]

// ── Helpers ──

export declare function detectProjectType(description: string): string | null
export declare function detectProblems(description: string): string[]
export declare function detectHumanTasks(description: string): string[]
export declare function detectConstraints(description: string): string[]
