import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';

import type {
  draftListingType,
  listingType,
  uploadListingType,
} from '../../../common/types';
import {
  addListing,
  addListingError,
  addListingSuccess,
  cancelUpdateListing,
  cancelUpdateListingError,
  cancelUpdateListingSuccess,
  cancelUploadListingError,
  cancelUploadListingSuccess,
  deleteListing,
  deleteListingError,
  deleteListingSuccess,
  getMyListings,
  markListingCantCancel,
  myListingsError,
  myListingsReceived,
  removePending,
  saveDraft,
  updateListing,
  updateListingError,
  updateListingSuccess,
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
        ? listing.images.map(image => async () =>
            API.uploadImage({image, listingId: listing.id}),
          )
        : []),
      async () => API.addListing({listing: {...listing, images: []}}),
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
      await actions[i]();
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

export const retryListingThunk = id => async (dispatch, getState) => {
  const {
    Profile: {newListings},
  } = getState();
  const listing = newListings.find(({listing: ls}) => ls.id === id);
  await dispatch(addListingThunk(listing));
};

export const updateListingThunk = (listing: listingType) => async (
  dispatch,
  getState,
) => {
  /* TODO:
   *  Move the current listing to pending listings, update the status (addListingStatus)
   *  Keep the listing in old listings too
   *  The above is job of the reducer
   *  Check for cancel like addListing, similar flow
   *  Difference being this listing is in two places, newListings (pendingListings) and oldListings.
   *
   * */
  if (!listing.id) listing = {id: uuid.v1(), ...listing};
  dispatch(updateListing({listing}));

  const uploadData = async () => {
    const actions = [
      ...(listing.images
        ? listing.images.map(image => async () =>
            API.uploadImage({image, listingId: listing.id, isUpdate: true}),
          )
        : []),
      async () => API.updateListing({listing: {...listing, images: []}}),
    ];
    let updatedListing;
    for (let i = 0; i < actions.length; i++) {
      const {
        Profile: {newListings},
      } = getState();
      if (
        newListings.find(({listing: ls}) => ls.id === listing.id)
          .addListingStatus === uploadStatuses.CANCELLING
      ) {
        await API.deleteUpdatedImagesForListing({listingId: listing.id});
        return;
      }
      if (i === actions.length - 1) {
        dispatch(markListingCantCancel({id: listing.id}));
        updatedListing = await actions[i]();
      } else {
        await actions[i]();
      }
    }

    return updatedListing;
  };

  try {
    const updatedListing = await uploadData();
    const {
      Profile: {newListings},
    } = getState();
    const wasCancelled =
      newListings.find(({listing: ls}) => ls.id === listing.id)
        .addListingStatus === uploadStatuses.CANCELLING;

    if (!wasCancelled) {
      dispatch(
        updateListingSuccess({
          listing: updatedListing,
        }),
      );
      showMessage({
        message: 'Listing Uploaded!',
        description: listing.title,
        type: 'success',
        icon: 'success',
      });
    } else {
      dispatch(cancelUpdateListingSuccess({id: listing.id}));
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
      dispatch(cancelUpdateListingError({id: listing.id, error: e.toString()}));
    } else {
      updateListingError({
        id: listing.id,
        error: e.toString(),
      });
    }
  }
};

export const reUpdateListingThunk = id => async (dispatch, getState) => {
  const {
    Profile: {newListings},
  } = getState();
  const listing = newListings.find(({listing: ls}) => ls.id === id);
  await dispatch(updateListingThunk(listing));
};

export const deleteListingThunk = ({id}: {id: string}) => (
  dispatch,
  getState,
) => {
  const {
    Profile: {newListings, oldListings},
  } = getState();
  const listing =
    newListings.find(({listing: ls}) => ls.id === id) ||
    oldListings.find(ls => ls.id === id);

  dispatch(deleteListing({id}));

  API.deleteListing({id})
    .then(() => {
      dispatch(deleteListingSuccess({id}));
      showMessage({
        message: 'Listing Deleted Successfully!',
        description: listing.title,
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
