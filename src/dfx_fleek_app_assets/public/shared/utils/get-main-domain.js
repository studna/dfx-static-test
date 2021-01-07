import { DOMAIN_STATUS, DOMAIN_TYPE } from '~/constants';

const getMainDomain = (domains) => {
  const primaryDomain = domains.find(({ type, status }) => (
    type === DOMAIN_TYPE.PRIMARY && status === DOMAIN_STATUS.PROPAGATED
  ));
  const aliasDomain = domains.find(({ type, status }) => (
    type === DOMAIN_TYPE.ALIAS_DOMAIN && status === DOMAIN_STATUS.PROPAGATED
  ));
  const defaultSubdomain = domains.find(({ type }) => (
    type === DOMAIN_TYPE.DEFAULT_SUBDOMAIN
  ));

  const mainDomain = primaryDomain || aliasDomain || defaultSubdomain || {};

  return mainDomain;
};

export default getMainDomain;
