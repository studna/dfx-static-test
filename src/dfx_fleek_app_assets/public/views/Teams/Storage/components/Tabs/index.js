import React from 'react';
import { url } from '@Shared';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import Tab from '@terminal-packages/ui/core/Tab';
import Tabs from '@terminal-packages/ui/core/Tabs';

import useStyles from './styles';

const INDEX_OF_TAB_NAME_IN_LINK = 4;

const SiteTabs = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();

  const splittedPathname = location.pathname.split('/');
  const tabsValue = splittedPathname[INDEX_OF_TAB_NAME_IN_LINK];

  return (
    <div className={classes.tabsContent}>
      <Tabs value={tabsValue} aria-label="site-tabs">
        <Tab
          disableRipple
          value="overview"
          component={Link}
          to={url.buildUrl(null, `${match.url}/overview`)}
          label={t('storage.tabs.overview')}
        />
        <Tab
          disableRipple
          value="settings"
          component={Link}
          to={url.buildUrl(null, `${match.url}/settings`)}
          label={t('storage.tabs.settings')}
        />
      </Tabs>
    </div>
  );
};

export default SiteTabs;
