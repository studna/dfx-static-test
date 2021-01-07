import gql from 'graphql-tag';

import { DEPLOY_DETAIL } from '../fragments';

// Fields which we can be queried in the subscription:
// https://github.com/Terminal-Systems/app-backend/blob/develop/serverless/packages/sites-api/src/mutations/notifyDeploySubscription.ts

export default gql`
  subscription deploySubscription($id: ID!) {
    deploySubscription(id: $id) {
      ...DeployDetail
    }
  }
  ${DEPLOY_DETAIL}
`;
