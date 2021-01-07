import gql from 'graphql-tag';

import { MEMBERSHIP_INFO } from '../fragments';

export default gql`
  query getMemberships(
    $limit: Int = 10,
    $nextToken: String
  ) {
    getMemberships(
      limit: $limit,
      nextToken: $nextToken
    ) {
      memberships {
        ...MembershipInfo
      }
      nextToken
    }
  }
  ${MEMBERSHIP_INFO}
`;
