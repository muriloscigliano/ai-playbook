// UX Diagnose Keywords — maps fuzzy user phrasings to canonical uxDiagnoses keys.
// The design-side mirror of problemKeywords. Used by detectUxComplaints().

export const uxDiagnoseKeywords = {
  'fabricates facts': ['made it up', 'makes things up', 'made up', 'invents', 'fabricat', 'not true', 'confidently wrong', 'hallucinat', 'lies', 'inaccurate detail'],
  'acts on unstated assumptions': ['assumed', 'assumption', 'without asking', 'just did it', "didn't check", 'guessed', 'ran with', 'took liberties'],
  'loses context mid-task': ['lost track', 'forgot what', 'mid-task', 'lost the thread', 'forgot earlier', "didn't remember what i said", 'dropped context'],
  'reverses prior conclusions': ['changed its mind', 'contradicts itself', 'reversed', 'said the opposite', 'flip flop', 'flip-flop', 'no reason for changing'],
  'flatters instead of pushing back': ['agrees with everything', 'sycophant', 'flatter', 'just agrees', 'too agreeable', "won't push back", 'yes man', 'tells me what i want'],
  'slow to respond': ['slow', 'takes forever', 'laggy', 'waiting', 'spinner', 'unresponsive', 'hangs', 'no feedback while'],
  'over-explains': ['over-explain', 'too long', 'too wordy', 'verbose', 'rambling', 'rambles', 'goes on', 'too much detail', 'tl;dr', 'says too much'],
  'quality degrades over long sessions': ['gets worse', 'degrades', 'long session', 'long conversation', 'worse over time', 'quality drops', 'falls apart after'],
  'easily manipulated': ['jailbreak', 'jailbroken', 'manipulat', 'talked out of', 'bypass', 'tricked', 'social engineer', 'ignore its rules'],
  'reproduces bias': ['bias', 'biased', 'stereotype', 'sexist', 'racist', 'unfair', 'discriminat', 'prejudice'],
  'does not reflect intent': ["doesn't understand what i meant", 'misunderstood', "didn't reflect", 'wrong interpretation', "not what i asked", 'missed my point'],
  'does not challenge premises': ["doesn't challenge", "won't question", 'accepts everything', 'flawed premise', "doesn't question my", 'never disagrees with the setup'],
  'inconsistent results': ['inconsistent', 'unreliable', 'different every time', 'unpredictable', 'flaky', 'random quality', 'sometimes good sometimes bad'],
  'requires constant typing': ['constant typing', 'type everything', 'no shortcuts', 'so much typing', 'retype', 'no quick action', 'blank prompt'],
  'does not ask for missing details': ["won't ask me", "doesn't ask", 'never asks', "didn't ask for", 'missing details', 'should have asked', "doesn't clarify"],
  'no guidance on next step': ['what do i do next', 'no next step', 'dead end', 'no guidance', "don't know what to do", 'no follow up', 'leaves me stuck'],
  'walls of text': ['wall of text', 'walls of text', 'huge block', 'giant paragraph', "can't scan", 'unformatted', 'no structure', 'dumps everything'],
  'hard to edit output': ['hard to edit', "can't edit", 'hard to change', 'iterate', 'tweak the output', "can't adjust", 'final artifact', 'no re-roll'],
  'silently hits limits': ['hit the limit', 'usage limit', 'plan limit', 'ran out', 'quota', 'rate limit', 'silently stopped', 'capped without warning'],
}
