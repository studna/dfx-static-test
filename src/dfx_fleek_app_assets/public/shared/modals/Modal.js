import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DnsLinkModal from './DnsLink';
import PaymentMethodModal from './PaymentMethodModal';
import DeleteStoredItems from './DeleteStoredItems';
import CreateFolderModal from './CreateFolder';
import UploadFilesModal from './UploadFiles';
import ApiDetailsModal from './ApiDetails';

import {
  closeModal,
  DNS_LINK_MODAL,
  PAYMENT_METHOD_MODAL,
  DELETE_STORED_ITEMS_MODAL,
  CREATE_FOLDER_MODAL,
  UPLOAD_ITEMS_MODAL,
  API_DETAILS_MODAL,
} from './actions';

const MODALS = {
  [DNS_LINK_MODAL]: DnsLinkModal,
  [PAYMENT_METHOD_MODAL]: PaymentMethodModal,
  [DELETE_STORED_ITEMS_MODAL]: DeleteStoredItems,
  [CREATE_FOLDER_MODAL]: CreateFolderModal,
  [UPLOAD_ITEMS_MODAL]: UploadFilesModal,
  [API_DETAILS_MODAL]: ApiDetailsModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  const closeModalHandler = () => dispatch(closeModal());

  if (!modalState.open) return null;

  const ModalComponent = MODALS[modalState.id];

  if (!ModalComponent) return null;

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <ModalComponent
      {...modalState.props}
      closeModal={closeModalHandler}
      open
    />
  );
};

export default Modal;
