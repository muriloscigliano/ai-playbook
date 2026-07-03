// Main entry point — re-exports everything from all subdirectories

// Vocabulary
export {
  humanTasks,
  taskKeywords,
  constraints,
  constraintCategories,
  constraintKeywords,
  touchpoints,
  aiTasks,
} from './vocabulary/index.js'

// Recommendations
export {
  projectBlueprints,
  projectKeywords,
  problemDiagnoses,
  problemKeywords,
  uxDiagnoses,
  uxDiagnoseKeywords,
} from './recommendations/index.js'

// Taxonomy
export { autonomyLevels } from './taxonomy/autonomy-levels.js'
export { visibilityLevels } from './taxonomy/visibility-levels.js'

// Helpers
export {
  detectProjectType,
  detectProblems,
  detectUxComplaints,
  detectHumanTasks,
  detectConstraints,
} from './helpers/index.js'

// Patterns (generated)
export { patterns, patternsByNumber, patternsBySlug } from './patterns/_index.js'

// Principles (generated)
export { principles, principlesByNumber, principlesBySlug } from './principles/_index.js'

// UX Patterns (generated)
export { uxPatterns, uxPatternsByNumber, uxPatternsBySlug } from './ux-patterns/_index.js'

// Relations
export {
  patternToPattern,
  patternToPrinciple,
  principleToUxPattern,
  allRelations,
  getRelationsFor,
  getRelatedIds,
} from './relations/_index.js'
