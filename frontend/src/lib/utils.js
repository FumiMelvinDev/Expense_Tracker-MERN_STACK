export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-us", {
    currency: "ZAR",
    currencyDisplay: "narrowSymbol",

    style: "currency",
  });

  return formatter.format(amount);
};
