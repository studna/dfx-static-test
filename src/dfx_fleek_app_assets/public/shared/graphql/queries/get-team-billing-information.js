import gql from 'graphql-tag';
import { BILLING_INFO } from '../fragments';

const query = gql`
  query getTeamBillingInformation($teamId: ID!) {
    getTeamBillingInformation(teamId: $teamId) {
      ...BillingInfo
    }
  }
  ${BILLING_INFO}
`;

export default query;
