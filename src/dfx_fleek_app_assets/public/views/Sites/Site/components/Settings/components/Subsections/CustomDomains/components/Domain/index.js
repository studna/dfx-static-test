import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import ListItem from '@terminal-packages/ui/core/ListItem';
import { DOMAIN_STATUS } from '~/constants';
import DomainInfo from '../DomainInfo';
import DomainStatus from '../DomainStatus';
import DomainOptions from '../DomainOptions';

import useStyles from './styles';

const Domain = ({
  siteId,
  domain,
  checkDNSOnClick,
  defaultDomain,
}) => {
  const classes = useStyles();
  const isTerminalDNS = /\.tmnl\.co$/.test(domain.domain)
    || /\.on\.fleek\.co/.test(domain.domain)
    || !!domain.stripeSessionId;

  const domainName = get(domain, 'domain', '');
  const isSubDomain = domainName.split('.').length > 2;
  const dnsLinkVerified = domain.dnsLinkStatus === DOMAIN_STATUS.PROPAGATED;

  return (
    <ListItem className={classes.domain}>
      <DomainInfo
        siteId={siteId}
        type={domain.type}
        domain={domain.domain}
        status={domain.status}
        isTerminalDNS={isTerminalDNS}
      />
      <DomainStatus
        dnsLinkVerified={dnsLinkVerified}
        domain={domain.domain}
        status={domain.status}
        isTerminalDNS={isTerminalDNS}
        checkDNSOnClick={() => { checkDNSOnClick(domain); }}
      />
      <DomainOptions
        siteId={siteId}
        domain={domain.domain}
        domainId={domain.domainId}
        dnsLinkVerified={dnsLinkVerified}
        isTerminalDNS={isTerminalDNS}
        defaultDomain={defaultDomain}
        isSubDomain={isSubDomain}
      />
    </ListItem>
  );
};

Domain.defaultProps = {
  defaultDomain: null,
};

Domain.propTypes = {
  siteId: PropTypes.string.isRequired,
  checkDNSOnClick: PropTypes.func.isRequired,
  defaultDomain: PropTypes.string,
  domain: PropTypes.shape({
    type: PropTypes.string,
    status: PropTypes.string,
    domain: PropTypes.string,
    domainId: PropTypes.string,
    stripeSessionId: PropTypes.string,
    dnsLinkStatus: PropTypes.string,
  }).isRequired,
};

export default Domain;
