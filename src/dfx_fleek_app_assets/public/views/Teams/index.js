import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs, MainContent } from '@Shared';

import TeamSites from './Sites';
import Members from './Members';
import AddMember from './AddMember';
import CreateTeam from './CreateTeam';
import Storage from './Storage';
import {
  ChangePlan,
  GeneralBilling,
} from './Billing';

const Teams = () => {
  const match = useRouteMatch();
  const { t } = useTranslation();

  const breadcrumbs = <Breadcrumbs />;

  return (
    <MainContent topBarContent={breadcrumbs}>
      <Helmet>
        <title>{t('teams.pageTitle')}</title>
      </Helmet>
      <Switch>
        <Route path={`${match.path}/create`}>
          <CreateTeam />
        </Route>
        <Route path={`${match.path}/:teamId/sites`}>
          <TeamSites />
        </Route>
        <Route path={`${match.path}/:teamId/billing/general/:section?`}>
          <GeneralBilling />
        </Route>
        <Route path={`${match.path}/:teamId/billing/change-plan`}>
          <ChangePlan />
        </Route>
        <Route path={`${match.path}/:teamId/members/add`}>
          <AddMember />
        </Route>
        <Route path={`${match.path}/:teamId/members`}>
          <Members />
        </Route>
        <Route path={`${match.path}/:teamId/storage`}>
          <Storage />
        </Route>
      </Switch>
    </MainContent>
  );
};

export default Teams;
