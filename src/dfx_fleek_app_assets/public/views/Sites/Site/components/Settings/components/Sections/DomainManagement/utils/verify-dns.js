import cloneDeep from 'lodash/cloneDeep';
import { GET_SITE_BY_SLUG } from '../../../../../../../graphql/queries';
import { DOMAIN_STATUS } from '~/constants';

export const onVerifyDnsCache = (siteSlug, domainName) => (cache, { data: { verifyDns } }) => {
  if (!verifyDns.success) {
    return;
  }
  try {
    const data = cache.readQuery({
      query: GET_SITE_BY_SLUG,
      variables: {
        slug: siteSlug,
      },
    });

    const newData = cloneDeep(data);
    const domainIndex = newData.getSiteBySlug.domains.findIndex(
      (domain) => (domain.domain === domainName),
    );

    if (domainIndex === -1) {
      return;
    }

    newData.getSiteBySlug.domains[domainIndex].status = DOMAIN_STATUS.PROPAGATED;

    cache.writeQuery({
      query: GET_SITE_BY_SLUG,
      variables: {
        siteSlug,
      },
      data: newData,
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error(e);
  }
};

export const onVerifyDnsOnCompleted = (
  setDnsError,
  setCnameModal,
  setARecordModal,
) => {
  setDnsError(false);
  setCnameModal(false);
  setARecordModal(false);
};

export const onVerifyDnsError = () => {
};
