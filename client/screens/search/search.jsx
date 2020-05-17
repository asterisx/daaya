// @flow

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Listings} from '../../common/components';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {styles} from "./styles";

type Props = {
  navigation: NavigationStackScreenProps,
};

const Search = ({navigation}: Props) => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSubmit, setOnSearchSubmit] = useState(false);

  useEffect(() => {
      navigation.setParams({
          onSearchChange: ({searchTerm}) => setQuery(searchTerm),
          searchTerm: query,
          onSearchSubmit: () => {
              setSearchTerm(query);
              setOnSearchSubmit(true);
          }
      });
  }, [searchTerm, query]);

  return (
    <View style={styles.wrapper}>
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
