import gql from 'graphql-tag';

import { SITE_DETAIL } from '../../../views/Sites/graphql/fragments';

export default gql`
  mutation removeSiteEnsDomain($input: RemoveSiteEnsDomainInput!) {
    removeSiteEnsDomain(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
