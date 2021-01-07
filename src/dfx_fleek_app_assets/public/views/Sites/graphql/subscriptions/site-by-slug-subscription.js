import gql from 'graphql-tag';

import { SITE_DETAIL_SUBSCRIPTION } from '../fragments';

export default gql`
  subscription siteBySlugSubscription($slug: String!) {
    siteBySlugSubscription(slug: $slug) {
      ...SiteDetailSubscription
    }
  }
  ${SITE_DETAIL_SUBSCRIPTION}
`;
