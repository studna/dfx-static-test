import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';

import { newApiClient } from '@Clients';

import {
  RETRY_DEPLOY,
} from '~/views/Sites/graphql/mutations';

import {
  onRetryDeployCache,
  onRetryDeployOnCompleted,
  onRetryDeployError,
} from '../../utils';

const RetryButton = ({
  disabled,
  siteId,
  t,
}) => {
  const match = useRouteMatch();
  const history = useHistory();

  const { params: { deployId } } = match;

  const [onClickRetry, { loading, response }] = useMutation(RETRY_DEPLOY, {
    client: newApiClient,
    variables: {
      siteId,
      deployId,
    },
    update: onRetryDeployCache(siteId, deployId),
    onCompleted: (mutationData) => onRetryDeployOnCompleted(
      mutationData, match, history,
    ),
    onError: () => onRetryDeployError(response),
  });

  return (
    <GenericButton
      disabled={disabled || loading}
      loading={loading}
      onClick={onClickRetry}
      buttonVariant="secondary"
    >
      <Typography variant="body2">
        {t('sites.tabs.deploys.sections.deployStatus.retryDeploy')}
      </Typography>
    </GenericButton>
  );
};

RetryButton.defaultProps = {
  siteId: null,
};

RetryButton.propTypes = {
  siteId: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default RetryButton;
