// Capability: Transcription & Translation
// Category: Language

export const transcriptionTranslation = {
  id: 'capability-transcription-translation',
  key: 'transcription-translation',
  name: 'Transcription & Translation',
  aka: ['Speech-to-Text', 'Machine Translation', 'Captioning', 'Localization'],
  category: 'Language',
  whatItsGoodFor:
    'Converting speech to text and text between languages at scale — captions, meeting transcripts, multilingual support, accessibility.',
  whenNotToUse:
    'When a mistranslation or mistranscription carries legal, medical, or safety weight without human verification, or for low-resource languages or heavy jargon where quality drops sharply.',
  dataRequirements:
    'Reasonable audio quality for transcription; awareness that quality varies by language, accent, and domain — the same pipeline is not equally good everywhere.',
  failureModes: [
    'Quality varies sharply by language, accent, and jargon, often silently',
    'Confident output on garbled audio, inventing words that were never said',
    'Cultural or contextual nuance lost in translation with no flag',
  ],
  failureModeKeys: ['fabricates facts'],
  patterns: [19, 7], // schema compatibility layers, context compaction
  principles: [6, 10], // adaptive interfaces across modalities, communicate limitations
  uxPatterns: ['P3'], // explainable rationale
  keywords: ['transcribe', 'translate', 'captions', 'subtitles', 'speech to text', 'localize', 'dictation', 'multilingual'],
  example:
    'A captioning tool marks low-confidence spans in a transcript and offers a one-tap "verify this section", rather than presenting every word as certain.',
}
