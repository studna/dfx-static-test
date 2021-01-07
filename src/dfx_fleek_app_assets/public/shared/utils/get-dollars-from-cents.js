const getDollarsFromCents = (t, cents) => {
  const dollars = (cents / 100).toFixed(2);

  return t('billing.misc.priceWithUnit', {
    price: dollars,
  });
};

export default getDollarsFromCents;
