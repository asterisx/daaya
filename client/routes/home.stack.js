import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen, SearchScreen, Institution, ListingDetail} from '../screens';
import {
  HeaderWrapper,
  HomeHeader,
  SearchHeader,
  SimpleHeader,
} from '../common/components/header';

const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <HomeHeader
          toggleDrawer={() => navigation.toggleDrawer()}
          onSearchClick={() => navigation.navigate('Search', {searchTerm: ''})}
        />
      ),
    }),
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({
      header: () => (
        <SearchHeader
          onSearchChange={navigation.state.params.onSearchChange}
          searchQuery={navigation.state.params.searchQuery}
          searchTerm={navigation.state.params.searchTerm}
          isEditing={navigation.state.params.isEditing}
          onSearchSubmit={navigation.state.params.onSearchSubmit}
          cancelEditing={navigation.state.params.cancelEditing}
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
          {navigation.state.params.title
            ? React.cloneElement(navigation.state.params.title)
            : null}
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
