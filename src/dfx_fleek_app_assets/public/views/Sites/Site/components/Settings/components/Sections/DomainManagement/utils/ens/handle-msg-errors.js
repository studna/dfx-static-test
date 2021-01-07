import getEthereumInfo from '@Shared/web3/get-ethereum-info';

export const handleGenericError = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.generic'),
    },
  });
};

export const handleFailedToSign = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.failedToSignMessage'),
    },
  });
};

export const handleFailedToConnect = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.failedToConnect'),
    },
  });
};

export const handleWrongNetId = ({
  state,
  setState,
  t,
}) => {
  const ethereumInfo = getEthereumInfo();
  const networkLowerCase = ethereumInfo.network;
  const networkFirstLetterUpper = `${networkLowerCase.charAt(0).toUpperCase()}${networkLowerCase.substring(1)}`;

  setState({
    ...state,
    error: {
      type: 'warning',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.wrongNetId', {
        network: networkFirstLetterUpper,
      }),
    },
  });
};

export const handleNotOwnerOfDomain = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.notOwnerOfDomain'),
    },
  });
};

export const handleFailedTransaction = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.failedTransaction'),
    },
  });
};

export const handleRejectedTransaction = ({
  state,
  setState,
  t,
}) => {
  setState({
    ...state,
    loading: false,
    error: {
      type: 'error',
      message: t('sites.tabs.settings.ens.setControllerModal.errors.rejectedTransaction'),
    },
  });
};
