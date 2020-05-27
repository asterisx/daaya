// @flow
import uuid from 'react-native-uuid';

import type {
  draftListingType,
  draftListingWithIdType,
  listingType,
  myListingType,
} from '../../../common/types';

export const ADD_LISTING = 'ADD_LISTING';
export const ADD_LISTING_SUCCESS = 'ADD_LISTING_SUCCESS';
export const ADD_LISTING_ERROR = 'ADD_LISTING_ERROR';

export const CANCEL_UPLOAD_LISTING = 'CANCEL_UPLOAD_LISTING';
export const CANCEL_UPLOAD_SUCCESS = 'CANCEL_UPLOAD_SUCCESS';
export const CANCEL_UPLOAD_ERROR = 'CANCEL_UPLOAD_ERROR';

export const SAVE_DRAFT_LISTING = 'SAVE_DRAFT_LISTING';
export const DELETE_DRAFT_LISTING = 'DELETE_DRAFT_LISTING';
export const UPDATE_DRAFT_LISTING = 'UPDATE_DRAFT_LISTING';

export const DELETE_LISTING = 'DELETE_LISTING';
export const DELETE_LISTING_SUCCESS = 'DELETE_LISTING_SUCCESS';
export const DELETE_LISTING_ERROR = 'DELETE_LISTING_ERROR';

export const GET_MY_LISTINGS = 'GET_MY_LISTINGS';
export const GET_MY_LISTINGS_SUCCESS = 'GET_MY_LISTINGS_SUCCESS';
export const GET_MY_LISTINGS_ERROR = 'GET_MY_LISTINGS_ERROR';

export const REMOVE_PENDING = 'REMOVE_PENDING';

export type addListingType = {
  +type: string,
  +listing: listingType,
};

export const addListing = ({
  listing,
}: {
  listing: listingType,
}): addListingType => ({
  type: ADD_LISTING,
  listing,
});

export type addListingSuccessType = {
  +type: string,
  +id: string,
};

export const addListingSuccess = ({
  id,
}: {
  listing: listingType,
  id: string,
}): addListingSuccessType => ({
  type: ADD_LISTING_SUCCESS,
  id,
});

export type addListingErrorType = {
  +type: string,
  +id: string,
  +error: string,
};

export const addListingError = ({
  id,
  error,
}: {
  id: string,
  error: string,
}): addListingErrorType => ({
  type: ADD_LISTING_ERROR,
  id,
  error,
});

export type deleteListingType = {
  +type: string,
  +id: string,
};

export const deleteListing = ({id}: {id: string}): deleteListingType => ({
  type: DELETE_LISTING,
  id,
});

export const deleteListingSuccess = ({
  id,
}: {
  id: string,
}): deleteListingType => ({
  type: DELETE_LISTING_SUCCESS,
  id,
});

export type deleteListingErrorType = {
  +type: string,
  +id: string,
  +error: string
};

export const deleteListingError = ({
  id,
  error,
}: {
  id: string,
  error: string,
}): deleteListingErrorType => ({
  type: DELETE_LISTING_ERROR,
  id,
  error,
});

export type cancelUploadListingType = {
  +type: string,
  +id: string,
};

export const cancelUploadListing = ({
  id,
}: {
  id: string,
}): cancelUploadListingType => ({
  type: CANCEL_UPLOAD_LISTING,
  id,
});

export const cancelUploadListingSuccess = ({
  id,
}: {
  id: string,
}): cancelUploadListingType => ({
  type: CANCEL_UPLOAD_SUCCESS,
  id,
});

export type cancelUploadListingErrorType = {
  +type: string,
  +id: string,
  +error: string,
};

export const cancelUploadListingError = ({
  id,
  error,
}: {
  id: string,
  error: string,
}): cancelUploadListingErrorType => ({
  type: CANCEL_UPLOAD_ERROR,
  id,
  error,
});

export type saveDraftType = {
  type: string,
  listing: draftListingType,
};

export const saveDraft = (listing: draftListingType): saveDraftType => ({
  type: SAVE_DRAFT_LISTING,
  listing: {id: uuid.v1(), ...listing},
});

export type updateDraftType = {
  type: string,
  listing: draftListingWithIdType,
};

export const updateDraft = (
  listing: draftListingWithIdType,
): updateDraftType => ({type: UPDATE_DRAFT_LISTING, listing});

export type deleteDraftListingType = {
  +type: string,
  +id: string,
};

export const deleteDraft = ({id}: {id: string}): deleteDraftListingType => ({
  type: DELETE_DRAFT_LISTING,
  id,
});

export const removePending = ({
  id,
}: {
  id: string,
}): {
  type: string,
  id: string,
} => ({
  type: REMOVE_PENDING,
  id,
});

export const getMyListings = (): {type: string} => ({
  type: GET_MY_LISTINGS,
});

export type myListingsReceivedType = {
  +type: string,
  +listings: Array<myListingType>,
  +cursorId: string,
  +direction: string,
};

export const myListingsReceived = ({
  listings,
  cursorId,
  direction,
}: {
  +listings: Array<myListingType>,
  +searchTerm: string,
  +cursorId: string,
  +direction: string,
}): myListingsReceivedType => ({
  type: GET_MY_LISTINGS_SUCCESS,
  listings,
  cursorId,
  direction,
});

export type myListingsErrorType = {
  +type: string,
  +error: string,
};

export const myListingsError = ({
  error,
}: {
  error: string,
}): myListingsErrorType => ({
  type: GET_MY_LISTINGS_ERROR,
  error,
});
