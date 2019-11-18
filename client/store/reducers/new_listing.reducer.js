import {NEW_LISTING_UPLOADING, NEW_LISTING_UPLOAD_COMPLETE, NEW_LISTING_UPLOAD_ERROR} from '../actions';

const initialState = {
  uploadStatus: '',
};

const newListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_LISTING_UPLOADING:
      return {...state, uploadStatus: NEW_LISTING_UPLOADING};

    case NEW_LISTING_UPLOAD_COMPLETE:
      return {...state, uploadStatus: NEW_LISTING_UPLOAD_COMPLETE};

    case NEW_LISTING_UPLOAD_ERROR:
      return {...state, uploadStatus: NEW_LISTING_UPLOAD_ERROR};

    default:
      return state;
  }
};

export default newListingReducer;
