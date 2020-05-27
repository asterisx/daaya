import FakeApi from './fake-api';

export default (API = ((IApi = FakeApi) => ({
  getListings: ({searchTerm, cursorId, direction, count, searchFilters}) =>
    IApi.getListings({searchTerm, cursorId, direction, count, searchFilters}),
  addListing: ({listing}) => IApi.addListing({listing}),
  getListing: ({id}) => IApi.getListing({id}),
  getInstitute: ({id}) => new Promise(),
  getMeta: () => IApi.getMeta(),
  reverseGeoCode: ({location}) => IApi.reverseGeoCode({location}),
  getMyListings: ({cursorId, direction, count}) =>
    IApi.getMyListings({cursorId, direction, count}),
  deleteListing: ({id}) => IApi.deleteListing({id}),
  uploadImage: ({image, listingId}) => IApi.uploadImage({image, listingId}),
  deleteUploadedImagesForListing: ({listingId}) => IApi.deleteUploadedImagesForListing({listingId})
}))());
