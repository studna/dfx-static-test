import gql from 'graphql-tag';

export default gql`
  fragment InvitationInfo on Invitation {
    id
    email
    teamId
    status
    senderId
    createdAt
  }
`;
