export const NEW_LISTING_UPLOADING = 'new_listing_uploading';

export const NEW_LISTING_UPLOAD_COMPLETE = 'new_listing_upload_complete';

export const NEW_LISTING_UPLOAD_ERROR = 'new_listing_upload_error';

let apiHelper;

export function newListingUpload(data) {
    return function (dispatch) {
        dispatch(newListingUploading())

        return apiHelper.newListingUpload(data)
        .then(results =>
            dispatch(newListingUploaded()),
            err =>
            dispatch(newListingUploadError())
        );
    }
}

export function newListingUploading() {
    return {
        type: UPLOADING,
    }
}

export function newListingUploaded(){
    return {
        type: UPLOAD_COMPLETE,
    }
}

export function newListingUploadError(){
    return {
        type: UPLOAD_ERROR
    }
}
