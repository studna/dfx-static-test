import gql from 'graphql-tag';

export default gql`
  mutation removeSite($input: RemoveSiteInput!) {
    removeSite(input: $input) {
      id
    }
  }
`;
