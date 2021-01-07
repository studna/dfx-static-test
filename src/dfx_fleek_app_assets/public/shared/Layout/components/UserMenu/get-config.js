import get from 'lodash/get';

export const LOG_OUT_ITEM = {
  key: 'logout',
  icon: 'sign-out',
};

export const SETTINGS_ITEM = {
  key: 'settings',
  icon: 'cog',
};

const getConfig = (user, t) => {
  const i18n = {
    logout: t('layout.userMenu.logout'),
    settings: t('layout.userMenu.settings'),
    signedAs: t('layout.userMenu.signedAs'),
  };

  const items = [
    {
      ...SETTINGS_ITEM,
      text: i18n.settings,
    },
    {
      ...LOG_OUT_ITEM,
      text: i18n.logout,
    },
  ];

  if (user.loading || user.error) {
    return {
      i18n,
      items,
      user: {
        id: '',
        name: t('layout.userMenu.loading'),
      },
    };
  }

  const currentUser = get(user, 'data.getCurrentUser.user', {}) || {};
  const profilePicUrl = get(currentUser, 'individual.profilePicUrl');

  return {
    i18n,
    items,
    user: {
      id: get(currentUser, 'id', ''),
      email: get(currentUser, 'email', ''),
      name: get(currentUser, 'individual.firstname', ''),
      username: get(currentUser, 'username', ''),
      ...(profilePicUrl && { profilePicUrl }),
    },
  };
};

export default getConfig;
