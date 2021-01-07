import gql from 'graphql-tag';

export default gql`
  mutation addTeam($input: AddTeamInput!) {
    addTeam(input: $input) {
      id
      name
    }
  }
`;
