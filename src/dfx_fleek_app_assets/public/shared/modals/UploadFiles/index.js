import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import { url } from '@Shared';
import authService from '~/auth';
import SelectFiles from './components/SelectFiles';
import BasicInfoBar from './components/BasicInfoBar';
import FilesList from './components/FilesList';
import UploadFiles from './components/UploadFiles';
import useStyles from './styles';
import { getFilesVisualRepresentation } from './utils';

const UploadFilesModal = ({
  open,
  closeModal,
  bucket,
  prefix,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [state, setState] = useState({
    error: null,
    selectedFiles: [],
    uploadingFiles: false,
  });

  useEffect(() => {
    authService.disableAuthTokenRefreshing();
    return () => {
      authService.enableAuthTokenRefreshing();
    };
  }, []);

  const addFiles = (files) => {
    setState({
      ...state,
      selectedFiles: [
        ...state.selectedFiles,
        ...files,
      ],
    });
  };

  const goToUploadFiles = () => {
    window.analytics.track('Storage upload confirmed', {
      bucket,
      teamId: url.getAccountIdFromUrl(),
    });

    setState({
      ...state,
      uploadingFiles: true,
    });
  };

  const cancelUploadingFiles = () => {
    window.analytics.track('Storage upload cancelled', {
      bucket,
      teamId: url.getAccountIdFromUrl(),
    });

    setState({
      ...state,
      uploadingFiles: false,
    });
  };

  const updateSelectedFiles = (files) => {
    setState({
      ...state,
      selectedFiles: files,
    });
  };

  const onUploadingError = (errorMsg) => {
    window.analytics.track('Storage upload failed', {
      bucket,
      error: errorMsg,
      teamId: url.getAccountIdFromUrl(),
    });

    setState({
      ...state,
      error: errorMsg,
      uploadingFiles: false,
    });
  };

  const markFileAsUploaded = (uploadedFile) => {
    setState((prevState) => {
      const updatedSelectedFiles = prevState.selectedFiles.map((file) => {
        if (file.path === uploadedFile.path) {
          return {
            path: file.path,
            name: file.name,
            size: file.size,
            uploaded: true,
          };
        }
        return file;
      });

      return {
        ...prevState,
        selectedFiles: updatedSelectedFiles,
      };
    });
  };

  const filesVisualRepresentation = getFilesVisualRepresentation(
    state.selectedFiles,
    t,
  );

  const getModalContent = () => {
    if (state.selectedFiles.length === 0) {
      return (
        <SelectFiles onSelectFiles={addFiles} closeModal={closeModal} />
      );
    }

    if (state.uploadingFiles) {
      return (
        <UploadFiles
          markFileAsUploaded={markFileAsUploaded}
          files={state.selectedFiles}
          cancel={cancelUploadingFiles}
          onCompleteUpload={closeModal}
          onError={onUploadingError}
          bucket={bucket}
          prefix={prefix}
        />
      );
    }

    return (
      <FilesList
        bucket={bucket}
        files={state.selectedFiles}
        updateSelectedFiles={updateSelectedFiles}
        upload={goToUploadFiles}
        filesVisualRepresentation={filesVisualRepresentation}
      />
    );
  };

  return (
    <BaseModal
      open={open}
      maxWidth={620}
      onClose={closeModal}
      className={classes.modal}
      title={t('modals.uploadFiles.title')}
      disableBackdropClick={!!state.selectedFiles.length}
    >
      <>
        {
          state.error && (
            <AlertBox
              type="error"
              message={state.error}
              className={classes.alert}
              icon={['fal', 'times-circle']}
            />
          )
        }
        <div className={classes.fullWidth}>
          <BasicInfoBar
            filesVisualRepresentation={filesVisualRepresentation}
            targetPath={`${bucket}/${prefix}`}
          />
          {getModalContent()}
        </div>
      </>
    </BaseModal>
  );
};

UploadFilesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default UploadFilesModal;
