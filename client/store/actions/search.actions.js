export const SEARCHING = 'SEARCHING';
export const SEARCH_COMPLETE = 'SEARCH_COMPLETE';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const fetchSearchResults = (
  searchTerm,
  index = 0,
  limit = 10,
) => dispatch => {
  dispatch(requestSearchResults({searchTerm}));

  return apiHelper.search(searchTerm, index).then(
    results => dispatch(recieveSearchResults({searchTerm, results})),
    err => dispatch(searchError({searchTerm})),
  );
};

export const recieveSearchResults = ({searchTerm, results}) => ({
    type: SEARCH_COMPLETE,
    searchTerm,
    results,
});

export const requestSearchResults = ({searchTerm}) => ({
    type: SEARCHING,
    searchTerm,
});

export const searchError = ({searchTerm}) => ({
    type: SEARCH_ERROR,
    searchTerm
});
