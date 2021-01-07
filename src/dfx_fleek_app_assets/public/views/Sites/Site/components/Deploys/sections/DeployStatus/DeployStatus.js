import React from 'react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import {
  getGithubRepositoryData,
  getDeployLabel,
} from '@Shared';
import { DEPLOY_STATUS } from '~/constants';
import BranchCommitInfo from '../shared/components/BranchCommitInfo';
import PullRequestInfo from '../shared/components/PullRequestInfo';
import { mapDeploy } from './utils';

import {
  // CancelButton,
  RetryButton,
  // PublishButton,
} from './Components';

import { Header, SettingsButton } from '../shared/components';
import useStyles from './styles';

const DeployStatus = (props) => {
  const { deploy, siteBySlug } = props;
  const site = get(siteBySlug, 'data.getSiteBySlug', {});
  const siteId = get(site, 'id', null);
  const { url: repositoryUrl } = getGithubRepositoryData(siteBySlug);
  const { t } = useTranslation();

  const {
    inProgress,
    published,
    branch,
    commit,
    startedAt,
    previewUrl,
    status,
    pullRequestUrl,
  } = mapDeploy(deploy, t);

  const classes = useStyles(props);

  const linkButton = (
    <GenericButton
      upperCase={false}
      overrideClass={{ button: classes.linkButton }}
    >
      <>
        <Typography variant="caption">
          {t('sites.tabs.deploys.sections.deployStatus.previewDeploy')}
        </Typography>
        <IconFA
          className={classes.icon}
          color="inherit"
          icon={['fal', 'long-arrow-right']}
        />
      </>
    </GenericButton>
  );

  const getSubtitle = () => {
    const subtitle = 'sites.tabs.deploys.sections.deployStatus';
    let content = '';

    const successfulDeploy = status === DEPLOY_STATUS.DEPLOYED && !published;
    const publishedDeploy = status === DEPLOY_STATUS.DEPLOYED && published;
    const cancelledDeploy = status === DEPLOY_STATUS.CANCELLED;
    const failedDeploy = status === DEPLOY_STATUS.FAILED;

    if (inProgress) {
      content = (
        <>
          <span>{t(`${subtitle}.deployInProgress`)}</span>
          <div className={classes.gearIcon}>
            <IconFA
              fontSize="inherit"
              icon={['fal', 'cog']}
            />
          </div>
        </>
      );
    } else if (publishedDeploy) {
      content = t(`${subtitle}.publishedDeploy`);
    } else if (successfulDeploy) {
      content = t(`${subtitle}.deploySuccessful`);
    } else if (cancelledDeploy) {
      content = t(`${subtitle}.deployCancelled`);
    } else if (failedDeploy) {
      content = t(`${subtitle}.deployFailed`);
    }
    return content;
  };

  return (
    <Header
      title={t('sites.tabs.deploys.sections.deployStatus.title')}
      subtitle={getSubtitle()}
      description={(
        <Typography variant="caption" color="textSecondary">
          {getDeployLabel(t, deploy)}
          &nbsp;
          {pullRequestUrl ? (
            <PullRequestInfo
              branch={branch}
              pullRequestUrl={pullRequestUrl}
            />
          ) : (
            <BranchCommitInfo
              branch={branch}
              commit={commit}
              repositoryUrl={repositoryUrl}
            />
          )}
          &nbsp;
          {startedAt}
        </Typography>
      )}
    >
      <>
        {!inProgress ? (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.previewLink}
          >
            {linkButton}
          </a>
        ) : (
          <Typography className={classes.description} variant="body2">
            {t('sites.tabs.deploys.sections.deployStatus.description')}
          </Typography>
        )}
        <div className={classes.buttonsContainer}>
          <SettingsButton />
          {
            inProgress ? (
              null
              // <CancelButton
              //   classes={classes}
              //   setMutationInProgress={setMutationInProgress}
              //   disabled={mutationInProgress}
              //   t={t}
              // />
            ) : (
              <>
                {/* {!published && (
                  <PublishButton
                    classes={classes}
                    setMutationInProgress={setMutationInProgress}
                    disabled={mutationInProgress}
                    t={t}
                  />
                )} */}
                {
                  <RetryButton
                    disabled={!siteId}
                    siteId={siteId}
                    t={t}
                  />
                }
              </>
            )
          }
        </div>
      </>
    </Header>
  );
};

DeployStatus.defaultProps = {
  deploy: {},
  siteBySlug: {
    data: null,
    error: null,
    loading: false,
  },
};

DeployStatus.propTypes = {
  deploy: PropTypes.shape({}),
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
};

export default DeployStatus;
