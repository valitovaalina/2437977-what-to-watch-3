export const TIMEOUT_SHOW_ERROR = 2000;
export const visibleFilmCardCount = 8;
export const hoverFilmCardTime = 1000;

export const Setting = {
  filmCardTitle: 'The Grand Budapest Hotel',
  filmCardGenre: 'Drama',
  filmCardYear: 2014
};

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

export enum Genre {
  All = 'All Genres',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Horror = 'Horror',
  KidsFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thriller = 'Thriller'
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  SimilarFilms = '/similar',
  Promo = '/promo',
}

export enum Reducer {
  USER_REDUCER = 'USER_REDUCER',
  MAIN_REDUCER = 'MAIN_REDUCER',
  FILM_REDUCER = 'FILM_REDUCER',
}

