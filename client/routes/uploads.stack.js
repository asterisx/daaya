import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {
  ListingDetail,
  PendingUploadsScreen,
  MyUploadsScreen,
  DraftListingsScreen,
} from '../screens';
import {HeaderWrapper, MenuHeader} from '../common/components/header';
import {Icon} from 'react-native-elements';

const screens = {
  Drafts: {
    screen: createStackNavigator({
      Uploads: {
        screen: DraftListingsScreen,
        navigationOptions: ({navigation}) => ({
          header: () => (
            <MenuHeader
              toggleDrawer={() => navigation.toggleDrawer()}
              title="My Drafts"
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
    }),
    navigationOptions: {
      title: 'My Drafts',
      tabBarIcon: ({tintColor}) => (
        <Icon name="edit" size={22} color={tintColor} />
      ),
      headerShown: true,
    },
  },
  PendingUploads: {
    screen: createStackNavigator({
      PendingUploads: {
        screen: PendingUploadsScreen,
        navigationOptions: ({navigation}) => ({
          header: () => (
            <MenuHeader
              toggleDrawer={() => navigation.toggleDrawer()}
              title="Pending Uploads"
            />
          ),
        }),
      },
    }),
    navigationOptions: {
      title: 'Pending Uploads',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="hourglass-half"
          type="font-awesome"
          size={16}
          color={tintColor}
        />
      ),
      headerShown: true,
    },
  },
  MyUploads: {
    screen: createStackNavigator({
      Uploads: {
        screen: MyUploadsScreen,
        navigationOptions: ({navigation}) => ({
          header: () => (
            <MenuHeader
              toggleDrawer={() => navigation.toggleDrawer()}
              title="My Uploads"
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
    }),
    navigationOptions: {
      title: 'My Uploads',
      tabBarIcon: ({tintColor}) => (
        <Icon name="list" size={24} color={tintColor} />
      ),
      headerShown: true,
    },
  },
};

const UploadsStack = createBottomTabNavigator(screens);

export default UploadsStack;
