export function searchCreatures(creatures, search) {
  if (!search) {
    return creatures;
  }

  return creatures.filter((creature) => {
    const isInName = creature.name ?
      creature.name.toLowerCase().includes(search.toLowerCase()) : false;
    const isInLocation = creature.location ?
      creature.location.toLowerCase().includes(search.toLowerCase()) : false;
    return isInName || isInLocation;
  });
}
