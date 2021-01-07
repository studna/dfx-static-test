import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@terminal-packages/ui/core/Box';
import { ObjectDetails, ObjectDetailRow } from '@Shared/ObjectDetails';

const SiteDetails = ({ loading, details }) => {
  const { t } = useTranslation();

  const detailsEntries = Object.entries(details);

  return (
    <Box padding="24px 28px">
      <ObjectDetails>
        {
          detailsEntries.map(([key, value]) => (
            <ObjectDetailRow
              key={key}
              value={value}
              loading={loading}
              field={`${t(`sites.overview.${key}`)}:`}
            />
          ))
        }
      </ObjectDetails>
    </Box>
  );
};

SiteDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    ipfsHash: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    certificate: PropTypes.string.isRequired,
    lastPublished: PropTypes.string.isRequired,
    numberOfDomains: PropTypes.string,
  }).isRequired,
};

export default SiteDetails;
