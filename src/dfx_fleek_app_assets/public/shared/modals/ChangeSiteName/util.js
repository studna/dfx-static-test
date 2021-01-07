const { REACT_APP_FE_NODE_ENV } = process.env;

const getFleekSubdomain = () => {
  const fleekDomain = 'fleek.co';

  if (REACT_APP_FE_NODE_ENV === 'production') {
    return `.on.${fleekDomain}`;
  }

  if (REACT_APP_FE_NODE_ENV === 'staging') {
    return `.on-stg.${fleekDomain}`;
  }

  return `.on-dev.${fleekDomain}`;
};

export default {
  getFleekSubdomain,
};
