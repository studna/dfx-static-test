import gql from 'graphql-tag';

export default gql`
  mutation updateBillingInformation($input: UpdateTeamBillingInfoInput) {
    updateBillingInformation(input: $input) {
      billingInformation {
        name
        email
      }
    }
  }
`;
