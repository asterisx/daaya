// @flow

import type {listingType, myListingType} from '../../../common/types';
import {
  ACTION_CANT_CANCEL,
  ADD_LISTING,
  ADD_LISTING_ERROR,
  ADD_LISTING_SUCCESS,
  CANCEL_UPDATE_LISTING,
  CANCEL_UPLOAD_ERROR,
  CANCEL_UPLOAD_LISTING,
  CANCEL_UPLOAD_LISTING_ERROR,
  CANCEL_UPLOAD_LISTING_SUCCESS,
  CANCEL_UPLOAD_SUCCESS,
  DELETE_LISTING,
  DELETE_LISTING_ERROR,
  DELETE_LISTING_SUCCESS,
  GET_MY_LISTINGS,
  GET_MY_LISTINGS_ERROR,
  GET_MY_LISTINGS_SUCCESS,
  REMOVE_PENDING,
  UPDATE_LISTING,
  UPDATE_LISTING_ERROR,
  UPDATE_LISTING_SUCCESS,
} from '../../actions/profile';
import type {
  addListingErrorType,
  addListingSuccessType,
  cancelUploadListingErrorType,
  cancelUploadListingType,
  deleteListingErrorType,
  deleteListingType,
} from '../../actions/profile';
import {fetchingStatuses} from '../../actions';
import {deletingStatuses, uploadStatuses} from '../../../common/constants';

type newListingType = {
  listing: listingType,
  addListingStatus:
    | uploadStatuses.UPLOADING
    | uploadStatuses.UPLOADED
    | uploadStatuses.ERROR,
  error?: string,
};

type State = {
  newListings: Array<newListingType>,
  oldListings: Array<myListingType>,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
  cursorIdPrevious?: string,
  cursorIdNext?: string,
  listingsForDeletion: Array<{
    +id: string,
    status:
      | deletingStatuses.DELETED
      | deletingStatuses.DELETING
      | deletingStatuses.ERROR,
    error?: string,
  }>,
};

const initialState: State = {
  newListings: [],
  oldListings: [],
  fetchingListingsStatus: fetchingStatuses.NONE,
  listingsForDeletion: [],
};

const ProfileReducer = (
  state: State = initialState,
  action:
    | addListingSuccessType
    | addListingErrorType
    | cancelUploadListingType
    | cancelUploadListingErrorType
    | deleteListingType
    | deleteListingErrorType,
): State => {
  switch (action.type) {
    case ADD_LISTING: {
      const {listing}: {listing: listingType} = action;
      return {
        ...state,
        newListings: [
          {
            listing,
            addListingStatus: uploadStatuses.UPLOADING,
            error: undefined,
          },
          ...state.newListings,
        ],
      };
    }
    case ADD_LISTING_SUCCESS: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.filter(
          (l: newListingType) => l.listing.id !== id,
        ),
      };
    }
    case ADD_LISTING_ERROR: {
      const {id, error}: {id: string, error: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.ERROR, error}
              : l,
        ),
      };
    }
    case CANCEL_UPLOAD_LISTING: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.CANCELLING}
              : l,
        ),
      };
    }
    case CANCEL_UPLOAD_SUCCESS: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.filter(
          (l: newListingType) => l.listing.id !== id,
        ),
      };
    }
    case CANCEL_UPLOAD_ERROR: {
      const {id, error}: {id: string, error: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.CANCEL_ERROR, error}
              : l,
        ),
      };
    }
    case CANCEL_UPDATE_LISTING: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.CANCELLING}
              : l,
        ),
        oldListings: state.oldListings.map<listingType>((l: listingType) =>
          l.id === id ? {...l, addListingStatus: uploadStatuses.CANCELLING} : l,
        ),
      };
    }
    case CANCEL_UPLOAD_LISTING_SUCCESS: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.filter(
          (l: newListingType) => l.listing.id !== id,
        ),
        oldListings: state.oldListings.map<listingType>((l: listingType) =>
          l.id === id ? {...l, addListingStatus: undefined} : l,
        ),
      };
    }
    case CANCEL_UPLOAD_LISTING_ERROR: {
      const {id, error}: {id: string, error: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.CANCEL_ERROR, error}
              : l,
        ),
        oldListings: state.oldListings.map<listingType>((l: listingType) =>
          l.id === id
            ? {...l, addListingStatus: uploadStatuses.CANCEL_ERROR, error}
            : l,
        ),
      };
    }
    case ACTION_CANT_CANCEL: {
      const {id}: {id: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.CANT_CANCEL}
              : l,
        ),
        oldListings: state.oldListings.map<listingType>((l: listingType) =>
          l.id === id
            ? {...l, addListingStatus: uploadStatuses.CANT_CANCEL}
            : l,
        ),
      };
    }
    case UPDATE_LISTING: {
      const {listing}: {listing: listingType} = action;
      return {
        ...state,
        newListings: [
          {
            listing,
            addListingStatus: uploadStatuses.UPDATING,
            error: undefined,
          },
          ...state.newListings,
        ],
        oldListings: state.oldListings.map(lis =>
          lis.id === listing.id
            ? {...lis, addListingStatus: uploadStatuses.UPDATING}
            : lis,
        ),
      };
    }
    case UPDATE_LISTING_SUCCESS: {
      const {listing}: {listing: listingType} = action;
      return {
        ...state,
        newListings: state.newListings.filter(
          (l: newListingType) => l.listing.id !== listing.id,
        ),
        oldListings: state.oldListings.map(lis =>
          lis.id === listing.id ? listing : lis,
        ),
      };
    }
    case UPDATE_LISTING_ERROR: {
      const {id, error}: {id: string, error: string} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.listing.id === id
              ? {...l, addListingStatus: uploadStatuses.UPDATE_ERROR, error}
              : l,
        ),
        oldListings: state.oldListings.map(lis =>
          lis.id === id
            ? {...lis, addListingStatus: uploadStatuses.UPDATE_ERROR, error}
            : lis,
        ),
      };
    }
    case DELETE_LISTING: {
      const {id} = action;

      return {
        ...state,
        listingsForDeletion: [
          ...state.listingsForDeletion,
          {
            id,
            status: deletingStatuses.DELETING,
          },
        ],
      };
    }
    case DELETE_LISTING_ERROR: {
      const {id, error} = action;

      return {
        ...state,
        listingsForDeletion: [
          ...state.listingsForDeletion,
          {
            id,
            status: deletingStatuses.ERROR,
            error,
          },
        ],
      };
    }
    case DELETE_LISTING_SUCCESS:
    case REMOVE_PENDING: {
      const {id} = action;

      return {
        ...state,
        oldListings: state.oldListings.filter(({id: oid}) => oid !== id),
        listingsForDeletion: state.listingsForDeletion.filter(
          ({id: lid}) => lid !== id,
        ),
      };
    }
    case GET_MY_LISTINGS: {
      return {...state, fetchingListingsStatus: fetchingStatuses.FETCHING};
    }
    case GET_MY_LISTINGS_SUCCESS: {
      const {listings, cursorId, direction} = action;

      return {
        ...state,
        oldListings:
          direction === 'next'
            ? [
                ...(state.oldListings || []).filter(
                  oldListing =>
                    listings &&
                    !listings.find(
                      newListing => newListing.id === oldListing.id,
                    ),
                ),
                ...listings,
              ]
            : [
                ...listings,
                ...(state.oldListings || []).filter(
                  oldListing =>
                    listings &&
                    !listings.find(
                      newListing => newListing.id === oldListing.id,
                    ),
                ),
              ],
        cursorIdNext: direction !== 'previous' ? cursorId : state.cursorIdNext,
        cursorIdPrevious:
          direction === 'previous' ? cursorId : state.cursorIdPrevious,
        fetchingListingsStatus: fetchingStatuses.SUCCESS,
      };
    }
    case GET_MY_LISTINGS_ERROR: {
      return {...state, fetchingListingsStatus: fetchingStatuses.ERROR};
    }
    default:
      return state;
  }
};

export default ProfileReducer;
