import FakeApi from "./fake-api";

export default API = ((IApi = FakeApi) => ({
  getListings: ({searchTerm}) => IApi.getListings({searchTerm}),
  addListing: ({listing}) => IApi.addListing({listing}),
  getListing: ({id}) => IApi.getListing({id}),
  getInstitute: ({id}) => new Promise()
}))();
