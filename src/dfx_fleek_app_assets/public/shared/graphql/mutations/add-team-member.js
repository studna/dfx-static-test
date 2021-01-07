import gql from 'graphql-tag';

import { MEMBERSHIP_INFO } from '../fragments';

export default gql`
  mutation addTeamMember($input: AddTeamMemberInput!) {
    addTeamMember(input: $input) {
      ...MembershipInfo
    }
  }
  ${MEMBERSHIP_INFO}
`;
