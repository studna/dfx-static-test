import gql from 'graphql-tag';

import { SITE_DETAIL } from '../../../views/Sites/graphql/fragments';

export default gql`
  mutation setSiteEnsDomain($input: AddSiteEnsDomainInput!) {
    setSiteEnsDomain(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
