// @flow

import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import {DraftUploadCard} from './components';
import type {draftListingType, uploadListingType} from '../../../common/types';
import {AddListing, EditListing} from '../../../common/components';
import {commonStyles} from '../../../common/styles';
import {deleteDraft} from '../../../store/actions/profile';
import {addListingThunk} from '../../../store/thunks/profile';

type Props = {
  listings: Array<draftListingType>,
  addListing: (uploadListingType | draftListingType) => void,
  cancelUpload: ({id: string}) => void,
  deleteListing: ({id: string}) => void,
};

const DraftListingsScreen = ({listings, deleteListing, addListing}: Props) => {
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
        <Text>You don't have any drafts!</Text>
      </View>
      <AddListing />
    </View>
  ) : (
    <View style={[commonStyles.flex1, commonStyles.heightFull]}>
      <FlatList
        style={[commonStyles.flex1, commonStyles.marginTop10]}
        data={listings}
        renderItem={({item}) => (
          <DraftUploadCard
            key={item.id}
            title={item.title}
            category={item.category.value}
            image={
              item.images && item.images.length > 0 ? item.images[0] : undefined
            }
            onEdit={() => {
              setListingToEdit(item);
              setShowEditModal(true);
            }}
            onDelete={() => deleteListing({id: item.id})}
            isValidDraft={item.title && item.title.trim().length}
            onPost={() => {
              addListing({...item, category: item.category.id});
              deleteListing({id: item.id});
              showMessage({
                message: 'Your Listing is now uploading',
                description:
                  'You can check the status in the pending uploads tab',
                type: 'success',
                icon: 'success',
              });
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
      <AddListing />
      {showEditModal && (
        <EditListing
          listing={listingToEdit}
          showForm={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({DraftListings: {listings}, meta: {categories}}) => ({
  listings:
    listings.map(listing => ({
      ...listing,
      category: categories.find(({id}) => id === listing.category),
    })) || [],
});

const mapDispatchToProps = {
  deleteListing: deleteDraft,
  addListing: addListingThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraftListingsScreen);
