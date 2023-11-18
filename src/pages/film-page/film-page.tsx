import { Helmet } from 'react-helmet-async';
import { Fragment, useEffect } from 'react';
import FilmList from '@components/film-list/film-list';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '@components/consts';
import './film-page.css';
import FilmTabs from '@components/film-tabs/film-tabs';
import User from '@components/user/user';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { fetchFilmByID, fetchReviewsByID, fetchSimilarByID } from '@store/api-actions';
import Footer from '@components/footer/footer';
import Logo from '@components/logo/logo';
import { getFilm, getSimilarFilms } from '@store/film-reducer/film-selectors';
import { getAuthStatus } from '@store/user-reducer/user-selectors';

function FilmPage(): JSX.Element {
  const id = String(useParams().id);
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const authorizationStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(fetchFilmByID(id));
    dispatch(fetchSimilarByID(id));
    dispatch(fetchReviewsByID(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Что посмотреть. Описание фильма</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={currentFilm?.backgroundImage}
              alt={currentFilm?.name}
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <User />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm?.genre}</span>
                <span className="film-card__year">{currentFilm?.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  to={currentFilm?.id && `/player/${currentFilm.id}`}
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
                  <Link to={currentFilm?.id && `/films/${currentFilm.id}/review`} className="btn film-card__button">
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
                src={currentFilm?.posterImage}
                alt={currentFilm?.id && `${currentFilm.name} poster`}
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
        <Footer />
      </div>
    </Fragment>
  );
}

export default FilmPage;
