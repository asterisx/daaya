import faker from 'faker';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const listings = [];

const categories = ['Education', 'Health', 'Food'];

while (listings.length < 200) {
  const index = getRandomInt(3);
  listings.push({
    id: faker.random.uuid(),
    images: Array.from({length: getRandomInt(11)}, () =>
      faker.image.imageUrl(),
    ),
    title: faker.lorem.sentence(),
    category: {
      id: index,
      value: categories[index],
    },
    address: {
      address: `${faker.address.streetAddress()}, ${faker.address.city()} ${faker.address.state()}`,
      location: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    telephone: {
      name: `${faker.name.firstName()}  ${faker.name.lastName()}`,
      telephone: faker.phone.phoneNumber(),
    },
  });
}

const getCursorId = ({results, direction}) => {
  if (results.length) {
    if (direction === 'next') {
      return results[results.length - 1].id;
    } else if (direction === 'prev') {
      return results[0].id;
    }
  } else {
    return undefined;
  }
};

export default {
  getListings: ({searchTerm, cursorId, direction, count}) =>
    new Promise((resolve, reject) => {
      const allResults = listings.filter(
        ({title}) => title.indexOf(searchTerm.toLowerCase()) >= 0,
      );
      let results = [];
      if (direction === 'next') {
        const nextResults = cursorId
          ? allResults.filter(({id}) => id > cursorId)
          : allResults;
        results = nextResults.slice(0, count);
      } else {
        const previousResults = cursorId
          ? allResults.filter(({id}) => id < cursorId)
          : allResults;
        results = previousResults
          .reverse()
          .slice(0, count)
          .reverse();
      }
      setTimeout(
        () =>
          resolve({
            searchResults: results,
            cursorId: getCursorId({results, direction}),
          }),
        Math.random(1) * 1000,
      );
    }),
  addListing: ({listing}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const newListing = {...listing, id: faker.random.uuid()};
        resolve(newListing);
      }, Math.random(1) * 1000);
    }),
  getListing: ({id}) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(listings.find(({id: lid}) => lid === id)),
        Math.random(1) * 1000,
      );
    }),
};
