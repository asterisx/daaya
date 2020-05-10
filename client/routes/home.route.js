import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, Search, Institution, ListingDetail} from '../screens';
import {
  HeaderWrapper,
  HomeHeader,
  SearchHeader,
  SimpleHeader,
} from '../common/components/header';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <HomeHeader
          onSearchClick={() => navigation.navigate('Search', {searchTerm: ''})}
        />
      ),
    }),
  },
  Search: {
    screen: Search,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <SearchHeader
          onSearchChange={navigation.state.params.onSearchChange}
          searchTerm={navigation.state.params.query}
          onSearchSubmit={navigation.state.params.onSearchSubmit}
          onGoBack={() => navigation.goBack()}
          searchOpen
        />
      ),
    }),
  },
  Institution: {
    screen: Institution,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <SimpleHeader
          title={navigation.state.params.title}
          onGoBack={() => navigation.goBack()}
        />
      ),
    }),
  },
  ListingDetail: {
    screen: ListingDetail,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <HeaderWrapper onGoBack={() => navigation.goBack()}>
          {navigation.state.params.title ? React.cloneElement(navigation.state.params.title): null}
        </HeaderWrapper>
      ),
    }),
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: true,
  },
});

export default HomeStack;
