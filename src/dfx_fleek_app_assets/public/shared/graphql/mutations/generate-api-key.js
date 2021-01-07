import gql from 'graphql-tag';

import { API_KEY_INFO } from '../fragments';

export default gql`
  mutation generateApiKey {
    generateApiKey {
      ...ApiKeyInfo
    }
  }
  ${API_KEY_INFO}
`;
