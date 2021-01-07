import gql from 'graphql-tag';

export default gql`
  query getBucketBySlug($slug: String!) {
    getBucketBySlug(slug: $slug) {
      hash
    }
  }
`;
