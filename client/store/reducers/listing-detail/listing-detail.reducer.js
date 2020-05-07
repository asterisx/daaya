import {
  GET_LISTING,
  GET_LISTING_ERROR,
  GET_LISTING_SUCCESS,
  fetchingStatuses
} from '../../actions';

const initialState = [];

const ListingDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTING: {
      const {id} = action;
      return [
        ...state,
        {
          id,
          fetchingListingStatus: fetchingStatuses.FETCHING,
        },
      ];
    }
    case GET_LISTING_SUCCESS: {
      const {listing} = action;
      return state.map(lis =>
        lis.id === listing.id
          ? {
              ...listing,
              fetchingListingStatus: fetchingStatuses.SUCCESS,
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
              fetchingListingStatus: fetchingStatuses.ERROR,
            }
          : lis,
      );
    }
    default:
      return state;
  }
};

export default ListingDetailReducer;
