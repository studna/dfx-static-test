import gql from 'graphql-tag';

export default gql`
  query isTeamNameAvailable($name: String!) {
    isTeamNameAvailable(name: $name)
  }
`;
