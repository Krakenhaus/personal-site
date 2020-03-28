export function getCurrentMonth() {
  const today = new Date();
  return today.getMonth() + 1;
};

export function isActive (activeMonths) {
  const currentMonth = getCurrentMonth()
  return activeMonths.includes(currentMonth);
};
