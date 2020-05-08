// @flow

import {getListing, listingError, listingReceived} from '../../actions';
import {API} from "../../../common/api/api";

export const getListingThunk = ({id}: {id: string}) => async dispatch => {

  dispatch(getListing({id}))

  API.getListing({id})
    .then(listing => dispatch(listingReceived({listing})))
    .catch(() => dispatch(listingError({id, error})));
};
