// @flow

import React from 'react';
import {Modal} from 'react-native';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

import UploadForm from '../upload-form';
import {addListingThunk} from '../../../store/thunks/profile';
import {updateDraft} from '../../../store/actions/profile';
import type {
  categoryType,
  draftListingType,
  listingType,
  uploadListingType,
} from '../../types';
import {withAuth} from "../with-auth";

type Props = {
  categories?: Array<categoryType>,
  addListing: uploadListingType => void,
  saveDraft: draftListingType => void,
  listing: listingType | draftListingType,
  showForm: boolean,
  onClose: () => {},
};

export const EditListing = ({
  listing,
  categories,
  addListing,
  saveDraft,
  showForm = false,
  onClose,
}: Props) => (
  <Modal visible={showForm} animationType="fade">
    <UploadForm
      onClose={onClose}
      categories={categories}
      addListing={lis => addListing({...lis, id: listing.id})}
      saveDraft={lis => {
        saveDraft({...lis, id: listing.id});
        showMessage({
          message: 'Listing saved as draft!',
          description: lis.title,
          type: 'info',
          icon: 'info',
        });
      }}
      listing={listing}
    />
  </Modal>
);

const mapStateToProps = ({meta: {categories}}) => ({
  categories,
});

const mapDispatchToProps = {
  addListing: addListingThunk,
  saveDraft: updateDraft,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (propsFromState, propsFromDispatch, ownProps) => ({
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    addListing: ownProps.addListing || propsFromDispatch.addListing,
  }),
)(withAuth({Component: EditListing}));
