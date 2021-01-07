import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';

import { url, MainContent } from '@Shared';

import General from './components/General';
import HeaderCard from './components/HeaderCard';

const SettingsView = () => {
  const match = useRouteMatch();
  const { t } = useTranslation();

  return (
    <MainContent>
      <Helmet>
        <title>{t('accountSettings.pageTitle')}</title>
      </Helmet>
      <HeaderCard />
      <br />
      <Switch>
        <Route
          exact
          path={match.path}
          render={() => (
            <Redirect to={url.buildUrl(null, `${match.path}/general/profile`)} />
          )}
        />
        <Route
          exact
          path={`${match.path}/general`}
          render={() => (
            <Redirect to={url.buildUrl(null, `${match.path}/general/profile`)} />
          )}
        />
        <Route path={`${match.path}/general/:section`}>
          <General />
        </Route>
      </Switch>
    </MainContent>
  );
};

export default SettingsView;
