import {
  SAVE_CLIENT_SECRET,
  DELETE_CLIENT_SECRET,
} from '../shared/modals/PaymentMethodModal/actions';

const defaultState = {
  clientSecretId: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_CLIENT_SECRET:
      return {
        clientSecretId: action.payload,
      };

    case DELETE_CLIENT_SECRET:
      return defaultState;

    default:
      return state;
  }
};
