import get from 'lodash/get';
import { newApiClient } from '@Clients';
import { url, getSiteName } from '@Shared';
import { GET_SITE_BY_SLUG } from '../../../views/Sites/graphql/queries';

export const sitesDefaultConfig = (props) => {
  const {
    params,
    siteName = '',
    loading = true,
  } = props;

  return {
    items: [
      {
        type: 'text',
        to: url.buildUrl(null, `/sites/${params.siteSlug}/overview`),
        title: siteName,
        enabled: true,
        showSkeleton: loading,
      },
    ],
  };
};

const sitesResolver = (props) => new Promise((resolve) => {
  const { params } = props;

  newApiClient.query({
    query: GET_SITE_BY_SLUG,
    variables: {
      slug: params.siteSlug,
    },
  }).then((result) => {
    const site = get(result, 'data.getSiteBySlug', {}) || {};
    const siteName = getSiteName(site);

    const config = sitesDefaultConfig({
      ...props,
      siteName,
      loading: false,
    });

    resolve(config);
  }).catch(() => {
    const defaultConfig = sitesDefaultConfig(props);
    resolve(defaultConfig);
  });
});

export default sitesResolver;
