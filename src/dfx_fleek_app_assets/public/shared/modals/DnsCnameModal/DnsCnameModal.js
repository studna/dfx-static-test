import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import useStyles from './styles';
import { CommandText } from '../components';

const DnsCnameModal = ({
  open,
  domain,
  terminalRecord,
  onClose,
  onSubmit,
  loading,
  error,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const domainSections = domain.split('.');
  const subDomain = domainSections.length > 2
    ? domainSections.slice(0, domainSections.length - 2)
    : [];

  return (
    <BaseModal
      open={open}
      title={t('modals.dnsConfiguration.title')}
      maxWidth={700}
      onClose={onClose}
      className={classnames(classes.modal, {
        [classes.error]: error,
      })}
    >
      {error && (
        <div className={classes.errorBox}>
          {t('modals.dnsConfiguration.error')}
        </div>
      )}
      <Typography variant="body2" className={classes.pointText}>
        {t('modals.dnsConfiguration.pointText', { domain })}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {t('modals.dnsConfiguration.description', { domain })}
      </Typography>
      <div className={classes.blackBox}>
        <CommandText
          title={t('modals.record')}
          detail="CNAME"
        />
        <CommandText
          title={t('modals.host')}
          detail={subDomain.join('.')}
        />
        <CommandText
          title={t('modals.pointsTo')}
          detail={terminalRecord}
        />
      </div>
      <Typography variant="body2" className={classes.footerText}>
        {t('modals.nameServer.step2.footer', { domain })}
      </Typography>
      <div className={classes.buttonContainer}>
        <GenericButton buttonVariant="secondary" onClick={onClose}>
          {t('modals.dnsConfiguration.buttons.cancel')}
        </GenericButton>
        <GenericButton
          buttonVariant="primary"
          onClick={onSubmit}
          loading={loading}
          disabled={loading}
        >
          {t('modals.dnsConfiguration.buttons.verifyDns')}
        </GenericButton>
      </div>
    </BaseModal>
  );
};

DnsCnameModal.defaultProps = {
  open: false,
  domain: 'domain',
  terminalRecord: '',
  loading: false,
  error: false,
};

DnsCnameModal.propTypes = {
  domain: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  open: PropTypes.bool,
  terminalRecord: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DnsCnameModal;
