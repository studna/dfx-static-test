import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { newApiClient } from '@Clients';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import CardTitled from '@terminal-packages/ui/core/CardTitled';

import { url } from '@Shared';
import SelectBranch from '@Shared/SelectBranch';
import EditableList from '@Shared/EditableList';

import SelectDeployPRsPreview from './components/SelectDeployPRsPreview';
import { EDIT_DEPLOY_SETTINGS } from '../../../../../../graphql/mutations';
import useStyles from './styles';
import { GA_EVENTS_CATEGORIES } from '~/constants';

const DeployContexts = (props) => {
  const {
    siteId,
    deploySettings,
    repository: {
      owner,
      name: repositoryName,
    },
  } = props;


  const branch = get(deploySettings, 'repository.branch', '');
  const prDeployPreviews = get(deploySettings, 'prDeployPreviews');

  const { t } = useTranslation();
  const classes = useStyles(props);

  const [editDeploySettingsMutation] = useMutation(EDIT_DEPLOY_SETTINGS, {
    client: newApiClient,
  });

  const [errorEditDeploySetting, setErrorEditDeploySetting] = useState(false);
  const [prodBranch, setProdBranch] = useState(branch);

  const onSubmitChanges = async (values) => {
    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Edit deploy branch', values.prodBranch);
    window.analytics.track('Edit deploy branch', {
      siteId,
      prodBranch: values.prodBranch,
      teamId: url.getAccountIdFromUrl(),
    });

    try {
      setProdBranch(values.prodBranch);
      await editDeploySettingsMutation({
        variables: {
          input: {
            siteId,
            repositoryBranch: values.prodBranch,
            prDeployPreviews: values.prDeployPreviews,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editDeploySettings: {
            id: siteId,
            deploySettings: {
              ...deploySettings,
              repository: {
                ...deploySettings.repository,
                branch: values.prodBranch,
              },
              prDeployPreviews: !!values.prDeployPreviews,
            },
            __typename: 'Site',
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error editing deploy setting:', error.message);
      setErrorEditDeploySetting(true);
      setProdBranch(branch);
    }
  };
  const data = [
    {
      stateKey: 'prodBranch',
      label: t('siteSettings.deployment.deployContexts.productionBranch'),
      value: prodBranch || branch,
      renderEditableComponent: (value, onChange) => (
        <SelectBranch
          defaultBranchName={branch}
          branch={value}
          setBranch={(val) => onChange('prodBranch', val)}
          githubAccountName={owner}
          repositoryName={repositoryName}
        />
      ),
    },
    {
      stateKey: 'prDeployPreviews',
      label: t('siteSettings.deployment.deployContexts.previewPRs.label'),
      value: prDeployPreviews,
      renderValue: (value) => (typeof value === 'boolean'
        ? (
          <Box color="text.primary">
            {t(
              value
                ? 'siteSettings.deployment.deployContexts.previewPRs.onTitle'
                : 'siteSettings.deployment.deployContexts.previewPRs.offTitle',
            )}
          </Box>
        ) : null
      ),
      renderEditableComponent: (value, onChange) => (
        <SelectDeployPRsPreview
          value={value}
          onChange={(val) => {
            onChange('prDeployPreviews', val);
          }}
        />
      ),
    },
  ];

  return (
    <CardTitled
      mainContent={t('siteSettings.deployment.deployContexts.title')}
      classes={{
        content: classes.sectionContent,
      }}
    >
      {
        errorEditDeploySetting && (
          <div className={classes.alertContent}>
            <AlertBox
              type="error"
              icon={['fal', 'times-circle']}
              message={t('siteSettings.deployment.deployContexts.error')}
            />
          </div>
        )
      }
      <Typography variant="body2" className={classes.description}>
        {t('siteSettings.deployment.deployContexts.subtitle')}
      </Typography>
      <div className={classes.sectionFooter}>
        <EditableList
          data={data}
          goToEditButtonText={t('siteSettings.editSettings')}
          onSubmitChanges={onSubmitChanges}
        >
          <a
            href="https://docs.fleek.co/hosting/site-deployment/#previewing-a-deployment"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.resetAnchorStyles}
          >
            <ArrowLink className={classes.link}>
              {t('siteSettings.deployment.deployContexts.learnMore')}
            </ArrowLink>
          </a>
        </EditableList>
      </div>
    </CardTitled>
  );
};

DeployContexts.propTypes = {
  siteId: PropTypes.string.isRequired,
  deploySettings: PropTypes.shape({
    prDeployPreviews: PropTypes.bool,
    repository: PropTypes.shape({
      branch: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  repository: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};


export default DeployContexts;
