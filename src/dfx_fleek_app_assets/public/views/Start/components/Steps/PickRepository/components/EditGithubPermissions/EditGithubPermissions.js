import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';

import useGithubInstallationLink from '../../../shared/hooks/use-github-installation-link';
import useStyles from './styles';

const EditGithubPermissions = ({
  onUpdatePermissions,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    isSettingPermissionsCompleted,
    openGithubPermissionsPopup,
  } = useGithubInstallationLink();

  useEffect(
    () => {
      if (isSettingPermissionsCompleted) {
        onUpdatePermissions();
      }
    },
    [isSettingPermissionsCompleted],
  );

  return (
    <div className={classes.root}>
      <Typography variant="body2">
        {t('sites.start.pickRepository.editPermissionsLink.question')}
      </Typography>
      &nbsp;
      <GenericButton
        disableRipple
        disableElevation
        upperCase={false}
        onClick={openGithubPermissionsPopup}
        overrideClass={{ button: classes.linkButton }}
      >
        <ArrowLink>
          {t('sites.start.pickRepository.editPermissionsLink.link')}
        </ArrowLink>
      </GenericButton>
    </div>
  );
};

EditGithubPermissions.propTypes = {
  onUpdatePermissions: PropTypes.func.isRequired,
};

export default EditGithubPermissions;
