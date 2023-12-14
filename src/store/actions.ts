import { createAction } from '@reduxjs/toolkit';

import { Genre } from '@components/consts';

export const Action = {
  CHANGE_GENRE: 'main/changeGenre',
  SET_FILM_CARD_COUNT: 'main/setFilmCardCount',
  APP_SET_ERROR: 'main/setError',
  SET_DATA_IS_LOADING: 'setDataIsLoading',
  SET_FAVORITE_COUNT: 'main/setFavoriteCount',
};

export const changeGenre = createAction<Genre>(Action.CHANGE_GENRE);
export const setFilmCardCount = createAction(Action.SET_FILM_CARD_COUNT);
export const setDataIsLoading = createAction<boolean>(Action.SET_DATA_IS_LOADING);
export const setError = createAction<string | null>(Action.APP_SET_ERROR);
export const setFavoriteCount = createAction<number>(Action.SET_FAVORITE_COUNT);
