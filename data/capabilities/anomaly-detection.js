// Capability: Anomaly Detection
// Category: Analysis

export const anomalyDetection = {
  id: 'capability-anomaly-detection',
  key: 'anomaly-detection',
  name: 'Anomaly Detection',
  aka: ['Outlier Detection', 'Novelty Detection'],
  category: 'Analysis',
  whatItsGoodFor:
    'Surfacing data points that sit outside normal patterns at a scale humans cannot review — fraud, error, disease, abuse signals.',
  whenNotToUse:
    'When "normal" is undefined or shifts constantly, or when a false flag is more costly than a miss and no human review is in the loop.',
  dataRequirements:
    'Enough representative "normal" history to learn a baseline; drift monitoring so the baseline stays current.',
  failureModes: [
    'False positives erode trust when flags are unexplained',
    'Opaque scoring — users cannot tell why something was flagged',
    'Baseline drift silently degrades accuracy over time',
  ],
  // Machine-linkable subset of failureModes → uxDiagnoses keys (diagnose_ux).
  failureModeKeys: ['reproduces bias', 'inconsistent results'],
  patterns: [20, 50, 13], // human-in-loop suspend, guardrails, verified correction
  principles: [10, 13], // communicate limitations, make accountability visible
  uxPatterns: ['P1', 'P4', 'P6'], // intent preview, confidence signal, escalation
  keywords: ['fraud', 'outlier', 'flag', 'unusual', 'detection', 'risk', 'suspicious', 'abnormal'],
  example:
    'A payments dashboard flags a transaction as unusual, shows the top factors that drove the score, and routes it to a human queue rather than auto-blocking.',
}
