import gql from 'graphql-tag';

import { API_KEY_INFO } from '../fragments';

export default gql`
  query getApiKeys($limit: Int, $nextToken: String) {
    getApiKeys(limit: $limit, nextToken: $nextToken) {
      apiKeys {
        ...ApiKeyInfo
      }
    }
  }
  ${API_KEY_INFO}
`;
