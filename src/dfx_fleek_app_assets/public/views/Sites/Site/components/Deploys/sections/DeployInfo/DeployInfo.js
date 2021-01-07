import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Header, SettingsButton } from '../shared/components';
import useStyles from './styles';

const DeployInfo = (props) => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const { siteBySlug } = props;
  const autoPublishing = get(siteBySlug, 'data.getSiteBySlug.deploySettings.autoPublishing', null);
  const branch = get(siteBySlug, 'data.getSiteBySlug.deploySettings.repository.branch', 'master');

  let isAuto = '...';
  let description = '';
  if (autoPublishing) {
    isAuto = t('sites.tabs.deploys.sections.deployInfo.on');
    description = t('sites.tabs.deploys.sections.deployInfo.descriptionAuto', {
      branch,
    });
  } else if (autoPublishing === false) {
    isAuto = t('sites.tabs.deploys.sections.deployInfo.off');
    description = t('sites.tabs.deploys.sections.deployInfo.descriptionNotAuto', {
      branch,
    });
  }

  return (
    <Header
      title={t('sites.tabs.deploys.sections.deployInfo.title')}
      subtitle={t('sites.tabs.deploys.sections.deployInfo.subtitle', { isAuto })}
      description={description}
    >
      <div className={classes.buttonsContainer}>
        <SettingsButton />
      </div>
    </Header>
  );
};

DeployInfo.defaultProps = {
  siteBySlug: {},
};

DeployInfo.propTypes = {
  siteBySlug: PropTypes.shape({}),
};

export default DeployInfo;
