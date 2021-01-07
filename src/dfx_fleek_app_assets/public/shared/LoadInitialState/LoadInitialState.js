import get from 'lodash/get';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { newApiClient } from '@Clients';
import { useHistory, useLocation } from 'react-router';
import { url } from '@Shared';
import {
  GET_MEMBERSHIPS,
  GET_TEAM_BILLING_INFORMATION,
  GET_TEAM_BY_ID,
} from '@Shared/graphql/queries';
import { getOlderItem } from '@Shared/utils';
import auth from '~/auth';

import useIntercom from './hooks/use-intercom';
import LoadingScreen from '../LoadingScreen';
import useAccountId from '../hooks/useAccountId';
import { GET_PLANS } from '../../views/Teams/Billing/graphql/queries';

const getRedirectUrl = async () => {
  try {
    const memberships = await newApiClient.query({
      query: GET_MEMBERSHIPS,
      fetchPolicy: 'network-only',
    });

    const teams = get(memberships, 'data.getMemberships.memberships', []) || [];
    const sortedTeams = [...teams].sort(getOlderItem);
    const teamId = get(sortedTeams, '[0].teamId', null) || null;

    if (!teamId) throw new Error('No available teams');

    // set team as current userId tracking
    window.ga('set', 'userId', teamId);
    window.analytics.group(teamId, {
      name: teamId,
    });

    return url.buildUrl({ accountId: teamId });
  } catch (error) {
    Sentry.captureException(error);
    /* eslint-disable no-console */
    console.error(error);
    return null;
  }
};

const VALID_ROUTES = [
  /\/sites.*/,
  /\/start.*/,
  /\/teams.*/,
];

const PUBLIC_ROUTES = [
  /\/copyright.*/,
  /\/terms_of_service.*/,
  /\/privacy_and_policy.*/,
];

const LoadInitialState = () => {
  const history = useHistory();
  const location = useLocation();
  const accountId = useAccountId();
  useIntercom();

  const isValidRoute = VALID_ROUTES.some((route) => location.pathname.match(route));
  const isPublicRoute = PUBLIC_ROUTES.some((route) => location.pathname.match(route));

  /* pre-load plans, teamBillingInfo */
  useEffect(() => {
    const getPlans = async () => {
      try {
        await newApiClient.query({ query: GET_PLANS });
      } catch (e) {
        Sentry.captureException(e);
        /* eslint-disable no-console */
        console.error(e);
      }
    };

    const getTeamBillingInfo = async () => {
      try {
        await newApiClient.query({
          query: GET_TEAM_BILLING_INFORMATION,
          variables: { teamId: accountId },
        });
      } catch (error) {
        Sentry.captureException(error);
        /* eslint-disable no-console */
        console.error(error);
      }
    };

    const getTeamInfo = async () => {
      try {
        await newApiClient.query({
          query: GET_TEAM_BY_ID,
          variables: { id: accountId },
        });
      } catch (error) {
        Sentry.captureException(error);
        /* eslint-disable no-console */
        console.error(error);
      }
    };

    // if we are on auth cb route, we are saving a new access token
    if (location.pathname !== '/auth/cb') {
      getPlans();
      getTeamBillingInfo();
      getTeamInfo();
    }
  }, [accountId]);

  useEffect(() => {
    const redirect = async () => {
      const redirectUrl = await getRedirectUrl();

      if (redirectUrl) {
        history.replace(redirectUrl);
      }
    };

    const polling = setInterval(() => {
      if (!accountId && auth.isAuthenticated && isValidRoute) {
        redirect();
      }
    }, 5000);

    return () => clearInterval(polling);
  }, [accountId]);

  if (isPublicRoute) {
    return null;
  }

  if ((!accountId && isValidRoute) || !auth.isAuthenticated) return <LoadingScreen />;
  return null;
};

export default LoadInitialState;
