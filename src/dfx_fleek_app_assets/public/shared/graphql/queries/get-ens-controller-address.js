import gql from 'graphql-tag';

const query = gql`
  query getEnsControllerAddress($siteId: String!) {
    getEnsControllerAddress(siteId: $siteId)
  }
`;

export default query;
