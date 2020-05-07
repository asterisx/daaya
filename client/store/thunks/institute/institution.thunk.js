// @flow

import {GET_INSTITUTE, instituteError, instituteReceived} from '../../actions';

export const getInstitute = ({id}: {id: string}) => async dispatch => {
    dispatch({
        type: GET_INSTITUTE,
        payload: {
            url: 'institute',
            data: {id},
        },
    }).then(response => {
        if (response.type.endsWith('_SUCCESS')) {
            const {
                data: {
                    institute
                },
            } = response.payload;
            dispatch(instituteReceived({institute}));
        } else if (response.type.endsWith('_FAIL')) {
            dispatch(instituteError({id, error: response.error}));
        }
    });
};
