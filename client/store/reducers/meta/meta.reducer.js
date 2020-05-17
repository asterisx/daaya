// @flow

import {
  GET_META,
  GET_META_SUCCESS,
  GET_META_ERROR,
  REFRESH_META,
  REFRESH_META_SUCCESS,
  REFRESH_META_ERROR,
  fetchingMetaStatutes,
} from '../../actions';
import type {category, emptyActionType, metaType} from '../../../common/types';
import type {metaSuccessType} from '../../actions';

type State = {
  +categories: Array<category>,
  +fetchingStatus:
    | fetchingMetaStatutes.FETCHING
    | fetchingMetaStatutes.REFRESHING
    | fetchingMetaStatutes.SUCCESS
    | fetchingMetaStatutes.ERROR,
};

const initialState: State = {
  categories: [],
  fetchingStatus: fetchingMetaStatutes.NONE,
};

const MetaReducer = (
  state: State = initialState,
  action: emptyActionType | metaSuccessType,
): State => {
  switch (action.type) {
    case GET_META: {
      return {...state, fetchingStatus: fetchingMetaStatutes.FETCHING};
    }
    case REFRESH_META: {
      return {...state, fetchingStatus: fetchingMetaStatutes.REFRESHING};
    }
    case GET_META_SUCCESS:
    case REFRESH_META_SUCCESS: {
      const {meta}: {meta: metaType} = action;
      return {...meta, fetchingStatus: fetchingMetaStatutes.SUCCESS};
    }
    case GET_META_ERROR:
    case REFRESH_META_ERROR: {
      return {...state, fetchingStatus: fetchingMetaStatutes.ERROR};
    }
    default: {
      return state;
    }
  }
};

export default MetaReducer;
