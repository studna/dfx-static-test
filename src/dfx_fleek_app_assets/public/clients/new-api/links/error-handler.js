import * as Sentry from '@sentry/browser';
import { onError } from 'apollo-link-error';
import {
  GQLError,
  GQLNetworkError,
  GQLTokenExpiredError,
  GQLUnauthorizedError,
} from '@Shared/Error';

import { url } from '@Shared';
import auth from '../../../auth';

const NO_ACCESS_ERROR_TYPE = 'Unauthorized';
const AUTHENTICATION_ERRORS = ['Token has expired.'];

/* eslint-disable no-console */
export default onError((testErr) => {
  console.log('testErr', testErr);
  const { operation, networkError, graphQLErrors } = testErr;
  if (networkError) {
    const message = `[Network error - ${networkError.statusCode}] Operation: ${operation.operationName}, Message: ${networkError.message} - `;

    Sentry.captureException(new GQLNetworkError(
      networkError.message,
      operation.operationName,
      operation.variables,
      'NetworkError',
      networkError.statusCode,
    ));
    console.error(message);
  }


  if (graphQLErrors) {
    let isUnauthorized = false;
    let isTokenExpired = false;

    graphQLErrors.forEach((gqlError) => {
      const {
        path,
        message,
        errorType,
        locations,
      } = gqlError;

      const errMessage = `[GraphQL error]: Operation: ${operation.operationName}, Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`;

      console.error(errMessage);

      isUnauthorized = errorType === NO_ACCESS_ERROR_TYPE;
      isTokenExpired = AUTHENTICATION_ERRORS.includes(message);

      const errorParams = [
        message,
        operation.operationName,
        operation.variables,
        errorType,
        200,
      ];

      if (isUnauthorized) {
        Sentry.captureException(new GQLUnauthorizedError(...errorParams));
      } else if (isTokenExpired) {
        Sentry.captureException(new GQLTokenExpiredError(...errorParams));
      } else {
        Sentry.captureException(new GQLError(...errorParams));
      }
    });

    if (isUnauthorized) {
      window.location.hash = url.buildUrl(null, '/error/404');
      return;
    }

    if (isTokenExpired) {
      auth.clean();
      auth.authenticate(`${window.location.href.split('/#/')[1]}`);
    }
  }
});
