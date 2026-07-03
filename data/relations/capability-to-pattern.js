// Capability-to-Pattern Relations
// Each capability is implemented by one or more engineering patterns.
// Seeded from the `patterns[]` array on each capability in data/capabilities/.
// Direction: pattern → capability (the pattern implements the capability).

export const capabilityToPattern = [
  // semantic-search — semantic recall + the RAG family
  { from: 'pattern-24', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-30', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-31', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-32', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-33', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-34', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },
  { from: 'pattern-35', to: 'capability-semantic-search', type: 'implements', strength: 'moderate', source: 'capability:semantic-search' },

  // classification
  { from: 'pattern-49', to: 'capability-classification', type: 'implements', strength: 'moderate', source: 'capability:classification' },
  { from: 'pattern-13', to: 'capability-classification', type: 'implements', strength: 'moderate', source: 'capability:classification' },

  // clustering
  { from: 'pattern-24', to: 'capability-clustering', type: 'implements', strength: 'moderate', source: 'capability:clustering' },
  { from: 'pattern-34', to: 'capability-clustering', type: 'implements', strength: 'moderate', source: 'capability:clustering' },

  // anomaly-detection
  { from: 'pattern-20', to: 'capability-anomaly-detection', type: 'implements', strength: 'moderate', source: 'capability:anomaly-detection' },
  { from: 'pattern-50', to: 'capability-anomaly-detection', type: 'implements', strength: 'moderate', source: 'capability:anomaly-detection' },
  { from: 'pattern-13', to: 'capability-anomaly-detection', type: 'implements', strength: 'moderate', source: 'capability:anomaly-detection' },

  // summarization
  { from: 'pattern-7', to: 'capability-summarization', type: 'implements', strength: 'moderate', source: 'capability:summarization' },
  { from: 'pattern-31', to: 'capability-summarization', type: 'implements', strength: 'moderate', source: 'capability:summarization' },
  { from: 'pattern-13', to: 'capability-summarization', type: 'implements', strength: 'moderate', source: 'capability:summarization' },

  // extraction
  { from: 'pattern-49', to: 'capability-extraction', type: 'implements', strength: 'moderate', source: 'capability:extraction' },
  { from: 'pattern-17', to: 'capability-extraction', type: 'implements', strength: 'moderate', source: 'capability:extraction' },

  // generation
  { from: 'pattern-12', to: 'capability-generation', type: 'implements', strength: 'moderate', source: 'capability:generation' },
  { from: 'pattern-13', to: 'capability-generation', type: 'implements', strength: 'moderate', source: 'capability:generation' },

  // reasoning-planning
  { from: 'pattern-11', to: 'capability-reasoning-planning', type: 'implements', strength: 'moderate', source: 'capability:reasoning-planning' },
  { from: 'pattern-14', to: 'capability-reasoning-planning', type: 'implements', strength: 'moderate', source: 'capability:reasoning-planning' },
  { from: 'pattern-10', to: 'capability-reasoning-planning', type: 'implements', strength: 'moderate', source: 'capability:reasoning-planning' },
  { from: 'pattern-16', to: 'capability-reasoning-planning', type: 'implements', strength: 'moderate', source: 'capability:reasoning-planning' },

  // transcription-translation
  { from: 'pattern-19', to: 'capability-transcription-translation', type: 'implements', strength: 'moderate', source: 'capability:transcription-translation' },
  { from: 'pattern-7', to: 'capability-transcription-translation', type: 'implements', strength: 'moderate', source: 'capability:transcription-translation' },

  // language-modeling
  { from: 'pattern-6', to: 'capability-language-modeling', type: 'implements', strength: 'moderate', source: 'capability:language-modeling' },
  { from: 'pattern-9', to: 'capability-language-modeling', type: 'implements', strength: 'moderate', source: 'capability:language-modeling' },
]
