import { Provider } from 'react-redux';
import GenreList from './genre-list';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { takeTestFilms } from '@mocks/mocks';
import { createAPI } from '@services/api';
import thunk from 'redux-thunk';
import { State } from '../types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

describe('Component: GenreList', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly', () => {
    const testFilms = takeTestFilms();
    const store = mockStore({
      MAIN_REDUCER: {
        films: testFilms,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GenreList />
        </MemoryRouter>
      </Provider>
    );

    const genreItems = screen.getAllByTestId('genre-item');

    expect(genreItems.length).toBe(testFilms.length);
  });
});
