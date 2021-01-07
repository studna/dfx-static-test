import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';


import { AUTHORIZATION_COMPLETED } from './constants';
import useStyles from './styles';

const GithubAuthorized = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => { // timeout to show this information for user for at least 2 sec
      window.localStorage.setItem(AUTHORIZATION_COMPLETED, true);
      window.close();
    }, 2000);
  }, []);

  return (
    <div className={classes.root}>
      <img
        className={classes.logo}
        src="https://dev-app.fleek.co/loading-logo.svg"
        alt={t('githubAuthorized.logoAlt')}
      />
      <Typography className={classes.typography}>
        {t('githubAuthorized.title')}
      </Typography>
    </div>
  );
};

export default GithubAuthorized;
