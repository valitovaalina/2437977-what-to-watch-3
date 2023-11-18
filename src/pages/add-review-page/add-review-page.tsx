import { Helmet } from 'react-helmet-async';
import './add-review-page.css';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Reducer } from '@components/consts';
import AddReviewForm from '@components/add-review-form/add-review-form';
import User from '@components/user/user';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { useEffect } from 'react';
import { setDataIsLoading } from '@store/actions';
import { fetchFilmByID } from '@store/api-actions';

function AddReviewPage(): JSX.Element {
  const id = String(useParams().id);
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector((state) => state[Reducer.FILM_REDUCER].film);
  const authStatus = useAppSelector((state) => state.USER_REDUCER.authorizationStatus);

  useEffect(() => {
    dispatch(setDataIsLoading(true));
    dispatch(fetchFilmByID(id));
    dispatch(setDataIsLoading(false));
  }, [id, dispatch]);

  if (authStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>Что посмотреть. Оставьте отзыв!</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={currentFilm?.backgroundImage}
            alt={currentFilm?.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Root} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={currentFilm?.id && `/films/${currentFilm.id}`} className="breadcrumbs__link">
                  {currentFilm?.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <User />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img
            className="film-card__poster--image-item"
            src={currentFilm?.posterImage}
            alt={currentFilm?.name && `${currentFilm.name} poster`}
          />
        </div>
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;
