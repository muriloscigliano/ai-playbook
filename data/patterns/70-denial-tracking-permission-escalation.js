// Pattern 70: Denial Tracking & Permission Escalation
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-70',
  number: 70,
  name: "Denial Tracking & Permission Escalation",
  slug: "denial-tracking-permission-escalation",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "In non-interactive contexts (background agents, CI/CD), every permission prompt is auto-denied. If the agent keeps trying the same blocked tool, it wastes iterations without progress.",
  solution: "Track denial counts per tool. After N denials, escalate — either prompt the user for blanket permission or switch to an alternative approach.",
  keywords: ["denial","tracking","permission","escalation","non-interactive","contexts","background","agents","every","prompt","auto-denied","agent","keeps","trying","same","blocked","tool","wastes","iterations","without"],
}
