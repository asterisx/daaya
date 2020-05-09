// @flow

import {getInstitute, instituteError, instituteReceived} from '../../actions';
import API from '../../../common/api';

export const getInstituteThunk = ({id}: {id: string}) => dispatch => {
  dispatch(getInstitute({id}));
  API.getInstitute({id})
    .then(institute => dispatch(instituteReceived({institute})))
    .catch(error => dispatch(instituteError({id, error})));
};
