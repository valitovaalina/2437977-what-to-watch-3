import { APIRoute } from '@components/consts';
import { AppDispatch, Film, State } from '@components/types';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillFilms, setDataIsLoading } from './actions';

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
