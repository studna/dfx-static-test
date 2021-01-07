import gql from 'graphql-tag';

import { SITE_DETAIL } from '../../../../../Sites/graphql/fragments';

const ADD_SITE = gql`
  mutation addSite($input: AddSiteInput!) {
    addSite( input: $input ) {
      ...SiteDetail
    }
  }

  ${SITE_DETAIL}
`;

export default ADD_SITE;
