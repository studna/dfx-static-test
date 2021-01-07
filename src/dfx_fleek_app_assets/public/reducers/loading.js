import {
  UPDATE_LOADING_STATE,
} from './actions/loading-state';

const defaultState = {
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATE:
      return {
        loading: action.payload,
      };

    default:
      return state;
  }
};
