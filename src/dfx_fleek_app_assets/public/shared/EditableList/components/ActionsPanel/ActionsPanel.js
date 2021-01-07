import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const ActionsPanel = ({
  onSave,
  loading,
  onCancel,
  disabled,
  isEditingMode,
  goToEditButtonText,
  setIsEditingMode,
  goToEditButtonClass,
  isSubmitButtonDisabled,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const overrideClass = {
    button: classes.button,
  };

  const switchToEditingMode = () => setIsEditingMode(true);

  const switchToViewingMode = () => setIsEditingMode(false);

  if (isEditingMode) {
    return (
      <div className={classes.buttonsWrapper}>
        <GenericButton
          buttonVariant="primary"
          loading={loading}
          onClick={() => {
            switchToViewingMode();
            onSave();
          }}
          overrideClass={overrideClass}
          disabled={isSubmitButtonDisabled}
        >
          {t('common.save')}
        </GenericButton>
        <GenericButton
          buttonVariant="secondary"
          onClick={() => {
            switchToViewingMode();
            onCancel();
          }}
          overrideClass={overrideClass}
        >
          {t('common.cancel')}
        </GenericButton>
      </div>
    );
  }
  return (
    <div className={classes.buttonsWrapper}>
      <GenericButton
        key="go-to-edit" // to remount button and avoid ripple effect from previous click
        buttonVariant="secondary"
        disabled={disabled}
        onClick={switchToEditingMode}
        overrideClass={{
          button: classnames(overrideClass.button, goToEditButtonClass),
        }}
      >
        {goToEditButtonText}
      </GenericButton>
    </div>
  );
};

ActionsPanel.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  loading: false,
  disabled: false,
  goToEditButtonText: '',
  goToEditButtonClass: '',
  isSubmitButtonDisabled: false,
};

ActionsPanel.propTypes = {
  disabled: PropTypes.bool,
  isEditingMode: PropTypes.bool.isRequired,
  setIsEditingMode: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  goToEditButtonText: PropTypes.string,
  goToEditButtonClass: PropTypes.string,
  isSubmitButtonDisabled: PropTypes.bool,
};

export default ActionsPanel;
