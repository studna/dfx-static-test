import gql from 'graphql-tag';

export default gql`
query verifyDomainAvailability($domain: String!) {
  verifyDomainAvailability(domain: $domain) {
    price
    period
    currency
    available
  }
}
`;
