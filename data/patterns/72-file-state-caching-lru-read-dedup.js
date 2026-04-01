// Pattern 72: File State Caching (LRU Read Dedup)
// Part: Part XIII: Production-Hardened Patterns (NEW)

export default {
  id: 'pattern-72',
  number: 72,
  name: "File State Caching (LRU Read Dedup)",
  slug: "file-state-caching-lru-read-dedup",
  part: "Part XIII: Production-Hardened Patterns (NEW)",
  problem: "Agents read the same files repeatedly — checking current state before edits, re-reading after modifications, multiple tools reading the same config. Each read costs I/O time and context tokens.",
  solution: "An LRU cache that deduplicates file reads within a session, with invalidation on writes.",
  keywords: ["file","state","caching","read","dedup","agents","same","files","repeatedly","checking","current","before","edits","re-reading","after","modifications","multiple","tools","reading","config"],
}
