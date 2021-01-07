import React from 'react';
import ListItem from '@terminal-packages/ui/core/ListItem';

import useStyles from './styles';

const Divider = () => {
  const classes = useStyles();

  return (
    <ListItem className={classes.divider} />
  );
};

export default Divider;
