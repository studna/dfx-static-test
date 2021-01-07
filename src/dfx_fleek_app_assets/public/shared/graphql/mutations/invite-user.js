import gql from 'graphql-tag';
import { INVITATION_INFO } from '../fragments';

export default gql`
  mutation inviteUser($teamId: ID!, $emails: [String!]!) {
    inviteUser(teamId: $teamId, emails: $emails) {
      ...InvitationInfo
    }
  }
  ${INVITATION_INFO}
`;
