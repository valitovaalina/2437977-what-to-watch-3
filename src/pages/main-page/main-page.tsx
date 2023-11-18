import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import FilmList from '@components/film-list/film-list';
import './main-page.css';
import GenreList from '@components/genre-list/genre-list';
import { useAppSelector } from '@components/hooks/hooks';
import ShowMoreButton from '@components/show-more-button/show-more-button';
import User from '@components/user/user';
import Footer from '@components/footer/footer';
import Logo from '@components/logo/logo';
import { getFilmCardCount, getGenreFilmList, getPromo } from '@store/main-reducer/main-selectors';

function MainPage() {
  const promo = useAppSelector(getPromo);
  const filmsGenre = useAppSelector(getGenreFilmList);
  const filmCardCount = useAppSelector(getFilmCardCount);

  if (!promo) {
    return null;
  }

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
          <Logo />
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
                  to={`/player/${promo?.id}`}
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg className="btn--play__icon-item" viewBox="0 0 19 19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                <Link
                  to={`/player/${promo?.id}`}
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
        <Footer />
      </div>
    </Fragment>
  );
}

export default MainPage;
