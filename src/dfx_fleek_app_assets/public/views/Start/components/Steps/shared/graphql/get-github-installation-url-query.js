import gql from 'graphql-tag';

const GET_GITHUB_LINK_QUERY = gql`
  query getGithubInstallationUrl($teamId: ID!) {
    getGithubInstallationUrl(teamId: $teamId)
  }
`;

export default GET_GITHUB_LINK_QUERY;
