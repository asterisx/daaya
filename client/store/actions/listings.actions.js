export const ADD_LISTING = 'ADD_LISTING';
export const ADD_LISTING_SUCCESS = 'ADD_LISTING_SUCCESS';
export const ADD_LISTING_ERROR = 'ADD_LISTING_ERROR';
export const GET_LISTINGS = 'GET_LISTINGS';
export const GET_LISTINGS_SUCCESS = 'GET_LISTINGS_SUCCESS';
export const GET_LISTINGS_ERROR = 'GET_LISTINGS_ERROR';

export const addListingSuccess = ({listing}) => ({
  type: ADD_LISTING_SUCCESS,
  listing,
});

export const addListingError = ({listing}) => ({
  type: ADD_LISTING_ERROR,
  listing,
});



export const listingsReceived = ({listings, searchTerm, count, index}) => ({
  type: GET_LISTINGS_SUCCESS,
  listings,
  searchTerm,
  count,
  index,
});

export const listingsError = ({searchTerm}) => ({
  type: GET_LISTINGS_ERROR,
  searchTerm,
});

