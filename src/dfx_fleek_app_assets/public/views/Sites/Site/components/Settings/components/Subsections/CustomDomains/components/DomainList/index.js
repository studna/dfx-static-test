import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import List from '@terminal-packages/ui/core/List';

import Domain from '../Domain';
import Skeleton from '../Skeleton';

const DomainList = ({
  siteId,
  loading,
  domains,
  checkDNSOnClick,
}) => {
  if (loading) {
    return (
      Array(2).fill().map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} />
      ))
    );
  }

  const [defaultDomain] = domains.filter((domain) => {
    const isFleekDomain = /\.tmnl\.co$/.test(domain.domain)
    || /\.on(-\w+)?\.fleek\.co/.test(domain.domain);

    return isFleekDomain;
  });

  return (
    <List striped>
      {
        domains.map((domain) => (
          <Domain
            siteId={siteId}
            domain={domain}
            key={domain.domainId}
            checkDNSOnClick={checkDNSOnClick}
            defaultDomain={get(defaultDomain, 'domain')}
          />
        ))
      }
    </List>
  );
};

DomainList.propTypes = {
  siteId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  checkDNSOnClick: PropTypes.func.isRequired,
  domains: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default DomainList;
