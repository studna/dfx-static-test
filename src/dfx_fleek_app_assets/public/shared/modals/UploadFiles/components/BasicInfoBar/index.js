import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { formatBytes } from '@Shared/utils';

import useStyles from './styles';


const BasicInfoBar = ({ filesVisualRepresentation, targetPath }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const data = Object.entries(filesVisualRepresentation).reduce(
    (result, [name, fileData]) => {
      const fieldToIncrease = name.startsWith('/')
        ? 'numberOfFolders'
        : 'numberOfFiles';

      return {
        ...result,
        totalSize: result.totalSize + fileData.size,
        [fieldToIncrease]: result[fieldToIncrease] + 1,
      };
    },
    {
      totalSize: 0,
      numberOfFolders: 0,
      numberOfFiles: 0,
    },
  );

  const dataList = [
    {
      label: t('modals.uploadFiles.files'),
      value: data.numberOfFiles,
    },
    {
      label: t('modals.uploadFiles.folders'),
      value: data.numberOfFolders,
    },
    {
      label: t('modals.uploadFiles.totalSize'),
      value: formatBytes(data.totalSize),
    },
    {
      label: t('modals.uploadFiles.targetPath'),
      value: targetPath,
    },
  ];

  return (
    <div className={classes.root}>
      {dataList.map(({ label, value }) => (
        <Typography
          key={label}
          variant="caption"
          className={classes.text}
          noWrap
        >
          {label}
          &nbsp;
          <Box fontWeight={600} component="span">{value}</Box>
        </Typography>
      ))}
    </div>
  );
};

BasicInfoBar.propTypes = {
  filesVisualRepresentation: PropTypes.shape({}).isRequired,
  targetPath: PropTypes.string.isRequired,
};

export default BasicInfoBar;
