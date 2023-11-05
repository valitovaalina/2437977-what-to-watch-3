import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react';
import FilmList from '@components/film-list/film-list';
import { AppRoute } from '@components/consts';
import './main-page.css';
import { Link } from 'react-router-dom';
import GenreList from '@components/genre-list/genre-list';
import { useAppSelector } from '@components/hooks/hooks';
import ShowMoreButton from '@components/show-more-button/show-more-button';

export type MainPageProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function MainPage({ filmCardTitle, filmCardGenre, filmCardYear }: MainPageProps): JSX.Element {
  const filmsGenre = useAppSelector((state) => state.filmList);
  const filmCardCount = useAppSelector((state) => state.filmCardCount);
  return (
    <Fragment>
      <Helmet>
        <title>Что посмотреть. Главная</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src="img/bg-the-grand-budapest-hotel.jpg"
            alt="The Grand Budapest Hotel"
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
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  className="user-block__image-item"
                  src="img/avatar.jpg"
                  alt="User avatar"
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                className="film-card__poster--image-item"
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmCardTitle}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmCardGenre}</span>
                <span className="film-card__year">{filmCardYear}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg className="btn--play__icon-item" viewBox="0 0 19 19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg className="btn--list__icon-item" viewBox="0 0 19 20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
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
          {filmCardCount !== filmsGenre.length && <ShowMoreButton/>}
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
