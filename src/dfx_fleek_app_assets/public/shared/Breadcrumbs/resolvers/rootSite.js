import { url } from '@Shared';

export const rootSitesDefaultConfig = (props) => {
  const { t } = props;
  const teamId = url.getAccountIdFromUrl();

  return {
    items: [{
      type: 'icon',
      enabled: true,
      title: t('sites.title'),
      icon: ['fal', 'window'],
      to: url.buildUrl(null, `/teams/${teamId}/sites`),
    }],
  };
};

const sitesResolver = (props) => new Promise((resolve) => {
  const defaultConfig = rootSitesDefaultConfig(props);
  resolve(defaultConfig);
});

export default sitesResolver;
