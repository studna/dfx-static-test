const { REACT_APP_FE_NODE_ENV } = process.env;

const getGatewayDomainPrefix = () => {
  if (REACT_APP_FE_NODE_ENV === 'production') {
    return 'ipfs';
  }

  if (REACT_APP_FE_NODE_ENV === 'staging') {
    return 'ipfs-stg';
  }

  return 'ipfs-dev';
};

export default (hash) => (
  `https://${getGatewayDomainPrefix()}.fleek.co/ipfs/${hash}`
);
