import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

export default createPersistedQueryLink({
  useGETForHashedQueries: true,
});
