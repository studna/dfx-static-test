const getUnlimitedOrValue = (t, value = '') => {
  const stringValue = String(value);
  const valueMapping = {
    '-1': t('billing.misc.unlimited'),
    '-2': t('billing.misc.custom'),
  };
  return {
    value: valueMapping[stringValue] || value,
    wasConverted: Object.keys(valueMapping).includes(stringValue),
  };
};

export default getUnlimitedOrValue;
