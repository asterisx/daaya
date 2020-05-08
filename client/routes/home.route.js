// @flow

import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, Search, Institution, ListingDetail} from '../screens';
import {HomeHeader} from '../common/components/header';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <HomeHeader
            onSearchClick={() =>
              navigation.navigate('Search', {searchTerm: ''})
            }
          />
        ),
      };
    },
  },
  Search: {
    screen: Search,
  },
  Institution: {
    screen: Institution,
  },
  ListingDetail: {
    screen: ListingDetail,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
  },
});

export default HomeStack;
