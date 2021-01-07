import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import {
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import AlertBox from '@terminal-packages/ui/core/AlertBox';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Box from '@terminal-packages/ui/core/Box';
import useInfiniteScroll from '@Shared/hooks/useInfiniteScroll';

import {
  getGithubRepositoryData,
  getDeployLabel,
} from '@Shared';
import { DEPLOY_STATUS } from '~/constants';

import {
  onTriggerDeployError,
  onTriggerDeployCache,
  onTriggerDeployOnCompleted,
} from './utils/trigger-deploy';

import { TRIGGER_DEPLOY } from '../../../../../graphql/mutations';
import { newApiClient } from '../../../../../../../clients';

import { DeployCard, DeployCardSkeleton } from './components';
import useStyles from './styles';

const updateCache = (previousResult, newResult) => {
  const previousDeploys = get(previousResult, 'getDeploysBySite.deploys', []);
  const newDeploys = get(newResult, 'getDeploysBySite.deploys', []);
  const newNextToken = get(newResult, 'getDeploysBySite.nextToken', null);

  return {
    getDeploysBySite: {
      deploys: [...previousDeploys, ...newDeploys],
      nextToken: newNextToken,
      __typename: 'DeployConnection',
    },
  };
};

const DeploysList = (props) => {
  const [errorTriggerError, setErrorDeployError] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles(props);
  const history = useHistory();
  const match = useRouteMatch();

  const { siteBySlug, deploys } = props;
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id');
  const { data, loading, fetchMore } = deploys;
  const nextToken = get(data, 'getDeploysBySite.nextToken');

  useInfiniteScroll({
    nextToken,
    updateCache,
    fetchMore,
  });

  const { url: repositoryUrl } = getGithubRepositoryData(siteBySlug);

  const deploysList = get(data, 'getDeploysBySite.deploys', []);
  const [triggerDeployMutation, {
    loading: triggerDeployLoading,
  }] = useMutation(
    TRIGGER_DEPLOY, {
      client: newApiClient,
      variables: {
        siteId,
      },
      update: onTriggerDeployCache(siteId),
      onCompleted: (triggerDeployData) => onTriggerDeployOnCompleted(
        triggerDeployData, match, history,
      ),
    },
  );


  const handleTriggerDeployClick = async (event) => {
    event.preventDefault();

    const eventDescription = {
      siteId,
      teamId: get(siteBySlug, 'data.getSiteBySlug.teamId'),
      dockerImage: get(siteBySlug, 'data.getSiteBySlug.buildSettings.dockerImage'),
      buildCommand: get(siteBySlug, 'data.getSiteBySlug.buildSettings.buildCommand'),
      repositoryBranch: get(siteBySlug, 'data.getSiteBySlug.deploySettings.repository.branch'),
      publishDirectoryPath: get(siteBySlug, 'data.getSiteBySlug.buildSettings.publishDirectoryPath'),
    };

    try {
      await triggerDeployMutation();

      window.analytics.track('User triggered deploy', eventDescription);
    } catch (error) {
      eventDescription.error = error.message;
      window.analytics.track('User triggered deploy failed', eventDescription);

      onTriggerDeployError(setErrorDeployError);
    }
  };

  useEffect(() => {
    if (triggerDeployLoading && errorTriggerError) {
      setErrorDeployError(false);
    }
  }, [triggerDeployLoading]);

  const getTotalTime = (deployData) => {
    if (deployData.status !== DEPLOY_STATUS.DEPLOYED) {
      return null;
    }
    const { startedAt, completedAt } = deployData;

    const completedDate = moment(completedAt);
    const startedDate = moment(startedAt);
    const diffTime = moment(completedDate.diff(startedDate));

    const elapsedTime = diffTime.format('m[m ]s[s]');

    return elapsedTime;
  };
  const publishedDeployId = get(
    siteBySlug,
    'data.getSiteBySlug.publishedDeploy.id',
  );

  return (
    <Box>
      <div className={classes.header}>
        <GenericButton
          disabled={!siteId}
          loading={triggerDeployLoading}
          onClick={handleTriggerDeployClick}
          buttonVariant="primary"
        >
          {t('sites.tabs.deploys.sections.deployInfo.listOfDeploys.triggerDeploy')}
        </GenericButton>
      </div>
      {errorTriggerError && (
        <AlertBox
          type="error"
          message={t('siteDeploys.sections.deployInfo.listOfDeploys.errorTriggerDeploy')}
          className={classes.alert}
          icon={['fal', 'times-circle']}
        />
      )}
      {siteId
        ? deploysList.map((deployData) => (
          <div className={classes.deployItem} key={deployData.id}>
            <DeployCard
              id={deployData.id}
              branch={get(deployData, 'repository.branch', '')}
              commit={get(deployData, 'repository.commit', 'head')}
              status={deployData.status}
              message={get(deployData, 'repository.message')}
              deployTotalTime={getTotalTime(deployData)}
              deployStartDate={deployData.startedAt || deployData.id}
              repositoryUrl={repositoryUrl}
              isLastPublishedDeploy={deployData.id === publishedDeployId}
              deployLabel={getDeployLabel(t, deployData)}
              pullRequestUrl={get(deployData, 'pullRequestUrl')}
            />
          </div>
        )) : null}
      {(loading || !siteId) && <DeployCardSkeleton />}
    </Box>
  );
};

DeploysList.defaultProps = {
  siteBySlug: {
    data: null,
    error: null,
    loading: false,
  },
  deploys: {
    data: null,
    error: null,
    loading: false,
    fetchMore: () => {},
  },
};

DeploysList.propTypes = {
  siteBySlug: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
  }),
  deploys: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
    fetchMore: PropTypes.func,
  }),
};

export default DeploysList;
