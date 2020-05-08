// @flow

import {
  GET_LISTINGS,
  addListingSuccess,
  addListingError,
  listingsError,
  listingsReceived,
  ADD_LISTING, addListing,
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
  link,
}: {
  searchTerm: string,
  link: string,
}) => async dispatch => {
  dispatch(getListings({searchTerm}));

  API.getListings({
    searchTerm,
    link,
  })
    .then(listings =>
      dispatch(listingsReceived({listings: listings, searchTerm})),
    )
    .catch(error => dispatch(listingsError({searchTerm, error})));
};
