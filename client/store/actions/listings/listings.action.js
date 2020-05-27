// @flow

import type {listingType, searchFilterType} from '../../../common/types';

export const GET_LISTINGS = 'GET_LISTINGS';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_ERROR = 'GET_LISTINGS_ERROR';

export const CHANGE_FILTERS = 'CHANGE_FILTERS';

export type getListingType = {
  type: string,
  searchTerm: string,
};

export const getListings = ({
  searchTerm,
}: {
  searchTerm: string,
}): getListingType => ({
  type: GET_LISTINGS,
  searchTerm,
});

export type listingsReceivedType = {
  +type: string,
  +listings: Array<listingType>,
  +searchTerm: string,
  +cursorId: string,
  +direction: string,
};

export const listingsReceived = ({
  listings,
  searchTerm,
  cursorId,
  direction,
}: {
  +listings: Array<listingType>,
  +searchTerm: string,
  +cursorId: string,
  +direction: string,
}): listingsReceivedType => ({
  type: GET_LISTINGS_SUCCESS,
  listings,
  searchTerm,
  cursorId,
  direction,
});

export type listingsErrorType = {
  +type: string,
  +searchTerm: string,
  +error: string,
};

export const listingsError = ({
  searchTerm,
  error,
}: {
  searchTerm: string,
  error: string,
}): listingsErrorType => ({
  type: GET_LISTINGS_ERROR,
  searchTerm,
  error,
});

export type changeFiltersType = {
  +type: string,
  +searchTerm: string,
  +searchFilters: searchFilterType,
};

export type changeFiltersProps = {
  +searchTerm: string,
  +searchFilters: searchFilterType,
};

export const changeFilters = ({
  searchTerm,
  searchFilters,
}: changeFiltersProps): changeFiltersType => ({
  type: CHANGE_FILTERS,
  searchTerm,
  searchFilters,
});
