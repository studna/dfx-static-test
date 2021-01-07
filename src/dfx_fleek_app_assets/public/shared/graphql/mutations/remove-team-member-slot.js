import gql from 'graphql-tag';

export default gql`
  mutation removeTeamMemberSlot($input: RemoveTeamMemberSlotInput!) {
    removeTeamMemberSlot(input: $input)
  }
`;
