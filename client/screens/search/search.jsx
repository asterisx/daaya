// @flow

import React, {useState} from 'react';
import {View} from 'react-native';
import {Listings, SearchHeader} from '../../common/components';
import {NavigationStackScreenProps} from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackScreenProps,
};

const Search = ({navigation}: Props) => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmit, setOnSearchSubmit] = useState(false);

  return (
    <View>
      <SearchHeader
        onSearchChange={({searchTerm}) => setQuery(searchTerm)}
        searchTerm={query}
        onSearchSubmit={() => {
          setSearchTerm(query);
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
