import { url } from '@Shared';

export const billingDefaultConfig = (props) => {
  const { t } = props;
  const teamId = url.getAccountIdFromUrl();

  return {
    items: [{
      type: 'icon',
      enabled: true,
      title: t('billing.title'),
      icon: ['fal', 'credit-card'],
      to: url.buildUrl(null, `/teams/${teamId}/billing/general`),
    }],
  };
};

const billingResolver = (props) => new Promise((resolve) => {
  const defaultConfig = billingDefaultConfig(props);
  resolve(defaultConfig);
});

export default billingResolver;
