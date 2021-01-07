import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';
import { useQuery } from '@apollo/react-hooks';
import getEthereumInfo from '@Shared/web3/get-ethereum-info';
import { GET_ENS_DOMAIN_INFO, GET_ENS_CONTROLLER_ADDRESS } from '@Shared/graphql/queries';
import { newApiClient } from '@Clients';

import useStyles from './styles';

const SetEnsControllerModal = ({
  open,
  onClose,
  onSubmit,
  state,
  setState,
  ensDomain,
  siteId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const isResolverMigrated = get(ensDomain, 'isResolverMigrated', false);
  const isFleekControlled = get(ensDomain, 'isFleekControlled', false);

  // If the domain is already controlled by fleek. We verify the ownership
  const showVerifyOwnership = isFleekControlled;

  const domain = get(ensDomain, 'domain');
  const [showMigrateStep, setShowMigrateStep] = useState(false);

  const ethereumInfo = getEthereumInfo();

  // pre-load the controller address
  useQuery(GET_ENS_CONTROLLER_ADDRESS, {
    variables: {
      siteId,
    },
    client: newApiClient,
  });

  const { data, startPolling, stopPolling } = useQuery(GET_ENS_DOMAIN_INFO, {
    client: newApiClient,
    variables: {
      network: ethereumInfo.network,
      domain,
    },
    skip: !showMigrateStep || !open,
  });

  const isMigratedFromQuery = get(data, 'getEnsDomainInfo.isResolverMigrated', false);

  const resolverMigrated = isResolverMigrated || isMigratedFromQuery;

  useEffect(() => {
    if (!open) {
      setShowMigrateStep(false);
    }
    if (open && !isResolverMigrated) {
      setShowMigrateStep(true);
    }
    setState(() => ({
      ...state,
      loading: false,
      error: null,
    }));
  }, [open]);

  useEffect(() => {
    if (open && !resolverMigrated && showMigrateStep && data) {
      startPolling(3000);
    }

    if (!open || resolverMigrated) {
      stopPolling();
    }
  }, [open, resolverMigrated, showMigrateStep, data]);

  useEffect(() => () => stopPolling());

  const getMigrateStep = () => {
    if (!showMigrateStep) {
      return null;
    }

    return (
      <>
        <div>
          <Typography variant="body2" className={classnames(classes.subtitle, classes.migrateStepTitleText)}>
            {t('sites.tabs.settings.ens.setControllerModal.migrateEnsStep', {
              stepNumber: 1,
            })}
          </Typography>
          {(resolverMigrated) && (
          <div className={classes.verifiedContainer}>
            <div className={classes.checkmark}>
              <IconFA
                icon={['far', 'check']}
                fontSize="inherit"
              />
            </div>
            <Typography className={classes.verifiedText}>
              {t('sites.tabs.settings.ens.setControllerModal.migrated')}
            </Typography>
          </div>
          )}
        </div>
        <Typography variant="body2" className={classes.description}>
          {t('sites.tabs.settings.ens.setControllerModal.migrateEnsParagraph')}
        </Typography>
        <GenericButton
          buttonVariant="primary"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://app.ens.domains/name/${domain}`}
          disabled={resolverMigrated}
        >
          <Typography variant="body2">
            {t('sites.tabs.settings.ens.setControllerModal.migrate')}
          </Typography>
        </GenericButton>
      </>
    );
  };

  const getSetFleekControllerStep = () => (
    <>
      <Typography variant="body2" className={classes.subtitle}>
        {t('sites.tabs.settings.ens.setControllerModal.setControllerStep', {
          stepNumber: showMigrateStep ? 2 : 1,
        })}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {t('sites.tabs.settings.ens.setControllerModal.setControllerParagraph')}
      </Typography>

      <div className={classes.buttonContainer}>
        <GenericButton buttonVariant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </GenericButton>
        <GenericButton
          buttonVariant="primary"
          onClick={onSubmit}
          loading={state.loading}
          disabled={!resolverMigrated}
        >
          {t('sites.tabs.settings.ens.setControllerModal.setControllerButton')}
        </GenericButton>
      </div>
    </>
  );

  const getVerifyOwnershipStep = () => (
    <>
      <Typography variant="body2" className={classes.subtitle}>
        {t('sites.tabs.settings.ens.setControllerModal.verifyOwnershipStep', {
          stepNumber: showMigrateStep ? 2 : 1,
        })}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {t('sites.tabs.settings.ens.setControllerModal.verifyOwnershipParagraph')}
      </Typography>

      <div className={classes.buttonContainer}>
        <GenericButton buttonVariant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </GenericButton>
        <GenericButton
          buttonVariant="primary"
          onClick={onSubmit}
          loading={state.loading}
          disabled={!resolverMigrated}
        >
          {t('sites.tabs.settings.ens.setControllerModal.verifyOwnershipButton')}
        </GenericButton>
      </div>
    </>
  );

  return (
    <BaseModal
      open={open}
      title={t('sites.tabs.settings.ens.setControllerModal.title')}
      maxWidth={700}
      onClose={onClose}
      className={classnames(classes.modal, {
        [classes.error]: state.error,
      })}
    >
      {state.error && (
        <div
          className={classnames(classes.messageBox, {
            [classes.errorBox]: state.error.type === 'error',
            [classes.warningBox]: state.error.type === 'warning',
          })}
        >
          {state.error.message}
        </div>
      )}
      {getMigrateStep()}
      {showVerifyOwnership ? getVerifyOwnershipStep() : getSetFleekControllerStep()}
    </BaseModal>
  );
};

SetEnsControllerModal.defaultProps = {
  open: false,
  state: {},
  ensDomain: null,
};

SetEnsControllerModal.propTypes = {
  state: PropTypes.shape({
    error: PropTypes.shape({
      type: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ensDomain: PropTypes.shape({
    isResolverMigrated: PropTypes.bool,
  }),
  siteId: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default SetEnsControllerModal;
