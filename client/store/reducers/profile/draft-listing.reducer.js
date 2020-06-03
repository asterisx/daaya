// @flow

import type {draftListingWithIdType} from '../../../common/types';
import {
  DELETE_DRAFT_LISTING,
  SAVE_DRAFT_LISTING,
  UPDATE_DRAFT_LISTING,
} from '../../actions/profile';
import type {
  deleteDraftListingType,
  updateDraftType,
  saveDraftType,
} from '../../actions/profile';

type State = {
  listings: Array<draftListingWithIdType>,
};

const initialState: State = {
  listings: [],
};

const DraftListingsReducer = (
  state: State = initialState,
  action: saveDraftType | updateDraftType | deleteDraftListingType,
): State => {
  switch (action.type) {
    case SAVE_DRAFT_LISTING:
    case UPDATE_DRAFT_LISTING:
      const {listing}: {listing: draftListingWithIdType} = action;
      return {
        ...state,
        listings: [
          listing,
          ...state.listings.filter(({id}) => id !== listing.id),
        ],
      };
    case DELETE_DRAFT_LISTING:
      const {id}: {id: string} = action;
      return {
        ...state,
        listings: state.listings.filter(listing => listing.id !== id),
      };
    default:
      return state;
  }
};

export default DraftListingsReducer;
