import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './AppRedux';
import authReducer from './AuthRedux';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
