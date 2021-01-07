import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getS3Client } from '@Clients';

import AlertBox from '@terminal-packages/ui/core/AlertBox';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import {
  removeObjects,
  deleteObjects,
} from '~/views/Teams/Storage/actions';
import objectPresenter from '~/views/Teams/Storage/utils/object-presenter';

import useStyles from './styles';

const DeleteStorageItemsModal = ({
  open,
  closeModal,
  itemsToRemove,
  redirectUrl,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = useState({
    error: null,
    loading: false,
  });
  const { objects } = useSelector((reduxState) => reduxState.storage);
  const dispatch = useDispatch();
  const history = useHistory();

  const getFoldersContent = (items) => {
    const itemList = [
      ...items,
    ];

    const folders = items.filter((item) => item.type === 'folder');

    folders.forEach((folder) => {
      const foldersContent = objects.filter((object) => {
        const pattern = new RegExp(`^${folder.fullKey}`);
        const sameObject = folder.fullKey === object.fullKey;
        return (pattern.test(object.fullKey) && !sameObject);
      });

      itemList.push(...foldersContent);
    });

    return itemList;
  };

  const getRootDirectory = (item) => {
    /* eslint-disable no-useless-escape */
    const pattern = new RegExp(`(${item.name}\/?)$`);
    const rootDir = item.key.replace(pattern, '');
    return rootDir;
  };

  const handleSubmit = async () => {
    setState({
      ...state,
      error: null,
      loading: true,
    });

    try {
      const s3Client = await getS3Client();

      const item = itemsToRemove[0];
      const { bucket } = item;
      const rootDir = getRootDirectory(item);

      const params = {
        Prefix: rootDir,
        Bucket: bucket,
      };

      // fetch full content of folder containing items to delete
      s3Client.listObjectsV2(params, async (err, data) => {
        if (err) {
          Sentry.captureException(err);
          throw err;
        }

        const objectListFull = data.Contents.map((obj) => objectPresenter(obj, bucket));

        // removing root items that are not to delete
        const objectListFiltered = objectListFull.filter((object) => {
          let removeItem = false;
          itemsToRemove.forEach((itemToRemove) => {
            if (itemToRemove.type === 'folder') {
              const keyWithoutSlash = itemToRemove.key.slice(0, itemToRemove.key.length - 1);
              const pattern = new RegExp(`^(${keyWithoutSlash}/\\w+)`);
              const fileIsInFolder = pattern.test(object.key);
              if (fileIsInFolder) {
                removeItem = true;
              }
            }
            if (itemToRemove.key === object.key) {
              removeItem = true;
            }
          });
          return removeItem;
        });

        await deleteObjects({
          Bucket: bucket,
          Delete: {
            Objects: objectListFiltered.map((object) => ({
              Key: object.key,
            })),
          },
        });
        // remove objects from cache
        const fullItemList = getFoldersContent(itemsToRemove);
        dispatch(removeObjects(fullItemList));

        setState({
          ...state,
          loading: false,
        });
        if (redirectUrl) {
          history.push(redirectUrl);
        }
        closeModal();
      });
    } catch (error) {
      Sentry.captureException(error);
      // eslint-disable-next-line no-console
      console.error('Delete Site error: ', error.message);

      setState({
        ...state,
        loading: false,
        error: t('modals.deleteStoredItems.error'),
      });
    }
  };

  return (
    <BaseModal
      open={open}
      maxWidth={472}
      onClose={closeModal}
      className={classes.modal}
      title={t('modals.deleteStoredItems.title')}
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
      <Typography className={classes.message} variant="body2">
        {itemsToRemove.length > 1 ? t(
          'modals.deleteStoredItems.messageManyFiles',
          { filesNumber: itemsToRemove.length },
        ) : t(
          'modals.deleteStoredItems.messageOneFile',
          { fileName: itemsToRemove[0].name },
        )}
      </Typography>
      <div className={classes.buttons}>
        <GenericButton
          onClick={closeModal}
          buttonVariant="secondary"
          disabled={state.loading}
        >
          {t('common.cancel')}
        </GenericButton>
        <GenericButton
          buttonVariant="primary"
          loading={state.loading}
          onClick={handleSubmit}
        >
          {t('common.confirm')}
        </GenericButton>
      </div>
    </BaseModal>
  );
};

DeleteStorageItemsModal.defaultProps = {
  redirectUrl: null,
};

DeleteStorageItemsModal.propTypes = {
  redirectUrl: PropTypes.string,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  itemsToRemove: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    bucket: PropTypes.string,
    key: PropTypes.string,
    fullKey: PropTypes.string,
  })).isRequired,
};

export default DeleteStorageItemsModal;
