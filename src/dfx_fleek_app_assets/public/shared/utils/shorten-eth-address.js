const shortenEthAddress = (ethAddress = '0x0000000000000000000000000000000000000000') => (
  `${ethAddress.substring(0, 4)}...${ethAddress.substring(ethAddress.length - 4, ethAddress.length)}`
);

export default shortenEthAddress;
