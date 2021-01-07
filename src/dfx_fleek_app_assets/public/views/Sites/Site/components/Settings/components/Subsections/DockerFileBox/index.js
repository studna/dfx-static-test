import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import { newApiClient } from '@Clients';
import { useMutation } from '@apollo/react-hooks';


import AlertBox from '@terminal-packages/ui/core/AlertBox';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import CardTitled from '@terminal-packages/ui/core/CardTitled';

import EditableList from '@Shared/EditableList';
import {
  EDIT_BUILD_SETTINGS,
} from '../../../../../../graphql/mutations';
import useStyles from './styles';

const DockerFileBox = (props) => {
  const {
    siteId,
    buildSettings,
  } = props;

  const dockerImage = get(buildSettings, 'dockerImage', '') || '';

  const { t } = useTranslation();
  const classes = useStyles(props);

  const [editBuildSettings] = useMutation(
    EDIT_BUILD_SETTINGS,
    { client: newApiClient },
  );

  const [errorEditDockerSetting, setErrorEditDockerSetting] = useState(false);
  const [dockerFileCurrentValue, setDockerFileCurrentValue] = useState(dockerImage || '');

  useEffect(() => {
    setDockerFileCurrentValue(dockerImage);
  }, [dockerImage]);

  const onSubmitChanges = async (values) => {
    const trimmedDockerImage = values.dockerFile.trim();
    const dockerImageFormatted = trimmedDockerImage === '' ? null : trimmedDockerImage;

    try {
      await editBuildSettings({
        variables: {
          input: {
            siteId,
            dockerImage: dockerImageFormatted,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editBuildSettings: {
            id: siteId,
            buildSettings: {
              ...buildSettings,
              dockerImage: dockerImageFormatted,
            },
            __typename: 'Site',
          },
        },
      });
    } catch (error) {
      setDockerFileCurrentValue(dockerImage);
      setErrorEditDockerSetting(true);
      // eslint-disable-next-line no-console
      console.error('Error editing docker image:', error.message);
    }
  };

  const getLabel = () => (
    <>
      <div className={classes.dockerFirstLine}>
        {t('siteSettings.deployment.dockerFile.labelFirstLine')}
      </div>
      <div>
        {t('siteSettings.deployment.dockerFile.labelSecondLine')}
      </div>
    </>
  );

  const data = [
    {
      stateKey: 'dockerFile',
      placeholder: t('siteSettings.deployment.dockerFile.label'),
      label: getLabel(),
      value: dockerFileCurrentValue || '',
      hideIfNoValue: true,
      hideLabelInEditMode: true,
      useBigInput: true,
    },
  ];

  return (
    <CardTitled
      mainContent={t('siteSettings.deployment.dockerFile.title')}
      classes={{
        content: classes.sectionContent,
      }}
    >
      {
        errorEditDockerSetting && (
          <div className={classes.alertContent}>
            <AlertBox
              type="error"
              icon={['fal', 'times-circle']}
              message={t('siteSettings.deployment.dockerFile.error')}
            />
          </div>
        )
      }
      <Typography variant="body2" className={classes.description}>
        {t('siteSettings.deployment.dockerFile.subtitle')}
      </Typography>
      <div className={classes.sectionFooter}>
        <EditableList
          data={data}
          goToEditButtonText={t('siteSettings.editSettings')}
          onSubmitChanges={onSubmitChanges}
        >
          <a
            href="https://docs.fleek.co/hosting/site-deployment/#configuring-the-deployment"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.resetAnchorStyles}
          >
            <ArrowLink className={classes.link}>
              {t('siteSettings.deployment.dockerFile.learnMore')}
            </ArrowLink>
          </a>
        </EditableList>
      </div>
    </CardTitled>
  );
};

DockerFileBox.propTypes = {
  siteId: PropTypes.string.isRequired,
  buildSettings: PropTypes.shape({
    dockerImage: PropTypes.string,
  }).isRequired,
};

export default DockerFileBox;
