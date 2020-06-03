import FakeApi from './fake-api';

export default (API = ((IApi = FakeApi) => ({
  getListings: ({searchTerm, cursorId, direction, count, searchFilters}) =>
    IApi.getListings({searchTerm, cursorId, direction, count, searchFilters}),
  addListing: ({listing}) => IApi.addListing({listing}),
  deleteListing: ({id}) => IApi.deleteListing({id}),
  // This function is not cancellable and confirms action
  // This can be used to flush changes to images uploaded on a listing
  updateListing: ({listing}) => IApi.updateListing({listing}),
  getListing: ({id}) => IApi.getListing({id}),
  getInstitute: ({id}) => new Promise(),
  getMeta: () => IApi.getMeta(),
  reverseGeoCode: ({location}) => IApi.reverseGeoCode({location}),
  getMyListings: ({cursorId, direction, count}) =>
    IApi.getMyListings({cursorId, direction, count}),
  uploadImage: ({image, listingId, isUpdate = false}) =>
    IApi.uploadImage({image, listingId, isUpdate}),
  deleteUploadedImagesForListing: ({listingId}) =>
    IApi.deleteUploadedImagesForListing({listingId}),
  deleteUpdatedImagesForListing: ({listingId}) =>
    IApi.deleteUpdatedImagesForListing({listingId}),
}))());
