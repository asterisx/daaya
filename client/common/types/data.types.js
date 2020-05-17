// @flow

export type location = {
  lat: number,
  lng: number,
};

export type post = {
  id: string,
  image: string,
  poster: {
    name: string,
    avatar: string,
  },
  createdDate: Date,
  post: string,
};

export type category = {
  id: number,
  value: string,
};

export type address = {
  address: string,
  location?: location
}

export type telephone = {
  name: string,
  telephone: string,
}

export type email = {
  name: string,
  email: string,
}

export type institutionInfo = {
  +id: string,
  +addresses: Array<address>,
  +telephones: Array<telephone>,
  +emails: Array<email>,
  +workingTimes: Array<string>,
}

export type bio = {
  institutionName: string,
  bannerSrc: string,
};

export type listingType = {
  +id: string,
  +images: Array<string>,
  +title: string,
  +description? :string,
  +category: category,
  +address?: address,
  +telephone?: telephone,
};

export type institutionType = {
  +bio: bio,
  +info: institutionInfo,
  +posts: Array<post>
};

export type metaType = {
  +categories: Array<category>,
}

export type emptyActionType = {
  type: string,
}
