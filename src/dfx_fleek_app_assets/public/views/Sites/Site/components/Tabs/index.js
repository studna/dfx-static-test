import React from 'react';
import { url } from '@Shared';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import Tab from '@terminal-packages/ui/core/Tab';
import Tabs from '@terminal-packages/ui/core/Tabs';

import { SECTION_IDS } from '../Settings/get-navigation-items';
import useStyles from './styles';

const INDEX_OF_TAB_NAME_IN_LINK = 3;

const SiteTabs = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();

  // split pathname to get current tab view
  const splittedPathname = location.pathname.split('/');
  // last value will always be the tab view, Ex: overview, deploys, settings
  const tabsValue = splittedPathname[INDEX_OF_TAB_NAME_IN_LINK];

  return (
    <div className={classes.tabsContent}>
      <Tabs value={tabsValue} aria-label="site-tabs">
        <Tab
          disableRipple
          value="overview"
          component={Link}
          to={url.buildUrl(null, `${match.url}/overview`)}
          label={t('sites.tabs.overview')}
        />
        <Tab
          disableRipple
          value="deploys"
          component={Link}
          to={url.buildUrl(null, `${match.url}/deploys`)}
          label={t('sites.tabs.deploys.title')}
        />
        <Tab
          disableRipple
          value="settings"
          component={Link}
          to={url.buildUrl(null, `${match.url}/settings/${SECTION_IDS.GENERAL}`)}
          label={t('sites.tabs.settings.title')}
        />
      </Tabs>
    </div>
  );
};

export default SiteTabs;
