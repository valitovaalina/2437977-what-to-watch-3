import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute, TIMEOUT_SHOW_ERROR } from '@components/consts';
import { AppDispatch, AuthData, Film, Review, State, UserData, UserReview } from '@components/types';
import { setError } from './actions';

export const fetchFilms = createAsyncThunk<Film[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[]>(ApiRoute.Films);
    return data;
  }
);

export const checkAuth = createAsyncThunk<UserData, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(ApiRoute.Login);
    return data;
  }
);

export const logIn = createAsyncThunk<UserData, AuthData, {
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(ApiRoute.Login, { email, password, });
    return data;
  }
);

export const logOut = createAsyncThunk<void, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
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

export const fetchFilmByID = createAsyncThunk<Film, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFilmById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film>(`${ApiRoute.Films}/${filmId}`);
    return data;
  }
);

export const fetchReviewsByID = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviewsById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${ApiRoute.Reviews}/${filmId}`);
    return data;
  }
);

export const fetchSimilarByID = createAsyncThunk<Film[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarById',
  async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film[]>(`${ApiRoute.Films}/${filmId}${ApiRoute.SimilarFilms}`);
    return data;
  }
);

export const postReview = createAsyncThunk<void, UserReview, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFilmReview',
  async ({ comment, rating, filmId }, { extra: api }) => {
    await api.post<UserReview>(`${ApiRoute.Reviews}/${filmId}`, { comment, rating, });
  }
);

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(ApiRoute.Promo);
    return data;
  }
);

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[]>(ApiRoute.Favorite);
    return data;
  }
);

export const changeFilmFavoriteStatus = createAsyncThunk<Film, { filmId: string; status: number }, {
  state: State;
  extra: AxiosInstance;
}>(
  'changeFilmFavoriteStatus',
  async ({ filmId: id, status: isFavorite }, { extra: api }) => {
    const { data } = await api.post<Film>(`${ApiRoute.Favorite}/${id}/${isFavorite}`);
    return data;
  }
);

export const changePromoFavoriteStatus = createAsyncThunk<Film, { filmId: string; status: number }, {
  state: State;
  extra: AxiosInstance;
}>(
  'changePromoFavoriteStatus',
  async ({ filmId: id, status: isFavorite }, { extra: api }) => {
    const { data } = await api.post<Film>(`${ApiRoute.Favorite}/${id}/${isFavorite}`);
    return data;
  }
);
