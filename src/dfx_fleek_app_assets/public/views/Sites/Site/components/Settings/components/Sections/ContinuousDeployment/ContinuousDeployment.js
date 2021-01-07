import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';

import {
  BuildSettings,
  DeployContexts,
  DockerFileBox,
  EnvVars,
} from '../../Subsections';
import useStyles from '../shared-styles';
import { SECTION_IDS } from '../../../get-navigation-items';

const ContinuousDeployment = (props) => {
  const { siteBySlug } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();

  const siteId = get(siteBySlug, 'data.getSiteBySlug.id', '');
  const buildSettings = get(siteBySlug, 'data.getSiteBySlug.buildSettings', {});
  const deploySettings = get(siteBySlug, 'data.getSiteBySlug.deploySettings', {});

  return (
    <div id="test-sites-continuos-deployment">
      <Element name={SECTION_IDS.CONTINUOUS_DEPLOYMENT} />
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('siteSettings.sectionTitles.continuousDeployment')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('siteSettings.deployment.subtitle')}
        </Typography>
      </div>
      <BuildSettings
        siteId={siteId}
        repo={get(deploySettings, 'repository.url', '') || ''}
        buildSettings={buildSettings}
      />
      <hr className={classes.spaceBetweenSections} />
      <DeployContexts
        siteId={siteId}
        deploySettings={deploySettings}
        repository={get(siteBySlug, 'data.getSiteBySlug.latestDeploy.repository', {})}
      />
      <hr className={classes.spaceBetweenSections} />
      <Element name={SECTION_IDS.ADVANCED_BUILD_SETTINGS} />
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('siteSettings.deployment.advancedBuildSettings.title')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('siteSettings.deployment.advancedBuildSettings.subtitle')}
        </Typography>
      </div>
      <EnvVars
        siteId={siteId}
        buildSettings={buildSettings}
      />
      <hr className={classes.spaceBetweenSections} />
      <DockerFileBox
        siteId={siteId}
        buildSettings={buildSettings}
      />
    </div>
  );
};

ContinuousDeployment.defaultProps = {
  siteBySlug: {
    loading: true,
    data: null,
    error: null,
  },
};

ContinuousDeployment.propTypes = {
  siteBySlug: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
  }),
};

export default ContinuousDeployment;
