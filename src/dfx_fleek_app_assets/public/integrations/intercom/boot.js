import get from 'lodash/get';
import config from '~/config';

const getUserName = (user) => {
  const { firstname, lastname } = get(user, 'individual') || {};

  if (firstname && lastname) return `${firstname} ${lastname}`;
  if (firstname) return firstname;
  if (lastname) return lastname;
  return user.username || 'unknown';
};

export default (user) => {
  try {
    const defaultConfig = {
      app_id: config.intercomKey,
      name: getUserName(user),
      email: user.email,
      username: user.username,
      terminal_account_id: user.id,
      user_id: user.id,
    };

    window.Intercom('boot', defaultConfig);
  } catch (e) {
    // Ignore if window.Intercom is undefined
  }
};
