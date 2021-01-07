import React, { useState } from 'react';
import moment from 'moment';
import get from 'lodash/get';

import * as Sentry from '@sentry/browser';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import Box from '@terminal-packages/ui/core/Box';
import { IconName } from '@terminal-packages/ui/core/PreviewBox';

import { newApiClient, getS3Client } from '@Clients';
import FileCard from '@Shared/FileCard';
import { getStorageObjectPath } from '@Shared/utils';

import Details from './components/Details';
import ButtonsGroup from './components/ButtonsGroup';

import useStyles from './styles';
import { GET_STORAGE_OBJECT } from '../../graphql';
import { fetchObject } from '../../actions';

const imageRegexp = /\.(png|jpeg|jpg|gif)$/i;

const File = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { params } = useRouteMatch();
  const { pathname } = useLocation();
  const [fileUrl, setFileUrl] = useState({
    url: null,
    loading: true,
  });

  const pathnameArr = pathname.split('/');
  const objectPathInitPos = pathnameArr.indexOf('object');

  const filePath = pathnameArr.slice(objectPathInitPos + 1).join('/');
  const fileId = pathnameArr.pop();

  const { file, isLoading } = useSelector((state) => ({
    isLoading: state.storage.loading,
    file: state.storage.objects.find((obj) => obj.fullKey === `${params.bucketName}/${filePath}`),
  }));

  React.useEffect(() => {
    dispatch(fetchObject({
      Key: filePath,
      Bucket: params.bucketName,
    }));
  }, []);

  React.useEffect(() => {
    const getObjSrc = async () => {
      const s3Client = await getS3Client();

      s3Client.getSignedUrl(
        'getObject',
        { Bucket: params.bucketName, Key: filePath },
        (err, url) => {
          if (err) {
            Sentry.captureException(err);
            /* eslint-disable no-console */
            console.error(err);
            setFileUrl({ url: null, loading: false });
            return;
          }

          setFileUrl({ url, loading: false });
        },
      );
    };

    if (!isLoading && file) {
      getObjSrc();
    }
  }, [
    filePath,
    isLoading,
    params.bucketName,
  ]);

  const { data, loading } = useQuery(GET_STORAGE_OBJECT, {
    client: newApiClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      bucket: params.bucketName,
      key: filePath,
    },
  });

  const objectUrl = getStorageObjectPath(params.bucketName, filePath);

  return (
    <>
      <FileCard
        loadingHash={loading || fileUrl.loading}
        ipfsHash={get(data, 'getStorageObject.hash', '') || ''}
        status="success"
        fileName={fileId}
        loadingInfo={!file && isLoading}
        icon={file && file.subtype === 'archive' ? IconName.Zip : IconName.File}
        url={getStorageObjectPath(params.bucketName, filePath)}
        imageSrc={imageRegexp.test(filePath) ? fileUrl.url : null}
        lastModification={file ? t('storage.lastModified', { date: moment(file.lastModification).calendar() }) : ''}
      />
      <br />
      <Box padding="20px 27px 28px 27px">
        <div className={classes.header}>
          <Typography variant="h6">
            {t('storage.header')}
          </Typography>
          <ButtonsGroup
            file={file || {}}
            objectUrl={objectUrl}
            disabled={!file && isLoading}
          />
        </div>
        <div className={classes.divider} />
        <Details
          loading={!file && isLoading}
          details={{
            objectUrl,
            name: fileId,
            size: file ? file.bytesSize : '',
            hash: get(data, 'getStorageObject.hash', '--') || '--',
          }}
        />
      </Box>
    </>
  );
};

export default File;
