// @flow

import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import debounce from 'lodash.debounce';

import type {myListingType} from '../../../common/types';
import {fetchingStatuses, cancelUpdateListing} from '../../../store/actions';
import {commonStyles} from '../../../common/styles';
import {
  AddListing,
  InfiniteRefreshableScrollView,
  UploadCard,
} from '../../../common/components';
import {useDelayedLoader} from '../../../common/hooks';
import {
  deleteListingThunk,
  getMyListingsThunk,
  reUpdateListingThunk,
  updateListingThunk,
} from '../../../store/thunks/profile';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {deletingStatuses, uploadStatuses} from '../../../common/constants';
import {UpdateListing} from './components';

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
  updateListing: (listing: myListingType) => void,
  onReUpdate: ({id: string}) => void,
  cancelUpdate: ({id: string}) => void,
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
  updateListing,
  onReUpdate,
  cancelUpdate,
}: Props) => {
  const showLoader = useDelayedLoader(
    fetchingListingsStatus === fetchingStatuses.FETCHING ||
      fetchingListingsStatus === fetchingStatuses.NONE,
  );
  const loadNext = useCallback(debounce(getListings, 100), []);

  const deleteLoadNext = useCallback(debounce(getListings, 1000), []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [listingIdToEdit, setListingIdToEdit] = useState();

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
            status={item.addListingStatus}
            title={item.title}
            category={item.category}
            image={item.image}
            onEdit={() => {
              setListingIdToEdit(item.id);
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
            cancelUpdate={() => cancelUpdate({id: item.id})}
            onReUpdate={() => onReUpdate({id: item.id})}
          />
        )}
        keyExtractor={item => item.id}
      />
      <AddListing />
      {showEditModal && (
        <UpdateListing
          listingId={listingIdToEdit}
          showForm={showEditModal}
          onClose={() => setShowEditModal(false)}
          addListing={listing => updateListing(listing)}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({
  Profile: {oldListings, fetchingListingsStatus, listingsForDeletion},
}) => ({
  listings:
    oldListings.map(listing => ({
      ...listing,
      addListingStatus: listing.addListingStatus || uploadStatuses.UPLOADED,
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
  cancelUpdateListing,
  updateListing: updateListingThunk,
  onReUpdate: reUpdateListingThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyUploadsScreen);
