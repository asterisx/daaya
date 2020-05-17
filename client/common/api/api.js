import FakeApi from "./fake-api";

export default API = ((IApi = FakeApi) => ({
  getListings: ({searchTerm, cursorId, direction, count}) => IApi.getListings({searchTerm, cursorId, direction, count}),
  addListing: ({listing, isDraft}) => IApi.addListing({listing, isDraft}),
  getListing: ({id}) => IApi.getListing({id}),
  getInstitute: ({id}) => new Promise(),
  getMeta: () => IApi.getMeta(),
  reverseGeoCode: ({location}) => IApi.reverseGeoCode({location})
}))();
