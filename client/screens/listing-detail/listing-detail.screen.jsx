// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Image, View, Button, ScrollView, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {useSafeArea} from 'react-native-safe-area-context';

import {Address, ScreenLoader, Tel} from '../../common/components';
import type {listingType} from '../../common/types';
import {styles} from './styles';
import {getListingThunk} from '../../store/thunks/listing';
import {fetchingStatuses} from '../../store/actions';
import {useDelayedLoader} from '../../common/hooks';
import {commonStyles} from '../../common/styles';

const Listing = ({
  images = [],
  title,
  description,
  category,
  address,
  telephone,
}: listingType) => {
  const insets = useSafeArea();
  return (
    <View style={[styles.wrapper, {paddingBottom: insets.bottom}]}>
      {images.length ? (
        <Swiper containerStyle={styles.slideshow} height={240}>
          {images.map((image, index) => (
            <Image
              key={`${image}-${index}`}
              resizeMode="stretch"
              style={styles.image}
              source={{uri: image}}
            />
          ))}
        </Swiper>
      ) : null}
      <ScrollView style={commonStyles.flex1}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.category, commonStyles.marginTop10]}>
            <Text style={styles.categoryText}>{category.value}</Text>
          </View>
          <View style={commonStyles.marginTop10}>
            {address && <Address {...address} textStyle={{marginRight: 25}} />}
          </View>
          <Text
            style={[
              commonStyles.marginTop15,
              styles.description,
              {marginRight: 15},
            ]}>
            {description}
          </Text>
        </View>
      </ScrollView>
      {telephone && (
        <View style={styles.options}>
          <Tel {...telephone} />
        </View>
      )}
    </View>
  );
};

type ListingProp = listingType & {
  fetchingListingStatus: string,
};

type Props = {
  navigation: NavigationStackScreenProps,
  getListing: ({id: string}) => string,
  listing: ListingProp | {fetchingListingStatus: string},
};

const ListingDetailScreen = ({navigation, getListing, listing}: Props) => {
  const showLoader = useDelayedLoader(
    listing.fetchingListingStatus === fetchingStatuses.FETCHING,
  );
  useEffect(() => {
    if (listing.fetchingListingStatus === fetchingStatuses.NONE) {
      getListing({id: navigation.getParam('id')});
    } else if (listing.fetchingListingStatus === fetchingStatuses.SUCCESS) {
      navigation.setParams({
        title: <Text numberOfLines={1}>{listing.title}</Text>,
      });
    }
  }, [listing.fetchingListingStatus]);

  if (listing.fetchingListingStatus === fetchingStatuses.SUCCESS) {
    return (
      <Listing
        id={listing.id}
        images={listing.images}
        title={listing.title}
        description={listing.description}
        category={listing.category}
        address={listing.address}
        telephone={listing.telephone}
      />
    );
  } else if (
    listing.fetchingListingStatus === fetchingStatuses.FETCHING ||
    listing.fetchingListingStatus === fetchingStatuses.NONE
  ) {
    return showLoader ? <ScreenLoader /> : null;
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
)(ListingDetailScreen);
