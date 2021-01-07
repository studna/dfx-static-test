import gql from 'graphql-tag';

import { SITE_DETAIL } from '../../../views/Sites/graphql/fragments';

export default gql`
  mutation verifySiteEnsDomain($input: VerifySiteEnsDomainInput!) {
    verifySiteEnsDomain(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
