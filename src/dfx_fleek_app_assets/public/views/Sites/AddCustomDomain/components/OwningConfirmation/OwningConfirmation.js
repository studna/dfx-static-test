import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const OwningConfirmation = ({
  onCancel,
  onConfirm,
  loading,
  domainName,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <div className={classes.question}>
        <Typography variant="body2">{domainName}</Typography>
        &nbsp;
        <Typography variant="body2" color="textSecondary">
          {t('addCustomDomain.ownerPart.question')}
        </Typography>
      </div>
      <div className={classes.actionsWrapper}>
        <GenericButton
          loading={loading}
          disabled={loading}
          buttonVariant="primary"
          onClick={onConfirm}
          overrideClass={{
            button: classes.confirmButton,
          }}
        >
          {t('addCustomDomain.ownerPart.confirm')}
        </GenericButton>
        <GenericButton
          disabled={loading}
          buttonVariant="secondary"
          onClick={onCancel}
        >
          {t('addCustomDomain.ownerPart.cancel')}
        </GenericButton>
      </div>
    </div>
  );
};

OwningConfirmation.propTypes = {
  loading: PropTypes.bool.isRequired,
  domainName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default OwningConfirmation;
