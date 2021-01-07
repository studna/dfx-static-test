import gql from 'graphql-tag';

import { DEPLOY_DETAIL } from '../fragments';

export default gql`
  mutation triggerDeploy($siteId: ID!) {
    triggerDeploy(siteId: $siteId) {
      ...DeployDetail
    }
  }
  ${DEPLOY_DETAIL}
`;
