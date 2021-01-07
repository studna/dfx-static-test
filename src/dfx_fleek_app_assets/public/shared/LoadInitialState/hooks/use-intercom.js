import { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { oldApiClient, newApiClient } from '@Clients';
import { CURRENT_USER } from '@Shared/graphql/queries';
import useAccountId from '@Shared/hooks/useAccountId';
import GET_SITES_BY_TEAM from '~/views/Teams/Sites/graphql/queries/get-sites-by-team';
import { LIMIT_SITES_PAGINATION } from '~/constants';
import { intercom } from '~/integrations';
import auth from '~/auth';

const useIntercom = () => {
  const location = useLocation();
  const teamId = useAccountId();

  const {
    data: userData,
  } = useQuery(CURRENT_USER, {
    skip: !auth.isAuthenticated,
    client: oldApiClient,
    fetchPolicy: 'cache-only',
  });

  const {
    data: sitesList,
  } = useQuery(GET_SITES_BY_TEAM, {
    variables: {
      teamId,
      limit: LIMIT_SITES_PAGINATION,
    },
    client: newApiClient,
    fetchPolicy: 'cache-only',
  });

  const user = get(userData, 'getCurrentUser.user');
  const userHasSites = !!get(sitesList, 'getSitesByTeam.sites.length');

  useEffect(() => {
    if (user) {
      intercom.boot(user);
    }
  }, [user]);

  useEffect(() => {
    if (user && userHasSites !== undefined) {
      intercom.update(user, { hasSites: userHasSites });
    }
  }, [user, userHasSites]);

  useEffect(() => {
    if (user) {
      intercom.update();
      window.gtag('config', process.env.REACT_APP_GTAG_ID, {
        page_path: location.pathname,
      });
    }
  }, [user, location.pathname]);
};

export default useIntercom;
