import { split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

import wsLink from './ws';
import httpLink from './http';
import authLink from './auth';
import httpErrorHandler from './error-handler';
import persistedQueriesLink from './persisted-queries';

export default split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  from([
    httpErrorHandler, authLink, persistedQueriesLink, httpLink,
  ]),
);
