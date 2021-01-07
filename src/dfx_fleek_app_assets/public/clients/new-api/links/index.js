import { ApolloLink } from 'apollo-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import auth from '../../../auth';
import config from '../../../config';

import httpLink from './http';
import httpErrorHandler from './error-handler';

const awsAuth = {
  url: config.newApi.baseURL,
  region: 'us-west-2',
  auth: {
    type: 'OPENID_CONNECT',
    jwtToken: () => {
      if (auth.accessToken) {
        return auth.accessToken;
      }

      return null;
    },
  },
};

export default ApolloLink.from([
  httpErrorHandler,
  createAuthLink(awsAuth),
  createSubscriptionHandshakeLink(awsAuth, httpLink),
]);
