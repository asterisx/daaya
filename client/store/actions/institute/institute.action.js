export const GET_INSTITUTE = 'GET_INSTITUTE';
export const GET_INSTITUTE_SUCCESS = 'GET_INSTITUTE_SUCCESS';
export const GET_INSTITUTE_ERROR = 'GET_INSTITUTE_ERROR';

export const instituteReceived = ({institute}) => ({
    type: GET_INSTITUTE_SUCCESS,
    institute
});

export const instituteError = ({id}) => ({
    type: GET_INSTITUTE_ERROR,
    id
});
