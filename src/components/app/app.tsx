import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainPage from '@pages/main-page/main-page';
import SignInPage from '@pages/sign-in-page/sign-in-page';
import MyListPage from '@pages/my-list-page/my-list-page';
import FilmPage from '@pages/film-page/film-page';
import AddReviewPage from '@pages/add-review-page/add-review-page';
import PlayerPage from '@pages/player-page/player-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import { AppRoute, Reducer } from '../consts';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { useAppSelector } from '../hooks/hooks';

function App(): JSX.Element {
  const films = useAppSelector((state) => state[Reducer.MAIN_REDUCER].sortedFilmList);
  const isLoading = useAppSelector((state) => state[Reducer.MAIN_REDUCER].dataIsLoading);

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Signin}
            element={<SignInPage />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute>
                <MyListPage films={films} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<FilmPage />}
          />
          <Route
            path={AppRoute.AddReview}
            element={<AddReviewPage />}
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
