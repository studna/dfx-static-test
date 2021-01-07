import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { url, LoadingScreen } from '@Shared';
import { newApiClient } from '@Clients';
import { Redirect } from 'react-router-dom';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';
import { getOlderItem } from '@Shared/utils';

import auth from '../../auth';

const Root = () => {
  const [state, setState] = useState({
    teamId: url.getAccountIdFromUrl(),
    loading: !url.getAccountIdFromUrl(),
    error: false,
  });

  /* eslint-disable consistent-return */
  useEffect(() => {
    if (!auth.isAuthenticated) {
      auth.authenticate();
      return;
    }

    const setTeamId = async () => {
      try {
        const { data } = await newApiClient.query({
          query: GET_MEMBERSHIPS,
          fetchPolicy: 'network-only',
        });

        const memberships = get(data, 'getMemberships.memberships', []) || [];
        const [firstTeam] = [...memberships].sort(getOlderItem);
        const teamId = get(firstTeam, 'teamId', null) || null;

        setState({
          ...state,
          ...(teamId && { teamId }),
          loading: !teamId,
          error: !teamId,
        });
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error);
      }
    };

    const polling = setInterval(() => {
      if (state.loading && !state.teamId) {
        setTeamId();
      }
    }, 5000);

    return () => clearInterval(polling);
  }, []);
  console.log(window.location.hash)
  if (window.location.hash.startsWith('#id_token')) {
    // var locationHash = window.location.hash;

    // var redirectTo = origin + '/#/auth/cb' + locationHash;
    // window.location.replace(redirectTo);
    console.log(`/auth/cb${window.location.hash}`)
    return <Redirect to={`/auth/cb${window.location.hash}`} />
  }

  if (state.loading) {
    return <LoadingScreen />;
  }

  return state.error ? (
    <Redirect to="/error/500" />
  ) : (
    <Redirect
      to={url.buildUrl(
        { accountId: state.teamId },
        `/teams/${state.teamId}/sites`,
      )}
    />
  );
};

export default Root;
