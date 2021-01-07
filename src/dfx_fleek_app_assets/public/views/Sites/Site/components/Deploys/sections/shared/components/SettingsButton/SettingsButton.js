import React from 'react';
import { url } from '@Shared';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { SECTION_IDS } from '../../../../../Settings/get-navigation-items';

import useStyles from './styles';

const SettingsButton = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { params } = useRouteMatch();

  return (
    <Link
      to={url.buildUrl(null, `/sites/${params.siteSlug}/settings/${SECTION_IDS.BUILD_AND_DEPLOY}`)}
      className={classes.link}
    >
      <GenericButton
        buttonVariant="secondary"
        overrideClass={{ button: classes.root }}
      >
        <IconFA icon={['fal', 'cog']} />
        <Typography variant="body2">
          {t('sites.tabs.deploys.sections.deployInfo.button')}
        </Typography>
      </GenericButton>
    </Link>
  );
};

export default SettingsButton;
