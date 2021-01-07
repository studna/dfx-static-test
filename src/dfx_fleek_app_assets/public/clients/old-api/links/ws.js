import { WebSocketLink } from 'apollo-link-ws';

import auth from '../../../auth';
import config from '../../../config';

const AUTHENTICATION_ERRORS = [
  'jwt expired',
  'JWT token is invalid or has expired.',
];

export default new WebSocketLink({
  uri: config.oldApi.wsBaseURL,
  options: {
    reconnect: true,
    reconnectionAttempts: 10,
    connectionCallback: async (error) => {
      // error by JWT token expiration
      if (error && AUTHENTICATION_ERRORS.includes(error.message)) {
        try {
          // TODO: renew user accessToken and refreshToken
        } catch (refreshTokenError) {
          // eslint-disable-next-line no-console
          console.error(`r_t error: ${refreshTokenError.message}`);
        }
      }
    },
    connectionParams: () => ({
      Authorization: `Bearer ${auth.accessToken}`,
    }),
  },
});
