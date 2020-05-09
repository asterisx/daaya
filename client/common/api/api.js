import FakeApi from "./fake-api";

export default API = ((IApi = FakeApi) => ({
  getListings: ({searchTerm, cursorId, direction, count}) => IApi.getListings({searchTerm, cursorId, direction, count}),
  addListing: ({listing}) => IApi.addListing({listing}),
  getListing: ({id}) => IApi.getListing({id}),
  getInstitute: ({id}) => new Promise()
}))();
