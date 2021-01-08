// import Web3 from 'web3';
// import Web3Modal from 'web3modal';
// import Authereum from 'authereum';
// import Torus from '@toruslabs/torus-embed';
// import { GET_ENS_CONTROLLER_ADDRESS } from '@Shared/graphql/queries';
// import { newApiClient } from '@Clients';
// import getEthereumInfo from '@Shared/web3/get-ethereum-info';

// import setControllerToAddressTx from './set-controller-to-address-tx';
// import handleSuccessfulVerification from './handle-successful-verification';
// import {
//   handleFailedToConnect,
//   handleWrongNetId,
//   handleNotOwnerOfDomain,
//   handleGenericError,
//   handleFailedToSign,
// } from './handle-msg-errors';

// const handleSetController = async (params) => {
//   const {
//     state,
//     setState,
//     ensDomain,
//     siteId,
//   } = params;

//   setState({
//     ...state,
//     error: null,
//   });

//   const {
//     registrantAddress,
//     isFleekControlled,
//     domain,
//   } = ensDomain;

//   const ethereumInfo = getEthereumInfo();

//   const providerOptions = {
//     torus: {
//       package: Torus,
//     },
//     authereum: {
//       package: Authereum,
//     },
//   };

//   let netId;
//   let web3;
//   try {
//     const web3Modal = new Web3Modal({
//       cacheProvider: false,
//       providerOptions,
//     });

//     web3Modal.providerController.cachedProvider = null;

//     const provider = await web3Modal.connect();
//     web3 = new Web3(provider);

//     netId = await web3.eth.net.getId();
//   } catch (e) {
//     handleFailedToConnect(params);
//     return;
//   }

//   const accounts = await web3.eth.getAccounts();

//   if (accounts[0] !== registrantAddress) {
//     handleNotOwnerOfDomain(params);
//     return;
//   }
//   if (isFleekControlled) {
//     try {
//       setState({
//         ...state,
//         loading: true,
//       });
//       const signature = await web3.eth.personal.sign(`I registered site ${ensDomain.domain}`, accounts[0]);
//       handleSuccessfulVerification({
//         ...params,
//         domain,
//         state,
//         setState,
//         signature,
//       });
//     } catch (e) {
//       handleFailedToSign(params);
//       setState({
//         ...state,
//         loading: false,
//       });
//     }
//     return;
//   }

//   if (netId !== ethereumInfo.netId) {
//     handleWrongNetId(params);
//     return;
//   }

//   setState({
//     ...state,
//     loading: true,
//   });

//   let fleekControllerAddress = null;

//   try {
//     const ensControllerResult = await newApiClient.query({
//       query: GET_ENS_CONTROLLER_ADDRESS,
//       variables: {
//         siteId,
//       },
//     });

//     fleekControllerAddress = ensControllerResult.data.getEnsControllerAddress;
//   } catch (e) {
//     handleGenericError(params);
//     setState({
//       ...state,
//       loading: false,
//     });
//     return;
//   }

//   setControllerToAddressTx({
//     ...params,
//     domain,
//     fleekControllerAddress,
//     state,
//     setState,
//     web3,
//     ensContractRegistryAddress: ethereumInfo.ENSRegistryContractAddress,
//     ensContractStorageAddress: ethereumInfo.ENSStorageContractAddress,
//     registrantAddress,
//   });
// };

// export default handleSetController;
