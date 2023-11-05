import { createReducer } from '@reduxjs/toolkit';
import { films } from '@mocks/films';
import { changeGenre, getGenreFilms, setFilmCardCount } from './actions';
import { Genre } from '@components/consts';
import { visibleFilmCardCount } from '@components/consts';

const initialState = {
  genre: Genre.All,
  filmList: films,
  filmCardCount: 8
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getGenreFilms, (state) => {
      switch (state.genre) {
        case Genre.All:
          state.filmList = films;
          break;
        default:
          state.filmList = films.filter((film) => film.genre === state.genre);
          break;
      }
      state.filmCardCount = state.filmList.length;
    })
    .addCase(setFilmCardCount, (state) => {
      const currentGenreFilms = state.filmList.length;
      state.filmCardCount = (state.filmCardCount + visibleFilmCardCount > currentGenreFilms) ? currentGenreFilms : state.filmCardCount + visibleFilmCardCount;
    });
});

export { reducer };
