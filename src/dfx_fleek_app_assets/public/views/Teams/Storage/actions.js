import get from 'lodash/get';
import * as Sentry from '@sentry/browser';
import { toast } from '@terminal-packages/ui/core/Toast';

import { url } from '@Shared';
import { getS3Client, newApiClient } from '@Clients';
import { GET_STORAGE_OBJECT } from './graphql';
import objectPresenter from './utils/object-presenter';

export const STORE_OBJECTS = 'STORE_OBJETCS';
export const SET_ERROR_STATE = 'SET_ERROR_STATE';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const BUCKET_ERROR = 'BUCKET_ERROR';
export const BUCKET_SUCESS = 'BUCKET_SUCESS';
export const BUCKET_LOADING = 'BUCKET_LOADING';
export const EDIT_OBJECT = 'EDIT_OBJECT';
export const EDIT_OBJECTS = 'EDIT_OBJECTS';
export const REMOVE_OBJECTS = 'REMOVE_OBJECTS';
export const UNSELECT_ALL_OBJECTS = 'UNSELECT_ALL_OBJECTS';

export const unselectAllObjects = () => ({
  type: UNSELECT_ALL_OBJECTS,
});

export const setLoadingState = (loading = false) => ({
  type: SET_LOADING_STATE,
  payload: loading,
});

export const setError = (err = null) => ({
  type: SET_ERROR_STATE,
  payload: err,
});

export const removeObjects = (objects = []) => ({
  type: REMOVE_OBJECTS,
  payload: objects,
});

export const editObject = (object = {}) => ({
  type: EDIT_OBJECT,
  payload: object,
});

export const editObjects = (objects = []) => ({
  type: EDIT_OBJECTS,
  payload: objects,
});

export const fetchObject = (params = {}) => async (dispatch) => {
  dispatch(setLoadingState(true));

  const s3Client = await getS3Client();

  s3Client.headObject(params, (err, data) => {
    if (err) {
      Sentry.captureException(err);
      // 404 means that specified bucket does not exist
      if (err.statusCode === 404) {
        window.location.hash = url.buildUrl(null, '/error/404');
        return;
      }

      // eslint-disable-next-line no-console
      console.error(`Error when trying to get the file: ${err}`);
      toast.error(`Error when trying to get your file ${params.Key}`, { autoClose: 6000 });
      dispatch(setError(err));
      return;
    }

    const object = objectPresenter({
      Key: params.Key,
      Size: data.ContentLength,
      ...data,
    }, params.Bucket);

    dispatch({
      type: STORE_OBJECTS,
      payload: [object],
    });
  });
};

export const fetchObjects = (params = {}) => async (dispatch) => {
  dispatch(setLoadingState(true));

  const s3Client = await getS3Client();

  const bucket = get(params, 'Bucket', '');

  s3Client.listObjectsV2(params, (err, data) => {
    if (err) {
      Sentry.captureException(err);
      // 404 means that specified object does not exist
      if (err.statusCode === 404) {
        window.location.hash = url.buildUrl(null, '/error/404');
        return;
      }

      // eslint-disable-next-line no-console
      console.error(`Error when trying to get bucket objects: ${err}`);
      toast.error(`Error when trying to get your objects from the bucket ${bucket}`, { autoClose: 6000 });
      dispatch(setError(err));
      return;
    }

    const objects = data.Contents.map((obj) => objectPresenter(obj, bucket));

    dispatch({
      type: STORE_OBJECTS,
      payload: objects,
    });

    /* Preload sub folders */
    /* eslint-disable no-console, no-underscore-dangle, consistent-return */
    objects
      .filter((obj) => obj.type === 'folder')
      .forEach((folder) => {
        s3Client.listObjectsV2({
          Bucket: params.Bucket,
          Delimiter: '/',
          Prefix: folder.key,
        }, (_err, _data) => {
          if (_err) {
            Sentry.captureException(_err);
            return console.error(_err);
          }

          const _objects = _data.Contents.map((obj) => objectPresenter(obj, bucket));

          dispatch({
            type: STORE_OBJECTS,
            payload: _objects,
          });
        });
      });
  });
};

export const fetchBucketInfo = (params) => async (dispatch) => {
  dispatch({
    type: BUCKET_LOADING,
  });

  const s3Client = await getS3Client();

  fetchObjects(params)(dispatch);

  s3Client.listBuckets((err, data) => {
    if (err) {
      Sentry.captureException(err);
      // eslint-disable-next-line no-console
      console.error(`Error when trying to get bucket objects: ${err}`);
      toast.error(`Error when trying to get your bucket: ${params.Bucket}`, { autoClose: 6000 });
      dispatch({
        error: err.message,
        type: BUCKET_ERROR,
      });
      return;
    }

    const bucket = data.Buckets.find((_bucket) => _bucket.Name === params.Bucket);

    if (bucket) {
      dispatch({
        bucket,
        type: BUCKET_SUCESS,
      });
      return;
    }

    window.location.hash = url.buildUrl(null, '/error/404');
  });
};

export const createFolder = (folderFullKey, bucket) => (dispatch) => {
  const folderData = {
    Key: folderFullKey,
    LastModified: new Date().toUTCString(),
    Size: 0,
    eTag: '',
  };

  dispatch({
    type: STORE_OBJECTS,
    payload: [objectPresenter(folderData, bucket)],
  });
};

export const uploadObject = (params) => (dispatch) => {
  const objects = params.Key.split('/').map((name, index, splittedNames) => {
    const isFile = name === params.Body.name;
    const pathAndName = splittedNames.slice(0, index + 1).join('/');
    const LastModified = new Date().toUTCString();

    if (isFile) {
      return {
        Key: pathAndName,
        LastModified,
        Size: params.Body.size,
        eTag: '-1',
      };
    }
    return {
      Key: `${pathAndName}/`,
      LastModified,
      Size: 0,
      eTag: '',
    };
  });

  objects.forEach((object) => {
    // to clear stored IPFS hashes
    newApiClient.writeQuery({
      query: GET_STORAGE_OBJECT,
      variables: {
        bucket: params.Bucket,
        key: object.Key,
      },
      data: {
        getStorageObject: {
          hash: null,
          __typename: 'Object',
        },
      },
    });
  });


  dispatch({
    type: STORE_OBJECTS,
    payload: objects.map((object) => objectPresenter(object, params.Bucket)),
  });
};

export const deleteObjects = (params = {}) => new Promise((resolve, reject) => {
  getS3Client().then((s3Client) => {
    s3Client.deleteObjects(params, (err, data) => {
      if (err) {
        Sentry.captureException(err);
        return reject(err);
      }

      return resolve(data);
    });
  }).catch((err) => (
    reject(err)
  ));
});
