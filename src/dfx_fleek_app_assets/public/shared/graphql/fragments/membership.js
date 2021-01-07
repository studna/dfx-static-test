import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const MEMBERSHIP_INFO = gql`
  fragment MembershipInfo on Membership {
    teamId
    teamName
    createdAt
    accessLevel
  }
`;
