import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { createAPI } from '@services/api';
import { AuthData, State, UserReview } from '@components/types';
import { AppThunkDispatch, extractActionsTypes, takeTestFilm, takeTestFilms, takeTestReviews } from '@mocks/mocks';
import { ApiRoute } from '@consts/consts';
import { changeFilmFavoriteStatus, changePromoFavoriteStatus, checkAuth, fetchFavoriteFilms, fetchFilmByID, fetchFilms, fetchPromoFilm, fetchReviewsByID, fetchSimilarByID, logIn, logOut, postReview } from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const testFilm = takeTestFilm();
  const testFilms = takeTestFilms();
  const testReviews = takeTestReviews();

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('checkAuth', () => {
    it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, []);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });

  describe('logIn', () => {
    it('should dispatch "logIn.pending", "logIn.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(logIn(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logIn.pending.type,
        logIn.fulfilled.type,
      ]);
    });

  });

  describe('logOut', () => {
    it('should dispatch "logOut.pending", "logOut.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logOut());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logOut.pending.type,
        logOut.fulfilled.type,
      ]);
    });
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilms.pending", "fetchFilms.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Films).reply(200, testFilms);

      await store.dispatch(fetchFilms());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilms.pending.type,
        fetchFilms.fulfilled.type,
      ]);

      expect(fetchFilmsFulfilled.payload)
        .toEqual(testFilms);
    });

    it('should dispatch "fetchFilms.pending", "fetchFilms.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Films).reply(400, []);

      await store.dispatch(fetchFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilms.pending.type,
        fetchFilms.rejected.type,
      ]);
    });
  });

  describe('fetchFilmByID', () => {
    it('should dispatch "fetchFilmByID.pending", "fetchFilmByID.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet('/films/lalala').reply(200, testFilms);

      await store.dispatch(fetchFilmByID('lalala'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFilmByID.pending.type,
        fetchFilmByID.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFilmByID.pending", "fetchFilmByID.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/lalala').reply(400, []);

      await store.dispatch(fetchFilmByID('lalala'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmByID.pending.type,
        fetchFilmByID.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsByID', () => {
    it('should dispatch "fetchReviewsByID.pending", "fetchReviewsByID.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet('/comments/1').reply(200, testReviews);

      await store.dispatch(fetchReviewsByID('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReviewsByID.pending.type,
        fetchReviewsByID.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchReviewsByID.pending", "fetchReviewsByID.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/comments/1').reply(400, []);

      await store.dispatch(fetchReviewsByID('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsByID.pending.type,
        fetchReviewsByID.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarByID', () => {
    it('should dispatch "fetchSimilarByID.pending", "fetchSimilarByID.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet('/films/lalala/similar').reply(200, testFilms);

      await store.dispatch(fetchSimilarByID('lalala'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchSimilarByID.pending.type,
        fetchSimilarByID.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchSimilarByID.pending", "fetchSimilarByID.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet('/films/lalala/similar').reply(400, []);

      await store.dispatch(fetchReviewsByID('lalala'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsByID.pending.type,
        fetchReviewsByID.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilm', () => {
    it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Promo).reply(200, testFilm);

      await store.dispatch(fetchPromoFilm());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Promo).reply(400);

      await store.dispatch(fetchPromoFilm());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteFilms', () => {
    it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, testFilms);

      await store.dispatch(fetchFavoriteFilms());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilms.pending.type,
        fetchFavoriteFilms.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteFilms.pending.type,
        fetchFavoriteFilms.rejected.type,
      ]);
    });
  });

  describe('postReview', () => {
    it('should dispatch "postReview.pending", "postReview.fulfilled", when server response 200', async () => {
      const postData: UserReview = {
        filmId: '1',
        comment: 'aaaa',
        rating: 3,
      };
      mockAxiosAdapter
        .onPost(`/comments/${postData.filmId}`, {
          comment: postData.comment,
          rating: postData.rating
        })
        .reply(200);

      await store.dispatch(postReview(postData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type,
      ]);
    });

    it('should dispatch "postReview.pending", "postReview.rejected" when server response 400', async () => {
      const postData: UserReview = {
        filmId: '1',
        comment: 'aaaa',
        rating: 3,
      };
      mockAxiosAdapter
        .onPost(`/comments/${postData.filmId}`, {
          comment: postData.comment,
          rating: postData.rating
        })
        .reply(400);

      await store.dispatch(postReview(postData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });

  describe('changeFilmFavoriteStatus', () => {
    it('should dispatch "changeFilmFavoriteStatus.pending", "changeFilmFavoriteStatus.fulfilled", when server response 200', async () => {
      const postData = {
        filmId: 'lalala',
        status: 1
      };
      mockAxiosAdapter.onPost('/favorite/lalala/1').reply(200);

      await store.dispatch(changeFilmFavoriteStatus(postData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changeFilmFavoriteStatus.pending.type,
        changeFilmFavoriteStatus.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFilmFavoriteStatus.pending", "changeFilmFavoriteStatus.fulfilled", when server response 200', async () => {
      const postData = {
        filmId: 'lalala',
        status: 1
      };
      mockAxiosAdapter.onPost('/favorite/lalala/1').reply(400);

      await store.dispatch(changeFilmFavoriteStatus(postData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFilmFavoriteStatus.pending.type,
        changeFilmFavoriteStatus.rejected.type,
      ]);
    });
  });

  describe('changePromoFavoriteStatus', () => {
    it('should dispatch "changePromoFavoriteStatus.pending", "changePromoFavoriteStatus.fulfilled", when server response 200', async () => {
      const postData = {
        filmId: 'lalala',
        status: 1
      };
      mockAxiosAdapter.onPost('/favorite/lalala/1').reply(200);

      await store.dispatch(changePromoFavoriteStatus(postData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changePromoFavoriteStatus.pending.type,
        changePromoFavoriteStatus.fulfilled.type,
      ]);
    });

    it('should dispatch "changePromoFavoriteStatus.pending", "changePromoFavoriteStatus.fulfilled", when server response 200', async () => {
      const postData = {
        filmId: 'lalala',
        status: 1
      };
      mockAxiosAdapter.onPost('/favorite/lalala/1').reply(400);

      await store.dispatch(changePromoFavoriteStatus(postData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changePromoFavoriteStatus.pending.type,
        changePromoFavoriteStatus.rejected.type,
      ]);
    });
  });
});
