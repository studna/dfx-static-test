import gql from 'graphql-tag';

import { SITE_DETAIL_SUBSCRIPTION } from '../fragments';

export default gql`
  subscription siteSubscription($id: ID!) {
    siteSubscription(id: $id) {
      ...SiteDetailSubscription
    }
  }
  ${SITE_DETAIL_SUBSCRIPTION}
`;
