import React from 'react';
import get from 'lodash/get';
import { url } from '@Shared';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';
import GoBackLink from '@Shared/Layout/components/GoBackLink';
import { DEPLOY_STATUS } from '~/constants';
import { DeployLog, DeployStatus, SummaryList } from '../../sections';
import useStyles from './styles';

const getDeploy = (deploys, deployId) => {
  const { data } = deploys;
  const deploysList = get(data, 'getDeploysBySite.deploys', []);
  const foundDeploy = deploysList.find((deploy) => deploy.id === deployId);

  return foundDeploy || {};
};

const DeployDetails = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { deploys, siteBySlug } = props;
  const { loading } = deploys;
  const match = useRouteMatch();
  const history = useHistory();

  const { params: { deployId } } = match;

  const deploy = getDeploy(deploys, deployId);

  const { status, log, previewImage } = deploy;

  const handleBackBtnClick = () => {
    const allDeploysUrl = url.buildUrl(null, `/sites/${match.params.siteSlug}/deploys`);
    history.push(allDeploysUrl);
  };

  return (
    <div id="test-sites-deploy-details">
      <div className={classes.goBackContainer}>
        <GoBackLink
          buttonText={t('sites.deploys.backToDeploys')}
          onClick={handleBackBtnClick}
        />
      </div>
      <DeployStatus
        deploy={deploy}
        siteBySlug={siteBySlug}
      />
      {status === DEPLOY_STATUS.DEPLOYED && (
        <div className={classes.summaryListContainer}>
          <SummaryList deploy={deploy} />
        </div>
      )}
      <DeployLog
        contentText={log}
        showPreviewButton
        previewDestination={previewImage}
        loading={loading}
      />
    </div>
  );
};

DeployDetails.defaultProps = {
  siteBySlug: {
    data: null,
    error: null,
    loading: false,
  },
  deploys: {
    data: null,
    error: null,
    loading: false,
  },
};

DeployDetails.propTypes = {
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
  deploys: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
};


export default DeployDetails;
