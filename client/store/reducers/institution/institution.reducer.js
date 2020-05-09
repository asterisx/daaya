// @flow

import {
  GET_INSTITUTE,
  GET_INSTITUTE_SUCCESS,
  GET_INSTITUTE_ERROR,
  fetchingStatuses,
} from '../../actions';
import type {institutionType, listingType} from '../../../common/types';
import type {instituteErrorType, instituteReceivedType} from '../../actions';

type institution = institutionType & {
  +fetchingInstituteStatus: fetchingStatuses.FETCHING | fetchingStatuses.ERROR | fetchingStatuses.SUCCESS,
};

type inCompleteInstitution = {
  +id: string,
  +fetchingInstituteStatus: fetchingStatuses.FETCHING | fetchingStatuses.ERROR | fetchingStatuses.SUCCESS,
};

type ItemType = institution | inCompleteInstitution;

type State = Array<ItemType>;

const initialState: State = [];

const InstitutionReducer = (
  state: State = initialState,
  action: instituteReceivedType | instituteErrorType,
): State => {
  switch (action.type) {
    case GET_INSTITUTE: {
      const {id}: {id: string} = action;
      return [...state, {
        id,
        fetchingInstituteStatus: fetchingStatuses.FETCHING,
      }];
    }
    case GET_INSTITUTE_SUCCESS: {
      const {institute}: {institute: listingType} = action;
      return state.map<ItemType>((ins: ItemType) =>
        ins.id === institute.id
          ? {
              ...institute,
              fetchingInstituteStatus: fetchingStatuses.SUCCESS,
            }
          : ins,
      );
    }
    case GET_INSTITUTE_ERROR: {
      const {id}: {id: string} = action;
      return state.map<ItemType>((ins: ItemType) =>
        ins.id === id
          ? {
              ...ins,
              fetchingInstituteStatus: fetchingStatuses.ERROR,
            }
          : ins,
      );
    }
    default:
      return state;
  }
};

export default InstitutionReducer;
