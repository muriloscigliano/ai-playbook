// Problem Keywords — maps keywords to problem types for detection
// Source: detectProblems function in mcp-server/server.js

export const problemKeywords = {
  'too expensive': ['expensive', 'cost', 'budget', 'money', 'tokens', 'pricing', 'cheap'],
  'too slow': ['slow', 'latency', 'speed', 'fast', 'performance', 'timeout', 'waiting'],
  'hallucinate': ['hallucinate', 'hallucination', 'wrong answer', 'makes up', 'inaccurate', 'incorrect', 'invents'],
  'forgets': ['forget', 'loses context', 'lost track', "doesn't remember", 'context window', 'memory', 'amnesia'],
  'dangerous': ['dangerous', 'unsafe', 'destructive', 'permission', 'security', 'risk', 'delete', 'harmful'],
  'wrong tool': ['wrong tool', 'bad parameters', 'hallucinate tool', 'tool error', 'invalid', 'misuse'],
  'complex task': ['complex', 'multi-step', 'complicated', 'fails on', "can't handle", 'long task', 'breaks down'],
  'scale': ['scale', 'users', 'load', 'concurrent', 'production', 'traffic', 'throughput'],
  'no memory': ['remember', 'memory', 'sessions', 'persist', 'between conversations', 'long-term', 'across sessions'],
  'testing': ['test', 'evaluate', 'eval', 'benchmark', 'quality', 'regression', 'ci/cd', 'non-deterministic'],
}
