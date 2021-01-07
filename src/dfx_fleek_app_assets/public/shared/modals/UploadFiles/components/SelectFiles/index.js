/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';

import useStyles from './styles';

const SelectFiles = ({ onlyButton, onSelectFiles, closeModal }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop: onSelectFiles });

  if (onlyButton) {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <GenericButton
          component="div"
          buttonVariant="primary"
        >
          {t('modals.uploadFiles.addFiles')}
        </GenericButton>
      </div>
    );
  }

  return (
    <>
      <div
        className={classnames(classes.dropzoneArea, {
          [classes.dropzoneActive]: isDragActive,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <IconFA icon={['fal', 'upload']} className={classes.icon} />
        <Typography className={classes.message} variant="body2">
          {t('modals.uploadFiles.dragFiles')}
          <span className={classes.link}>
            {t('modals.uploadFiles.uploadLink')}
          </span>
        </Typography>
      </div>
      <div className={classes.buttons}>
        <GenericButton
          onClick={closeModal}
          buttonVariant="secondary"
          className={classes.cancelBtn}
        >
          {t('common.cancel')}
        </GenericButton>
        <GenericButton buttonVariant="primary" disabled>
          {t('common.confirm')}
        </GenericButton>
      </div>
    </>
  );
};

SelectFiles.defaultProps = {
  onlyButton: false,
  closeModal: () => {},
};

SelectFiles.propTypes = {
  onlyButton: PropTypes.bool,
  onSelectFiles: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};

export default SelectFiles;
