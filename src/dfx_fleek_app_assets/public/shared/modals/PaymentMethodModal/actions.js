export const SAVE_CLIENT_SECRET = 'STORE_CLIENT_SECRET';
export const DELETE_CLIENT_SECRET = 'DELETE_CLIENT_SECRET';

export const saveClientSecret = (clientSecretId) => ({
  type: SAVE_CLIENT_SECRET,
  payload: clientSecretId,
});

export const deleteClientSecret = () => ({
  type: DELETE_CLIENT_SECRET,
});
