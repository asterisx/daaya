// @flow

import {
  ADD_LISTING,
  ADD_LISTING_SUCCESS,
  ADD_LISTING_ERROR,
  GET_LISTINGS,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_ERROR,
  addListingStatuses,
  fetchingStatuses,
} from '../../actions';
import type {inCompleteListing, listingType} from '../../../common/types';
import type {
  addListingErrorType,
  addListingSuccessType,
  listingsErrorType,
  listingsReceivedType,
} from '../../actions';

type searchResultType = {
  searchTerm: string,
  listings?: Array<listingType>,
  prev?: string,
  next?: string,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
};

type newListingType = {
  index: number,
  listing: listingType,
  addListingStatus:
    | addListingStatuses.ADDING
    | addListingStatuses.SUCCESS
    | addListingStatuses.ERROR,
  error?: string,
};

type State = {
  searchResults: Array<searchResultType>,
  newListings: Array<newListingType>,
  newListingCounter: number,
};

const initialState: State = {
  searchResults: [],
  newListings: [],
  newListingCounter: 0,
};

const ListingsReducer = (
  state: State = initialState,
  action:
    | addListingSuccessType
    | addListingErrorType
    | listingsReceivedType
    | listingsErrorType,
): State => {
  switch (action.type) {
    case ADD_LISTING: {
      const {listing, index}: {listing: listingType, index: number} = action;
      return {
        ...state,
        newListings: state.newListings.concat({
          index,
          listing,
          addListingStatus: addListingStatuses.ADDING,
          error: undefined,
        }),
        newListingCounter: state.newListingCounter + 1,
      };
    }
    case ADD_LISTING_SUCCESS: {
      const {listing}: {listing: listingType} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.index === listing.index
              ? {
                  ...l,
                  addListingStatus: addListingStatuses.SUCCESS,
                  error: undefined,
                }
              : l,
        ),
      };
    }
    case ADD_LISTING_ERROR:
      const {listing, error} = action;
      return {
        ...state,
        newListings: state.newListings.map<newListingType>(
          (l: newListingType) =>
            l.index === listing.index
              ? {...l, addListingStatus: addListingStatuses.ERROR, error}
              : l,
        ),
      };
    case GET_LISTINGS: {
      const {searchTerm} = action;
      const searchTermInStore = state.searchResults.find(
        ({searchTerm: searchTermInIndex}) => searchTerm === searchTermInIndex,
      );
      return {
        ...state,
        searchResults: searchTermInStore
          ? state.searchResults.map<searchResultType>((al: searchResultType) =>
              al.searchTerm === searchTerm
                ? {
                    ...al,
                    fetchingListingsStatus: fetchingStatuses.FETCHING,
                  }
                : al,
            )
          : state.searchResults.concat({
              searchTerm,
              fetchingListingsStatus: GET_LISTINGS,
            }),
      };
    }
    case GET_LISTINGS_SUCCESS: {
      const {listings, prev, next, searchTerm} = action;
      return {
        ...state,
        searchResults: state.searchResults.map<searchResultType>(
          (al: searchResultType) =>
            al.searchTerm === searchTerm
              ? {
                  ...al,
                  listings: listings.concat(al.listings),
                  prev,
                  next,
                  fetchingListingsStatus: fetchingStatuses.SUCCESS,
                }
              : al,
        ),
      };
    }
    case GET_LISTINGS_ERROR: {
      const {searchTerm} = action;
      return {
        ...state,
        searchResults: state.searchResults.map<searchResultType>(
          (al: searchResultType) =>
            al.searchTerm === searchTerm
              ? {
                  ...al,
                  fetchingListingsStatus: fetchingStatuses.ERROR,
                }
              : al,
        ),
      };
    }
    default:
      return state;
  }
};

export default ListingsReducer;
