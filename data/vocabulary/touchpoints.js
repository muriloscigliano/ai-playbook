// Touchpoint Vocabulary — 37 touchpoints in 6 categories
// Source: AI Interaction Atlas (ai-interaction.com, Apache 2.0, by quietloudlab)
// Extracted from the Touchpoint Vocabulary section of AI_DESIGN_PRINCIPLES.md (Principle 6)

export const touchpoints = [
  // ── Screen Interface (14) ──
  { id: 'tp-screen-desktop-app', name: 'Desktop App', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-mobile-app', name: 'Mobile App', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-web-dashboard', name: 'Web Dashboard', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-embedded-widget', name: 'Embedded Widget', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-kiosk', name: 'Kiosk', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-smartwatch', name: 'Smartwatch', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 8 },
  { id: 'tp-screen-overlay-hud', name: 'Overlay HUD', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 8 },
  { id: 'tp-screen-text-field', name: 'Text Field', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-button', name: 'Button', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-selection-control', name: 'Selection Control', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-slider-dial', name: 'Slider/Dial', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-file-picker', name: 'File Picker', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-drag-drop', name: 'Drag & Drop Zone', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },
  { id: 'tp-screen-link', name: 'Link', category: 'Screen Interface', designImplications: 'Full visual richness — use Task Builders, Style Lenses, Precision Knobs. P1 is a visual plan; P5 is a timeline view.', primaryPrinciple: 6 },

  // ── Conversational (4) ──
  { id: 'tp-conv-chat', name: 'Chat Interface', category: 'Conversational', designImplications: 'Text-dominant — maximize P3 (Rationale) and P4 (Confidence Signal) in-line.', primaryPrinciple: 6 },
  { id: 'tp-conv-sms', name: 'SMS/Text', category: 'Conversational', designImplications: 'Text-dominant — maximize P3 (Rationale) and P4 (Confidence Signal) in-line.', primaryPrinciple: 6 },
  { id: 'tp-conv-email', name: 'Email', category: 'Conversational', designImplications: 'Text-dominant — maximize P3 (Rationale) and P4 (Confidence Signal) in-line.', primaryPrinciple: 6 },
  { id: 'tp-conv-avatar', name: 'Avatar/Character', category: 'Conversational', designImplications: 'Text-dominant — maximize P3 (Rationale) and P4 (Confidence Signal) in-line.', primaryPrinciple: 6 },

  // ── Voice & Audio (5) ──
  { id: 'tp-voice-interface', name: 'Voice Interface', category: 'Voice & Audio', designImplications: 'No visual affordances — P1 becomes a verbal summary; P4 becomes tone and hedging language. Escalation (P6) must be voice-activated.', primaryPrinciple: 7 },
  { id: 'tp-voice-spatial-audio', name: 'Spatial Audio', category: 'Voice & Audio', designImplications: 'No visual affordances — P1 becomes a verbal summary; P4 becomes tone and hedging language. Escalation (P6) must be voice-activated.', primaryPrinciple: 7 },
  { id: 'tp-voice-microphone', name: 'Microphone', category: 'Voice & Audio', designImplications: 'No visual affordances — P1 becomes a verbal summary; P4 becomes tone and hedging language. Escalation (P6) must be voice-activated.', primaryPrinciple: 7 },
  { id: 'tp-voice-headphones', name: 'Headphones', category: 'Voice & Audio', designImplications: 'No visual affordances — P1 becomes a verbal summary; P4 becomes tone and hedging language. Escalation (P6) must be voice-activated.', primaryPrinciple: 7 },
  { id: 'tp-voice-speaker', name: 'Speaker', category: 'Voice & Audio', designImplications: 'No visual affordances — P1 becomes a verbal summary; P4 becomes tone and hedging language. Escalation (P6) must be voice-activated.', primaryPrinciple: 7 },

  // ── Spatial Computing (5) ──
  { id: 'tp-spatial-vr', name: 'VR Headset', category: 'Spatial Computing', designImplications: 'Spatial organization replaces linear flows. P5 becomes a spatial history. Principle 7 (Space-Time) is native here.', primaryPrinciple: 7 },
  { id: 'tp-spatial-mr', name: 'Mixed Reality', category: 'Spatial Computing', designImplications: 'Spatial organization replaces linear flows. P5 becomes a spatial history. Principle 7 (Space-Time) is native here.', primaryPrinciple: 7 },
  { id: 'tp-spatial-ar-glasses', name: 'AR Glasses', category: 'Spatial Computing', designImplications: 'Spatial organization replaces linear flows. P5 becomes a spatial history. Principle 7 (Space-Time) is native here.', primaryPrinciple: 8 },
  { id: 'tp-spatial-mobile-ar', name: 'Mobile AR', category: 'Spatial Computing', designImplications: 'Spatial organization replaces linear flows. P5 becomes a spatial history. Principle 7 (Space-Time) is native here.', primaryPrinciple: 8 },
  { id: 'tp-spatial-3d', name: '3D Space', category: 'Spatial Computing', designImplications: 'Spatial organization replaces linear flows. P5 becomes a spatial history. Principle 7 (Space-Time) is native here.', primaryPrinciple: 7 },

  // ── Technical (3) ──
  { id: 'tp-tech-api', name: 'Public API', category: 'Technical', designImplications: 'Developer-facing — P3 becomes structured metadata (JSON); P4 becomes a numeric field. Pattern 76 (Bridge) connects these to user-facing surfaces.', primaryPrinciple: null },
  { id: 'tp-tech-cli', name: 'CLI/Terminal', category: 'Technical', designImplications: 'Developer-facing — P3 becomes structured metadata (JSON); P4 becomes a numeric field. Pattern 76 (Bridge) connects these to user-facing surfaces.', primaryPrinciple: null },
  { id: 'tp-tech-document', name: 'Document/Report', category: 'Technical', designImplications: 'Developer-facing — P3 becomes structured metadata (JSON); P4 becomes a numeric field. Pattern 76 (Bridge) connects these to user-facing surfaces.', primaryPrinciple: null },

  // ── Physical Devices (6) ──
  { id: 'tp-phys-iot', name: 'IoT Sensor', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 13 },
  { id: 'tp-phys-robot', name: 'Robot', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 15 },
  { id: 'tp-phys-appliance', name: 'Smart Appliance', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 13 },
  { id: 'tp-phys-vehicle', name: 'Vehicle Interface', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 15 },
  { id: 'tp-phys-haptic', name: 'Haptic Device', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 13 },
  { id: 'tp-phys-ambient', name: 'Ambient Display', category: 'Physical Devices', designImplications: 'Physical consequences — L3/L4 actions have real-world effects. P1 is critical before any physical action. Escalation (P6) may require hardware kill switches.', primaryPrinciple: 13 },
]
