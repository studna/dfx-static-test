import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { DOMAIN_TYPE } from '~/constants';

import getMainDomain from './get-main-domain';

const getSiteName = (site = {}) => {
  const siteName = get(site, 'name', '');
  const domains = get(site, 'domains', []);
  const mainDomain = getMainDomain(domains);

  if (
    isEmpty(mainDomain)
    || mainDomain.type === DOMAIN_TYPE.DEFAULT_SUBDOMAIN
  ) {
    return siteName;
  }

  return mainDomain.domain;
};

export default getSiteName;
