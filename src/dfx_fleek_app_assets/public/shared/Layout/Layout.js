/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from '@terminal-packages/ui/core/Toast';

import useStyles from './styles';
import Sidebar from './components/Sidebar';
import TopBanner from './components/TopBanner';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <ToastContainer />
      <div className={classes.bannerContainer}>
        <TopBanner />
      </div>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
