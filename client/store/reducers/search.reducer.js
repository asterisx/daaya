import {SEARCHING, SEARCH_COMPLETE, SEARCH_ERROR} from '../actions';

let initialState = {
  searchResults: [],
  index: 0,
  searchTerm: '',
  searchStatus: '',
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCHING:
      if (state.searchTerm !== action.searchTerm) state.searchResults = [];
      return {...state, searchStatus: SEARCHING, searchTerm: action.searchTerm};

    case SEARCH_COMPLETE:
      return {
        ...state,
        searchStatus: SEARCH_COMPLETE,
        searchResults: state.searchResults.push(...action.results),
      };

    case SEARCH_ERROR:
      return {...state, searchStatus: SEARCH_ERROR};

    default:
      return state;
  }
}

export default searchReducer;
