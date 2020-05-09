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

export const addListingThunk = (listing: listingType) => (
  dispatch,
  getState,
) => {
  const {
    Listings: {newListingCounter},
  } = getState();

  dispatch(addListing({listing, index: newListingCounter}));

  API.addListing({listing})
    .then(newListing =>
      dispatch(
        addListingSuccess({index: newListingCounter, listing: newListing}),
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
  direction = 'next',
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
    cursorId: searchResults.find(({searchTerm: st}) => st === searchTerm)
      .cursorId,
  })
    .then(({searchResults, cursorId}) =>
      dispatch(
        listingsReceived({
          listings: searchResults,
          searchTerm,
          cursorId,
          direction,
          count,
        }),
      ),
    )
    .catch(error => dispatch(listingsError({searchTerm, error})));
};
