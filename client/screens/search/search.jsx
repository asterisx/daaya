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
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
      navigation.setParams({
          onSearchChange: ({searchTerm}) => {
              setQuery(searchTerm);
              setIsEditing(true);
          },
          searchQuery: query,
          searchTerm,
          onSearchSubmit: () => {
              setSearchTerm(query);
              setOnSearchSubmit(true);
              setIsEditing(false);
          },
          isEditing,
          cancelEditing: () => {
              setIsEditing(false);
              setQuery(searchTerm);
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
