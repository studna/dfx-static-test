import gql from 'graphql-tag';

import { SITE_DETAIL } from '../fragments';

export default gql`
  mutation editDeploySettings($input: EditDeploySettings!) {
    editDeploySettings(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
