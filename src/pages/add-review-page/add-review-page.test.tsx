import { Provider } from 'react-redux';
import AddReviewPage from './add-review-page';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@consts/consts';
import { takeTestFilm } from '@mocks/mocks';
import { createAPI } from '@services/api';
import thunk from 'redux-thunk';
import { State } from '@components/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

describe('Component: AddReviewPage', () => {
  const api = createAPI();
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  const testFilm = takeTestFilm();

  it('should render MainPage if user not authorized', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>MainPage</h1>}
            />
            <Route
              path={AppRoute.AddReview}
              element={<AddReviewPage />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/MainPage/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
  });

  it('should render AddReviewPage if user is authorized', () => {
    const store = mockStore({
      USER_REDUCER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      FILM_REDUCER: {
        film: testFilm,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });
});
