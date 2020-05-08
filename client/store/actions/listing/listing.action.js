// @flow

import type {listingType} from "../../../common/types";

export const GET_LISTING = 'GET_LISTING';
export const GET_LISTING_SUCCESS = 'GET_LISTING_SUCCESS';
export const GET_LISTING_ERROR = 'GET_LISTING_ERROR';

export type listingGetType = {
    +type: string,
    +id: string,
};

export const getListing = ({id}): listingGetType => ({
    type: GET_LISTING,
    id
})

export type listingReceivedType = {
    +type: string,
    +listing: listingType,
};

export const listingReceived = ({listing}: {listing: listingType}): listingReceivedType => ({
    type: GET_LISTING_SUCCESS,
    listing
});

export type listingErrorType = {
    +type: string,
    +id: string,
};

export const listingError = ({id}: {id: string}): listingErrorType  => ({
    type: GET_LISTING_ERROR,
    id
});
