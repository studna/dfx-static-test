import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const API_KEY_INFO = gql`
  fragment ApiKeyInfo on ApiKey {
    key
    secret
  }
`;
