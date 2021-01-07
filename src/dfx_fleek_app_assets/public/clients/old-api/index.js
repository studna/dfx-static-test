import { ApolloClient, InMemoryCache } from '@apollo/client';

import link from './links';

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
