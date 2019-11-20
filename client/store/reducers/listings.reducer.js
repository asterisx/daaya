import {
  ADD_LISTING,
  ADD_LISTING_SUCCESS,
  ADD_LISTING_ERROR,
  GET_LISTINGS,
  GET_LISTINGS_SUCCESS,
  GET_LISTINGS_ERROR,
} from '../actions';

const initialState = {
  /*
    {
      searchTerm: '',
      listings: [],
      count: 0,
      index: 0,
      listingsStatus: '',
    },
  */
  allListings: [],
  /*
   {
      listing: {},
      listingUploadStatus: '',
    },
  */
  newListings: [],
  // Used to uniquely identify new index for setting statuses
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
          listingUploadStatus: ADD_LISTING,
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
            ? {...l, listingUploadStatus: ADD_LISTING_SUCCESS}
            : l,
        ),
      };
    }
    case ADD_LISTING_ERROR:
      const {listing} = state;
      return {
        ...state,
        newListings: state.newListings.map(l =>
          l.index === listing.index
            ? {...l, listingUploadStatus: ADD_LISTING_ERROR}
            : l,
        ),
      };
    case GET_LISTINGS: {
      const {searchTerm} = action;
      const searchTermInStore = state.allListings.find(
        ({searchTerm: searchTermInIndex}) => searchTerm === searchTermInIndex,
      );
      return {
        ...state,
        allListings: searchTermInStore
          ? state.allListings.map(al =>
              al.searchTerm === searchTerm
                ? {
                    ...al,
                    listingsStatus: GET_LISTINGS,
                  }
                : al,
            )
          : state.allListings.concat({
              searchTerm,
              listingsStatus: GET_LISTINGS,
            }),
      };
    }
    case GET_LISTINGS_SUCCESS: {
      const {listings, searchTerm, count, index} = action;
      const searchTermInStore = state.allListings.find(
        ({searchTerm: searchTermInIndex}) => searchTerm === searchTermInIndex,
      );
      return {
        ...state,
        allListings: searchTermInStore
          ? state.allListings.map(al =>
              al.searchTerm === searchTerm
                ? {
                    ...al,
                    listings: al.listings.concat(listings),
                    count,
                    index,
                    listingsStatus: GET_LISTINGS_SUCCESS,
                  }
                : al,
            )
          : state.allListings.concat({
              listings,
              searchTerm,
              count,
              index,
              listingsStatus: GET_LISTINGS_SUCCESS,
            }),
      };
    }
    case GET_LISTINGS_ERROR: {
      const {searchTerm} = action;
      const searchTermInStore = state.allListings.find(
        ({searchTerm: searchTermInIndex}) => searchTerm === searchTermInIndex,
      );
      return {
        ...state,
        allListings: searchTermInStore
          ? state.allListings.map(al =>
              al.searchTerm === searchTerm
                ? {
                    ...al,
                    listingsStatus: GET_LISTINGS_ERROR,
                  }
                : al,
            )
          : state.allListings.concat({
              searchTerm,
              listingsStatus: GET_LISTINGS_ERROR,
            }),
      };
    }
    default:
      return state;
  }
};

export default ListingsReducer;
