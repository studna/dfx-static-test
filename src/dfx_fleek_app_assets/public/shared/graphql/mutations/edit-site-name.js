import gql from 'graphql-tag';

export default gql`
  mutation editSiteName($input: EditSiteNameInput!) {
    editSiteName(input: $input) {
      id
    }
  }
`;
