import gql from 'graphql-tag';

import { SITE_DETAIL } from '../fragments';

export default gql`
  query getSiteBySlug($slug: String!) {
    getSiteBySlug(slug: $slug) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
