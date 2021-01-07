/* Action Types */
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/* Modal Ids */
export const DNS_LINK_MODAL = 'DNS_LINK_MODAL';
export const PAYMENT_METHOD_MODAL = 'PAYMENT_METHOD_MODAL';
export const CREATE_FOLDER_MODAL = 'CREATE_FOLDER_MODAL';
export const DELETE_STORED_ITEMS_MODAL = 'DELETE_STORED_ITEMS_MODAL';
export const UPLOAD_ITEMS_MODAL = 'UPLOAD_ITEMS_MODAL';
export const API_DETAILS_MODAL = 'API_DETAILS_MODAL';

/* Action creators */
export const openModal = (modalKey, props = {}) => ({
  type: OPEN_MODAL,
  payload: {
    props,
    id: modalKey,
  },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
