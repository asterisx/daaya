// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import type {listingType} from '../../types';
import {styles} from './styles';
import {getListingsThunk} from '../../../store/thunks/listings';

type Props = {
  listings: Array<listingType>,
  onListingClick: ({id: number}) => void,
  searchTerm: string,
  next?: string,
};

const Listings = ({
  listings = [],
  onListingClick,
  searchTerm,
  getListings,
}: Props) => {
  useEffect( () => {
    getListings({searchTerm});
  }, [searchTerm]);
  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.container}>
          {listings.map(listing => (
            <TouchableOpacity key={listing.id} onPress={() => onListingClick({id: listing.id})}>
              <Card>
                <View>
                  {listing.images.length ? (
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{uri: listing.images[0]}}
                    />
                  ): null}
                  <Text style={styles.title}>{listing.title}</Text>
                  <Text style={styles.category}>
                    in {listing.category.value}
                  </Text>
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
  console.log(Listings);
  return {
    listings: homeListings ? homeListings.listings : [],
  };
};

const mapDispatchToProps = {
  getListings: getListingsThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
