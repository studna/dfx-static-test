import gql from 'graphql-tag';

export default gql`
  mutation createStripeSession($input: CreateStripeSessionInput!) {
    createStripeSession(input: $input) {
      sessionId
    }
  }
`;
