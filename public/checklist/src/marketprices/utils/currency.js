const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (amount) => {
  return amount ? formatter.format(amount) : "N/A";
};
