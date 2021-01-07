/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const ENS_DOMAIN_INFORMATION = gql`
  fragment EnsDomainInformation on EnsDomainInfo {
    domain
    ownerAddress
    registrantAddress
    isResolverMigrated
    isFleekControlled
    isAlreadyInUse
  }
`;
