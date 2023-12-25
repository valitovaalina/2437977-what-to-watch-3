import { takeTestFilm, takeTestFilms, takeTestReviews } from '@mocks/mocks';
import { FilmState } from '@components/types';
import { filmReducer } from './film-reducer';
import { changeFilmFavoriteStatus, fetchFilmByID, fetchReviewsByID, fetchSimilarByID } from '../api-actions';

const testFilm = takeTestFilm();
const testFilms = takeTestFilms();
const testReviews = takeTestReviews();

describe('filmReducer Slice', () => {
  let initialState: FilmState;

  beforeEach(() => {
    initialState = {
      film: null,
      reviews: [],
      similarFilms: [],
      isFilmLoading: false,
    };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = filmReducer.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  describe('fetchFilmByID test', () => {
    it('should update "isFilmLoading" to true with fetchFilmByID.pending', () => {
      const expectedIsFilmLoading = true;

      const result = filmReducer.reducer(initialState, fetchFilmByID.pending);

      expect(result.isFilmLoading).toEqual(expectedIsFilmLoading);
    });

    it('should update "film" and "isFilmLoading" to false with fetchFilmByID.fulfilled', () => {
      const expectedIsFilmLoading = false;
      initialState.isFilmLoading = true;

      const result = filmReducer.reducer(initialState, {
        type: fetchFilmByID.fulfilled,
        payload: testFilm,
      });

      expect(result.isFilmLoading).toEqual(expectedIsFilmLoading);
      expect(result.film).toEqual(testFilm);
    });
  });

  describe('fetchSimilarByID test', () => {
    it('should update "similarFilms" with fetchSimilarByID.fulfilled', () => {
      const result = filmReducer.reducer(initialState, {
        type: fetchSimilarByID.fulfilled,
        payload: testFilms,
      });

      expect(result.similarFilms).toEqual(testFilms);
    });
  });

  describe('fetchReviewsByID test', () => {
    it('should update reviews with fetchReviewsByID.fulfilled', () => {
      const result = filmReducer.reducer(initialState, {
        type: fetchReviewsByID.fulfilled,
        payload: testReviews,
      });

      expect(result.reviews).toEqual(testReviews);
    });
  });

  describe('changeFilmFavoriteStatus test', () => {
    it('should update "isFavorite" with changeFilmFavoriteStatus.fulfilled and id is similar', () => {
      const testFilm2 = takeTestFilm();
      testFilm2.isFavorite = true;
      initialState.film = testFilm;

      const result = filmReducer.reducer(initialState, {
        type: changeFilmFavoriteStatus.fulfilled,
        payload: testFilm2,
      });

      expect(result.film?.isFavorite).toEqual(true);
    });

    it('should not update film favorite status if changeFilmFavoriteStatus fulfilled and id is not similar', () => {
      const testFilm2 = takeTestFilm();
      testFilm2.id = 'kokoko';
      testFilm2.isFavorite = true;
      initialState.film = testFilm;

      const result = filmReducer.reducer(initialState, {
        type: changeFilmFavoriteStatus.fulfilled,
        payload: testFilm2,
      });

      expect(result.film?.isFavorite).toEqual(false);
    });
  });
});
