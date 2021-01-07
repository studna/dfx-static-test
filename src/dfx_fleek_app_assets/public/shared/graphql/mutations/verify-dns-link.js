import gql from 'graphql-tag';
import { SITE_DETAIL } from '~/views/Sites/graphql/fragments';

export default gql`
  mutation verifyDnsLink($input: VerifyDnsInput!) {
    verifyDnsLink(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
