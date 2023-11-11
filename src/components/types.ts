import { store } from '../store/index.js';
import { Genre } from './consts.js';

export type Film = {
  id: number;
  name: string;
  genre: Genre;
  released: number;
  previewImage: string;
  rating: number;
  description: string;
  director: string;
  starring: string[];
  background: string;
  runTime: string;
  previewVideoLink: string;
}

export type Review = {
  id: number;
  text: string;
  author: string;
  date: string;
  rating: number;
  filmId?: number;
}

export type AuthData = {
  email: string;
  password: string;
};

export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
