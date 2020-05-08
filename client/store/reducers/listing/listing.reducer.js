// @flow

import {
  GET_LISTING,
  GET_LISTING_ERROR,
  GET_LISTING_SUCCESS,
  fetchingStatuses,
} from '../../actions';
import type {listingType} from '../../../common/types';
import type {listingErrorType, listingReceivedType} from '../../actions';

type listing = listingType & {
  +fetchingListingStatus: fetchingStatuses.FETCHING | fetchingStatuses.ERROR | fetchingStatuses.SUCCESS,
};

type inCompleteListing = {
  +id: string,
  +fetchingListingStatus: fetchingStatuses.FETCHING | fetchingStatuses.ERROR | fetchingStatuses.SUCCESS,
};

type ItemType = listing | inCompleteListing;

type State = Array<ItemType>;

const initialState: State = [];

const ListingReducer = (
  state: State = initialState,
  action: listingReceivedType | listingErrorType,
): State => {
  switch (action.type) {
    case GET_LISTING: {
      const {id}: {id: string} = action;
      return state.concat({
        id,
        fetchingListingStatus: fetchingStatuses.FETCHING,
      });
    }
    case GET_LISTING_SUCCESS: {
      const {listing}: {listing: listingType} = action;
      return state.map<ItemType>((lis: ItemType) =>
        lis.id === listing.id
          ? {
              ...listing,
              fetchingListingStatus: fetchingStatuses.SUCCESS,
            }
          : lis,
      );
    }
    case GET_LISTING_ERROR: {
      const {id}: {id: string} = action;
      return state.map<ItemType>((lis: ItemType) =>
        lis.id === id
          ? {
              ...lis,
              fetchingListingStatus: fetchingStatuses.ERROR,
            }
          : lis,
      );
    }
    default:
      return state;
  }
};

export default ListingReducer;
