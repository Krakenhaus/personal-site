const creatureKey = type => `greg-acnh-${type}`;
export const sortKey = 'greg-acnh-sort';

const getKeyString = (key) => {
  return key.key ? key.key : creatureKey(key.type);
};

// key = { creatureType, key }
export function getSaveData(key) {
  const localStorage = window && window.localStorage;
  const storageKey = getKeyString(key);
  if (localStorage) {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  }
  // No LocalStorage, so nothing will work
  return {};
};

export function setSaveData(key, data) {
  const localStorage = window && window.localStorage;
  const storageKey = getKeyString(key);
  if (localStorage) {
    localStorage.setItem(storageKey,  JSON.stringify(data));
  }
};

export function mergeSavedCreatureData(creatures, type) {
  const savedData = getSaveData({ type });
  creatures.forEach((creature, i) => {
    const savedInfo = savedData[creature.index];
    if (savedInfo) {
      creature.isDonated = !!(savedInfo.isDonated);
      creature.isHoarded = !!(savedInfo.isHoarded);
      creature.isFigurine = !!(savedInfo.isFigurine);
    } else {
      creature.isDonated = false;
      creature.isHoarded = false;
      creature.isFigurine = false;
    }
  });

  return creatures;
}
