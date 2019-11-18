export const NEW_LISTING_UPLOADING = 'new_listing_uploading';
export const NEW_LISTING_UPLOAD_COMPLETE = 'new_listing_upload_complete';
export const NEW_LISTING_UPLOAD_ERROR = 'new_listing_upload_error';

export const newListing = data => async dispatch => {
  dispatch(newListingUploading());

  return apiHelper.newListingUpload(data).then(
    result => dispatch(newListingUploaded({result})),
    err => dispatch(newListingUploadError()),
  );
};

export const newListingUploading = () => ({
  type: NEW_LISTING_UPLOADING,
});

export const newListingUploaded = ({result}) => ({
  type: NEW_LISTING_UPLOAD_COMPLETE,
  result,
});

export const newListingUploadError = () => ({
  type: NEW_LISTING_UPLOAD_ERROR,
});
