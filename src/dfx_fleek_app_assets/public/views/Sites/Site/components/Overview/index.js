import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SiteDetails from './components/Details';
import GettingStarted from './components/GettingStarted';
import presenter from './presenter';

const Overview = ({ siteBySlug }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const details = presenter.getSiteDetails({ t, siteBySlug });

  React.useEffect(() => {
    window.analytics.page('Site - Overview', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <div id="test-sites-overview">
      <GettingStarted siteBySlug={siteBySlug} />
      <SiteDetails
        details={details}
        loading={siteBySlug.loading}
      />
    </div>
  );
};

Overview.propTypes = {
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default Overview;
