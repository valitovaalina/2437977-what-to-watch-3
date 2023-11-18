import { store } from '../store/index.js';
import { AuthorizationStatus, Genre } from './consts.ts';

export type Film = {
  id: string;
  name: string;
  genre: Genre;
  released: number;
  previewImage: string;
  posterImage: string;
  backgroundImage: string;
  scoresCount: number;
  rating: number;
  description: string;
  director: string;
  starring: string[];
  runTime: string;
  previewVideoLink: string;
  videoLink: string;
}

export type Review = {
  id: number;
  comment: string;
  user: string;
  date: string;
  rating: number;
  filmId?: number;
}

export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
};

export type AppState = {
  genre: Genre;
  filmList: Film[];
  sortedFilmList: Film[];
  filmCardCount: number;
  dataIsLoading: boolean;
  error: string | null;
  promo: Film | null;
}

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  avatar: string | null;
}

export type FilmState = {
  film: Film | null;
  reviews: Review[];
  similarFilms: Film[];
}

export type UserReview = {
  filmId: string;
  rating: number;
  comment: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
