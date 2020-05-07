export const GET_LISTING = 'GET_LISTING';
export const GET_LISTING_SUCCESS = 'GET_LISTING_SUCCESS';
export const GET_LISTING_ERROR = 'GET_LISTING_ERROR';

export const listingReceived = ({listing}) => ({
    type: GET_LISTING_SUCCESS,
    listing
});

export const listingError = ({id}) => ({
    type: GET_LISTING_ERROR,
    id
});
