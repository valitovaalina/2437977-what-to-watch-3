import { takeTestFilm, takeTestFilms } from '@components/mocks/mocks';
import { AppState } from '@components/types';
import { Genre } from 'src/components/consts';
import { mainReducer } from './main-reducer';
import { changeGenre, setError, setFavoriteCount } from '../actions';
import { changePromoFavoriteStatus, fetchFavoriteFilms, fetchFilms, fetchPromoFilm } from '../api-actions';

const testFilm = takeTestFilm();
const testFilms = takeTestFilms();

describe('MainReducer Slice', () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = {
      genre: Genre.All,
      films: [],
      sortedFilms: [],
      filmCardCount: 0,
      dataIsLoading: false,
      error: null,
      promo: null,
      favoriteFilms: [],
      favoriteCount: 0,
    };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = mainReducer.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = mainReducer.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change "genre" with changeGenre action', () => {
    const expectedGenre = testFilm.genre;

    const result = mainReducer.reducer(initialState, {
      type: changeGenre,
      payload: testFilm.genre,
    });

    expect(result.genre).toEqual(expectedGenre);
  });

  it('should change "error" with setError action', () => {
    const expectedError = 'error';

    const result = mainReducer.reducer(initialState, {
      type: setError,
      payload: expectedError,
    });

    expect(result.error).toEqual(expectedError);
  });

  it('should change "dataIsLoading" with fetchFilms.pending action', () => {
    const expectedDataIsLoading = true;

    const result = mainReducer.reducer(initialState, fetchFilms.pending);

    expect(result.dataIsLoading).toEqual(expectedDataIsLoading);
  });

  it('should update state with fetchFilms.fulfilled action', () => {
    const expectedFilmList = testFilms;
    const expectedDataIsLoading = false;
    initialState.dataIsLoading = true;
    const expectedFilmCardCount = testFilms.length;

    const result = mainReducer.reducer(initialState, {
      type: fetchFilms.fulfilled,
      payload: testFilms,
    });

    expect(result.films).toEqual(expectedFilmList);
    expect(result.sortedFilms).toEqual(expectedFilmList);
    expect(result.dataIsLoading).toEqual(expectedDataIsLoading);
    expect(result.filmCardCount).toEqual(expectedFilmCardCount);
  });

  it('should change "promo" with fetchPromoFilm.fulfilled action', () => {
    const expectedPromo = testFilm;

    const result = mainReducer.reducer(initialState, {
      type: fetchPromoFilm.fulfilled,
      payload: testFilm,
    });

    expect(result.promo).toEqual(expectedPromo);
  });

  it('should update state with fetchFavoriteFilms.fulfilled action', () => {
    const expectedFavoriteFilms = testFilms;
    const expectedDataIsLoading = false;
    initialState.dataIsLoading = true;

    const result = mainReducer.reducer(initialState, {
      type: fetchFavoriteFilms.fulfilled,
      payload: testFilms,
    });

    expect(result.favoriteFilms).toEqual(expectedFavoriteFilms);
    expect(result.dataIsLoading).toEqual(expectedDataIsLoading);
  });

  it('should change "promo" with changePromoFavoriteStatus.fulfilled action', () => {
    const expectedPromo = testFilm;

    const result = mainReducer.reducer(initialState, {
      type: changePromoFavoriteStatus.fulfilled,
      payload: testFilm,
    });

    expect(result.promo).toEqual(expectedPromo);
  });

  it('should change "favoriteCount" with setFavoriteCount action', () => {
    const expectedFavoriteCount = 5;

    const result = mainReducer.reducer(initialState, {
      type: setFavoriteCount,
      payload: expectedFavoriteCount,
    });

    expect(result.favoriteCount).toEqual(expectedFavoriteCount);
  });
});
