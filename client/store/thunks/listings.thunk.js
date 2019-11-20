import {
  GET_LISTINGS,
  addListingSuccess,
  addListingError,
  listingsError,
  listingsReceived,
} from '../actions';

export const addListing = listing => async dispatch => {
  dispatch({
    type: GET_LISTINGS,
    payload: {
      request: {
        url: 'posts',
      },
    },
  }).then(response => {
    if (response.type.endsWith('_SUCCESS')) {
      dispatch(addListingSuccess({listing: response.payload}));
    } else {
      dispatch(addListingError({listing}));
    }
  });
};

export const getListings = ({searchTerm, index}) => async dispatch => {
  dispatch({
    type: GET_LISTINGS,
    payload: {
      request: {
        url: 'posts',
        data: {searchTerm, index},
      },
    },
  }).then(response => {
    if (response.type.endsWith('_SUCCESS')) {
      const {listings, count, index} = response.payload;
      dispatch(
        listingsReceived({listings: listings, searchTerm, count, index}),
      );
    } else {
      dispatch(listingsError({searchTerm}));
    }
  });
};
