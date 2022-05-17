import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import appstateReducer from '@app/redux/reducers/appstate';
import formdataReducer from '@app/redux/reducers/formdata';
import userReducer from '@app/redux/reducers/user';
import appdataReducer from '@app/redux/reducers/appdata';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};
const rootReducer = combineReducers({
  appstate: persistReducer({ key: 'appstate', storage: AsyncStorage, }, appstateReducer),
  appdata: persistReducer({ key: 'appdata', storage: AsyncStorage, }, appdataReducer),
  formdata: persistReducer({ key: 'formdata', storage: AsyncStorage, },formdataReducer),
  user: persistReducer({ key: 'user', storage: AsyncStorage, },userReducer)
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })

});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>
