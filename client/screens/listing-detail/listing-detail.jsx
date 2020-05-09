// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Image, Text, View, ActivityIndicator, Button} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavigationStackScreenProps} from 'react-navigation-stack';

import {Address, Tel} from '../../common/components';
import type {listingType} from '../../common/types';
import {styles} from './styles';
import {getListingThunk} from '../../store/thunks/listing';
import {fetchingStatuses} from '../../store/actions';
import {useDelayedLoader} from '../../common/hooks';

const Listing = ({
  images = [],
  title,
  category,
  address,
  telephone,
}: listingType) => (
  <View style={styles.wrapper}>
    <Swiper containerStyle={styles.slideshow} height={240}>
      {images.map((image, index) => (
          <Image key={`${image}-${index}`} resizeMode="stretch" style={styles.image} source={{uri: image}} />
      ))}
    </Swiper>
    <View style={styles.infoSection}>
      <Text>{title}</Text>
      <Text>{category.value}</Text>
      {address && <Address {...address} />}
      {telephone && <Tel {...telephone} />}
    </View>
  </View>
);

type ListingProp = listingType & {
  fetchingListingStatus: string,
};

type Props = {
  navigation: NavigationStackScreenProps,
  getListing: ({id: string}) => string,
  listing: ListingProp | {fetchingListingStatus: string},
};

const ListingDetail = ({navigation, getListing, listing}: Props) => {
  const showLoader = useDelayedLoader(
    listing.fetchingListingStatus === fetchingStatuses.FETCHING,
  );
  useEffect( () => {
    if (listing.fetchingListingStatus === fetchingStatuses.NONE) {
      getListing({id: navigation.getParam('id')});
    }
  }, [listing.fetchingListingStatus]);

  if (listing.fetchingListingStatus === fetchingStatuses.SUCCESS) {
    return (
      <Listing
        id={listing.id}
        images={listing.images}
        title={listing.title}
        category={listing.category}
        address={listing.address}
        telephone={listing.telephone}
      />
    );
  } else if (
    listing.fetchingListingStatus === fetchingStatuses.FETCHING ||
    listing.fetchingListingStatus === fetchingStatuses.NONE
  ) {
    return showLoader ? (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator />
        <Text style={styles.marginTop20}>Loading...</Text>
      </View>
    ) : null;
  } else if (listing.fetchingListingStatus === fetchingStatuses.ERROR) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text>Unable to fetch the listing</Text>
        <Button
          style={styles.marginTop20}
          title="Retry"
          onPress={() => getListing({id: navigation.getParam('id')})}
        />
      </View>
    );
  }
};

const mapStateToProps = (
  {ListingDetails},
  {navigation}: {navigation: NavigationStackScreenProps},
) => {
  const listingId = navigation.getParam('id');
  const listing = ListingDetails.find(({id}) => id === listingId);
  return {
    listing: listing || {
      fetchingListingStatus: fetchingStatuses.NONE,
    },
  };
};

const mapDispatchToProps = {
  getListing: getListingThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingDetail);
