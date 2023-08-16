import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import appReducer from './AppRedux';
import authReducer from './AuthRedux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth'],
  blacklist: [],
};

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});
export const persistor = persistStore(store);
