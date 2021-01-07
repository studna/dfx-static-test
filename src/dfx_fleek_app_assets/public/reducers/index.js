import { combineReducers } from 'redux';

import loadingStateReducer from './loading';
import testReducer from './test';
import modalReducer from './modal';
import billingReducer from './billing';
import storageReducer from './storage';

const rootReducer = combineReducers({
  loadingState: loadingStateReducer,
  test: testReducer,
  modal: modalReducer,
  billing: billingReducer,
  storage: storageReducer,
});

export default rootReducer;
