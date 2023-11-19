import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '@components/types';
import { changeGenre, setError, setFavoriteCount, setFilmCardCount } from '../actions';
import { changePromoFavoriteStatus, fetchFavoriteFilms, fetchFilms, fetchPromoFilm } from '@store/api-actions';
import { Genre, Reducer, visibleFilmCardCount } from '@components/consts';

const initialState: AppState = {
  filmList: [],
  sortedFilmList: [],
  genre: Genre.All,
  filmCardCount: 0,
  dataIsLoading: false,
  error: null,
  promo: null,
  favoriteFilms: [],
  favoriteCount: 0,
};

export const mainReducer = createSlice({
  name: Reducer.MAIN_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
        state.sortedFilmList = (state.genre === Genre.All) ? state.filmList : state.filmList.filter((film) => film.genre === state.genre);
        state.filmCardCount = Math.min(state.sortedFilmList.length, 8);
      })
      .addCase(setFilmCardCount, (state) => {
        const currentGenreFilms = state.sortedFilmList.length;
        state.filmCardCount = (state.filmCardCount + visibleFilmCardCount > currentGenreFilms) ? currentGenreFilms : state.filmCardCount + visibleFilmCardCount;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.dataIsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.filmList = action.payload;
        state.sortedFilmList = action.payload;
        state.filmCardCount = Math.min(state.filmList.length, 8);
        state.dataIsLoading = false;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteCount = state.favoriteFilms.length;
        state.dataIsLoading = false;
      })
      .addCase(changePromoFavoriteStatus.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(setFavoriteCount, (state, action) => {
        state.favoriteCount = action.payload;
      });
  },
});
