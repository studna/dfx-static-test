import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';
import ButtonBase from '@material-ui/core/ButtonBase';
import EnvRow from './components/EnvRow';
import useStyles from './styles';

let nextEnvRowId = 0;
const getNextEnvRowId = () => {
  nextEnvRowId += 1;
  return nextEnvRowId;
};

const containsOnlyAllowedChars = /^[a-zA-Z0-9_]*$/;
const startsWithLetter = /^[a-zA-Z]/;

const getErrorMessage = (variableName, t) => {
  const translationPrefix = 'sites.start.buildOptions.envVars.errors.';
  if (!variableName) {
    return null;
  }
  if (!containsOnlyAllowedChars.test(variableName)) {
    return t(`${translationPrefix}onlyAlphaNumericAndUnderscore`);
  }
  if (!startsWithLetter.test(variableName)) {
    return t(`${translationPrefix}startWithLetter`);
  }
  return null;
};

const envVarsInitialState = [{
  id: getNextEnvRowId(),
}];

const EnvironmentVariables = ({
  variables,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onBlur = ({ id, fieldKey, fieldValue }) => {
    const newEnvVarsList = variables.map((variable) => {
      if (variable.id === id) {
        const newVariableData = {
          ...variable,
          [fieldKey]: fieldValue,
        };
        return {
          ...newVariableData,
          errorMessage: getErrorMessage(newVariableData.name, t),
        };
      }
      return variable;
    });

    onChange(newEnvVarsList);
  };

  const onNewVariable = () => {
    onChange([
      ...variables,
      { id: getNextEnvRowId() },
    ]);
  };

  const onDeleteVariable = (envId) => {
    onChange(variables.filter(({ id }) => id !== envId));
  };

  useEffect(() => {
    if (!variables.length) {
      onChange(envVarsInitialState);
    } else {
      const envsWithId = variables.map((variable) => ({
        ...variable,
        id: getNextEnvRowId(),
      }));
      onChange(envsWithId);
    }
  }, []);

  return (
    <div>
      {
        variables.map((env) => (
          <div
            className={classes.inputContainer}
            key={env.id ? `${env.id}` : env.name}
          >
            <EnvRow
              classes={classes}
              env={env}
              onBlur={onBlur}
            />
            <ButtonBase
              onClick={() => onDeleteVariable(env.id)}
              className={classes.iconContainer}
            >
              <IconFA icon={['fal', 'times-circle']} />
            </ButtonBase>
            <p className={classes.errorMessage}>{env.errorMessage}</p>
          </div>
        ))
      }
      <GenericButton
        onClick={onNewVariable}
        buttonVariant="secondary"
      >
        {t('sites.start.buildOptions.envVars.newVar')}
      </GenericButton>
    </div>
  );
};

EnvironmentVariables.defaultProps = {
  variables: [],
  onChange: () => {},
};

EnvironmentVariables.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

export default EnvironmentVariables;
