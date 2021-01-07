import gql from 'graphql-tag';

import { SITE_DETAIL } from '../fragments';

// https://github.com/Terminal-Systems/app-backend/blob/develop/serverless/services/appsync/src/schema/sites.graphql#L147
export default gql`
  mutation addCustomDomain($input: AddCustomDomainInput!) {
    addCustomDomain(input: $input) {
      ...SiteDetail
    }
  }
  ${SITE_DETAIL}
`;
