import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';

import { newApiClient } from '@Clients';
import RETRY_DEPLOY_MOCK_DATA from '~/views/Sites/graphql/mutations/mock-data/cancel-retry-deploy';
import {
  CANCEL_DEPLOY,
} from '~/views/Sites/graphql/mutations';

import {
  cancelMockVariables,
  onCancelDeployCache,
  onCancelDeployOnCompleted,
  onCancelDeployError,
} from '../../utils';

const CancelButton = ({
  disabled,
  setMutationInProgress,
  classes,
  t,
}) => {
  const [onClickCancel, { cancelRes = RETRY_DEPLOY_MOCK_DATA }] = useMutation(CANCEL_DEPLOY, {
    client: newApiClient,
    variables: cancelMockVariables,
    update: onCancelDeployCache,
    onCompleted: () => onCancelDeployOnCompleted(cancelRes.success),
    onError: () => onCancelDeployError(cancelRes),
  });

  return (
    <GenericButton
      disabled={disabled}
      onClick={() => {
        try {
          setMutationInProgress(true);
          onClickCancel();
        } catch {
          setMutationInProgress(false);
          // Do something when there is an error
        }
      }}
      buttonVariant="secondary"
      overrideClass={{ button: classes.settingsButton }}
    >
      <Typography variant="body2">
        {t('sites.tabs.deploys.sections.deployStatus.cancelDeploy')}
      </Typography>
    </GenericButton>
  );
};

CancelButton.propTypes = {
  classes: PropTypes.shape({
    settingsButton: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  setMutationInProgress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CancelButton;
