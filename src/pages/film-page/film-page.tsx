import { Helmet } from 'react-helmet-async';
import { Fragment, useEffect } from 'react';
import FilmList from '@components/film-list/film-list';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Reducer } from '@components/consts';
import NotFoundPage from '../not-found-page/not-found-page';
import './film-page.css';
import FilmTabs from '@components/film-tabs/film-tabs';
import User from '@components/user/user';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { fetchFilmByID, fetchReviewsByID, fetchSimilarByID } from '@store/api-actions';

function FilmPage(): JSX.Element {
  const id = String(useParams().id);
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector((state) => state[Reducer.FILM_REDUCER].film);
  const similarFilms = useAppSelector((state) => state[Reducer.FILM_REDUCER].similarFilms);
  const authorizationStatus = useAppSelector((state) => state[Reducer.USER_REDUCER].authorizationStatus);

  useEffect(() => {
    dispatch(fetchFilmByID(id));
    dispatch(fetchSimilarByID(id));
    dispatch(fetchReviewsByID(id));
  }, [id, dispatch]);

  if (!currentFilm) {
    return <NotFoundPage />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Что посмотреть. Описание фильма</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={currentFilm.backgroundImage}
              alt={currentFilm.name}
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Root} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <User />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  to={`/player/${currentFilm.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" className="btn--play__icon-item">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </ Link>
                <Link to={'/mylist'}
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" className="btn--list__icon-item">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </ Link>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link to={`/films/${currentFilm.id}/review`} className="btn film-card__button">
                    Add review
                  </ Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                className="film-card__poster--image-item"
                src={currentFilm.posterImage}
                alt={`${currentFilm.name} poster`}
              />
            </div>
            <FilmTabs />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms} />
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Root} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}

export default FilmPage;
