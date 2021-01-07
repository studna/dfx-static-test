import gql from 'graphql-tag';
import { SITE_DETAIL } from '../../../../../graphql/fragments';

export default gql`
  mutation verifyDns($input: VerifyDnsInput!) {
    verifyDns(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
