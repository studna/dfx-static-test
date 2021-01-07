import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '~/reducers/actions/loading-state';

import useStyles from './styles';

const LoadingScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingState(true));

    return () => dispatch(setLoadingState(false));
  });

  return (
    <div className={classes.root}>
      <img
        alt="fleek-loading"
        src="https://dev-app.fleek.co/loading-logo.svg"
        className={classes.logo}
      />
    </div>
  );
};

export default LoadingScreen;
