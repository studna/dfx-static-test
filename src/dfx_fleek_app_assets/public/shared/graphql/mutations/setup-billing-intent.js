import gql from 'graphql-tag';

export default gql`
  mutation setupBillingIntent($teamId: ID!) {
    setupBillingIntent(teamId: $teamId) {
      intentId
    }
  }
`;
