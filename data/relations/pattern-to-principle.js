// Pattern-to-Principle Relations
// Seeded from HUMAN_TASKS and CONSTRAINTS cross-products (each has principles[] and patterns[])

export const patternToPrinciple = [
  // ── From HUMAN_TASKS: authenticate → principles [11], patterns [64] ──
  { from: 'pattern-64', to: 'principle-11', type: 'implements', source: 'human-task:authenticate' },

  // ── From HUMAN_TASKS: grant_consent → principles [11, 17], patterns [64, 70] ──
  { from: 'pattern-64', to: 'principle-11', type: 'implements', source: 'human-task:grant_consent' },
  { from: 'pattern-64', to: 'principle-17', type: 'implements', source: 'human-task:grant_consent' },
  { from: 'pattern-70', to: 'principle-11', type: 'implements', source: 'human-task:grant_consent' },
  { from: 'pattern-70', to: 'principle-17', type: 'implements', source: 'human-task:grant_consent' },

  // ── From HUMAN_TASKS: connect_integration → principles [11], patterns [64] ──
  { from: 'pattern-64', to: 'principle-11', type: 'implements', source: 'human-task:connect_integration' },

  // ── From HUMAN_TASKS: configure_system → principles [11, 12], patterns [64] ──
  { from: 'pattern-64', to: 'principle-12', type: 'implements', source: 'human-task:configure_system' },

  // ── From HUMAN_TASKS: start_process → principles [12], patterns [20] ──
  { from: 'pattern-20', to: 'principle-12', type: 'implements', source: 'human-task:start_process' },

  // ── From HUMAN_TASKS: stop_process → principles [9], patterns [20] ──
  { from: 'pattern-20', to: 'principle-9', type: 'implements', source: 'human-task:stop_process' },

  // ── From HUMAN_TASKS: review_approve → principles [12, 13], patterns [20, 44] ──
  { from: 'pattern-20', to: 'principle-12', type: 'implements', source: 'human-task:review_approve' },
  { from: 'pattern-20', to: 'principle-13', type: 'implements', source: 'human-task:review_approve' },
  { from: 'pattern-44', to: 'principle-12', type: 'implements', source: 'human-task:review_approve' },
  { from: 'pattern-44', to: 'principle-13', type: 'implements', source: 'human-task:review_approve' },

  // ── From HUMAN_TASKS: provide_feedback → principles [9, 12], patterns [53] ──
  { from: 'pattern-53', to: 'principle-9', type: 'implements', source: 'human-task:provide_feedback' },
  { from: 'pattern-53', to: 'principle-12', type: 'implements', source: 'human-task:provide_feedback' },

  // ── From HUMAN_TASKS: flag_content → principles [15], patterns [50] ──
  { from: 'pattern-50', to: 'principle-15', type: 'implements', source: 'human-task:flag_content' },

  // ── From HUMAN_TASKS: edit_content → principles [4], patterns [44] ──
  { from: 'pattern-44', to: 'principle-4', type: 'implements', source: 'human-task:edit_content' },

  // ── From HUMAN_TASKS: export_download → principles [17], patterns [76] ──
  { from: 'pattern-76', to: 'principle-17', type: 'implements', source: 'human-task:export_download' },

  // ── From CONSTRAINTS: privacy_preserving → principles [11, 17], patterns [64] ──
  { from: 'pattern-64', to: 'principle-17', type: 'implements', source: 'constraint:privacy_preserving' },

  // ── From CONSTRAINTS: human_verification → principles [13], patterns [20] ──
  { from: 'pattern-20', to: 'principle-13', type: 'implements', source: 'constraint:human_verification' },

  // ── From CONSTRAINTS: content_safety → principles [15], patterns [50, 52] ──
  { from: 'pattern-50', to: 'principle-15', type: 'implements', source: 'constraint:content_safety' },
  { from: 'pattern-52', to: 'principle-15', type: 'implements', source: 'constraint:content_safety' },

  // ── From CONSTRAINTS: audit_logging → principles [13], patterns [53] ──
  { from: 'pattern-53', to: 'principle-13', type: 'implements', source: 'constraint:audit_logging' },

  // ── From CONSTRAINTS: user_consent → principles [11], patterns [64] ──
  // (already covered above)

  // ── From CONSTRAINTS: cost_budget → principles [9], patterns [71] ──
  { from: 'pattern-71', to: 'principle-9', type: 'implements', source: 'constraint:cost_budget' },

  // ── From CONSTRAINTS: latency_budget → principles [6], patterns [65] ──
  { from: 'pattern-65', to: 'principle-6', type: 'implements', source: 'constraint:latency_budget' },

  // ── From CONSTRAINTS: confidence_threshold → principles [10], patterns [50] ──
  { from: 'pattern-50', to: 'principle-10', type: 'implements', source: 'constraint:confidence_threshold' },

  // ── From CONSTRAINTS: context_window → principles [6], patterns [7, 68] ──
  { from: 'pattern-7', to: 'principle-6', type: 'implements', source: 'constraint:context_window' },
  { from: 'pattern-68', to: 'principle-6', type: 'implements', source: 'constraint:context_window' },

  // ── From CONSTRAINTS: tone_voice → principles [5], patterns [52] ──
  { from: 'pattern-52', to: 'principle-5', type: 'implements', source: 'constraint:tone_voice' },

  // ── From CONSTRAINTS: output_format → principles [6], patterns [49] ──
  { from: 'pattern-49', to: 'principle-6', type: 'implements', source: 'constraint:output_format' },

  // ── From CONSTRAINTS: autonomous_execution → principles [12], patterns [64] ──
  { from: 'pattern-64', to: 'principle-12', type: 'implements', source: 'constraint:autonomous_execution' },

  // ── From CONSTRAINTS: data_provenance → principles [3, 13], patterns [53] ──
  { from: 'pattern-53', to: 'principle-3', type: 'implements', source: 'constraint:data_provenance' },
  { from: 'pattern-53', to: 'principle-13', type: 'implements', source: 'constraint:data_provenance' },
]
