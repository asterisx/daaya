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
}

export const addListingSuccess = ({listing}) => ({
  type: ADD_LISTING_SUCCESS,
  listing,
});

export const addListingError = ({listing, error}) => ({
  type: ADD_LISTING_ERROR,
  listing,
  error
});


export const listingsReceived = ({listings, searchTerm, prev, next}) => ({
  type: GET_LISTINGS_SUCCESS,
  listings,
  searchTerm,
  prev,
  next
});

export const listingsError = ({searchTerm}) => ({
  type: GET_LISTINGS_ERROR,
  searchTerm,
});

