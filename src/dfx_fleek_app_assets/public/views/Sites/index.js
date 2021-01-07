import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Site from './Site';
import AddCustomDomain from './AddCustomDomain';
import AddEnsDomain from './AddEnsDomain';

const Sites = () => {
  const match = useRouteMatch();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('sites.page_title')}</title>
      </Helmet>
      <Switch>
        <Route path={`${match.path}/:siteSlug/add-domain`}>
          <AddCustomDomain />
        </Route>
        <Route path={`${match.path}/:siteSlug/add-ens-domain`}>
          <AddEnsDomain />
        </Route>
        <Route path={`${match.path}/:siteSlug`}>
          <Site />
        </Route>
      </Switch>
    </>
  );
};

export default Sites;
