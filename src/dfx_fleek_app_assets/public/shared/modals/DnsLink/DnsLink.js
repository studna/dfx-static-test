import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { newApiClient } from '@Clients';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { CommandText } from '../components';
import { VERIFY_DNS_LINK } from '../../graphql/mutations';

import useStyles from './styles';

const DnsLink = (props) => {
  const {
    open,
    domain,
    siteId,
    domainId,
    closeModal,
    currentDomain,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const domainSections = currentDomain.split('.');
  const subDomain = domainSections.length > 2
    ? domainSections.slice(0, domainSections.length - 2)
    : [];

  const [verifyDnsLink] = useMutation(VERIFY_DNS_LINK, {
    client: newApiClient,
  });

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await verifyDnsLink({
        variables: {
          input: {
            siteId,
            domainId,
          },
        },
      });

      closeModal();
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={open}
      maxWidth={700}
      onClose={closeModal}
      title={t('modals.dnsLink.title')}
      disableAutoFocus
      disableEnforceFocus
    >
      {error && (
        <div className={classes.errorBox}>
          {t('modals.dnsConfiguration.error')}
        </div>
      )}
      <Typography
        variant="body2"
        className={classes.subtitle}
      >
        <Box fontWeight={500}>
          {t('modals.dnsLink.subTitle')}
        </Box>
      </Typography>
      <Typography
        variant="body2"
        className={classes.subtitle2}
      >
        {t('modals.dnsLink.subtitle2')}
      </Typography>
      <div className={classes.terminal}>
        <CommandText
          title={t('modals.record')}
          detail="CNAME"
        />
        <CommandText
          title={t('modals.host')}
          detail={['_dnslink', ...subDomain].join('.')}
        />
        <CommandText
          title={t('modals.pointsTo')}
          detail={`_dnslink.${domain}`}
        />
      </div>
      <Typography variant="body2" className={classes.footerText}>
        {t('modals.nameServer.step2.footer', { domain })}
      </Typography>
      <div className={classes.ctaContainer}>
        <GenericButton
          onClick={closeModal}
          disabled={loading}
          buttonVariant="secondary"
        >
          {t('modals.dnsLink.cancel')}
        </GenericButton>
        <GenericButton
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
          buttonVariant="primary"
          className={classes.submitButton}
        >
          {t('modals.dnsLink.verifyDns')}
        </GenericButton>
      </div>
    </BaseModal>
  );
};

DnsLink.defaultProps = {
  domain: '',
  siteId: '',
  open: false,
  domainId: '',
  currentDomain: '',
  closeModal: () => {},
};

DnsLink.propTypes = {
  open: PropTypes.bool,
  domain: PropTypes.string,
  siteId: PropTypes.string,
  closeModal: PropTypes.func,
  domainId: PropTypes.string,
  currentDomain: PropTypes.string,
};

export default DnsLink;
