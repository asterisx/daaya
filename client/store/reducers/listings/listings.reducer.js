// @flow

import {
  ADD_LISTING,
  ADD_LISTING_SUCCESS,
  ADD_LISTING_ERROR,
  GET_LISTINGS,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_ERROR,
  CHANGE_FILTERS,
  addListingStatuses,
  fetchingStatuses,
} from '../../actions';
import type {listingType, searchFilterType} from '../../../common/types';
import type {
  addListingErrorType,
  addListingSuccessType,
  changeFiltersProps,
  changeFiltersType,
  listingsErrorType,
  listingsReceivedType,
} from '../../actions';

type searchResultType = {
  searchTerm: string,
  searchFilters?: searchFilterType,
  listings?: Array<listingType>,
  cursorIdPrevious?: string,
  cursorIdNext?: string,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
};

type State = {
  searchResults: Array<searchResultType>,
};

const initialState: State = {
  searchResults: [],
};

const ListingsReducer = (
  state: State = initialState,
  action: listingsReceivedType | listingsErrorType | changeFiltersType,
): State => {
  switch (action.type) {
    case CHANGE_FILTERS: {
      const {searchTerm, searchFilters}: changeFiltersProps = action;
      return {
        ...state,
        searchResults: state.searchResults.map<searchResultType>(
          (al: searchResultType) =>
            al.searchTerm === searchTerm
              ? {
                  ...al,
                  listings: [],
                  searchFilters,
                  fetchingListingsStatus: fetchingStatuses.NONE,
                }
              : al,
        ),
      };
    }
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
          : [
              ...state.searchResults,
              {
                searchTerm,
                fetchingListingsStatus: fetchingStatuses.FETCHING,
              },
            ],
      };
    }
    case GET_LISTINGS_SUCCESS: {
      const {listings, cursorId, searchTerm, direction} = action;
      return {
        ...state,
        searchResults: state.searchResults.map<searchResultType>(
          (al: searchResultType) =>
            al.searchTerm === searchTerm
              ? {
                  ...al,
                  listings:
                    direction === 'next'
                      ? [
                          ...(al.listings || []).filter(
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
                          ...(al.listings || []).filter(
                            oldListing =>
                              listings &&
                              !listings.find(
                                newListing => newListing.id === oldListing.id,
                              ),
                          ),
                        ],
                  cursorIdNext:
                    direction !== 'previous' ? cursorId : al.cursorIdNext,
                  cursorIdPrevious:
                    direction === 'previous' ? cursorId : al.cursorIdPrevious,
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
