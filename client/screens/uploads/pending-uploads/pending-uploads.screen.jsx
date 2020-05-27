// @flow

import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';

import type {listingType} from '../../../common/types';
import {AddListing, EditListing, UploadCard} from '../../../common/components';
import {deleteListingThunk, getMyListingsThunk} from '../../../store/thunks';
import {deletingStatuses, uploadStatuses} from '../../../common/constants';
import {commonStyles} from '../../../common/styles';
import {cancelUploadListing} from '../../../store/actions/profile';

type Props = {
  listings: Array<
    listingType & {
      addListingStatus:
        | uploadStatuses.UPLOADING
        | uploadStatuses.UPLOADED
        | uploadStatuses.ERROR,
      deletingStatus?:
        | deletingStatuses.DELETING
        | deletingStatuses.DELETED
        | deletingStatuses.ERROR,
    },
  >,
  cancelUpload: ({id: string}) => void,
  onRetry: ({id: string}) => void,
};

const PendingUploadsScreen = ({
  listings,
  cancelUpload,
  onRetry,
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [listingToEdit, setListingToEdit] = useState();

  return listings.length === 0 ? (
    <View style={[commonStyles.flex1, commonStyles.heightFull]}>
      <View
        style={[
          commonStyles.flex1,
          commonStyles.heightFull,
          commonStyles.flexColumnJustifyAlignCenter,
        ]}>
        <Text>You are all set.</Text>
        <Text>You don't have any pending uploads!</Text>
      </View>
      <AddListing />
    </View>
  ) : (
    <View style={[commonStyles.flex1, commonStyles.heightFull]}>
      <FlatList
        style={[commonStyles.flex1, commonStyles.marginTop10]}
        data={listings}
        renderItem={({item: {addListingStatus, deletingStatus, listing}}) => (
          <UploadCard
            key={listing.id}
            status={addListingStatus}
            title={listing.title}
            category={listing.category.value}
            image={
              listing.images && listing.images.length > 0
                ? listing.images[0]
                : undefined
            }
            onEdit={() => {
              setListingToEdit(listing);
              setShowEditModal(true);
            }}
            onDelete={() => cancelUpload({id: listing.id})}
            onReUpload={() => onRetry({id: listing.id})}
            deletingStatus={deletingStatus}
            cancelUpload={() => cancelUpload({id: listing.id})}
          />
        )}
        keyExtractor={item => item.listing.id}
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
  Profile: {newListings, listingsForDeletion},
  meta: {categories},
}) => ({
  listings:
    newListings.map(listing => ({
      ...listing,
      listing: {
        ...listing.listing,
        category: categories.find(({id}) => id === listing.listing.category),
      },
      deletingStatus: listingsForDeletion.find(
        ({id: lid}) => lid === listing.id,
      )
        ? listingsForDeletion.find(({id: lid}) => lid === listing.id).status
        : undefined,
    })) || [],
});

const mapDispatchToProps = {
  getListings: getMyListingsThunk,
  deleteListing: deleteListingThunk,
  cancelUpload: cancelUploadListing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PendingUploadsScreen);
