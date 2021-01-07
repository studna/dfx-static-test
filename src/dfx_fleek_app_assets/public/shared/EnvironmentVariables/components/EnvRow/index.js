import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InputSlim from '@terminal-packages/ui/core/InputSlim';

const EnvRow = ({
  classes,
  env,
  onBlur,
}) => {
  const { id, name: initialName, value: initialValue } = env;
  const [state, setState] = useState({
    name: initialName,
    value: initialValue,
  });
  const { t } = useTranslation();

  const onChange = ({ fieldValue, value }) => {
    setState({
      ...state,
      [fieldValue]: value,
    });
  };

  return (
    <>
      <InputSlim
        label={t('sites.start.buildOptions.envVars.keyLabel')}
        placeholder={t('sites.start.buildOptions.envVars.keyPlaceholder')}
        value={state.name || ''}
        onChange={(value) => onChange({ fieldValue: 'name', value })}
        onBlur={() => onBlur({ id, fieldKey: 'name', fieldValue: state.name })}
        className={classes.textInput}
      />
      <InputSlim
        label={t('sites.start.buildOptions.envVars.variableLabel')}
        placeholder={t('sites.start.buildOptions.envVars.variablePlaceholder')}
        value={state.value || ''}
        onChange={(value) => onChange({ fieldValue: 'value', value })}
        onBlur={() => onBlur({ id, fieldKey: 'value', fieldValue: state.value })}
        className={classes.textInput}
      />
    </>
  );
};

EnvRow.propTypes = {
  classes: PropTypes.shape({
    textInput: PropTypes.string,
  }).isRequired,
  env: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default EnvRow;
