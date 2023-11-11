import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, Genre } from '@components/consts';
import { Film } from '@components/types';

export const Action = {
  CHANGE_GENRE: 'main/changeGenre',
  SET_FILM_CARD_COUNT: 'setFilmCardCount',
  SHOW_MORE_FILMS: 'showMoreFilms',
  RESET_SHOWN_FILMS: 'resetShownFilms',
  FILL_FILMS: 'fillFilms',
  APP_SET_ERROR: 'app/setError',
  SET_AUTH_STATUS: 'setAuthStatus',
  SET_DATA_IS_LOADING: 'setDataIsLoading'
};

export const changeGenre = createAction(Action.CHANGE_GENRE, (genre: Genre) => ({ payload: genre }));
export const setFilmCardCount = createAction(Action.SET_FILM_CARD_COUNT);
export const fillFilms = createAction<Film[]>(Action.FILL_FILMS);
export const setDataIsLoading = createAction<boolean>(Action.SET_DATA_IS_LOADING);
export const setError = createAction<string | null>(Action.APP_SET_ERROR);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(Action.SET_AUTH_STATUS);
