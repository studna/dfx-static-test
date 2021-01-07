import gql from 'graphql-tag';
import { ENS_DOMAIN_INFORMATION } from '../fragments/ens';

const query = gql`
  query getEnsDomainInfo($domain: String!, $network: EnsNetwork) {
    getEnsDomainInfo(domain: $domain, network: $network) {
      ...EnsDomainInformation
    }
  }
  ${ENS_DOMAIN_INFORMATION}
`;

export default query;
