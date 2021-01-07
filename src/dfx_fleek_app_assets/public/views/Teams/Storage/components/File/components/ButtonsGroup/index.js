import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toast } from '@terminal-packages/ui/core/Toast';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { Option, ActionsButton } from '@Shared/ActionsButton';
import {
  openModal,
  DELETE_STORED_ITEMS_MODAL,
} from '@Shared/modals/actions';
import { url } from '@Shared';

import useStyles from './styles';

import actions from '../../../ButtonsGroup/actions';

const ButtonsGroup = ({ file, disabled, objectUrl }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const handleDeleteClick = (event) => {
    event.preventDefault();

    const {
      teamId,
      bucketName,
    } = match.params;

    const splitPath = file.key.split('/');
    const parentFolderPath = splitPath.slice(0, splitPath.length - 1).join('/');
    const folderPathUrl = parentFolderPath === '' ? '' : `/folder/${parentFolderPath}`;

    const redirectUrl = url.buildUrl(null, `/teams/${teamId}/storage/${bucketName}${folderPathUrl}`);

    dispatch(openModal(DELETE_STORED_ITEMS_MODAL, {
      itemsToRemove: [file],
      redirectUrl,
    }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <GenericButton
          disabled={disabled || !objectUrl}
          buttonVariant="primary"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${objectUrl}`}
        >
          {t('storage.open')}
        </GenericButton>
        <GenericButton
          disabled={disabled}
          buttonVariant="primary"
          onClick={(event) => {
            event.preventDefault();

            actions.download({
              t,
              toast,
              bucket: file.bucket,
              selectedObjects: [file],
            });
          }}
        >
          {t('storage.download')}
        </GenericButton>
        <GenericButton
          disabled={disabled}
          buttonVariant="primary"
          onClick={(event) => {
            event.preventDefault();

            actions['copy-path']({
              t,
              toast,
              bucket: file.bucket,
              selectedObjects: [file],
            });
          }}
        >
          {t('storage.copyPath')}
        </GenericButton>
        <ActionsButton disabled={disabled} btnName={t('storage.actions')}>
          <Option
            warning
            name="Delete"
            onClick={handleDeleteClick}
          />
        </ActionsButton>
      </div>
    </div>
  );
};

ButtonsGroup.defaultProps = {
  objectUrl: null,
};

ButtonsGroup.propTypes = {
  objectUrl: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    bucket: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default ButtonsGroup;
