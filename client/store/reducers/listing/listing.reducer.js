import {
  fetchingListingStatuses,
  GET_LISTING,
  GET_LISTING_ERROR,
  GET_LISTING_SUCCESS,
} from '../../actions/listing';
import {
  fetchingListingsStatuses,
  GET_LISTINGS,
  GET_LISTINGS_ERROR,
  GET_LISTINGS_SUCCESS,
} from '../../actions/listings';
import ListingsReducer from "../listings/listings.reducer";

const initialState = [];

const ListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTING: {
      const {id} = action;
      return [
        ...state,
        {
          id,
          fetchingListingStatus: fetchingListingStatuses.FETCHING,
        },
      ];
    }
    case GET_LISTING_SUCCESS: {
      const {listing} = action;
      return state.map(lis =>
        lis.id === listing.id
          ? {
              ...listing,
              fetchingListingStatus: fetchingListingStatuses.SUCCESS,
            }
          : lis,
      );
    }
    case GET_LISTING_ERROR: {
      const {id} = action;
      return state.map(lis =>
        lis.id === id
          ? {
              ...lis,
              fetchingListingStatus: fetchingListingStatuses.ERROR,
            }
          : lis,
      );
    }
    default:
      return state;
  }
};

export default ListingReducer;
