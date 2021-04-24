import { sortKey, getSaveData, setSaveData } from './storage';

export const BY = {
  CRITTERPEDIA: 'Criterpedia Order',
  ALPHABETICAL: 'Alphabetical',
  PRICE: 'Price',
};

export const ORDER = {
  ASC: 'Ascending',
  DESC: 'Descending',
};

const sortByStringProp = (prop, creatures, order) => {
  const reverse = order === ORDER.DESC;
  return creatures.sort((a, b) => {
    // Use toUpperCase() to ignore character casing
    const creatureA = a[prop].toUpperCase();
    const creatureB = b[prop].toUpperCase();

    let comparison = 0;
    if (creatureA > creatureB) {
      comparison = reverse ? 1: -1;
    } else if (creatureA < creatureB) {
      comparison = reverse ? -1 : 1;
    }
    return comparison;
  });
};

const sortByNumberProp = (prop, creatures, order) => {
  const reverse = order === ORDER.DESC;
  return creatures.sort((a, b) => {
    const creatureA = a[prop];
    const creatureB = b[prop];
    if (creatureA === '?') {
      return 1;
    }

    if (creatureB === '?') {
      return -1;
    }

    return reverse ? creatureB - creatureA : creatureA - creatureB;
  });
};

const alphabeticalSort = (creatures, order) => {
  return sortByStringProp('name', creatures, order);
};

const critterpediaSort = (creatures, order) => {
  return sortByNumberProp('index', creatures, order);
};

const priceSort = (creatures, order) => {
  return sortByNumberProp('price', creatures, order);
};

export function sortCreatures(creatures, sort) {
  switch (sort.by) {
    case BY.ALPHABETICAL:
      return alphabeticalSort(creatures, sort.order);
    case BY.CRITTERPEDIA:
      return critterpediaSort(creatures, sort.order);
    case BY.PRICE:
      return priceSort(creatures, sort.order);
    default:
      return creatures;
  }
};

export function defaultSort() {
  const sort = getSaveData({ key: sortKey });
  if (!sort.by || !sort.order) {
    const newSort = { by: BY.CRITTERPEDIA, order: ORDER.DESC };
    setSaveData({ key: sortKey }, newSort);
  }
  return sort;
};
