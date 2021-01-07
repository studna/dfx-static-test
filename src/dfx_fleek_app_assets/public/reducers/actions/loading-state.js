export const UPDATE_LOADING_STATE = 'UPDATE_LOADING_STATE';

export const setLoadingState = (state) => ({
  type: UPDATE_LOADING_STATE,
  payload: {
    loading: state,
  },
});
