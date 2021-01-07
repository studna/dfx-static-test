import gql from 'graphql-tag';

import { INVITATION_INFO } from '../fragments';

export default gql`
  query getMembersByTeam($teamId: ID!) {
    getMembersByTeam(teamId: $teamId) {
      accessLevel
      member {
        id
        email
        firstname
        lastname
      }
      pendingMember {
        ...InvitationInfo
      }
    }
  }
  ${INVITATION_INFO}
`;
