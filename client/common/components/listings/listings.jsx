// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import type {post} from '../../types';
import {styles} from './styles';
import {getListingsThunk} from '../../../store/thunks/listings';

type Props = {
  listings: Array<post>,
  onListingClick: ({id: number}) => void,
  searchTerm: string,
  next?: string,
};

const Listings = ({listings, onListingClick, searchTerm, next}: Props) => {
  useEffect(() => getListings({searchTerm}), [searchTerm]);
  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          {listings.map(listing => (
            <TouchableOpacity onPress={() => onListingClick({id: listing.id})}>
              <Card>
                <View>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{uri: listing.img}}
                  />
                  <Text style={styles.title}>{listing.title}</Text>
                  <Text style={styles.category}>in {listing.category}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({Listings}, {searchTerm: stInProps}) => {
  const homeListings = Listings.searchResults.find(
    ({searchTerm}) => searchTerm === stInProps,
  );
  return {
    listings: homeListings,
  };
};

const mapDispatchToProps = {
  getListings: getListingsThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
