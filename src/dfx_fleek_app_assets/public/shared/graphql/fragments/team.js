import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const TEAM_INFO = gql`
  fragment TeamInfo on Team {
    id
    name
    creatorId
    seatCount
    membersCount
    stripeCustomerId
    pendingInviteCount
    status
  }
`;
