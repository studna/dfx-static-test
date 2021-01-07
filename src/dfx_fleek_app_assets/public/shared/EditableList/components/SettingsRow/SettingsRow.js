import React from 'react';
import PropTypes from 'prop-types';
import InputSlim from '@terminal-packages/ui/core/InputSlim';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import useStyles from './styles';

const SettingsRow = ({
  stateKey,
  value,
  label,
  onChange,
  placeholder,
  editingInfo,
  isEditingMode,
  renderEditableComponent,
  hideLabelInEditMode,
  useBigInput,
  renderValue,
}) => {
  const classes = useStyles({ isEditingMode });

  const getValue = () => {
    if (isEditingMode) {
      return (
        <div className={classes.editInputWrapper}>
          {renderEditableComponent
            ? renderEditableComponent(value, onChange)
            : (
              <>
                <InputSlim
                  placeholder={placeholder}
                  className={classnames(classes.input, {
                    [classes.bigInput]: useBigInput,
                  })}
                  value={value}
                  onChange={(newValue) => onChange(stateKey, newValue)}
                />
                {editingInfo && (
                  <Typography
                    color="textSecondary"
                    className={classes.info}
                  >
                    {editingInfo}
                  </Typography>
                )}
              </>
            )}
        </div>
      );
    }

    return (
      <Typography
        variant="body2"
        className={classes.value}
        color={value ? undefined : 'textSecondary'}
      >
        {renderValue(value) || placeholder}
      </Typography>
    );
  };

  const hideLabel = hideLabelInEditMode && isEditingMode;

  return (
    <>
      {(!hideLabel && (
        <Typography variant="body2" className={classes.label}>
          {label}
        </Typography>
      ))}
      {getValue()}
    </>
  );
};

SettingsRow.defaultProps = {
  stateKey: '',
  value: '',
  placeholder: '',
  editingInfo: '',
  onChange: undefined,
  renderEditableComponent: undefined,
  label: null,
  hideLabelInEditMode: false,
  useBigInput: false,
  renderValue: (value) => value,
};

SettingsRow.propTypes = {
  isEditingMode: PropTypes.bool.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  editingInfo: PropTypes.string,
  onChange: PropTypes.func,
  stateKey: PropTypes.string,
  renderEditableComponent: PropTypes.func,
  renderValue: PropTypes.func,
  hideLabelInEditMode: PropTypes.bool,
  useBigInput: PropTypes.bool,
};

export default SettingsRow;
