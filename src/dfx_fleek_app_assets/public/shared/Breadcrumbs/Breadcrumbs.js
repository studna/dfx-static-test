import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import TerminalBreadcrumbs from '@terminal-packages/ui/core/Breadcrumbs';

import config from './config';
import useResolvers from './useResolver';

const Breadcrumbs = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const location = useLocation();

  const {
    items = [],
  } = useResolvers(config, {
    t,
    params,
    location,
    ...props,
  });

  return (
    <TerminalBreadcrumbs
      items={items}
      component={Link}
      itemsCount={{}}
      disableLastItem={false}
    />
  );
};

Breadcrumbs.defaultProps = {
  site: {},
};

Breadcrumbs.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
    domains: PropTypes.array,
  }),
};

export default Breadcrumbs;
