// @flow

import {uploadStatuses} from '../constants';

export type locationType = {
  lat: number,
  lng: number,
};

export type postType = {
  id: string,
  image: string,
  poster: {
    name: string,
    avatar: string,
  },
  createdDate: Date,
  post: string,
};

export type categoryType = {
  id: number,
  value: string,
};

export type addressType = {
  address: string,
  location?: locationType,
};

export type telephoneType = {
  name: string,
  telephone: string,
};

export type emailType = {
  name: string,
  email: string,
};

export type institutionInfoType = {
  +id: string,
  +addresses: Array<addressType>,
  +telephones: Array<telephoneType>,
  +emails: Array<emailType>,
  +workingTimes: Array<string>,
};

export type bioType = {
  institutionName: string,
  bannerSrc: string,
};

export type listingType = {
  +id: string,
  +images: Array<string>,
  +title: string,
  +description?: string,
  +category: categoryType,
  +address?: addressType,
  +telephone?: telephoneType,
};

export type institutionType = {
  +bio: bioType,
  +info: institutionInfoType,
  +posts: Array<postType>,
};

export type metaType = {
  +categories: Array<categoryType>,
};

export type emptyActionType = {
  type: string,
};

export type searchFilterType = {
  +categories: Array<number>,
  +range?: number,
  +location?: locationType,
};

export type myListingType = {
  +id: string,
  +title?: string,
  +image?: string,
  +category?: string,
  +status?:
    | uploadStatuses.UPLOADED
    | uploadStatuses.UPLOADING
    | uploadStatuses.ERROR,
};

export type uploadListingType = {
  title: string,
  +images: Array<string>,
  +description?: string,
  +category: categoryType,
  +address?: addressType,
  +telephone?: telephoneType,
};

export type draftListingType = {
  +title?: string,
  +images: Array<string>,
  +description?: string,
  +category: categoryType,
  +address?: addressType,
  +telephone?: telephoneType,
};

export type draftListingWithIdType = draftListingType & {
  id: string,
};
