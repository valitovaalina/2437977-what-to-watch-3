export const TIMEOUT_SHOW_ERROR = 2000;
export const VISIBLE_FILM_CARD_COUNT = 8;
export const HOVER_FILM_CARD_TIME = 1000;
export const MIN_LENGTH_REVIEW = 50;
export const MAX_LENGTH_REVIEW = 1000;
export const TIME_TRANSLATION = 60;
export const SIMILAR_FILM_CARD_COUNT = 4;
export const RE_PASSWORD = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{2,}/;
export const RE_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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


export enum ApiRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  SimilarFilms = '/similar',
  Promo = '/promo',
  Favorite = '/favorite',
}

export enum Reducer {
  USER_REDUCER = 'USER_REDUCER',
  MAIN_REDUCER = 'MAIN_REDUCER',
  FILM_REDUCER = 'FILM_REDUCER',
}

export enum LogInState {
  NoError = 'NoError',
  NotValidEmail = 'NotValidEmail',
  NotValidPassword = 'NotValidPassword',
  NotValidEmailAndPassword = 'NotValidEmailAndPassword',
}
