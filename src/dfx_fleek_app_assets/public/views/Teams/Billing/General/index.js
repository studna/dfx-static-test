import React from 'react';
import get from 'lodash/get';
import { newApiClient } from '@Clients';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_TEAM_BY_ID, GET_TEAM_BILLING_INFORMATION } from '@Shared/graphql/queries';

import HeaderCard from './components/HeaderCard';
import BillingSettingsNav from './components/BillingSettingsNav';

import useStyles from './styles';


const Billing = () => {
  const classes = useStyles();

  const match = useRouteMatch();
  const location = useLocation();

  const {
    data: billingInfoData,
    loading: billingInfoLoading,
  } = useQuery(GET_TEAM_BILLING_INFORMATION, {
    client: newApiClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      teamId: match.params.teamId,
    },
  });

  const {
    data: teamInfoData,
    loading: teamInfoLoading,
  } = useQuery(GET_TEAM_BY_ID, {
    client: newApiClient,
    variables: {
      id: match.params.teamId,
    },
  });

  const loading = billingInfoLoading || teamInfoLoading;

  React.useEffect(() => {
    window.analytics.page('Billing', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <div>
      <HeaderCard
        recipient={get(teamInfoData, 'getTeamById.name')}
        startDate={get(billingInfoData, 'getTeamBillingInformation.activePlan.activatedAt', '')}
        endDate={get(billingInfoData, 'getTeamBillingInformation.activePlan.expiresAt', '')}
        loading={loading}
      />
      <div className={classes.navMenuContainer}>
        <BillingSettingsNav billingInfo={billingInfoData} loading={loading} />
      </div>
    </div>
  );
};

export default Billing;
