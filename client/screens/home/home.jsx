// @flow

import React from 'react';
import {Listings} from '../../common/components';
import {NavigationStackScreenProps} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackScreenProps,
};

const Home = ({navigation}: Props) => {
  return (
    <Listings
      searchTerm=""
      onListingClick={({id}) => navigation.navigate('ListingDetail', {id})}
    />
  );
};

export default Home;
