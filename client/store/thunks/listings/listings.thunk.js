import {listingsError, listingsReceived, getListings} from '../../actions';
import API from '../../../common/api';

export const getListingsThunk = ({
  searchTerm,
  direction,
  count = 10,
}: {
  searchTerm: string,
  direction: string,
}) => (dispatch, getState) => {
  dispatch(getListings({searchTerm}));

  const {
    Listings: {searchResults},
  } = getState();

  const {cursorIdNext, cursorIdPrevious, searchFilters} = searchResults.find(
    ({searchTerm: st}) => st === searchTerm,
  );

  API.getListings({
    searchTerm,
    direction,
    cursorId: direction === 'next' ? cursorIdNext : cursorIdPrevious,
    count,
    searchFilters,
  })
    .then(({searchResults, cursorId}) =>
      dispatch(
        listingsReceived({
          listings: searchResults,
          searchTerm,
          cursorId,
          direction,
        }),
      ),
    )
    .catch(error => dispatch(listingsError({searchTerm, error})));
};
