const getNavItems = (currActiveSubsection, rawItems) => {
  const findIsDefaultChild = (isParentActive, parent, childId) => {
    if (!isParentActive) {
      return false;
    }
    const isDefault = parent.list[0].id === childId;
    return isDefault;
  };

  const findHasActiveChild = (children) => {
    if (!children) {
      return false;
    }
    const foundChild = children.find((child) => child.id === currActiveSubsection);
    return !!foundChild;
  };

  return rawItems.map((item) => {
    const hasActiveChild = findHasActiveChild(item.list);
    const isParentActive = item.id === currActiveSubsection;

    return ({
      ...item,
      isActive: isParentActive || hasActiveChild,
      list: item.list.map((nestedItem) => {
        const isNestedItemActive = nestedItem.id === currActiveSubsection;
        const isDefaultChild = findIsDefaultChild(isParentActive, item, nestedItem.id);

        return ({
          ...nestedItem,
          isActive: isNestedItemActive || isDefaultChild,
        });
      }),
    });
  });
};

export default getNavItems;
