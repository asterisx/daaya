import {
  GET_INSTITUTE,
  GET_INSTITUTE_SUCCESS,
  GET_INSTITUTE_ERROR,
  fetchingStatuses,
} from '../../actions';

const initialState = [];

const ListingDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTITUTE: {
      const {id} = action;
      return [
        ...state,
        {
          id,
          fetchingInstituteStatus: fetchingStatuses.FETCHING,
        },
      ];
    }
    case GET_INSTITUTE_SUCCESS: {
      const {institute} = action;
      return state.map(lis =>
        lis.id === institute.id
          ? {
              ...institute,
              fetchingInstituteStatus: fetchingStatuses.SUCCESS,
            }
          : lis,
      );
    }
    case GET_INSTITUTE_ERROR: {
      const {id} = action;
      return state.map(lis =>
        lis.id === id
          ? {
              ...lis,
              fetchingInstituteStatus: fetchingStatuses.ERROR,
            }
          : lis,
      );
    }
    default:
      return state;
  }
};

export default ListingDetailReducer;
