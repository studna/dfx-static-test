// eslint-disable-next-line import/prefer-default-export
export const removeItemsWhichIncludes = (keyOfItemsToRemove) => {
  Object.keys(window.localStorage).forEach((key) => {
    if (key.includes(keyOfItemsToRemove)) {
      window.localStorage.removeItem(key);
    }
  });
};
