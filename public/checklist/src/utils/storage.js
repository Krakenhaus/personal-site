const creatureKey = type => `greg-acnh-${type}`;

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
