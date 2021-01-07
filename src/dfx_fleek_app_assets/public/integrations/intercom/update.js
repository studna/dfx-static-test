import beautifyAttributesList from './beautify-attributes-list';

export default (user, attributes) => {
  try {
    if (attributes) {
      const beautifiedAttributes = beautifyAttributesList(attributes);
      const defaultConfig = {
        user_id: user.id,
        email: user.email,
        ...beautifiedAttributes,
      };

      window.Intercom('update', defaultConfig); // to update user data and last visited url
    } else {
      window.Intercom('update', {
        last_request_at: parseInt((new Date()).getTime() / 1000, 10),
      }); // just to update las visited url
    }
  } catch (e) {
    // Ignore if window.Intercom is undefined
  }
};
