import React from 'react';
import PropTypes from 'prop-types';

import { DeployInfo, DeploysList } from '../../sections';

const AllDeploys = ({
  siteBySlug,
  deploys,
}) => (
  <div id="test-sites-all-deploys">
    <DeployInfo siteBySlug={siteBySlug} />
    <DeploysList siteBySlug={siteBySlug} deploys={deploys} />
  </div>
);

AllDeploys.defaultProps = {
  siteBySlug: {
    data: null,
    error: null,
    loading: false,
  },
  deploys: {
    data: null,
    error: null,
    loading: false,
  },
};

AllDeploys.propTypes = {
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
  deploys: PropTypes.shape({
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
  }),
};


export default AllDeploys;
