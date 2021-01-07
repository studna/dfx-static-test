import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import useStyles from './styles';

const PullRequestInfo = ({ pullRequestUrl, branch }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Trans
      i18nKey="sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.prTitle"
      values={{ prNumber: `#${pullRequestUrl.split('/').slice(-1)}`, branch }}
      components={[
        <a
          href={pullRequestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.externalLink}
          title={t('sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.goToPR')}
        >
          {null}
        </a>,
      ]}
    />
  );
};

PullRequestInfo.defaultProps = {
  branch: '',
};

PullRequestInfo.propTypes = {
  pullRequestUrl: PropTypes.string.isRequired,
  branch: PropTypes.string,
};

export default PullRequestInfo;
