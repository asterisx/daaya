// @flow

import type {listingType} from '../../../common/types';

export const ADD_LISTING = 'ADD_LISTING';
export const ADD_LISTING_SUCCESS = 'ADD_LISTING_SUCCESS';
export const ADD_LISTING_ERROR = 'ADD_LISTING_ERROR';
export const GET_LISTINGS = 'GET_LISTINGS';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_ERROR = 'GET_LISTINGS_ERROR';

export const addListingStatuses = {
  ADDING: 'ADDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export type addListingSuccessType = {
  +type: string,
  +index: number,
  +listing: listingType,
};

export const addListingSuccess = ({
  index,
  listing,
}: {
  index: number,
  listing: listingType,
}): addListingSuccessType => ({
  type: ADD_LISTING_SUCCESS,
  index,
  listing,
});

export type addListingErrorType = {
  +type: string,
  +index: number,
  +listing: listingType,
  +error: string,
};

export const addListingError = ({
  index,
  listing,
  error,
}: {
  index: number,
  listing: listingType,
  error: string,
}): addListingErrorType => ({
  type: ADD_LISTING_ERROR,
  index,
  listing,
  error,
});

export type listingsReceivedType = {
  +type: string,
  +listings: Array<listingType>,
  +searchTerm: string,
  +prev: string,
  +next: string,
};

export const listingsReceived = ({
  listings,
  searchTerm,
  prev,
  next,
}: {
  +listings: Array<listingType>,
  +searchTerm: string,
  +prev: string,
  +next: string,
}): listingsReceivedType => ({
  type: GET_LISTINGS_SUCCESS,
  listings,
  searchTerm,
  prev,
  next,
});

export type listingsErrorType = {
  +type: string,
  +searchTerm: string,
};

export const listingsError = ({
  searchTerm,
}: {
  searchTerm: string,
}): listingsErrorType => ({
  type: GET_LISTINGS_ERROR,
  searchTerm,
});
