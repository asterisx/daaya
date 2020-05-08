// @flow

import type {institutionType} from '../../../common/types';

export const GET_INSTITUTE = 'GET_INSTITUTE';
export const GET_INSTITUTE_SUCCESS = 'GET_INSTITUTE_SUCCESS';
export const GET_INSTITUTE_ERROR = 'GET_INSTITUTE_ERROR';

export type getInstituteType = {
  +type: string,
  +id: string,
};

export const getInstitute = ({id}: {id: string}): getInstituteType => ({
  type: GET_INSTITUTE,
  id,
});

export type instituteReceivedType = {
  +type: string,
  +institute: institutionType,
};

export const instituteReceived = ({
  institute,
}: {
  institute: institutionType,
}): instituteReceivedType => ({
  type: GET_INSTITUTE_SUCCESS,
  institute,
});

export type instituteErrorType = {
  +type: string,
  +id: string,
};

export const instituteError = ({id}: {id: string}): instituteErrorType => ({
  type: GET_INSTITUTE_ERROR,
  id,
});
