export enum AppRoute {
  Root = '/',
  Signin = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type Film = {
  id: number;
  name: string;
  genre: string;
  released: number;
  poster: string;
  rating: number;
  description: string;
  director: string;
  starring: string[];
  background: string;
  runTime: string;
  videoPreview: string;
}

export type Review = {
  id: number;
  text: string;
  author: string;
  date: string;
  rating: number;
  filmId?: number;
}
