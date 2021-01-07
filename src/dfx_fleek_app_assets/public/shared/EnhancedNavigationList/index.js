import React from 'react';
import NavigationList from '@terminal-packages/ui/core/NavigationList';
import useStyles from './styles';

const EnhancedNavigationList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <NavigationList {...props} />
    </div>
  );
};

export default EnhancedNavigationList;
