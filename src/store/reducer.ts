import { createReducer } from '@reduxjs/toolkit';
import { films } from '@mocks/films';
import { changeGenre, getGenreFilms } from './actions';
import { Genre } from '@components/consts';

const initialState = {
  genre: Genre.All,
  filmList: films,
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
    });
});

export { reducer };
