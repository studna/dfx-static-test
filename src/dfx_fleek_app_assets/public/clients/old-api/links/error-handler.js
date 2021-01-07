import { onError } from 'apollo-link-error';

import auth from '../../../auth';

const JWT_EXPIRED_ERROR = 'JWT_EXPIRED';

export default onError(({ networkError, graphQLErrors }) => {
  let redirectToLogin;

  if (networkError) {
    redirectToLogin = networkError.message === JWT_EXPIRED_ERROR;
  }

  if (graphQLErrors) {
    const hasError = graphQLErrors.find(
      // TODO: handle this case from a server middleware - verify if request has cookie
      (error) => error.message === 'Authorization Error: Non authenticated request',
    );

    redirectToLogin = !!hasError;
  }

  if (redirectToLogin) {
    auth.authenticate(`${window.location.href.split('/#/')[1]}`);
  }
});
