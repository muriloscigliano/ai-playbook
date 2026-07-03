// Index of AI capability entities — what AI is good at, and which primitive to reach for.
// Hand-authored (not generated). One file per capability.

import { semanticSearch } from './semantic-search.js'
import { classification } from './classification.js'
import { clustering } from './clustering.js'
import { anomalyDetection } from './anomaly-detection.js'
import { summarization } from './summarization.js'
import { extraction } from './extraction.js'
import { generation } from './generation.js'
import { reasoningPlanning } from './reasoning-planning.js'
import { transcriptionTranslation } from './transcription-translation.js'
import { languageModeling } from './language-modeling.js'

export {
  semanticSearch,
  classification,
  clustering,
  anomalyDetection,
  summarization,
  extraction,
  generation,
  reasoningPlanning,
  transcriptionTranslation,
  languageModeling,
}

export const capabilities = [
  semanticSearch,
  classification,
  clustering,
  anomalyDetection,
  summarization,
  extraction,
  generation,
  reasoningPlanning,
  transcriptionTranslation,
  languageModeling,
]

export const capabilitiesByKey = Object.fromEntries(capabilities.map((c) => [c.key, c]))
