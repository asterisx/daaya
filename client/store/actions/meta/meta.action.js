// @flow

import {fetchingStatuses} from '../index';
import type {emptyActionType, metaType} from '../../../common/types';

export const GET_META = 'GET_META';
export const GET_META_SUCCESS = 'GET_META_SUCCESS';
export const GET_META_ERROR = 'GET_META_ERROR';

export const REFRESH_META = 'REFRESH_META';
export const REFRESH_META_SUCCESS = 'REFRESH_META_SUCCESS';
export const REFRESH_META_ERROR = 'REFRESH_META_ERROR';

export const getMeta = (): emptyActionType => ({
  type: GET_META,
});

export type metaSuccessType = {
  type: string,
  meta: metaType,
};

export const getMetaSuccess = ({meta}: {meta: metaType}): metaSuccessType => ({
  type: GET_META_SUCCESS,
  meta,
});

export const getMetaError = (): emptyActionType => ({
  type: GET_META_ERROR,
});

export const refreshMeta = (): emptyActionType => ({
  type: REFRESH_META,
});

export const refreshMetaSuccess = ({
  meta,
}: {
  meta: metaType,
}): metaSuccessType => ({
  type: REFRESH_META_SUCCESS,
  meta,
});

export const refreshMetaError = (): emptyActionType => ({
  type: REFRESH_META_ERROR,
});
