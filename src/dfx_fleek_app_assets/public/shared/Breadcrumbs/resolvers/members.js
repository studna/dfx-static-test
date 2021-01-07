import { url } from '@Shared';

export const membersDefaultConfig = (props) => {
  const { t } = props;
  const teamId = url.getAccountIdFromUrl();

  return {
    items: [{
      type: 'icon',
      enabled: true,
      title: t('members.title'),
      icon: ['fal', 'users'],
      to: url.buildUrl(null, `/teams/${teamId}/members`),
    }],
  };
};

const membersResolver = (props) => new Promise((resolve) => {
  const defaultConfig = membersDefaultConfig(props);
  resolve(defaultConfig);
});

export default membersResolver;
