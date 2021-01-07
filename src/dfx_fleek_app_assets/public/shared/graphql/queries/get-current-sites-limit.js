import gql from 'graphql-tag';
import { SITES_NUMBER_LIMIT } from '../fragments';

const query = gql`
  query getTeamBillingInformation($teamId: ID!) {
    getTeamBillingInformation(teamId: $teamId) {
      ...SitesLimitBillingInfo
    }
  }
  ${SITES_NUMBER_LIMIT}
`;

export default query;
