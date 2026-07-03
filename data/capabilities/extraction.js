// Capability: Extraction
// Category: Generation

export const extraction = {
  id: 'capability-extraction',
  key: 'extraction',
  name: 'Structured Extraction',
  aka: ['Information Extraction', 'Parsing', 'Field Extraction', 'Entity Extraction'],
  category: 'Generation',
  whatItsGoodFor:
    'Pulling structured fields out of unstructured content — dates, amounts, names, line items — turning documents, emails, or transcripts into records a system can act on.',
  whenNotToUse:
    'When the source format is already structured and reliable (parse it directly), or when a wrong field silently entering a system of record could cause harm without a review step.',
  dataRequirements:
    'A well-specified output schema; representative examples of the messy inputs; a validation step so malformed or low-confidence extractions are caught, not stored.',
  failureModes: [
    'Invents a plausible value for a field that is missing from the source',
    'Silently mis-maps a value into the wrong field',
    'Extraction quality varies run to run without a confidence signal',
  ],
  failureModeKeys: ['fabricates facts', 'inconsistent results'],
  patterns: [49, 17], // structured outputs, tool-registry validation pipeline
  principles: [10], // communicate limitations
  uxPatterns: ['P1', 'P5'], // intent preview, action audit & undo
  keywords: ['extract', 'parse', 'pull fields', 'fields', 'structured', 'entities', 'form', 'ocr', 'capture'],
  example:
    'An invoice tool extracts vendor, date, and total into an editable form, highlights each value in the source document, and requires a human glance before it posts.',
}
