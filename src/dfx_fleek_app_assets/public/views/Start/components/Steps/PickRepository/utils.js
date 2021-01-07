// eslint-disable-next-line import/prefer-default-export
export const transformAccountToSelectorFormat = ({ account = {} }, isSelected) => ({
  id: account.name,
  name: account.name,
  image: account.avatar,
  selected: isSelected,
});
