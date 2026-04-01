// Project Keywords — maps keywords to project types for detection
// Source: PROJECT_KEYWORDS from mcp-server/server.js

export const projectKeywords = {
  chatbot: ['chat', 'chatbot', 'conversational', 'assistant', 'support', 'customer', 'helpdesk', 'dialogue'],
  coding_agent: ['code', 'coding', 'developer', 'ide', 'programming', 'software', 'refactor', 'debug', 'cli'],
  rag_app: ['rag', 'knowledge', 'search', 'document', 'qa', 'question', 'retrieval', 'wiki', 'docs'],
  multi_agent: ['multi-agent', 'multi agent', 'team', 'crew', 'swarm', 'coordinate', 'agents', 'collaborate'],
  automation: ['workflow', 'automate', 'automation', 'pipeline', 'process', 'business', 'task', 'orchestrat'],
  api_agent: ['api', 'integration', 'tool', 'connect', 'webhook', 'service', 'endpoint', 'mcp'],
}
