// @flow

import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-elements';
import debounce from 'lodash.debounce';

import type {listingType} from '../../types';
import {styles} from './styles';
import {getListingsThunk} from '../../../store/thunks/listings';
import AddListing from '../add-listing';
import {fetchingStatuses} from '../../../store/actions';
import {colors, commonStyles} from '../../styles';
import {useDelayedLoader} from '../../hooks';

type Props = {
  listings: Array<listingType>,
  onListingClick: ({id: number}) => void,
  searchTerm: string,
  next?: string,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const Listings = ({
  listings = [],
  onListingClick,
  searchTerm,
  getListings,
  fetchingListingsStatus,
}: Props) => {
  const showLoader = useDelayedLoader(
    fetchingListingsStatus === fetchingStatuses.FETCHING ||
      fetchingListingsStatus === fetchingStatuses.NONE,
  );
  const loadNext = useCallback(debounce(getListings, 100), []);

  useEffect(() => {
    getListings({searchTerm});
  }, [searchTerm, fetchingListingsStatus === fetchingStatuses.NONE]);

  return (
    <View style={styles.main}>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (
            isCloseToBottom(nativeEvent) &&
            fetchingListingsStatus !== fetchingStatuses.FETCHING
          ) {
            loadNext({
              searchTerm,
              direction: 'next',
            });
          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() =>
              getListings({
                searchTerm,
                direction: 'previous',
              })
            }
          />
        }>
        <View style={styles.container}>
          {listings.map(listing => (
            <TouchableOpacity
              key={listing.id}
              onPress={() => onListingClick({id: listing.id})}>
              <Card>
                <View>
                  {listing.images.length ? (
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{uri: listing.images[0]}}
                    />
                  ) : null}
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
      <AddListing />
      {showLoader ? (
        <View
          style={[
            {position: 'absolute', height: 100},
            commonStyles.flexRowJustifyAlignCenter,
            commonStyles.widthFull,
          ]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = ({Listings}, {searchTerm: stInProps}) => {
  const theListings = Listings.searchResults.find(
    ({searchTerm}) => searchTerm === stInProps,
  );
  return {
    listings: theListings ? theListings.listings : [],
    fetchingListingsStatus: theListings
      ? theListings.fetchingListingsStatus
      : fetchingStatuses.NONE,
  };
};

const mapDispatchToProps = {
  getListings: getListingsThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
