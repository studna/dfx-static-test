import get from 'lodash/get';
import qs from 'query-string';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { newApiClient } from '@Clients';
import Typography from '@material-ui/core/Typography';
import { useLocation, useHistory } from 'react-router';
import { toast } from '@terminal-packages/ui/core/Toast';
import { VERIFY_SITE_ENS_DOMAIN } from '@Shared/graphql/mutations';
import {
  SetEnsControllerModal,
  url,
  getMainDomain,
  DnsCnameModal,
  DnsARecordModal,
} from '@Shared';

import { GA_EVENTS_CATEGORIES } from '~/constants';
import getI18n from './i18n';
import useStyles from './styles';
import getSsl from './ssl-mapping';
import SSL from '../../Subsections/SSL';
import CustomDomains from '../../Subsections/CustomDomains';
import Ens from '../../Subsections/Ens';
import {
  onVerifyDnsOnCompleted,
} from './utils/verify-dns';
// this one file contains a lot of dependencies,
// because of size, I wasn't upload assets to canister
// import handleSetController from './utils/ens/handle-set-controller';
import { SECTION_IDS } from '../../../get-navigation-items';
import { VERIFY_DNS_CONFIGURATION } from '../../../graphql/mutations';
import { getPurchasedDomainPendings } from './utils/purchased-domain-pending';

const DomainManagement = ({
  siteBySlug,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [dnsError, setDnsError] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState({});
  const [dnsCnameModalState, setDnsCnameModalState] = useState(false);
  const [dnsARecordModalState, setDnsARecordModalState] = useState(false);
  const [ensControllerModalState, setEnsControllerModalState] = useState({
    error: null,
    loading: false,
    open: false,
  });

  const siteId = get(siteBySlug, 'data.getSiteBySlug.id');
  const domains = get(siteBySlug, 'data.getSiteBySlug.domains', []);
  const ensDomain = get(siteBySlug, 'data.getSiteBySlug.ensDomain');
  const { loading } = siteBySlug;
  const classes = useStyles();

  const { t } = useTranslation();

  const i18n = getI18n(t);

  const [verifySiteEnsDomain] = useMutation(VERIFY_SITE_ENS_DOMAIN, {
    client: newApiClient,
  });

  const setEnsControllerOnClick = () => {
    setEnsControllerModalState({
      ...ensControllerModalState,
      open: true,
    });
  };

  const handleSetFleekAsController = () => {

  };

  useEffect(() => {
    /* eslint-disable camelcase */
    const queryParams = qs.parse(location.search);
    const {
      errorPayment,
      successPayment,
    } = queryParams;

    const redirectUrl = url.buildUrl(null, null, ['successPayment', 'errorPayment']);

    if (successPayment) {
      toast.success(
        t('sites.tabs.settings.customDomains.successPayment'),
        { autoClose: 6000 },
      );
    } else if (errorPayment) {
      toast.error(
        t('sites.tabs.settings.customDomains.errorPayment'),
        { autoClose: 6000 },
      );
    }

    history.push(redirectUrl);
  }, []);


  const [
    verifyDns,
    { loading: verifyDnsLoading },
  ] = useMutation(
    VERIFY_DNS_CONFIGURATION, {
      client: newApiClient,
      onCompleted: () => onVerifyDnsOnCompleted(
        setDnsError,
        setDnsCnameModalState,
        setDnsARecordModalState,
      ),
    },
  );

  const checkDNSOnClick = (domain) => {
    const isSubDomain = /^[\w,-]+\.([\w,-]+\.)+[\w,-]+$/.test(domain.domain);

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Check DNS Configuration');
    window.analytics.track('Check DNS Configuration', {
      siteId,
      domain: domain.domain,
      domainId: selectedDomain.domainId,
      teamId: url.getAccountIdFromUrl(),
    });

    setSelectedDomain(domain);
    if (isSubDomain) {
      // CNAME for subdomain
      setDnsCnameModalState(true);
      return;
    }
    // A record for domain
    setDnsARecordModalState(true);
  };

  const getDomains = () => (
    <>
      <Typography variant="body1">
        {i18n.domains.title}
      </Typography>
      <Typography className={classes.paragraph}>
        {i18n.domains.paragraph}
      </Typography>
    </>
  );

  const getEns = () => (
    <>
      <Typography variant="body1">
        {i18n.ens.title}
      </Typography>
      <Typography className={classes.paragraph}>
        {i18n.ens.paragraph}
      </Typography>
    </>
  );

  const getHttp = () => (
    <>
      <Typography variant="body1">
        {i18n.http.title}
      </Typography>
      <Typography className={classes.paragraph}>
        {i18n.http.paragraph}
      </Typography>
    </>
  );

  const getSSL = () => {
    const publishedDeploy = get(
      siteBySlug,
      'data.getSiteBySlug.publishedDeploy.id',
      null,
    );
    const domainWithCertificate = getMainDomain(domains);
    const sslInfo = get(domainWithCertificate, 'sslInfo');
    const ssl = getSsl(sslInfo, t);

    return (
      <SSL
        i18n={i18n.ssl}
        errorDocsLink="https://docs.fleek.co/hosting/site-deployment/#monitoring-a-deployment"
        buttonOnClick={() => checkDNSOnClick({
          ...domainWithCertificate,
          value: domainWithCertificate.domain,
          id: domainWithCertificate.domainId,
        })}
        status={publishedDeploy ? ssl.status : 'not_deployed'}
        certificate={ssl.certificate}
        domains={[get(domainWithCertificate, 'domain', '')]}
        expires={ssl.expires}
        errorMsg={ssl.errorMsg}
        created={ssl.created}
      />
    );
  };

  const verifyDnsConfiguration = async () => {
    setDnsError(false);

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Verify DNS configuration');

    const eventProperties = {
      siteId,
      domain: selectedDomain.domain,
      domainId: selectedDomain.domainId,
      teamId: url.getAccountIdFromUrl(),
    };

    try {
      await verifyDns({
        variables: {
          input: {
            siteId,
            domainId: selectedDomain.domainId,
          },
        },
      });

      window.analytics.track('Verify DNS configuration', eventProperties);
    } catch (e) {
      eventProperties.error = e.message;
      window.analytics.track('Failed Verify DNS configuration', eventProperties);
      setDnsError(true);
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const isPurchasedDomainPending = getPurchasedDomainPendings(domains).length > 0;

  return (
    <div id="test-sites-domain-managment">
      <div id={SECTION_IDS.CUSTOM_DOMAINS}>
        <Element name={SECTION_IDS.CUSTOM_DOMAINS} />
        <div className={classes.titleWrapper}>
          {getDomains()}
        </div>
        <div className={classes.sectionWrapper}>
          {
            (isPurchasedDomainPending) && (
            <Alert className={classes.pollingMessage} severity="info">{t('sites.tabs.settings.customDomains.pollingMessage')}</Alert>
            )
          }
          <CustomDomains
            siteId={siteId}
            domains={domains}
            checkDNSOnClick={checkDNSOnClick}
            loading={loading}
          />
        </div>
      </div>
      <div id={SECTION_IDS.ENS}>
        <Element name={SECTION_IDS.ENS} />
        <div className={classes.titleWrapper}>
          {getEns()}
        </div>
        <div className={classes.sectionWrapper}>
          <Ens
            ensInfo={ensDomain}
            setEnsControllerOnClick={setEnsControllerOnClick}
            loading={loading}
            siteId={siteId}
          />
        </div>
      </div>
      <div id={SECTION_IDS.TTL}>
        <Element name={SECTION_IDS.TTL} />
        <div className={classes.titleWrapper}>
          {getHttp()}
        </div>
        <div className={classes.sectionWrapper}>
          {getSSL()}
        </div>
      </div>
      {/* CNAME modal */}
      <DnsCnameModal
        open={dnsCnameModalState}
        onClose={() => {
          setDnsCnameModalState(false);
          setDnsError(false);
        }}
        loading={verifyDnsLoading}
        onSubmit={() => verifyDnsConfiguration()}
        domain={selectedDomain.domain}
        terminalRecord="ipfs-ha.fleek.co"
        error={dnsError}
      />
      {/* A record modal */}
      <DnsARecordModal
        open={dnsARecordModalState}
        onClose={() => {
          setDnsARecordModalState(false);
          setDnsError(false);
        }}
        loading={verifyDnsLoading}
        onSubmit={() => verifyDnsConfiguration()}
        server="http://rihana.ns.cloudflare.com/"
        ip="44.233.93.166"
        domain={selectedDomain.domain}
        error={dnsError}
      />
      <SetEnsControllerModal
        open={ensControllerModalState.open}
        onClose={() => {
          setEnsControllerModalState({
            ...ensControllerModalState,
            open: false,
          });
        }}
        state={ensControllerModalState}
        setState={setEnsControllerModalState}
        onSubmit={() => handleSetFleekAsController()}
        ensDomain={ensDomain}
        siteId={siteId}
      />
    </div>
  );
};

DomainManagement.defaultProps = {
  siteBySlug: {
    loading: true,
    data: null,
    error: null,
  },
};

DomainManagement.propTypes = {
  siteBySlug: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
  }),
};

export default DomainManagement;
