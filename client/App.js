/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';
import Navigator from './routes/home.route';

const AppContainer = createAppContainer(Navigator);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <Navigator />
      </AppContainer>
    </Provider>
  );
};

export default App;
