import gql from 'graphql-tag';

import { MIN_SITE_DETAIL } from '../../../../Sites/graphql/fragments';

const GET_SITES_QUERY = gql`
  query getSitesByTeam($teamId: ID!, $limit: Int, $nextToken: String) {
    getSitesByTeam(teamId: $teamId, limit: $limit, nextToken: $nextToken) {
      nextToken
      sites {
        ...MinSiteDetail
      }
    }
  }
  ${MIN_SITE_DETAIL}
`;

export default GET_SITES_QUERY;
