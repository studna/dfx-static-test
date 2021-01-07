import gql from 'graphql-tag';

export default gql`
  mutation DeleteStoredItems($input: DeleteStoredItemsInput!) {
    DeleteStoredItems(input: $input) {
      id
    }
  }
`;
