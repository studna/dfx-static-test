import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import EnvironmentVariables from '@Shared/EnvironmentVariables';
import useStyles from './styles';

const AdvancedSection = ({ state, setState }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isShownAdvanced, setIsShownAdvanced] = useState(false);
  const isAnyEnvVar = state.envVars.length > 0;

  useEffect(() => {
    if (isAnyEnvVar) {
      setIsShownAdvanced(true);
    }
  }, [isAnyEnvVar]);

  const onClickShowAdvanced = () => {
    setIsShownAdvanced(true);
  };

  const onChangeEnvVars = (envVars) => {
    setState({
      ...state,
      envVars,
      isEnvVarsError: envVars.some(({ errorMessage }) => errorMessage),
    });
  };

  if (isShownAdvanced) {
    return (
      <div>
        <Typography variant="body1" className={classes.title}>
          {t('sites.start.buildOptions.envVars.title')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('sites.start.buildOptions.envVars.subtitle')}
        </Typography>
        <div className={classes.envVarsListWrapper}>
          <EnvironmentVariables
            variables={state.envVars}
            onChange={onChangeEnvVars}
          />
        </div>
      </div>
    );
  }

  return (
    <GenericButton
      buttonVariant="secondary"
      onClick={onClickShowAdvanced}
    >
      {t('sites.start.buildOptions.showAdvanced')}
    </GenericButton>
  );
};

AdvancedSection.propTypes = {
  state: PropTypes.shape({
    envVars: PropTypes.array,
    dockerImage: PropTypes.string,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default AdvancedSection;
