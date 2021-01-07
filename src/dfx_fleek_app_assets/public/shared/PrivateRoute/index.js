import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import auth from '../../auth';

// disable react/jsx-props-no-spreading since it is a wrapper
/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      if (auth.isAuthenticated) {
        return children;
      }

      auth.authenticate(`${window.location.href.split('/#/')[1]}`);

      return null;
    }}
  />
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
