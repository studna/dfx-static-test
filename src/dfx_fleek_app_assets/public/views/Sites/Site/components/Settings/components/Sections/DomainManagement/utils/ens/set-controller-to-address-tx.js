import namehash from 'eth-ens-namehash';
import handleSuccessfulVerification from './handle-successful-verification';
import {
  handleFailedTransaction,
  handleRejectedTransaction,
} from './handle-msg-errors';
import ensRegistryAbi from './ens-registry-abi';
import ensStorageAbi from './ens-storage-abi';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const setControllerToAddress = async (params) => {
  const {
    web3,
    domain,
    fleekControllerAddress,
    state,
    setState,
    ensContractRegistryAddress,
    ensContractStorageAddress,
    registrantAddress,
  } = params;

  try {
    // This is a workaround for a metamask bug
    // about the metamask transaction not popping up but showing as a notification
    await sleep(100);

    const normalizedDomain = namehash.normalize(domain);

    const splitDomain = normalizedDomain.split('.');
    const isSubdomain = splitDomain.length > 2;

    const label = splitDomain[0];
    const node = splitDomain.slice(1, splitDomain.length).join('.');
    const nodeNamehash = namehash.hash(node);

    const ensRegistryContract = new web3.eth.Contract(ensRegistryAbi, ensContractRegistryAddress);
    const ensStorageContract = new web3.eth.Contract(ensStorageAbi, ensContractStorageAddress);

    const domainMethod = ensRegistryContract.methods.reclaim(
      web3.utils.sha3(label),
      fleekControllerAddress,
    );

    const subDomainMethod = ensStorageContract.methods.setSubnodeOwner(
      nodeNamehash,
      web3.utils.sha3(label),
      fleekControllerAddress,
    );

    const web3Method = isSubdomain ? subDomainMethod : domainMethod;

    web3Method.send({ from: registrantAddress })
      .on('transactionHash', (txHash) => {
        handleSuccessfulVerification({
          ...params,
          txHash,
        });
      })
      .on('error', () => {
        handleRejectedTransaction(params);
      });
    return null;
  } catch (e) {
    handleFailedTransaction(params);
    return setState({
      ...state,
      loading: false,
    });
  }
};

export default setControllerToAddress;
