// eslint-disable-next-line import/prefer-default-export
export const getDnsLink = (domain) => (
  `https://ipfs.io/ipns/${domain.replace('www.', '')}`
);
