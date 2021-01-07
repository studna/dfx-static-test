import gql from 'graphql-tag';

export default gql`
  query getStorageObject($bucket: String!, $key: String!) {
    getStorageObject(bucket: $bucket, key: $key) {
      hash
    }
  }
`;
