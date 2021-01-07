import { ApolloClient, InMemoryCache } from '@apollo/client';

import links from './links';

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});

export default client;
