import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { newApiClient } from '@Clients';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import EditableList from '@Shared/EditableList';
import { url } from '@Shared';

import {
  EDIT_BUILD_SETTINGS,
} from '../../../../../../graphql/mutations';
import useStyles from './styles';
import { GA_EVENTS_CATEGORIES } from '~/constants';

const BuildSettings = (props) => {
  const {
    repo,
    siteId,
    buildSettings,
  } = props;

  const buildCmd = get(buildSettings, 'buildCommand', '') || '';
  const baseDir = get(buildSettings, 'baseDirectoryPath', '') || '';
  const publishDir = get(buildSettings, 'publishDirectoryPath', '') || '';

  const { t } = useTranslation();
  const classes = useStyles(props);

  const [editBuildSettings] = useMutation(
    EDIT_BUILD_SETTINGS,
    { client: newApiClient },
  );

  const onSubmitChanges = async (values) => {
    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Edit deploy settings', `${values.buildCmd}, ${values.publishDir}`);
    window.analytics.track('Edit deploy settings', {
      siteId,
      buildCmd: values.buildCmd,
      publishDir: values.publishDir,
      teamId: url.getAccountIdFromUrl(),
    });

    try {
      await editBuildSettings({
        variables: {
          input: {
            siteId,
            ...(values.buildCmd !== buildCmd && { buildCommand: values.buildCmd }),
            ...(values.baseDir !== baseDir && { baseDirectoryPath: values.baseDir }),
            ...(values.publishDir !== publishDir && { publishDirectoryPath: values.publishDir }),
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editBuildSettings: {
            id: siteId,
            buildSettings: {
              ...buildSettings,
              ...(values.buildCmd !== buildCmd && { buildCommand: values.buildCmd }),
              ...(values.baseDir !== baseDir && { baseDirectoryPath: values.baseDir }),
              ...(values.publishDir !== publishDir && { publishDirectoryPath: values.publishDir }),
            },
            __typename: 'Site',
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error editing build settings:', error.message);
    }
  };

  const data = [
    {
      label: t('siteSettings.deployment.buildSettings.repository'),
      value: repo,
    },
    {
      stateKey: 'baseDir',
      label: t('siteSettings.deployment.buildSettings.baseDirectory'),
      value: baseDir,
      placeholder: t('siteSettings.deployment.buildSettings.notSet'),
      editingInfo: t('siteSettings.deployment.buildSettings.baseDirectoryTip'),
    },
    {
      stateKey: 'buildCmd',
      label: t('siteSettings.deployment.buildSettings.buildCommand'),
      value: buildCmd,
    },
    {
      stateKey: 'publishDir',
      label: t('siteSettings.deployment.buildSettings.publishDirectory'),
      value: publishDir,
    },
  ];

  return (
    <CardTitled
      mainContent={t('siteSettings.deployment.buildSettings.title')}
      classes={{
        content: classes.sectionContent,
      }}
    >
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
            {t('siteSettings.deployment.buildSettings.learnMore')}
          </ArrowLink>
        </a>
      </EditableList>
    </CardTitled>
  );
};

BuildSettings.defaultProps = {
  repo: null,
  siteId: null,
};

BuildSettings.propTypes = {
  repo: PropTypes.string,
  siteId: PropTypes.string,
  buildSettings: PropTypes.shape({
    buildSettings: PropTypes.string,
    buildCmd: PropTypes.string,
    publishDir: PropTypes.string,
  }).isRequired,
};

export default BuildSettings;
