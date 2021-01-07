import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { newApiClient } from '@Clients';
import { useMutation } from '@apollo/react-hooks';
import pickFp from 'lodash/fp/pick';
import classnames from 'classnames';
import get from 'lodash/get';

import StripedList from '@terminal-packages/ui/core/StripedList';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import EnvironmentVariables from '@Shared/EnvironmentVariables';
import ActionsPanel from '@Shared/EditableList/components/ActionsPanel';
import SettingsRow from '@Shared/EditableList/components/SettingsRow';
import { isDifferentSetsOfData } from '@Shared/EditableList/utils';

import {
  EDIT_BUILD_SETTINGS,
} from '../../../../../../graphql/mutations';
import useStyles from './styles';

const EnvVars = (props) => {
  const {
    siteId,
    buildSettings,
  } = props;
  const envVars = get(buildSettings, 'environmentVariables', []);

  const [values, setValues] = useState([]);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [errorEditEnvVarsSetting, setErrorEditEnvVarsSetting] = useState(false);
  const onCancel = () => setValues(envVars);

  const { t } = useTranslation();
  const classes = useStyles({ envVars });

  const [editBuildSettings] = useMutation(
    EDIT_BUILD_SETTINGS,
    { client: newApiClient },
  );

  const onSubmitChanges = async () => {
    try {
      setErrorEditEnvVarsSetting(false);
      const environmentVariables = values
        .filter(({ name }) => !!name)
        .map(pickFp(['name', 'value']));

      await editBuildSettings({
        variables: {
          input: {
            siteId,
            environmentVariables,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editBuildSettings: {
            id: siteId,
            buildSettings: {
              ...buildSettings,
              environmentVariables: environmentVariables.map((env) => ({
                ...env,
                __typename: 'EnvironmentVariable',
              })),
            },
            __typename: 'Site',
          },
        },
      });
    } catch (error) {
      setErrorEditEnvVarsSetting(true);
      // eslint-disable-next-line no-console
      console.error('Error editing environment variables:', error.message);
    }
  };

  useEffect(() => {
    if (isDifferentSetsOfData(
      envVars.map(pickFp(['name', 'value'])),
      values.map(pickFp(['name', 'value'])),
    )) {
      setValues(envVars);
    }
  }, [envVars]);

  const isSubmitButtonDisabled = values.some(
    ({ errorMessage }) => errorMessage,
  );

  return (
    <CardTitled
      mainContent={t('siteSettings.deployment.environmentVariables.title')}
      classes={{
        content: classes.sectionContent,
      }}
    >
      {
        errorEditEnvVarsSetting && (
          <div className={classes.alertContent}>
            <AlertBox
              type="error"
              icon={['fal', 'times-circle']}
              message={t('siteSettings.deployment.environmentVariables.error')}
            />
          </div>
        )
      }
      <Typography variant="body2" className={classes.description}>
        {t('siteSettings.deployment.environmentVariables.subtitle')}
      </Typography>
      {isEditingMode ? (
        <div className={classes.dataWrapper}>
          <EnvironmentVariables
            variables={values}
            onChange={setValues}
          />
        </div>
      ) : (
        <StripedList>
          {values.map(({ name, value }, index) => (
            <div
              className={classnames(classes.envVarRow, classes.dataWrapper)}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <SettingsRow
                label={name}
                value={value}
                isEditingMode={false}
              />
            </div>
          ))}
        </StripedList>
      )}
      <div className={classes.sectionFooter}>
        <a
          href="https://docs.fleek.co/hosting/site-deployment/#configuring-the-deployment"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.resetAnchorStyles}
        >
          <ArrowLink className={classes.link}>
            {t('siteSettings.deployment.environmentVariables.learnMore')}
          </ArrowLink>
        </a>
        <ActionsPanel
          goToEditButtonText={t('siteSettings.editSettings')}
          onSave={onSubmitChanges}
          onCancel={onCancel}
          isEditingMode={isEditingMode}
          setIsEditingMode={setIsEditingMode}
          isSubmitButtonDisabled={isSubmitButtonDisabled}
        />
      </div>
    </CardTitled>
  );
};

EnvVars.propTypes = {
  siteId: PropTypes.string.isRequired,
  buildSettings: PropTypes.shape({
    envVars: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })),
  }).isRequired,
};

export default EnvVars;
