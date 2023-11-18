import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import FilmList from '@components/film-list/film-list';
import { AppRoute, Reducer } from '@components/consts';
import './main-page.css';
import GenreList from '@components/genre-list/genre-list';
import { useAppSelector } from '@components/hooks/hooks';
import ShowMoreButton from '@components/show-more-button/show-more-button';
import User from '@components/user/user';

function MainPage(): JSX.Element {
  const promo = useAppSelector((state) => state[Reducer.MAIN_REDUCER].promo);
  const filmsGenre = useAppSelector((state) => state[Reducer.MAIN_REDUCER].sortedFilmList);
  const filmCardCount = useAppSelector((state) => state[Reducer.MAIN_REDUCER].filmCardCount);
  return (
    <Fragment>
      <Helmet>
        <title>Что посмотреть. Главная</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promo?.backgroundImage}
            alt={promo?.name}
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
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                className="film-card__poster--image-item"
                src={promo?.posterImage}
                alt={promo?.name}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo?.genre}</span>
                <span className="film-card__year">{promo?.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link
                  to={promo && `/player/${promo.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg className="btn--play__icon-item" viewBox="0 0 19 19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                <Link
                  to={promo && `/player/${promo.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg className="btn--list__icon-item" viewBox="0 0 19 20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />
          <div className="catalog__films-list">
            <FilmList films={filmsGenre.slice(0, filmCardCount)} />
          </div>
          {filmCardCount !== filmsGenre.length && <ShowMoreButton />}
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}

export default MainPage;
