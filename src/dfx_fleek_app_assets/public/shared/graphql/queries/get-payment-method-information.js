import gql from 'graphql-tag';

export default gql`
  query getPaymentMethodInformation($paymentMethodId: ID!) {
    getPaymentMethodInformation(paymentMethodId: $paymentMethodId) {
      type
      issuer
      card {
        lastCardNumbers
        expMonth
        expYear
      }
    }
  }
`;
