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
import {API} from '../../../common/api/api';

export const addListingThunk = (listing: listingType) => async (
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
  direction,
}: {
  searchTerm: string,
  direction: string,
}) => async (dispatch, getState) => {
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
        listingsReceived({listings: searchResults, searchTerm, cursorId}),
      ),
    )
    .catch(error => dispatch(listingsError({searchTerm, error})));
};
