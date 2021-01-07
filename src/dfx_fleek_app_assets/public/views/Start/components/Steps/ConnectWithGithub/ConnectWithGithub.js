import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';
import Typography from '@material-ui/core/Typography';
import useOctokit from '@Shared/hooks/useOctokit';
import useGithubToken from '@Shared/hooks/useGithubToken';
import StepBase from '@Shared/StepBase';
import { url } from '@Shared';

import { GA_EVENTS_CATEGORIES } from '~/constants';

import useStyles from './styles';
import useFetchGithubToken from './hooks/useFetchGithubToken';

const ConnectWithGithub = ({ goToNextStep }) => {
  const [hasValidToken, setHasValidToken] = useState();
  const openGithubPermissionAccount = useFetchGithubToken(goToNextStep);
  const { users } = useOctokit();
  const [tokenIsLoading, githubToken] = useGithubToken();
  const classes = useStyles();
  const { t } = useTranslation();

  const validateToken = async () => {
    try {
      await users.getAuthenticated();
      setHasValidToken(true);
    } catch (error) {
      setHasValidToken(false);
    }
  };

  const handleOnGithubClick = (...args) => {
    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Connect with Github');
    window.analytics.track('Connect with Github', {
      teamId: url.getAccountIdFromUrl(),
    });

    if (hasValidToken) {
      goToNextStep.apply(null, ...args);
      return;
    }

    openGithubPermissionAccount.apply(null, ...args);
  };

  useEffect(() => {
    if (!tokenIsLoading) {
      if (githubToken) {
        validateToken();
      } else {
        setHasValidToken(false);
      }
    }
  }, [tokenIsLoading, githubToken]);

  return (
    <StepBase
      title={t('sites.start.connectWithGithub.title')}
      subtitle={t('sites.start.connectWithGithub.subtitle')}
    >
      <div className={classes.buttonContainer}>
        <GenericButton
          buttonVariant="branded"
          onClick={handleOnGithubClick}
          loading={hasValidToken === undefined}
          overrideClass={{ button: classes.button }}
        >
          <IconFA
            className={classes.icon}
            icon={['fab', 'github']}
            size="small"
          />
          <Typography className={classes.buttonText} variant="button">
            {t('sites.start.connectWithGithub.buttonMsg')}
          </Typography>
        </GenericButton>
      </div>
    </StepBase>
  );
};

ConnectWithGithub.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default ConnectWithGithub;
