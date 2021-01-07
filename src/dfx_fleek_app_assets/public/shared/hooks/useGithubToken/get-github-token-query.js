import gql from 'graphql-tag';

const GET_GITHUB_TOKEN_QUERY = gql`
  query getGithubToken($teamId: ID!) {
    getGithubToken(teamId: $teamId)
  }
`;

export default GET_GITHUB_TOKEN_QUERY;
