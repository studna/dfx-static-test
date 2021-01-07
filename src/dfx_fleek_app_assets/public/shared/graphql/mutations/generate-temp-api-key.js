import gql from 'graphql-tag';

export default gql`
  mutation generateTempApiKey {
    generateTempApiKey {
      key
      secret
      expiration
      sessionToken
    }
  }
`;
