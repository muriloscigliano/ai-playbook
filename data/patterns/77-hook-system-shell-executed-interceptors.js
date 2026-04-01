// Pattern 77: Hook System (Shell-Executed Interceptors)
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-77',
  number: 77,
  name: "Hook System (Shell-Executed Interceptors)",
  slug: "hook-system-shell-executed-interceptors",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Pattern 62 (Execution Hooks) uses in-process interceptors. But production systems need hooks that run arbitrary external programs — linters, security scanners, compliance checks — without embedding them in the agent process.",
  solution: "Shell-executed hooks triggered at specific lifecycle points. Hooks are defined in settings.json and run as child processes.",
  keywords: ["hook","system","shell-executed","interceptors","pattern","execution","hooks","uses","in-process","production","systems","need","that","arbitrary","external","programs","linters","security","scanners","compliance"],
}
