import { State } from '@components/types';
import { Reducer } from '@components/consts';

export const getCurrentGenre = (state: State) => state[Reducer.MAIN_REDUCER].genre;
export const getFilmList = (state: State) => state[Reducer.MAIN_REDUCER].filmList;
export const getPromo = (state: State) => state[Reducer.MAIN_REDUCER].promo;
export const getGenreFilmList = (state: State) => state[Reducer.MAIN_REDUCER].sortedFilmList;
export const getFilmCardCount = (state: State) => state[Reducer.MAIN_REDUCER].filmCardCount;
export const getError = (state: State) => state[Reducer.MAIN_REDUCER].error;
export const getLoading = (state: State) => state[Reducer.MAIN_REDUCER].dataIsLoading;
