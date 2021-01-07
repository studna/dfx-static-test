import { url } from '@Shared';

export const teamDefaultConfig = (props) => {
  const { t } = props;

  return {
    items: [{
      type: 'icon',
      enabled: true,
      title: t('team.title'),
      icon: ['fal', 'users'],
      to: url.buildUrl(null, '/teams/create/team-name'),
    }],
  };
};

const teamResolver = (props) => new Promise((resolve) => {
  const defaultConfig = teamDefaultConfig(props);
  resolve(defaultConfig);
});

export default teamResolver;
