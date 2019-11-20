import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducers from '~/reducers';

const client = axios.create({
    baseURL:'http://localhost:3000/',
    responseType: 'json'
});

const middleWares = applyMiddleware(thunkMiddleware, axiosMiddleware(client), logger);

const devToolsMiddleware = window.devToolsExtension
  ? window.devToolsExtension()
  : f => f;

const store = createStore(reducers, compose(middleWares, devToolsMiddleware));

export default store;
