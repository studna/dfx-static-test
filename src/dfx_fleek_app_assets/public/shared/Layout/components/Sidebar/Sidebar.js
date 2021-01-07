import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import NavMenu from '@terminal-packages/ui/core/NavMenu';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import { url } from '@Shared';

import useStyles from './styles';
import LinkCLI from '../LinkCLI';
import UserMenu from '../UserMenu';
import TeamSelector from '../TeamSelector';

import getConfig from './config';

const Sidebar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();

  const teamId = getAccountIdFromUrl();
  const items = getConfig({ t, location, teamId });

  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <Link
          to={url.buildUrl(null, `/teams/${teamId}/sites`)}
        >
          <img
            alt="fleek-logo"
            className={classes.logo}
            src="https://storage.googleapis.com/terminal-assets/images/fleek/fleek-logo.png"
          />
        </Link>
      </div>
      <div className={classes.teamContainer}>
        <Typography variant="body2" className={classes.teamLabel}>
          {t('layout.sidebar.team')}
        </Typography>
        <TeamSelector />
      </div>
      <NavMenu items={items} />
      <LinkCLI className={classes.cliContainer} />
      <div className={classes.userMenuContainer}>
        <UserMenu />
      </div>
    </div>
  );
};

export default Sidebar;
