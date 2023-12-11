import { Provider } from 'react-redux';
import FilmTabs from './film-tabs';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '@services/api';
import thunk from 'redux-thunk';
import { takeTestFilm, takeTestReviews } from '../mocks/mocks';

describe('Component: FilmTabs', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should render correctly', () => {
    const testReviews = takeTestReviews();
    const testFilm = takeTestFilm();
    const store = mockStore({
      FILM_REDUCER: {
        reviews: testReviews,
        film: testFilm
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmTabs />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });
});
