import React, { useEffect } from 'react';
import get from 'lodash/get';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import FileCard from '@Shared/FileCard';
import { newApiClient } from '@Clients';
import { useQuery } from '@apollo/react-hooks';
import Box from '@terminal-packages/ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { getStorageObjectPath } from '@Shared/utils';

import objectsSelector from '../../utils/objects-selector';

import Table from '../Table';
import Search from '../Search';
import useStyles from './styles';
import ButtonsGroup from '../ButtonsGroup';
import { GET_STORAGE_OBJECT } from '../../graphql';
import { fetchObjects } from '../../actions';

const Folder = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { params } = useRouteMatch();

  const pathnameArr = location.pathname.split('/');
  const folderId = pathnameArr.pop();

  const prefix = get(params, '0');

  const { folder, isFolderObjectsLoading } = useSelector((state) => {
    const rows = objectsSelector(
      state,
      params.bucketName,
      prefix,
      '/',
    );

    const fol = state.storage.objects.find((obj) => obj.fullKey === `${params.bucketName}/${prefix}/`);

    return {
      folder: fol,
      isFolderObjectsLoading: !rows.length && state.storage.loading,
    };
  });

  useEffect(() => {
    dispatch(fetchObjects({
      Prefix: `${prefix}/`,
      Delimiter: '/',
      Bucket: params.bucketName,
    }));
  }, [
    prefix,
    params.bucketName,
  ]);

  const { data, loading } = useQuery(GET_STORAGE_OBJECT, {
    client: newApiClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      bucket: params.bucketName,
      key: `${prefix}/`,
    },
  });

  // TODO: lastModification, ipfsHash and url after BE integration
  return (
    <>
      <FileCard
        loadingHash={loading}
        ipfsHash={get(data, 'getStorageObject.hash', '') || ''}
        fileName={folderId}
        url={getStorageObjectPath(params.bucketName, prefix)}
        icon="folder"
        status="success"
        lastModification={folder ? t('storage.lastModified', { date: moment(folder.lastModification).calendar() }) : ''}
      />
      <Box
        overrideClass={{
          wrapper: classes.box,
        }}
      >
        <div className={classes.actionsHeader}>
          <Search />
          <ButtonsGroup
            delimiter="/"
            prefix={prefix}
            bucket={params.bucketName}
            disabled={isFolderObjectsLoading}
          />
        </div>
        <Table
          delimiter="/"
          prefix={prefix}
          bucket={params.bucketName}
        />
      </Box>
    </>
  );
};

export default Folder;
