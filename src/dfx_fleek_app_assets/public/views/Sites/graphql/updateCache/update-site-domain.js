import get from 'lodash/get';

import { GET_SITE_BY_SLUG } from '../queries';

const getUpdateSiteDomain = (siteSlug) => (cache, response) => {
  const newDomain = get(response, 'data.addCustomDomain', {});

  if (!newDomain) {
    return;
  }

  try {
    const cacheData = cache.readQuery({
      query: GET_SITE_BY_SLUG,
      variables: {
        slug: siteSlug,
      },
    });

    const newSiteData = {
      ...cacheData,
      getSiteBySlug: {
        ...cacheData.getSiteBySlug,
        domains: [
          ...cacheData.getSiteBySlug.domains,
          newDomain,
        ],
      },
    };

    cache.writeQuery({
      query: GET_SITE_BY_SLUG,
      variables: {
        slug: siteSlug,
      },
      data: newSiteData,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('[Update Site Domains]', error);
  }
};

export default getUpdateSiteDomain;
