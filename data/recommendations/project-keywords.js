// Project Keywords — maps keywords to project types for detection
// Source: PROJECT_KEYWORDS from mcp-server/server.js

export const projectKeywords = {
  chatbot: ['chat', 'chatbot', 'conversational', 'assistant', 'support', 'customer', 'helpdesk', 'dialogue'],
  coding_agent: ['code', 'coding', 'developer', 'ide', 'programming', 'software', 'refactor', 'debug', 'cli'],
  rag_app: ['rag', 'knowledge', 'search', 'document', 'qa', 'question', 'retrieval', 'wiki', 'docs'],
  multi_agent: ['multi-agent', 'multi agent', 'team', 'crew', 'swarm', 'coordinate', 'agents', 'collaborate'],
  automation: ['workflow', 'automate', 'automation', 'pipeline', 'process', 'business', 'task', 'orchestrat'],
  api_agent: ['api', 'integration', 'tool', 'connect', 'webhook', 'service', 'endpoint', 'mcp'],
  'rag-over-your-content': ['knowledge base', 'search my docs', 'chat with', 'chat with content', 'chat with my', 'talk to my', 'my documents', 'my docs', 'my content', 'own documents', 'own content', 'my own', 'over my content', 'rag over', 'rag pipeline', 'index my', 'embed my', 'retrieval pipeline'],
  'autonomous-maintenance-loop': ['autonomous loop', 'loop engineering', 'self-driving', 'self driving', 'maintenance loop', 'triage bot', 'auto-fix', 'auto fix', 'runs on a schedule', 'nightly agent', 'background agent', 'fixes issues automatically', 'opens prs', 'agent that maintains', 'unattended agent', 'while i sleep'],
}
