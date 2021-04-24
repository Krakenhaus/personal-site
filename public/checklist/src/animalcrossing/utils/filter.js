import { isActive } from './date';
export const FILTERS = {
  ACTIVE: 'active',
};

export function filterCreatures(creatures, filters) {
  if (!filters) {
    return creatures;
  }

  let filteredCreatures = creatures;
  if (filters.includes(FILTERS.ACTIVE)) {
    filteredCreatures = creatures.filter((creature) => {
      return isActive(creature.northernMonths);
    });
  }

  return filteredCreatures;
};
