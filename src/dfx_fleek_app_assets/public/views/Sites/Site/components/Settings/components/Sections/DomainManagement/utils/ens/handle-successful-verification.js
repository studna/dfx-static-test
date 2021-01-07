import { handleGenericError } from './handle-msg-errors';

const handleSuccessfulVerification = async (params) => {
  const {
    siteId,
    domain,
    state,
    setState,
    txHash = null,
    signature = null,
    verifySiteEnsDomain,
  } = params;

  try {
    if (txHash) {
      await verifySiteEnsDomain({
        variables: {
          input: {
            siteId,
            domain,
            transactionHash: txHash,
          },
        },
      });
    } else {
      await verifySiteEnsDomain({
        variables: {
          input: {
            siteId,
            domain,
            signedData: {
              signature,
            },
          },
        },
      });
    }
    setState({
      ...state,
      loading: false,
      open: false,
    });
  } catch (e) {
    handleGenericError(params);
    setState({
      ...state,
      loading: false,
    });
  }
};

export default handleSuccessfulVerification;
