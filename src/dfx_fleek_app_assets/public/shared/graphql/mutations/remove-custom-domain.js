import gql from 'graphql-tag';

export default gql`
  mutation removeCustomDomain($input: RemoveCustomDomainInput!) {
    removeCustomDomain(input: $input) {
      id
    }
  }
`;
