import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';

const BranchCommitInfo = ({ repositoryUrl, branch, commit }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      {branch}
      {commit && (
        <>
          @
          <a
            href={`${repositoryUrl}/commit/${commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.externalLink}
            title={t('sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.goToCommitDetails')}
          >
            {commit.slice(0, 7)}
          </a>
        </>
      )}
    </>
  );
};

BranchCommitInfo.defaultProps = {
  branch: '',
  commit: '',
  repositoryUrl: '',
};

BranchCommitInfo.propTypes = {
  branch: PropTypes.string,
  commit: PropTypes.string,
  repositoryUrl: PropTypes.string,
};

export default BranchCommitInfo;
