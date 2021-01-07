import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';
import get from 'lodash/get';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { url } from '@Shared';
import { getS3Client } from '@Clients';
import { createFolder } from '~/views/Teams/Storage/actions';

import useStyles from './styles';

const validFolderNameRegex = new RegExp('^[^\\/?%*:|"<>]*$');

const CreateFolderModal = ({ open, closeModal }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const [state, setState] = useState({
    error: null,
    loading: false,
    inputValue: '',
    inputError: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const folderMatch = matchPath(location.pathname, '/teams/:teamId/storage/:bucketName/folder/*');
    const bucketMatch = matchPath(location.pathname, '/teams/:teamId/storage/:bucketName');
    const { bucketName, 0: path = '' } = get(folderMatch || bucketMatch, 'params', {});
    const pathToFolder = path ? `${path.replace(/^\//, '')}/` : '';
    const Key = `${pathToFolder}${state.inputValue}/`;
    const eventProperties = {
      bucket: bucketName,
      teamId: url.getAccountIdFromUrl(),
    };

    setState({
      ...state,
      loading: true,
    });

    const s3Client = await getS3Client();

    s3Client.putObject({
      Bucket: bucketName,
      Key,
    }, (err) => {
      if (err) {
        eventProperties.error = err.message;
        window.analytics.track('Storage create folder failed', eventProperties);

        Sentry.captureException(err);
        setState({
          ...state,
          error: t('modals.createFolder.error'),
          loading: false,
        });
      } else {
        window.analytics.track('Storage create folder confirmed', eventProperties);

        dispatch(createFolder(Key, bucketName));
        closeModal();
      }
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const inputError = validFolderNameRegex.test(value)
      ? ''
      : t('modals.createFolder.invalidName');

    setState({
      ...state,
      inputValue: event.target.value,
      inputError,
    });
  };

  return (
    <BaseModal
      open={open}
      maxWidth={472}
      onClose={closeModal}
      className={classes.modal}
      title={t('modals.createFolder.title')}
    >
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
      <form id="createFolder" onSubmit={handleSubmit} className={classes.form}>
        <InputWithError
          autoFocus
          value={state.value}
          label={t('modals.createFolder.inputLabel')}
          onChange={handleInputChange}
          className={classes.input}
          error={!!state.inputError}
          errorMessage={state.inputError}
        />
        <div className={classes.buttons}>
          <GenericButton
            onClick={closeModal}
            buttonVariant="secondary"
            disabled={state.loading}
          >
            {t('common.cancel')}
          </GenericButton>
          <GenericButton
            type="submit"
            form="createFolder"
            buttonVariant="primary"
            loading={state.loading}
            disabled={!state.inputValue || !!state.inputError}
          >
            {t('common.confirm')}
          </GenericButton>
        </div>
      </form>
    </BaseModal>
  );
};

CreateFolderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreateFolderModal;
