import gql from 'graphql-tag';

export default gql`
  {
    getCurrentUser {
      user {
        id
        email
        username
        createdAt
        individual {
          firstname
          lastname
          profilePicUrl
          description
          websiteUrl
        }
      }
    }
  }
`;
