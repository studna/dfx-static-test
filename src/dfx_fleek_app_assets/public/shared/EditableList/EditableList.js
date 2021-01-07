import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StripedList from '@terminal-packages/ui/core/StripedList';

import useStyles from './styles';
import SettingsRow from './components/SettingsRow';
import ActionsPanel from './components/ActionsPanel';
import { isDifferentSetsOfData } from './utils';

const BuildSettings = (props) => {
  const {
    data,
    children,
    disabled,
    isFetchingData,
    onSubmitChanges,
    goToEditButtonText,
    goToEditButtonClass,
  } = props;

  const initialState = data.reduce((result, item) => ({
    ...result,
    [item.stateKey]: item.value,
  }), {});
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [values, setValues] = useState(initialState);

  const classes = useStyles(props);

  const onChange = (stateKey, value) => setValues({
    ...values,
    [stateKey]: value,
  });

  const onSave = async () => {
    onSubmitChanges(values);
  };

  const onCancel = () => setValues(initialState);

  useEffect(() => {
    if (isDifferentSetsOfData(values, data)) {
      setValues(initialState);
    }
  }, [data]);

  return (
    <>
      <StripedList>
        {data.map(({
          label,
          stateKey,
          placeholder,
          editingInfo,
          renderEditableComponent,
          hideIfNoValue,
          hideLabelInEditMode,
          useBigInput,
          renderValue,
        }) => {
          const editingMode = !!(stateKey && isEditingMode && onChange);
          const value = values[stateKey];

          if (hideIfNoValue && value === '' && !editingMode) {
            return null;
          }

          return (
            <div className={classes.dataRow} key={label}>
              <SettingsRow
                label={label}
                stateKey={stateKey}
                onChange={onChange}
                value={values[stateKey]}
                placeholder={placeholder}
                editingInfo={editingInfo}
                renderEditableComponent={renderEditableComponent}
                renderValue={renderValue}
                isEditingMode={editingMode}
                hideLabelInEditMode={hideLabelInEditMode}
                useBigInput={useBigInput}
              />
            </div>
          );
        })}
      </StripedList>
      <div className={classes.sectionFooter}>
        {children}
        <ActionsPanel
          onSave={onSave}
          loading={isFetchingData}
          disabled={disabled}
          onCancel={onCancel}
          isEditingMode={isEditingMode}
          setIsEditingMode={setIsEditingMode}
          goToEditButtonText={goToEditButtonText}
          goToEditButtonClass={goToEditButtonClass}
        />
      </div>
    </>
  );
};

BuildSettings.defaultProps = {
  data: [],
  children: null,
  onSubmitChanges: () => {},
  goToEditButtonText: '',
  isFetchingData: false,
  goToEditButtonClass: '',
  disabled: false,
};

BuildSettings.propTypes = {
  disabled: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      stateKey: PropTypes.string, // value will be returned under this key,
      // ^ if there is no key, value is immutable
      placeholder: PropTypes.string,
      renderEditableComponent: PropTypes.func,
      renderValue: PropTypes.func,
    }),
  ),
  children: PropTypes.node,
  onSubmitChanges: PropTypes.func,
  goToEditButtonText: PropTypes.string,
  isFetchingData: PropTypes.bool,
  goToEditButtonClass: PropTypes.string,
};

export default BuildSettings;
