// Capability: Clustering
// Category: Analysis

export const clustering = {
  id: 'capability-clustering',
  key: 'clustering',
  name: 'Clustering',
  aka: ['Grouping', 'Segmentation', 'Unsupervised Grouping'],
  category: 'Analysis',
  whatItsGoodFor:
    'Discovering natural groupings in data when you do not yet know the categories — segmenting customers, grouping documents by theme, finding structure in a pile of unlabelled content.',
  whenNotToUse:
    'When you already know the categories you want (use classification), or when groups need to be stable and explainable to stakeholders — cluster boundaries can be fuzzy and shift with the data.',
  dataRequirements:
    'A meaningful similarity signal (often embeddings) and enough volume for groups to emerge; a way to interpret and name the resulting clusters, since the machine only produces the grouping, not the meaning.',
  failureModes: [
    'Clusters are machine-defined and may not map to categories humans find meaningful',
    'Results shift as data or parameters change, making groupings hard to trust over time',
    'A tidy grouping can imply structure that is really an artifact of the embedding',
  ],
  failureModeKeys: ['inconsistent results'],
  patterns: [24, 34], // semantic recall, GraphRAG (relationship structure)
  principles: [3, 10], // transparent thinking partner, communicate limitations
  uxPatterns: ['P3'], // explainable rationale
  keywords: ['cluster', 'group', 'segment', 'organize', 'themes', 'discover', 'unlabelled', 'similar groups'],
  example:
    'A research tool groups thousands of survey responses into themes, labels each group with representative quotes, and lets the analyst rename or merge groups that do not fit.',
}
