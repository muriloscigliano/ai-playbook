// Capability Keywords — maps natural task phrasing to capability keys.
// Mirrors problem-keywords.js. Used by detectCapabilities() for recommend_capability.

export const capabilityKeywords = {
  'semantic-search': ['find similar', 'similar to', 'like this', 'search', 'retrieve', 'recommend', 'related', 'nearest', 'match', 'look up', 'find products', 'find images', 'find documents'],
  'classification': ['classify', 'categorize', 'categorise', 'label', 'tag', 'route', 'sort into', 'triage', 'sentiment', 'moderate', 'is this a', 'which category', 'bucket'],
  'clustering': ['group these', 'group them', 'cluster', 'segment', 'organize', 'organise', 'find themes', 'discover groups', 'natural groups', 'partition', 'group similar'],
  'anomaly-detection': ['flag', 'suspicious', 'unusual', 'outlier', 'anomaly', 'weird', 'abnormal', 'fraud', 'detect problems', 'spot the odd', 'find the strange'],
  'summarization': ['summarize', 'summarise', 'summary', 'tldr', 'tl;dr', 'condense', 'recap', 'digest', 'shorten', 'key points', 'brief me'],
  'extraction': ['extract', 'pull out', 'pull fields', 'parse', 'get the fields', 'structured data from', 'entities from', 'capture fields', 'read the invoice', 'ocr'],
  'generation': ['generate', 'write', 'draft', 'create content', 'compose', 'author', 'produce', 'brainstorm', 'come up with', 'make a', 'suggest copy'],
  'reasoning-planning': ['plan', 'figure out', 'decompose', 'break down', 'multi-step', 'strategy', 'work out how', 'reason about', 'orchestrate', 'sequence the steps'],
  'transcription-translation': ['transcribe', 'translate', 'captions', 'subtitles', 'speech to text', 'localize', 'localise', 'dictation', 'multilingual', 'convert audio', 'voice to text'],
  'language-modeling': ['chat', 'converse', 'answer questions', 'complete text', 'rewrite', 'talk to', 'assistant', 'natural language', 'respond to'],
}
