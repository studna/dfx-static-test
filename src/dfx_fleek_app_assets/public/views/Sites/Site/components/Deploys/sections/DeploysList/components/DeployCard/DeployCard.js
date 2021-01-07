import React from 'react';
import { url } from '@Shared';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@terminal-packages/ui/core/Box';
import IconFA from '@terminal-packages/ui/core/IconFA';
import Chip from '@terminal-packages/ui/core/Chip';
import BranchCommitInfo from '../../../shared/components/BranchCommitInfo';
import PullRequestInfo from '../../../shared/components/PullRequestInfo';
import { getFormattedDate } from '../../../shared/utils';

import { DEPLOY_STATUS } from '~/constants';
import useStyles from './styles';

const transKeyPrefix = 'sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.';

const getChipProps = (deploymentStatus, isLastPublishedDeploy) => {
  switch (deploymentStatus) {
    case DEPLOY_STATUS.DEPLOYED: {
      if (isLastPublishedDeploy) {
        return {
          transKey: 'deploymentStatus.published',
          color: 'green',
        };
      }
      return null;
    }
    case DEPLOY_STATUS.IN_PROGRESS:
      return {
        transKey: 'deploymentStatus.inProgress',
        color: 'yellow',
      };
    case DEPLOY_STATUS.FAILED:
      return {
        transKey: 'deploymentStatus.failed',
        color: 'red',
      };
    case DEPLOY_STATUS.CANCELLED:
      return {
        transKey: 'deploymentStatus.cancelled',
        color: 'red',
      };
    default: return null;
  }
};

const DeployCard = ({
  id,
  branch,
  commit,
  status,
  message,
  deployTotalTime,
  deployStartDate,
  repositoryUrl,
  isLastPublishedDeploy,
  deployLabel,
  pullRequestUrl,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const match = useRouteMatch();
  const chipProps = getChipProps(status, isLastPublishedDeploy);
  const deployStartDateFormatted = getFormattedDate(deployStartDate, t);

  const getDeploymentTime = () => {
    if (status === DEPLOY_STATUS.FAILED) {
      return t(`${transKeyPrefix}timeFailedDeploy`);
    }
    if (!deployTotalTime) {
      return t(`${transKeyPrefix}deployTimePlaceholder`);
    }
    return t(`${transKeyPrefix}deployTime`, { time: deployTotalTime });
  };

  return (
    <div className={classes.linkBoundary}>
      <Link
        to={url.buildUrl(null, `${match.url}/${id}`)}
        title={t(`${transKeyPrefix}goToDeployDetails`)}
        className={classes.linkContainer}
        // HACK: this Link component covers components below via CSS
        // it is not a wrapper to avoid nested anchor links
      >
        {null}
      </Link>
      <Box overrideClass={{ wrapper: classes.root }} border>
        <div className={classes.leftPart}>
          <Typography variant="body2" className={classes.bolder}>
            {deployLabel}
          </Typography>
          &nbsp;
          <Typography variant="body2" color="textSecondary" onClick={(e) => e.stopPropagation()}>
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
          </Typography>
          {chipProps && status && (
            <Chip
              size="small"
              color={chipProps.color}
              overrideClass={{ root: classes.chip }}
            >
              {t(chipProps.transKey)}
            </Chip>
          )}
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.deployMessage}
          >
            {message || t(`${transKeyPrefix}deployMessagePlaceholder`)}
          </Typography>
        </div>
        <div className={classes.rightPart}>
          <Typography variant="body2" className={classes.bolder}>
            {deployStartDateFormatted}
          </Typography>
          <Typography variant="caption">
            {getDeploymentTime()}
          </Typography>
        </div>
        <IconFA icon={['far', 'chevron-right']} className={classes.icon} />
      </Box>
    </div>
  );
};

DeployCard.defaultProps = {
  id: '',
  branch: '',
  commit: '',
  status: '',
  message: '',
  deployTotalTime: null,
  deployStartDate: '',
  repositoryUrl: '',
  isLastPublishedDeploy: false,
  pullRequestUrl: null,
};

DeployCard.propTypes = {
  id: PropTypes.string,
  branch: PropTypes.string,
  commit: PropTypes.string,
  pullRequestUrl: PropTypes.string,
  status: PropTypes.oneOf([
    DEPLOY_STATUS.IN_PROGRESS,
    DEPLOY_STATUS.FAILED,
    DEPLOY_STATUS.CANCELLED,
    DEPLOY_STATUS.DEPLOYED,
  ]),
  message: PropTypes.string,
  deployTotalTime: PropTypes.string,
  deployStartDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  repositoryUrl: PropTypes.string,
  isLastPublishedDeploy: PropTypes.bool,
  deployLabel: PropTypes.string.isRequired,
};

export default DeployCard;
