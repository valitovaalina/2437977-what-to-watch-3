import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '@components/types';
import { changeGenre, setError } from '../actions';
import { fetchFilms, fetchPromoFilm } from '@store/api-actions';
import { Genre } from '@components/consts';

const initialState: AppState = {
  filmList: [],
  sortedFilmList: [],
  genre: Genre.All,
  filmCardCount: 0,
  dataIsLoading: false,
  error: null,
  promo: null
};

export const mainReducer = createSlice({
  name: 'MAIN_REDUCER',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
        state.sortedFilmList = (state.genre === Genre.All) ? state.filmList : state.filmList.filter((film) => film.genre === state.genre);
        state.filmCardCount = Math.min(state.sortedFilmList.length, 8);
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
      });
  },
});
