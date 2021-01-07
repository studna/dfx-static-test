import gql from 'graphql-tag';

import { SITE_DETAIL } from '../fragments';

export default gql`
  mutation EditBuildSettings($input: EditBuildSettings!) {
    editBuildSettings(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
