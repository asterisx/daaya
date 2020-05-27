/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import store from './store';
import Navigator from './routes/home.route';
import {getMetaThunk} from './store/thunks/meta';

const AppContainer = createAppContainer(Navigator);

const App: () => React$Node = () => {
  useEffect(() => {
    store.dispatch(getMetaThunk());
  }, []);
  return (
    <Provider store={store}>
      <AppContainer>
        <Navigator />
      </AppContainer>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
