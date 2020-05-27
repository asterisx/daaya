import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import {
  Institutes,
  Listings,
  ListingDetails,
  meta,
  Profile,
  DraftListings,
} from './reducers';

const middleWares = applyMiddleware(thunkMiddleware, logger);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const devToolsMiddleware = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

const store = createStore(
  combineReducers({
    Institutes,
    Listings,
    ListingDetails,
    meta,
    Profile,
    DraftListings: persistReducer(persistConfig, DraftListings),
  }),
  compose(
    middleWares,
    devToolsMiddleware,
  ),
);

persistStore(store);

export default store;
