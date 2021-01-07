import gql from 'graphql-tag';
import { DEPLOY_DETAIL } from '../fragments';

export default gql`
  mutation retryDeploy(
    $siteId: ID!,
    $deployId: ID!
  ) {
    retryDeploy(
      siteId: $siteId,
      deployId: $deployId
    ) {
      ...DeployDetail
    }
  }
  ${DEPLOY_DETAIL}
`;
