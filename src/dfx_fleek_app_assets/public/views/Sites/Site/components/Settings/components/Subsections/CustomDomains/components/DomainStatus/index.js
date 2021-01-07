import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import IconFA from '@terminal-packages/ui/core/IconFA';

import useStyles from './styles';
import { DOMAIN_STATUS } from '~/constants';
import { getDnsLink } from '../../utils';

const DomainStatus = ({
  domain,
  status,
  isTerminalDNS,
  checkDNSOnClick,
  dnsLinkVerified,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const getDNSLinkTag = () => {
    if (dnsLinkVerified) {
      return (
        <a
          href={getDnsLink(domain)}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.DNSBox}
        >
          <Typography className={classes.DNSText}>
            {t('sites.tabs.settings.customDomains.linkDNS')}
          </Typography>
        </a>
      );
    }
    return null;
  };


  if (status === DOMAIN_STATUS.PROPAGATED && isTerminalDNS) {
    return (
      <div className={classes.domainStatus}>
        <a
          href={`https://${domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.DNSBox}
        >
          <Typography className={classes.DNSText}>
            {t('sites.tabs.settings.customDomains.terminalDNS')}
          </Typography>
        </a>
      </div>
    );
  }

  if (status === DOMAIN_STATUS.PENDING_PROPAGATION && isTerminalDNS) {
    return (
      <div className={classes.domainStatus}>
        <Typography className={classes.waiting}>
          {t('sites.tabs.settings.customDomains.waitingOnDNS')}
        </Typography>
        {getDNSLinkTag()}
      </div>
    );
  }

  if (
    status === DOMAIN_STATUS.ERROR
    || (status === DOMAIN_STATUS.PENDING_PROPAGATION && !isTerminalDNS)
  ) {
    return (
      <div className={classes.domainStatus}>
        <div
          tabIndex={0}
          role="button"
          className={classes.warningWrapper}
          onClick={checkDNSOnClick}
          onKeyDown={checkDNSOnClick}
        >
          <div className={classes.warningIcon}>
            <IconFA
              icon={['fas', 'exclamation-triangle']}
              fontSize="inherit"
              color="inherit"
            />
          </div>
          <Typography className={classes.check}>
            {t('sites.tabs.settings.customDomains.checkDNS')}
          </Typography>
        </div>
        {getDNSLinkTag()}
      </div>
    );
  }

  return (
    <div className={classes.domainStatus}>
      {getDNSLinkTag()}
    </div>
  );
};

DomainStatus.propTypes = {
  domain: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isTerminalDNS: PropTypes.bool.isRequired,
  checkDNSOnClick: PropTypes.func.isRequired,
  dnsLinkVerified: PropTypes.bool.isRequired,
};

export default DomainStatus;
