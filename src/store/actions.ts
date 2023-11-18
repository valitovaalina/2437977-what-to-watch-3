import { createAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, Genre } from '@components/consts';
import { Film, Review, UserData } from '@components/types';

export const Action = {
  CHANGE_GENRE: 'main/changeGenre',
  SET_FILM_CARD_COUNT: 'setFilmCardCount',
  FILL_FILMS: 'fillFilms',
  APP_SET_ERROR: 'app/setError',
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_DATA_IS_LOADING: 'setDataIsLoading',
  SAVE_USER: 'saveUser',
  LOAD_FILM: 'loadFilm',
  LOAD_REVIEWS: 'loadReviews',
  LOAD_SIMILAR: 'loadSimilarFilms',
  SET_AVATAR: 'setAvatar',
  LOAD_PROMO: 'loadPromo',
};

export const changeGenre = createAction<Genre>(Action.CHANGE_GENRE);
export const setFilmCardCount = createAction(Action.SET_FILM_CARD_COUNT);
export const fillFilms = createAction<Film[]>(Action.FILL_FILMS);
export const setDataIsLoading = createAction<boolean>(Action.SET_DATA_IS_LOADING);
export const setError = createAction<string | null>(Action.APP_SET_ERROR);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(Action.SET_AUTH_STATUS);
export const saveUser = createAction<UserData>(Action.SAVE_USER);
export const loadFilm = createAction<Film>(Action.LOAD_FILM);
export const loadReviews = createAction<Review[]>(Action.LOAD_REVIEWS);
export const loadSimilarFilms = createAction<Film[]>(Action.LOAD_SIMILAR);
export const setAvatar = createAction<string | null>(Action.SET_AVATAR);
export const loadPromo = createAction<Film>(Action.LOAD_PROMO);
