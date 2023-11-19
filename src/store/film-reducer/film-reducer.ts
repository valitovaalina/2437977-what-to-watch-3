import { createSlice } from '@reduxjs/toolkit';

import { FilmState } from '@components/types';
import { fetchReviewsByID, fetchFilmByID, fetchSimilarByID, changeFilmFavoriteStatus } from '@store/api-actions';
import { Reducer } from '@components/consts';

const initialState: FilmState = {
  film: null,
  reviews: [],
  similarFilms: [],
  isFilmLoading: false,
};

export const filmReducer = createSlice({
  name: Reducer.FILM_REDUCER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmByID.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmByID.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchReviewsByID.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilarByID.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
