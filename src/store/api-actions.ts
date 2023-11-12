import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '@components/consts';
import { AppDispatch, AuthData, Film, Review, State, UserData, UserReview } from '@components/types';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillFilms, loadReviews, loadFilm, loadSimilarFilms, setAuthorizationStatus, setDataIsLoading, setError } from './actions';
import { dropToken, saveToken } from '.././services/token';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataIsLoading(true));
    const { data } = await api.get<Film[]>(APIRoute.Films);
    dispatch(fillFilms(data));
    dispatch(setDataIsLoading(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logIn = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password, });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const logOut = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

export const clearError = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
);

export const fetchFilmByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmById',
  async (filmId: string, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(loadFilm(data));
  });

export const fetchReviewsByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviewsById',
  async (filmId: string, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${filmId}`);
    dispatch(loadReviews(data));
  });

export const fetchSimilarByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarById',
  async (filmId: string, { dispatch, extra: api }) => {
    const { data } = await api.get<Film[]>(`${APIRoute.Films}/${filmId}${APIRoute.SimilarFilms}`);
    dispatch(loadSimilarFilms(data));
  });

export const postReview = createAsyncThunk<void, UserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFilmReview',
  async ({ comment, rating, filmId }, { dispatch, extra: api }) => {
    dispatch(setDataIsLoading(true));
    await api.post<UserReview>(`${APIRoute.Reviews}/${filmId}`, { comment, rating, });
    dispatch(setDataIsLoading(false));
  }
);
