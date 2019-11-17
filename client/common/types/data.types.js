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
