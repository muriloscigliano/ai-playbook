// Relations index — aggregates all relation types

import { patternToPattern } from './pattern-to-pattern.js'
import { patternToPrinciple } from './pattern-to-principle.js'
import { principleToUxPattern } from './principle-to-ux-pattern.js'

export { patternToPattern } from './pattern-to-pattern.js'
export { patternToPrinciple } from './pattern-to-principle.js'
export { principleToUxPattern } from './principle-to-ux-pattern.js'

/** Combined array of all relations. */
export const allRelations = [
  ...patternToPattern,
  ...patternToPrinciple,
  ...principleToUxPattern,
]

/**
 * Get all relations involving a given entity ID.
 * @param {string} entityId - e.g. 'pattern-44', 'principle-12', 'ux-pattern-1'
 * @returns {Array} relations where from or to matches entityId
 */
export function getRelationsFor(entityId) {
  return allRelations.filter(r => r.from === entityId || r.to === entityId)
}

/**
 * Get related entity IDs for a given entity, optionally filtered by relation type.
 * @param {string} entityId - e.g. 'pattern-44'
 * @param {string} [type] - optional relation type filter (e.g. 'enhances', 'implements')
 * @returns {string[]} array of related entity IDs
 */
export function getRelatedIds(entityId, type) {
  const rels = type
    ? allRelations.filter(r => r.type === type && (r.from === entityId || r.to === entityId))
    : allRelations.filter(r => r.from === entityId || r.to === entityId)

  return [...new Set(rels.map(r => r.from === entityId ? r.to : r.from))]
}
