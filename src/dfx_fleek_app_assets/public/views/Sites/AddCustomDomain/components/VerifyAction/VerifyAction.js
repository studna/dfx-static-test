import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import useStyles from './styles';

const AddCustomDomain = ({
  loading,
  onVerify,
  onCancel,
  isFormValid,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <GenericButton
        loading={loading}
        buttonVariant="primary"
        onClick={onVerify}
        disabled={!isFormValid}
        overrideClass={{
          button: classes.confirmButton,
        }}
      >
        {t('addCustomDomain.verifyDomain')}
      </GenericButton>
      <GenericButton
        disabled={loading}
        onClick={onCancel}
        buttonVariant="secondary"
      >
        {t('common.cancel')}
      </GenericButton>
    </div>
  );
};

AddCustomDomain.propTypes = {
  onVerify: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired,
};

export default AddCustomDomain;
