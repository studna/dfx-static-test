import React from 'react';
import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/react-hooks';

import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';

// import { newApiClient } from '@Clients';
// import RETRY_DEPLOY_MOCK_DATA
// from '~/views/Sites/graphql/mutations/mock-data/cancel-retry-deploy';
// import {
//   RETRY_DEPLOY,
// } from '~/views/Sites/graphql/mutations';

// import {

// } from '../../utils';

const PublishButton = ({
  disabled,
  setMutationInProgress,
  classes,
  t,
// eslint-disable-next-line arrow-body-style
}) => {
  // const [onClickPublish, { response = RETRY_DEPLOY_MOCK_DATA }] = useMutation(RETRY_DEPLOY, {
  //   client: newApiClient,
  //   variables: {},
  //   update: onRetryDeployCache,
  //   onCompleted: () => onRetryDeployOnCompleted(response.success),
  //   onError: () => onRetryDeployError(response),
  // });

  return (
    <GenericButton
      disabled={disabled}
      onClick={() => {
        try {
          setMutationInProgress(true);
          // onClickRetry();
        } catch {
          setMutationInProgress(false);
          // Do something when there is an error
        }
      }}
      buttonVariant="secondary"
      overrideClass={{ button: classes.settingsButton }}
    >
      <Typography variant="body2">
        {t('sites.tabs.deploys.sections.deployStatus.publishDeploy')}
      </Typography>
    </GenericButton>
  );
};

PublishButton.propTypes = {
  classes: PropTypes.shape({
    settingsButton: PropTypes.string.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  setMutationInProgress: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PublishButton;
