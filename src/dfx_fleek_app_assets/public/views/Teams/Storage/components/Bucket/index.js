import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import FileCard from '@Shared/FileCard';
import { newApiClient } from '@Clients';
import { useQuery } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';
import Box from '@terminal-packages/ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';

import { getStorageObjectPath } from '@Shared/utils';

import Table from '../Table';
import Search from '../Search';
import useStyles from './styles';
import ButtonsGroup from '../ButtonsGroup';
import { fetchBucketInfo } from '../../actions';
import { GET_BUCKET_BY_SLUG } from '../../graphql';

const Bucket = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const { bucket, isBucketLoading } = useSelector((state) => ({
    isBucketLoading: state.storage.buckets.isLoading,
    bucket: state.storage.buckets[params.bucketName],
  }));

  React.useEffect(() => {
    dispatch(fetchBucketInfo({
      Delimiter: '/',
      Bucket: params.bucketName,
    }));
  }, [params.bucketName]);

  const { data, loading } = useQuery(GET_BUCKET_BY_SLUG, {
    client: newApiClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      slug: params.bucketName,
    },
  });

  return (
    <>
      <FileCard
        // TODO: this field should be set by the getBucketBySlug query loading state
        loadingHash={loading}
        ipfsHash={get(data, 'getBucketBySlug.hash', '') || ''}
        status="success"
        fileName={params.bucketName}
        loadingInfo={!bucket && isBucketLoading}
        url={getStorageObjectPath(params.bucketName)}
        lastModification={bucket ? `Created ${moment(bucket.CreationDate).format('MM/DD/YYYY hh:mm A')}` : ''}
      />
      <br />
      <Box padding="20px 0">
        <div className={classes.actionsHeader}>
          <Search />
          <ButtonsGroup
            delimiter="/"
            bucket={params.bucketName}
            disabled={!bucket && isBucketLoading}
          />
        </div>
        <Table
          delimiter="/"
          bucket={params.bucketName}
        />
      </Box>
    </>
  );
};

export default Bucket;
