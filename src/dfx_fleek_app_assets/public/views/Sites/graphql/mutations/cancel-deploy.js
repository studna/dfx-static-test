import gql from 'graphql-tag';

export default gql`
  mutation cancelDeploy($input: CancelDeployInput!) {
    cancelDeploy(input: $input) {
      success
    }
  }
`;
