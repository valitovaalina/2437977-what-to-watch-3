import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillFilms, loadReviews, loadFilm, loadSimilarFilms, saveUser, setAuthorizationStatus, setDataIsLoading, setError, setFilmCardCount } from './actions';
import { AuthorizationStatus, Genre } from '@components/consts';
import { visibleFilmCardCount } from '@components/consts';
import { Film, Review, UserData } from '@components/types';

type InitialState = {
  genre: Genre;
  filmList: Film[];
  sortedFilmList: Film[];
  filmCardCount: number;
  dataIsLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userData: UserData | null;
  film: Film | null;
  reviews: Review[];
  similarFilms: Film[];
}

const initialState: InitialState = {
  genre: Genre.All,
  filmList: [],
  sortedFilmList: [],
  filmCardCount: 8,
  dataIsLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null,
  film: null,
  reviews: [],
  similarFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUser, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
      state.sortedFilmList = (state.genre === Genre.All) ? state.filmList : state.filmList.filter((film) => film.genre === state.genre);
      state.filmCardCount = Math.min(state.sortedFilmList.length, 8);
    })
    .addCase(setFilmCardCount, (state) => {
      const currentGenreFilms = state.sortedFilmList.length;
      state.filmCardCount = (state.filmCardCount + visibleFilmCardCount > currentGenreFilms) ? currentGenreFilms : state.filmCardCount + visibleFilmCardCount;
    })
    .addCase(fillFilms, (state, action) => {
      state.filmList = action.payload;
      state.sortedFilmList = action.payload;
      state.filmCardCount = Math.min(state.filmList.length, 8);
    })
    .addCase(setDataIsLoading, (state, action) => {
      state.dataIsLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    });
});

export { reducer };
