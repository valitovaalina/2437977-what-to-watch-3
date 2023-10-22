import { Helmet } from 'react-helmet-async';
import './my-list-page.css';
import FilmList from '../../components/film-list/film-list';
import { AppRoute, Film } from '../../components/consts';
import { Link } from 'react-router-dom';

type MyListPageProps = {
  films: Film[];
}

function MyListPage({ films }: MyListPageProps): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>Что посмотреть. Мой список фильмов</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Root} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img className="user-block__image-item" src="img/avatar.jpg" alt="User avatar" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmList films={films.slice(1, 10)} />
        </div>
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
  );
}

export default MyListPage;
