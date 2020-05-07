// @flow

import {
  GET_LISTINGS,
  addListingSuccess,
  addListingError,
  listingsError,
  listingsReceived,
  ADD_LISTING,
} from '../../actions';
import type {listingType} from "../../../common/types";

export const addListing = (listing: listingType) => async dispatch => {
  dispatch({
    type: ADD_LISTING,
    payload: {
      request: {
        method: 'put',
        url: 'listing',
      },
    },
  }).then(response => {
    if (response.type.endsWith('_SUCCESS')) {
      const {
        data: {listing},
      } = response.payload;
      dispatch(addListingSuccess({listing}));
    } else if (response.type.endsWith('_FAIL')) {
      dispatch(addListingError({listing, error: response.error}));
    }
  });
};

export const getListings = ({searchTerm, link}: {searchTerm: string, link: string}) => async dispatch => {
  dispatch({
    type: GET_LISTINGS,
    payload: {
      request: link
        ? link
        : {
            url: 'listings',
            data: {searchTerm},
          },
    },
  }).then(response => {
    if (response.type.endsWith('_SUCCESS')) {
      const {
        data: {
          listings,
          links: {next, prev},
        },
      } = response.payload;
      dispatch(listingsReceived({listings: listings, next, prev, searchTerm}));
    } else if (response.type.endsWith('_FAIL')) {
      dispatch(listingsError({searchTerm, error: response.error}));
    }
  });
};
