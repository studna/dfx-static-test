// eslint-disable-next-line import/prefer-default-export
export const isDifferentSetsOfData = (dataA, dataB) => {
  const isTheSameNumberOfKeys = Object.keys(dataA).length === dataB.length;
  const areValuesTheSame = dataB.every(
    ({ stateKey, value }) => value === dataA[stateKey],
  );

  return !isTheSameNumberOfKeys || !areValuesTheSame;
};
