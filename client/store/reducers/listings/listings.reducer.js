import {
  ADD_LISTING,
  ADD_LISTING_SUCCESS,
  ADD_LISTING_ERROR,
  GET_LISTINGS,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_ERROR,
  addListingStatuses,
  fetchingListingsStatuses,
} from '../../actions';

const initialState = {
  /*
    [
      searchTerm: '',
      listings: [],
      listingsStatus: FETCHING, FETCHED, ERROR
    ],
  */
  searchResults: [],
  newListings: [],
  newListingIndex: 0,
};

const ListingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LISTING: {
      const {listing} = state;
      return {
        ...state,
        newListings: state.newListings.concat({
          listing,
          addListingStatus: addListingStatuses.ADDING,
          error: undefined,
        }),
        newListingIndex: state.newListingIndex + 1,
      };
    }
    case ADD_LISTING_SUCCESS: {
      const {listing} = state;
      return {
        ...state,
        newListings: state.newListings.map(l =>
          l.index === listing.index
            ? {
                ...l,
                addListingStatus: addListingStatuses.SUCCESS,
                error: undefined,
              }
            : l,
        ),
      };
    }
    case ADD_LISTING_ERROR:
      const {listing, error} = state;
      return {
        ...state,
        newListings: state.newListings.map(l =>
          l.index === listing.index
            ? {...l, addListingStatus: addListingStatuses.ERROR, error}
            : l,
        ),
      };
    case GET_LISTINGS: {
      const {searchTerm} = action;
      const searchTermInStore = state.searchResults.find(
        ({searchTerm: searchTermInIndex}) => searchTerm === searchTermInIndex,
      );
      return {
        ...state,
        searchResults: searchTermInStore
          ? state.searchResults.map(al =>
              al.searchTerm === searchTerm
                ? {
                    ...al,
                    fetchingListingsStatus: fetchingListingsStatuses.FETCHING,
                  }
                : al,
            )
          : state.searchResults.concat({
              searchTerm,
              listingsStatus: GET_LISTINGS,
            }),
      };
    }
    case GET_LISTINGS_SUCCESS: {
      const {listings, prev, next, searchTerm} = action;
      return {
        ...state,
        searchResults: state.searchResults.map(al =>
          al.searchTerm === searchTerm
            ? {
                ...al,
                listings: listings.concat(al.listings),
                prev,
                next,
                fetchingListingsStatus: fetchingListingsStatuses.SUCCESS,
              }
            : al,
        ),
      };
    }
    case GET_LISTINGS_ERROR: {
      const {searchTerm} = action;
      return {
        ...state,
        searchResults: state.searchResults.map(al =>
          al.searchTerm === searchTerm
            ? {
                ...al,
                fetchingListingsStatus: fetchingListingsStatuses.ERROR,
              }
            : al,
        ),
      };
    }
    default:
      return state;
  }
};

export default ListingsReducer;
