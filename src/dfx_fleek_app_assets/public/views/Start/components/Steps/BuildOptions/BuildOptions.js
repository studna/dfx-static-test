import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import SelectBranch from '@Shared/SelectBranch';
import StepBase from '@Shared/StepBase';
import { url } from '@Shared';

import { GA_EVENTS_CATEGORIES } from '~/constants';
import BuildSettings from './components/BuildSettings';
import SubmitSection from './components/SubmitSection';
import AdvancedSection from './containers/AdvancedSection';
import useStyles from './styles';

const initialState = {
  branchName: undefined,
  buildCommand: '',
  publishDirectory: '',
  dockerImage: '',
  envVars: [],
  isEnvVarsError: false,
  framework: null,
};

const getDeployMutationInput = (state, repositoryUrl, installationId) => {
  const environmentVariables = state.envVars
    .filter(({ name }) => !!name)
    .map(({ name, value }) => ({ name, value }));

  const dockerImage = state.dockerImage ? state.dockerImage.trim() : undefined;

  return {
    teamId: getAccountIdFromUrl(),
    githubRepositoryUrl: repositoryUrl,
    repositoryBranch: state.branchName,
    buildCommand: state.buildCommand || undefined,
    publishDirectoryPath: state.publishDirectory || undefined,
    environmentVariables: environmentVariables.length
      ? environmentVariables
      : undefined,
    installationId,
    dockerImage: dockerImage === '' ? undefined : dockerImage,
  };
};

const BuildOptions = ({ onClickDeploy, isDeployLoading }) => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();
  const { installationId, accountName, repoName } = useParams();

  const fullRepoName = `${accountName}/${repoName}`;
  const deployMutationInput = getDeployMutationInput(
    state,
    `https://api.github.com/repos/${fullRepoName}`,
    installationId,
  );

  const handleClickOnDeploy = async () => {
    window.ga(
      'send',
      'event',
      GA_EVENTS_CATEGORIES.SITES,
      'User triggered deploy',
      `${deployMutationInput.repositoryBranch}, ${state.framework && state.framework.id}, ${deployMutationInput.dockerImage}, ${deployMutationInput.buildCommand}, ${deployMutationInput.publishDirectoryPath}`,
    );

    try {
      const { data } = await onClickDeploy({
        variables: {
          input: deployMutationInput,
        },
      });

      const siteId = get(data, 'addSite.id');

      window.analytics.track('Add Site Deployment', {
        siteId,
        teamId: url.getAccountIdFromUrl(),
        dockerImage: deployMutationInput.dockerImage,
        buildCommand: deployMutationInput.buildCommand,
        framework: state.framework && state.framework.id,
        repositoryBranch: deployMutationInput.repositoryBranch,
        publishDirectoryPath: deployMutationInput.publishDirectoryPath,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error during addSite mutation:', err);
    }
  };

  const isSubmitButtonDisabled = !state.branchName || state.isEnvVarsError;

  return (
    <StepBase
      title={t(
        'sites.start.buildOptions.cardTitle',
        { repository: `${accountName}/${repoName}` },
      )}
      subtitle={t('sites.start.buildOptions.cardSubtitle')}
    >
      <>
        <div className={classes.inputContainer}>
          <InputWithError
            label={t('sites.start.buildOptions.repository')}
            value={fullRepoName}
            disabled
            className={classes.textInput}
          />
          <SelectBranch
            repositoryName={repoName}
            defaultBranchName="master"
            githubAccountName={accountName}
            branch={state.branchName}
            setBranch={(branchName) => setState({
              ...state,
              branchName,
            })}
          />
        </div>
        <div className={classes.secondaryTitleComponent}>
          <Typography variant="body1" className={classes.title}>
            {t('sites.start.buildOptions.title')}
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            {t('sites.start.buildOptions.subtitle')}
          </Typography>
          <a
            href="https://docs.fleek.co/hosting/site-deployment/#build-parameters"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.docs}
          >
            <ArrowLink>{t('sites.start.buildOptions.docs')}</ArrowLink>
          </a>
        </div>
        <BuildSettings
          repositoryName={repoName}
          githubAccountName={accountName}
          branch={state.branchName || 'master'}
          buildCommand={state.buildCommand}
          publishDirectory={state.publishDirectory}
          dockerImage={state.dockerImage}
          framework={state.framework}
          onChangeState={(newState) => setState({
            ...state,
            ...newState,
          })}
          isFieldsDisabled={isDeployLoading}
        />
        <div className={classes.buttonContainer}>
          <AdvancedSection state={state} setState={setState} />
        </div>
        <div className={classes.buttonContainer}>
          <SubmitSection
            isDeployLoading={isDeployLoading}
            onDeploy={handleClickOnDeploy}
            disabled={isSubmitButtonDisabled}
            deployMutationInput={deployMutationInput}
          />
        </div>
      </>
    </StepBase>
  );
};

BuildOptions.propTypes = {
  isDeployLoading: PropTypes.bool.isRequired,
  onClickDeploy: PropTypes.func.isRequired,
};

export default BuildOptions;
