import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import CardTitled from '@terminal-packages/ui/core/CardTitled';

import useStyles from './styles';

import Footer from './components/Footer';
import DomainList from './components/DomainList';

const CustomDomains = ({
  siteId,
  domains,
  loading,
  checkDNSOnClick,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <CardTitled
      mainContent={t('sites.tabs.settings.customDomains.title')}
      classes={{
        content: classes.cardContent,
      }}
    >
      <Typography className={classes.paragraph}>
        {t('sites.tabs.settings.customDomains.paragraph')}
      </Typography>
      <DomainList
        siteId={siteId}
        domains={domains}
        loading={loading}
        checkDNSOnClick={checkDNSOnClick}
      />
      <Footer
        siteId={siteId}
        domainsLength={domains.length}
        hasWaitingDomain={!!(domains.find((domain) => (domain.status === 'waiting')))}
      />
    </CardTitled>
  );
};

CustomDomains.defaultProps = {
  siteId: '',
  domains: [],
  checkDNSOnClick: () => {},
};

CustomDomains.propTypes = {
  siteId: PropTypes.string,
  checkDNSOnClick: PropTypes.func,
  domains: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
};

export default CustomDomains;
