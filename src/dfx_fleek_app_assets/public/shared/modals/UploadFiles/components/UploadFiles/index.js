import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import S3 from 'aws-sdk/clients/s3';
import { getS3Client, newApiClient } from '@Clients';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { useTranslation, Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { uploadObject } from '~/views/Teams/Storage/actions';
import { GET_STORAGE_OBJECT, GET_BUCKET_BY_SLUG } from '~/views/Teams/Storage/graphql';
import useStyles from './styles';

const UploadFiles = ({
  files,
  cancel,
  onCompleteUpload,
  onError,
  bucket,
  prefix,
  markFileAsUploaded,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filesToUpload = files.filter((file) => !file.uploaded);

  const onUploadAllFiles = async () => {
    try {
      if (prefix) { // is folder view
        newApiClient.query({
          query: GET_STORAGE_OBJECT,
          variables: {
            bucket,
            key: `${prefix}/`,
          },
          fetchPolicy: 'network-only',
        });
      } else {
        newApiClient.query({
          query: GET_BUCKET_BY_SLUG,
          variables: {
            slug: bucket,
          },
          fetchPolicy: 'network-only',
        });
      }
      onCompleteUpload();
    } catch (err) {
      onError(t('modals.uploadFiles.uploadingError'));
    }
  };

  useEffect(() => {
    let uploaders = [];

    const generateUploaders = async () => {
      const s3Client = await getS3Client();
      const directory = prefix ? `${prefix}/` : '';
      const uploadSingleFile = (file) => {
        const params = {
          Bucket: bucket,
          Key: `${directory}${file.path.replace(/^\//, '')}`,
          ContentType: file.type,
          Body: file,
          ACL: 'public-read',
        };

        const uploader = new S3.ManagedUpload({
          params,
          service: s3Client,
        });

        uploader.send((err) => {
          if (err) {
            Sentry.captureException(err);
            onError(t('modals.uploadFiles.uploadingError'));
            return;
          }
          markFileAsUploaded(file);
          dispatch(uploadObject(params));
          uploaders = uploaders.filter((_uploader) => uploader !== _uploader);

          if (uploaders.length === 0) {
            onUploadAllFiles();
          }
        });

        return uploader;
      };

      uploaders = filesToUpload.map(uploadSingleFile);
    };

    generateUploaders();

    return () => {
      uploaders.forEach((uploader) => {
        uploader.send(() => {}); // to remove error handling
        uploader.abort();
      });
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <img
          alt="fleek-loading"
          src="https://dev-app.fleek.co/loading-logo.svg"
          className={classes.logo}
        />
        <Typography variant="h6">
          <Trans
            i18nKey="modals.uploadFiles.uploadingProgress"
            values={{
              uploadedItems: files.length - filesToUpload.length,
              totalItemsNumber: files.length,
            }}
            components={[<Box fontWeight="600" component="span" />]}
          />
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {t('modals.uploadFiles.filesUploaded')}
        </Typography>
      </div>
      <div className={classes.buttons}>
        <GenericButton
          onClick={cancel}
          buttonVariant="secondary"
        >
          {t('common.cancel')}
        </GenericButton>
      </div>
    </>
  );
};

UploadFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  cancel: PropTypes.func.isRequired,
  onCompleteUpload: PropTypes.func.isRequired,
  markFileAsUploaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  bucket: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default UploadFiles;
