import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './styles';

const ObjectDetail = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

ObjectDetail.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ObjectDetail;
