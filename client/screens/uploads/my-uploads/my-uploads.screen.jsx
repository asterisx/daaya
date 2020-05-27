// @flow

import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import debounce from 'lodash.debounce';

import type {myListingType} from '../../../common/types';
import {fetchingStatuses} from '../../../store/actions';
import {commonStyles} from '../../../common/styles';
import {
  AddListing,
  EditListing,
  InfiniteRefreshableScrollView,
  UploadCard,
} from '../../../common/components';
import {useDelayedLoader} from '../../../common/hooks';
import {
  deleteListingThunk,
  getMyListingsThunk,
} from '../../../store/thunks/profile';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {deletingStatuses} from '../../../common/constants';

type Props = {
  listings: Array<
    myListingType & {
      deletingStatus?:
        | deletingStatuses.DELETING
        | deletingStatuses.DELETED
        | deletingStatuses.ERROR,
    },
  >,
  deleteListing: ({id: string}) => void,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
  navigation: NavigationStackScreenProps,
};

const MyUploadsScreen = ({
  listings,
  getListings,
  deleteListing,
  fetchingListingsStatus,
  navigation,
}: Props) => {
  const showLoader = useDelayedLoader(
    fetchingListingsStatus === fetchingStatuses.FETCHING ||
      fetchingListingsStatus === fetchingStatuses.NONE,
  );
  const loadNext = useCallback(debounce(getListings, 100), []);

  const deleteLoadNext = useCallback(debounce(getListings, 1000), []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [listingToEdit, setListingToEdit] = useState();

  useEffect(() => {
    getListings({});
  }, [fetchingListingsStatus === fetchingStatuses.NONE]);
  return (
    <View style={[commonStyles.flex1, commonStyles.marginTop10]}>
      <InfiniteRefreshableScrollView
        canLoadMore={fetchingListingsStatus !== fetchingStatuses.FETCHING}
        loadMore={() =>
          loadNext({
            direction: 'next',
          })
        }
        onRefresh={() =>
          getListings({
            direction: 'previous',
          })
        }
        showLoader={showLoader}
        data={listings}
        renderItem={({item}) => (
          <UploadCard
            key={item.id}
            openListing={() =>
              navigation.navigate('ListingDetail', {id: item.id})
            }
            status={item.status}
            title={item.title}
            category={item.category}
            image={item.image}
            onEdit={() => {
              setListingToEdit(item);
              setShowEditModal(true);
            }}
            onDelete={() => {
              deleteListing({id: item.id});

              if (listings.length < 10) {
                deleteLoadNext({
                  direction: 'next',
                  count: Math.max(0, 10 - listings.length),
                });
              }
            }}
            deletingStatus={item.deletingStatus}
          />
        )}
        keyExtractor={item => item.id}
      />
      <AddListing />
      <EditListing
        listing={listingToEdit}
        showForm={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </View>
  );
};

const mapStateToProps = ({
  Profile: {oldListings, fetchingListingsStatus, listingsForDeletion},
}) => ({
  listings:
    oldListings.map(listing => ({
      ...listing,
      deletingStatus: listingsForDeletion.find(
        ({id: lid}) => lid === listing.id,
      )
        ? listingsForDeletion.find(({id: lid}) => lid === listing.id).status
        : undefined,
    })) || [],
  fetchingListingsStatus,
});

const mapDispatchToProps = {
  getListings: getMyListingsThunk,
  deleteListing: deleteListingThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyUploadsScreen);
