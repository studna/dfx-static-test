
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import classnames from 'classnames';

import useStyles from './styles';
import { CommandText } from '../components';

const DnsConfigurationNameServer = ({
  open,
  ip,
  domain,
  onClose,
  onSubmit,
  loading,
  error,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <BaseModal
      open={open}
      title={t('modals.nameServer.title')}
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
        {t('modals.nameServer.step1.title', { ip })}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {t('modals.nameServer.step1.description', { domain, ip })}
      </Typography>
      <div className={classes.blackBox}>
        <CommandText
          title={t('modals.record')}
          detail="A"
        />
        <CommandText
          title={t('modals.host')}
          detail="@"
        />
        <CommandText
          title={t('modals.pointsTo')}
          detail={ip}
        />
      </div>
      <Typography variant="body2" className={classes.footerText}>
        {t('modals.nameServer.step2.footer', { domain })}
      </Typography>
      <Typography variant="body2" className={classes.footerText}>
        {t('modals.nameServer.footer')}
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

DnsConfigurationNameServer.defaultProps = {
  open: false,
  domain: 'domain',
  error: false,
};

DnsConfigurationNameServer.propTypes = {
  domain: PropTypes.string,
  ip: PropTypes.string.isRequired,
  open: PropTypes.bool,
  error: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DnsConfigurationNameServer;
