import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';

import type {draftListingType, uploadListingType} from '../../../common/types';
import {
  addListing,
  addListingError,
  addListingSuccess,
  cancelUploadListingError,
  cancelUploadListingSuccess,
  deleteListing,
  deleteListingError,
  deleteListingSuccess,
  getMyListings,
  myListingsError,
  myListingsReceived,
  removePending,
  saveDraft,
} from '../../actions';
import API from '../../../common/api/api';
import {uploadStatuses} from '../../../common/constants';

export const addListingThunk = (
  listing: uploadListingType | draftListingType,
) => async (dispatch, getState) => {
  if (!listing.id) listing = {id: uuid.v1(), ...listing};
  dispatch(addListing({listing}));

  const uploadData = async () => {
    const actions = [
      ...(listing.images
        ? listing.images.map(image =>
            API.uploadImage({image, listingId: listing.id}),
          )
        : []),
      await API.addListing({listing: {...listing, images: []}}),
    ];

    for (let i = 0; i < actions.length; i++) {
      const {
        Profile: {newListings},
      } = getState();
      if (
        newListings.find(({listing: ls}) => ls.id === listing.id)
          .addListingStatus === uploadStatuses.CANCELLING
      ) {
        await API.deleteUploadedImagesForListing({listingId: listing.id});
        return false;
      }
      await actions[i];
    }

    return true;
  };

  try {
    const wasUploadComplete = await uploadData();
    const {
      Profile: {newListings},
    } = getState();
    const wasCancelled =
      newListings.find(({listing: ls}) => ls.id === listing.id)
        .addListingStatus === uploadStatuses.CANCELLING;

    if (!wasCancelled) {
      dispatch(
        addListingSuccess({
          id: listing.id,
        }),
      );
      showMessage({
        message: 'Listing Uploaded!',
        description: listing.title,
        type: 'success',
        icon: 'success',
      });
    } else {
      if (wasUploadComplete) {
        await API.deleteListing({id: listing.id});
      }
      dispatch(cancelUploadListingSuccess({id: listing.id}));
      dispatch(removePending({id: listing.id}));
      dispatch(
        saveDraft({
          title: listing.title,
          images: listing.images,
          description: listing.description,
          category: listing.category,
          address: listing.address,
          telephone: listing.telephone,
        }),
      );
      showMessage({
        message: 'Listing saved as draft!',
        description: listing.title,
        type: 'info',
        icon: 'info',
      });
    }
  } catch (e) {
    const {
      Profile: {newListings},
    } = getState();
    const wasCancelled =
      newListings.find(({listing: ls}) => ls.id === listing.id)
        .addListingStatus === uploadStatuses.CANCELLING;

    if (wasCancelled) {
      dispatch(cancelUploadListingError({id: listing.id, error: e.toString()}));
    } else {
      addListingError({
        id: listing.id,
        error: e.toString(),
      });
    }
  }
};

export const deleteListingThunk = ({id}: {id: string}) => dispatch => {
  dispatch(deleteListing({id}));

  API.deleteListing({id})
    .then(() => {
      dispatch(deleteListingSuccess({id}));
      showMessage({
        message: 'Listing Deleted Successfully!',
        description: 'Your listing has been deleted successfully',
        type: 'success',
        icon: 'success',
      });
    })
    .catch(error => dispatch(deleteListingError({id, error})));
};

export const getMyListingsThunk = ({
  direction,
  count = 10,
}: {
  searchTerm: string,
  direction: string,
}) => (dispatch, getState) => {
  dispatch(getMyListings());

  const {
    Profile: {cursorIdNext, cursorIdPrevious},
  } = getState();

  API.getMyListings({
    direction,
    cursorId: direction === 'next' ? cursorIdNext : cursorIdPrevious,
    count,
  })
    .then(({listings, cursorId}) =>
      dispatch(
        myListingsReceived({
          listings,
          cursorId,
          direction,
        }),
      ),
    )
    .catch(error => dispatch(myListingsError({error})));
};
