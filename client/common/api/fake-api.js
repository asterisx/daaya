import faker from 'faker';
import {uploadStatuses} from '../constants';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const listings = [];

const categories = ['Food', 'Health', 'Education'];

while (listings.length < 200) {
  const index = getRandomInt(3);
  listings.push({
    id: listings.length + 1,
    images: Array.from(
      {length: getRandomInt(11)},
      () => 'https://picsum.photos/600/480',
    ),
    title: faker.lorem.sentence(),
    category: {
      id: index,
      value: categories[index],
    },
    address: {
      address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}`,
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    telephone: {
      name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
      telephone: faker.phone.phoneNumber(),
    },
    description: faker.lorem.sentences(),
  });
}

let myListings = [];

while (myListings.length < 100) {
  const index = getRandomInt(3);
  myListings.push({
    id: myListings.length + 1,
    image: getRandomInt(2) === 1 ? 'https://picsum.photos/600/480' : undefined,
    title: faker.lorem.sentence(),
    category: categories[index],
    status: uploadStatuses.UPLOADED,
  });
}

const getCursorId = ({results, direction}) => {
  if (results.length) {
    if (direction === 'previous') {
      return results[0].id;
    } else {
      return results[results.length - 1].id;
    }
  } else {
    return undefined;
  }
};

export default {
  getListings: ({searchTerm, cursorId, direction, count, searchFilters}) =>
    new Promise((resolve, reject) => {
      const allResults = listings.filter(
        ({title}) => title.indexOf(searchTerm.toLowerCase()) >= 0,
      );
      let results = [];
      if (direction === 'next') {
        const nextResults = cursorId
          ? allResults.filter(({id}) => +id > +cursorId)
          : [];
        results = nextResults.slice(0, count);
      } else if (direction === 'previous') {
        const previousResults = cursorId
          ? allResults.filter(({id}) => +id < +cursorId)
          : [];
        results = previousResults
          .reverse()
          .slice(0, count)
          .reverse();
      } else {
        results = allResults.slice(0, count);
      }
      setTimeout(() => {
        if (results.length) {
          resolve({
            searchResults: results.map(({id, title, images, category}) => ({
              id,
              title,
              images: images.length ? [images[0]] : [],
              category,
            })),
            cursorId: getCursorId({results, direction}),
          });
        } else {
          reject('No results found!');
        }
      }, Math.random(1) * 1000);
    }),
  getMyListings: ({cursorId, direction, count}) =>
    new Promise((resolve, reject) => {
      let results = [];
      if (direction === 'next') {
        const nextResults = cursorId
          ? myListings.filter(({id}) => +id > +cursorId)
          : [];
        results = nextResults.slice(0, count);
      } else if (direction === 'previous') {
        const previousResults = cursorId
          ? myListings.filter(({id}) => +id < +cursorId)
          : [];
        results = previousResults
          .reverse()
          .slice(0, count)
          .reverse();
      } else {
        results = myListings.slice(0, count);
      }
      setTimeout(() => {
        if (results.length) {
          resolve({
            listings: results.map(({id, title, image, category, status}) => ({
              id,
              title,
              image,
              category,
              status,
            })),
            cursorId: getCursorId({results, direction}),
          });
        } else {
          reject('No results found!');
        }
      }, Math.random(1) * 1000);
    }),
  addListing: ({listing}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const newListing = {...listing, id: listings.length + 1};
        resolve(newListing);
      }, 1000);
    }),
  deleteListing: ({id}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        myListings = myListings.filter(({id: mlid}) => mlid !== id);
        resolve();
      }, Math.random(1) * 1000);
    }),
  getListing: ({id}) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(listings.find(({id: lid}) => lid === id)),
        Math.random(1) * 1000,
      );
    }),
  getMeta: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const cats = categories.map((cat, index) => ({
          value: cat,
          id: index,
        }));

        resolve({
          categories: cats,
        });
      }, Math.random(1) * 1000);
    }),
  reverseGeoCode: ({location}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}`,
        );
      }, Math.random(1) * 1000);
    }),
  uploadImage: ({image, listingId}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log(image, listingId);
        resolve();
      }, Math.random(1) * 5000);
    }),
  deleteUploadedImagesForListing: ({listingId}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
          console.log("deleteUploadedImagesForListing");
        resolve();
      }, Math.random(1) * 5000);
    }),
};
