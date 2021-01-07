import gql from 'graphql-tag';

import { DEPLOY_DETAIL } from '../fragments';

const query = gql`
query getDeploysBySite(
  $siteId: ID!,
  $limit: Int,
  $nextToken: String
  ) {
  getDeploysBySite(
    siteId: $siteId,
    limit: $limit
    nextToken: $nextToken
  ) {
    nextToken
    deploys {
      ...DeployDetail
    }
  }
}
${DEPLOY_DETAIL}
`;

export default query;
