import React from 'react';
import PropTypes from 'prop-types';
import { url, useAccountId } from '@Shared';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import IconFA from '@terminal-packages/ui/core/IconFA';
import { toast } from '@terminal-packages/ui/core/Toast';
import { Divider, Option, ActionsButton } from '@Shared/ActionsButton';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import {
  openModal,
  UPLOAD_ITEMS_MODAL,
  CREATE_FOLDER_MODAL,
  DELETE_STORED_ITEMS_MODAL,
} from '@Shared/modals/actions';

import actions from './actions';
import useStyles from './styles';
import objectsSelector from '../../utils/objects-selector';

const ButtonsGroup = (props) => {
  const {
    bucket,
    prefix,
    disabled,
    delimiter,
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const accountId = useAccountId();

  /* eslint-disable no-underscore-dangle */
  const {
    actionOptions,
    selectedObjects,
  } = useSelector((state) => {
    const _filteredObjects = objectsSelector(state, bucket, prefix, delimiter);
    const _selectedObjects = _filteredObjects.filter((obj) => obj.selected);

    const _actionOptions = state.storage.actionOptions.filter((option) => {
      const { length } = _selectedObjects;

      if (length > 1 || length < 1) return false;

      const objType = _selectedObjects[0].type;
      return option.access[objType];
    });

    return {
      selectedObjects: _selectedObjects,
      actionOptions: _actionOptions,
    };
  });

  const handleOptionClick = (option) => (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(option.id);
    actions[option.id]({
      t,
      toast,
      bucket,
      history,
      accountId,
      selectedObjects,
    });
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();

    dispatch(openModal(DELETE_STORED_ITEMS_MODAL, {
      itemsToRemove: selectedObjects,
    }));
  };

  const handleNewFolderClick = () => {
    window.analytics.track('Storage create folder click', {
      bucket,
      teamId: url.getAccountIdFromUrl(),
    });

    dispatch(openModal(CREATE_FOLDER_MODAL));
  };

  const handleUploadClick = () => {
    window.analytics.track('Storage upload click', {
      bucket,
      teamId: url.getAccountIdFromUrl(),
    });

    dispatch(
      openModal(UPLOAD_ITEMS_MODAL, {
        bucket,
        prefix: prefix || '',
      }),
    );
  };

  const noItemsSelected = selectedObjects.length < 1;

  return (
    <div className={classes.root}>
      <div className={classes.group}>
        <GenericButton
          disabled={disabled}
          buttonVariant="primary"
          onClick={handleUploadClick}
        >
          <div className={classes.buttonContent}>
            <IconFA icon={['fal', 'upload']} />
            <span>{t('storage.upload')}</span>
          </div>
        </GenericButton>
        <GenericButton
          disabled={disabled}
          buttonVariant="primary"
          onClick={handleNewFolderClick}
        >
          <div className={classes.buttonContent}>
            <IconFA icon={['fal', 'folder-plus']} />
            <span>{t('storage.createFolder')}</span>
          </div>
        </GenericButton>
        <ActionsButton
          disabled={noItemsSelected || disabled}
          btnName={t('storage.actions')}
        >
          {
            actionOptions.map((option) => (
              <Option
                key={option.id}
                name={option.name}
                onClick={handleOptionClick(option)}
              />
            ))
          }
          {selectedObjects.length > 0 && (
            <>
              <Divider />
              <Option
                warning
                name="Delete"
                onClick={handleDeleteClick}
              />
            </>
          )}
        </ActionsButton>
      </div>
    </div>
  );
};

ButtonsGroup.defaultProps = {
  bucket: '',
  prefix: null,
  delimiter: '/',
  disabled: false,
};

ButtonsGroup.propTypes = {
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  bucket: PropTypes.string,
  delimiter: PropTypes.string,
};

export default ButtonsGroup;
