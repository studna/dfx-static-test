import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ObjectDetails, ObjectDetailRow } from '@Shared/ObjectDetails';

const FileDetails = ({ loading, details }) => {
  const { t } = useTranslation();

  const detailsEntries = Object.entries(details);

  return (
    <ObjectDetails>
      {
        detailsEntries.map(([key, value]) => (
          <ObjectDetailRow
            key={key}
            value={value}
            loading={loading}
            field={`${t(`storage.details.${key}`)}:`}
          />
        ))
      }
    </ObjectDetails>
  );
};

FileDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    objectUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default FileDetails;
