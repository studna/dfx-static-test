import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { newApiClient } from '@Clients';
import { LIMIT_DEPLOYS_PAGINATION } from '~/constants';
import { AllDeploys, DeployDetails } from './containers';
import { GET_DEPLOYS_BY_SITE } from '../../../graphql/queries';
import DeploysSubscription from './components/DeploysSubscription';

const Deploys = ({
  siteBySlug,
}) => {
  const match = useRouteMatch();
  const location = useLocation();
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id');

  const deploys = useQuery(GET_DEPLOYS_BY_SITE, {
    client: newApiClient,
    variables: {
      siteId,
      limit: LIMIT_DEPLOYS_PAGINATION,
    },
    errorPolicy: 'all',
    skip: !siteId,
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    window.analytics.page('Site - Deploy', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <>
      <DeploysSubscription config={deploys} />
      <Switch>
        <Route path={`${match.path}`} exact>
          <AllDeploys
            siteBySlug={siteBySlug}
            deploys={deploys}
          />
        </Route>
        <Route path={`${match.path}/:deployId`} exact>
          <DeployDetails
            siteBySlug={siteBySlug}
            deploys={deploys}
          />
        </Route>
        <Redirect to="*" redirect={`${match.url}`} />
      </Switch>
    </>
  );
};

Deploys.defaultProps = {
  siteBySlug: {
    data: null,
    error: null,
    loading: false,
  },
};

Deploys.propTypes = {
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
};

export default Deploys;
