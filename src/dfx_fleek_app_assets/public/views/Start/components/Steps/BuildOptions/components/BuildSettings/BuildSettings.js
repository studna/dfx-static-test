import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconFA from '@terminal-packages/ui/core/IconFA';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import { GenericTooltip } from '@terminal-packages/ui/core/Tooltips';
import Spinner from '@terminal-packages/ui/core/Spinner';
import DropdownWithPhoto from '@terminal-packages/ui/core/DropdownWithPhoto';

import getFrameworkOptions from './utils/get-framework-options';
import getSettingsByFramework from './utils/get-settings-by-framework';
import useDefaultBuildSettings from './hooks/use-default-build-settings';
import { OTHER } from '../../constants';
import useStyles from './styles';

const BuildSettings = ({
  isFieldsDisabled,
  buildCommand,
  publishDirectory,
  onChangeState,
  repositoryName,
  githubAccountName,
  branch,
  dockerImage,
  framework,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const options = {
    owner: githubAccountName,
    repo: repositoryName,
    path: '',
    ref: branch,
  };

  const buildDefaultSettings = useDefaultBuildSettings(options);
  const defaultFramework = get(buildDefaultSettings, 'framework');
  const defaultValues = get(buildDefaultSettings, 'defaultValues');
  const isDefaultValuesLoading = buildDefaultSettings === null;

  useEffect(() => {
    if (buildDefaultSettings) {
      const frameworkValues = getSettingsByFramework(defaultValues)[defaultFramework];

      onChangeState({
        ...frameworkValues,
        framework: getFrameworkOptions(t).find(
          (frameworkOption) => frameworkOption.id === defaultFramework,
        ),
      });
    }
  }, [isDefaultValuesLoading]);

  const getOtherFrameworkOption = () => (getFrameworkOptions(t).find(
    (frameworkOption) => frameworkOption.id === OTHER,
  ));

  const getInfoButton = (text = '', helperText = null) => {
    const icon = (
      <ButtonBase className={classes.buttonTooltip}>
        <IconFA
          icon={['fal', 'info-circle']}
          size="inherit"
          className={classes.icon}
        />
      </ButtonBase>
    );
    return (
      <>
        {isDefaultValuesLoading && (
          <Spinner
            positioning="inline"
            fontSize="small"
            className={classes.spinner}
          />
        )}
        <GenericTooltip
          text={text}
          overrideClass={{
            button: classes.iconButton,
            tooltip: classes.tooltip,
          }}
          placement="right"
        >
          {icon}
        </GenericTooltip>
        {helperText && (
          <div className={classes.helperTextWrapper}>
            <IconFA
              icon={['fal', 'exclamation-triangle']}
              size="inherit"
              color="inherit"
              className={classes.helperIcon}
            />
            <Typography className={classes.helperText} variant="caption">
              {helperText}
            </Typography>
          </div>
        )}
      </>
    );
  };

  const listOfFrameworks = getFrameworkOptions(t);

  const selectedFramework = framework && listOfFrameworks.find(
    (currentFramework) => (currentFramework.id === framework.id),
  );

  return (
    <div className={classes.inputContainer}>
      <div className={classes.iconContainer}>
        <DropdownWithPhoto
          value={selectedFramework || {}}
          onSelect={(selection) => {
            const frameworkValues = getSettingsByFramework(defaultValues)[selection.id];
            onChangeState({
              ...frameworkValues,
              framework: selection,
            });
          }}
          label={t('sites.start.buildOptions.framework')}
          objects={listOfFrameworks}
        />
        {
          getInfoButton(t('sites.start.buildOptions.dockerImageTooltip'))
        }
      </div>
      <div className={classes.iconContainer}>
        <InputWithError
          label={t('siteSettings.deployment.dockerFile.label')}
          value={dockerImage}
          className={classes.dockerInput}
          onChange={(event) => {
            onChangeState({
              dockerImage: event.target.value,
              framework: getOtherFrameworkOption(),
            });
          }}
        />
        {
          getInfoButton(t('sites.start.buildOptions.dockerImageTooltip'))
        }
      </div>
      <div className={classes.iconContainer}>
        <InputWithError
          label={t('sites.start.buildOptions.buildCommand')}
          value={buildCommand}
          onChange={(event) => {
            onChangeState({
              buildCommand: event.target.value,
              framework: getOtherFrameworkOption(),
            });
          }}
          className={classes.textInput}
          disabled={isFieldsDisabled || isDefaultValuesLoading}
        />
        {
          getInfoButton(
            t('sites.start.buildOptions.buildCommandTooltip'),
            (buildDefaultSettings && buildDefaultSettings.hasGatsby) && t(
              'sites.start.buildOptions.gatsbyPlugin',
            ),
          )
        }
      </div>
      <div className={classes.iconContainer}>
        <InputWithError
          label={t('sites.start.buildOptions.publishDirectory')}
          value={publishDirectory}
          onChange={(event) => {
            onChangeState({
              publishDirectory: event.target.value,
              framework: getOtherFrameworkOption(),
            });
          }}
          className={classes.textInput}
          disabled={isFieldsDisabled || isDefaultValuesLoading}
        />
        {
          getInfoButton(t('sites.start.buildOptions.publishDirectoryTooltip'))
        }
      </div>
    </div>
  );
};

BuildSettings.defaultProps = {
  repositoryName: '',
  githubAccountName: '',
  branch: '',
  dockerImage: '',
  framework: null,
};

BuildSettings.propTypes = {
  isFieldsDisabled: PropTypes.bool.isRequired,
  buildCommand: PropTypes.string.isRequired,
  publishDirectory: PropTypes.string.isRequired,
  onChangeState: PropTypes.func.isRequired,
  repositoryName: PropTypes.string,
  githubAccountName: PropTypes.string,
  branch: PropTypes.string,
  dockerImage: PropTypes.string,
  framework: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default BuildSettings;
