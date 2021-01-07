import gql from 'graphql-tag';

export default gql`
  {
    allTeams {
      id
      name
      description
    }
  }
`;
