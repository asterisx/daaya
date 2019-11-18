import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

import reducers from '~/reducers';

const middleWares = applyMiddleware(thunkMiddleware, logger);

const devToolsMiddleware = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

const store = createStore(reducers, compose(middleWares, devToolsMiddleware));

export default store;
