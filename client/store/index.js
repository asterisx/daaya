import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reducers from './reducers';

const middleWares = applyMiddleware(
  thunkMiddleware,
  logger,
);

const devToolsMiddleware = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

const store = createStore(
  combineReducers(reducers),
  compose(
    middleWares,
    devToolsMiddleware,
  ),
);

export default store;
