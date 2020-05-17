// @flow

import {
  addListingSuccess,
  addListingError,
  listingsError,
  listingsReceived,
  addListing,
  getListings,
} from '../../actions';
import type {listingType} from '../../../common/types';
import API from '../../../common/api';

export const addListingThunk = ({
  listing,
  isDraft = true,
}: {
  listing: listingType,
  isDraft: boolean,
}) => (dispatch, getState) => {
  const {
    Listings: {newListingCounter},
  } = getState();

  dispatch(addListing({listing, index: newListingCounter, isDraft}));

  API.addListing({listing, isDraft})
    .then(newListing =>
      dispatch(
        addListingSuccess({
          index: newListingCounter,
          listing: newListing,
        }),
      ),
    )
    .catch(error =>
      dispatch(
        addListingError({
          index: newListingCounter,
          listing,
          error,
        }),
      ),
    );
};

export const getListingsThunk = ({
  searchTerm,
  direction,
  count = 10,
}: {
  searchTerm: string,
  direction: string,
}) => (dispatch, getState) => {
  dispatch(getListings({searchTerm}));

  const {
    Listings: {searchResults},
  } = getState();
  API.getListings({
    searchTerm,
    direction,
    cursorId:
      direction === 'next'
        ? searchResults.find(({searchTerm: st}) => st === searchTerm)
            .cursorIdNext
        : searchResults.find(({searchTerm: st}) => st === searchTerm)
            .cursorIdPrevious,
    count,
  })
    .then(({searchResults, cursorId}) =>
      dispatch(
        listingsReceived({
          listings: searchResults,
          searchTerm,
          cursorId,
          direction,
        }),
      ),
    )
    .catch(error => dispatch(listingsError({searchTerm, error})));
};
