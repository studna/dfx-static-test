import get from 'lodash/get';
import React, { useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useQuery } from '@apollo/react-hooks';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { GET_TEAM_BY_ID } from '@Shared/graphql/queries';
import { Breadcrumbs, url } from '@Shared';
import { newApiClient } from '@Clients';
import SitesCard from '@Shared/SitesCard';
import MainContent from '@Shared/MainContent';
import SiteSuspendedOverlay from '@Shared/SiteSuspendedOverlay';
import Deploys from './components/Deploys';
import Overview from './components/Overview';
import Settings from './components/Settings';
import SiteTabs from './components/Tabs';
import useStyles from './styles';

import { LIMIT_DEPLOYS_PAGINATION, TEAM_STATUS } from '~/constants';
import { GET_SITE_BY_SLUG, GET_DEPLOYS_BY_SITE } from '../graphql/queries';
import { SITE_BY_SLUG_SUBSCRIPTION } from '../graphql/subscriptions';

const Site = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const siteBySlug = useQuery(GET_SITE_BY_SLUG, {
    client: newApiClient,
    variables: {
      slug: match.params.siteSlug,
    },
  });

  const breadcrumbs = <Breadcrumbs />;

  useEffect(() => {
    const unsubscribe = siteBySlug.subscribeToMore({
      document: SITE_BY_SLUG_SUBSCRIPTION,
      variables: {
        slug: match.params.siteSlug,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        // Updating the list of deploys if necessary.
        // EG: in the case of an auto-publish from a github update
        try {
          const siteId = subscriptionData.data.siteBySlugSubscription.id;
          const newDeploy = cloneDeep(subscriptionData.data.siteBySlugSubscription.latestDeploy);

          const deploysData = newApiClient.readQuery({
            query: GET_DEPLOYS_BY_SITE,
            variables: {
              siteId,
              limit: LIMIT_DEPLOYS_PAGINATION,
            },
          });

          const newDeploysData = cloneDeep(deploysData);

          const foundDeployIndex = deploysData.getDeploysBySite.deploys.findIndex(
            (deploy) => (deploy.id === newDeploy.id),
          );

          if (foundDeployIndex === -1) {
            newDeploysData.getDeploysBySite.deploys.unshift(newDeploy);

            newApiClient.writeQuery({
              query: GET_DEPLOYS_BY_SITE,
              variables: {
                siteId,
                limit: LIMIT_DEPLOYS_PAGINATION,
              },
              data: newDeploysData,
            });
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('No deploys to update');
        }

        return {
          getSiteBySlug: {
            ...prev.getSiteBySlug,
            ...subscriptionData.data.siteSubscription,
          },
        };
      },
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [match.params.siteSlug]);

  const teamId = url.getAccountIdFromUrl();

  const getTeamById = useQuery(GET_TEAM_BY_ID, {
    client: newApiClient,
    variables: {
      id: teamId,
    },
    skip: !teamId,
  });

  const teamStatus = get(getTeamById, 'data.getTeamById.status');

  const isShownOverlay = teamStatus === TEAM_STATUS.SUSPENDED;

  return (
    <MainContent topBarContent={breadcrumbs}>
      <SiteSuspendedOverlay
        isShownOverlay={isShownOverlay}
      />
      <div className={classes.siteCardContent} id="test-sites-header">
        <SitesCard siteBySlug={siteBySlug} />
      </div>
      <SiteTabs />
      <div className={classes.tabContent}>
        <Switch>
          <Route path={`${match.path}/overview`} exact>
            <Overview siteBySlug={siteBySlug} />
          </Route>
          <Route path={`${match.path}/deploys`}>
            <Deploys siteBySlug={siteBySlug} />
          </Route>
          <Route path={`${match.path}/settings/:section`}>
            <Settings siteBySlug={siteBySlug} />
          </Route>
        </Switch>
      </div>
    </MainContent>
  );
};

export default Site;
