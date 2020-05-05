import {GET_LISTING, listingError, listingReceived} from '../../actions';

export const getListing = ({id}) => async dispatch => {
  dispatch({
    type: GET_LISTING,
    payload: {
      url: 'listing',
      data: {id},
    },
  }).then(response => {
    if (response.type.endsWith('_SUCCESS')) {
      const {
        data: {
          listing
        },
      } = response.payload;
      dispatch(listingReceived({listing}));
    } else if (response.type.endsWith('_FAIL')) {
      dispatch(listingError({id, error: response.error}));
    }
  });
};
