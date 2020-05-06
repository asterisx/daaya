// @flow

import React from 'react';
import {Listings} from '../../common/components';

type Props = {
  navigation: *
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
