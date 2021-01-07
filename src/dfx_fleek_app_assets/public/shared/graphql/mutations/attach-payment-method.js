import gql from 'graphql-tag';

export default gql`
  mutation attachPaymentMethod($teamId: ID!, $paymentMethodId: String!) {
    attachPaymentMethod(teamId: $teamId, paymentMethodId: $paymentMethodId)
  }
`;
