// @flow

import React, {useState} from 'react';
import {View} from 'react-native';
import {Listings, SearchHeader} from '../../common/components';

type Props = {
  navigation: *,
};

const Search = ({navigation}: Props) => {
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmit, setOnSearchSubmit] = useState(false);

  return (
    <View>
      <SearchHeader
        onSearchChange={({searchTerm}) => setTempSearchTerm(searchTerm)}
        searchTerm={tempSearchTerm}
        onSearchSubmit={() => {
          setSearchTerm(tempSearchTerm);
          setOnSearchSubmit(true);
        }}
        onGoBack={() => navigation.goBack()}
        searchOpen
      />
      {searchSubmit && (
        <Listings
          searchTerm={searchTerm}
          onListingClick={({id}) => navigation.navigate('ListingDetail', {id})}
        />
      )}
    </View>
  );
};

export default Search;
