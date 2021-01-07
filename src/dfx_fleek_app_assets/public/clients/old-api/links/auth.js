import { ApolloLink, Observable } from 'apollo-link';

import auth from '../../../auth';

const AUTHENTICATION_ERRORS = [
  'Token has expired.',
  'User was not supplied',
  'Context creation failed: jwt expired',
  'Context creation failed: JWT token is invalid or has expired.',
];

class AuthLink extends ApolloLink {
  setTokenHeader = (operation) => {
    const { headers = {} } = operation.getContext();

    operation.setContext({
      headers: {
        ...headers,
        authorization: `Bearer ${auth.accessToken}`,
      },
    });
  };

  isJwtExpired = ({ errors = [] }) => {
    const jwtErrs = errors.filter((error) => AUTHENTICATION_ERRORS.includes(error.message));

    return jwtErrs.length > 0;
  };

  request(operation, forward) {
    this.setTokenHeader(operation);

    // try refreshing token once if it has expired
    return new Observable((observer) => {
      let subscription;
      let innerSubscription;

      try {
        subscription = forward(operation).subscribe({
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: (networkError) => {
            const { result = {} } = networkError;

            if (this.isJwtExpired(result)) {
              return auth.authenticate(`${window.location.href.split('/#/')[1]}`);
            }

            return observer.error(networkError);
          },
        });
      } catch (e) {
        observer.error(e);
      }

      return () => {
        if (subscription) subscription.unsubscribe();
        if (innerSubscription) innerSubscription.unsubscribe();
      };
    });
  }
}

export default new AuthLink();
