import { Helmet } from 'react-helmet-async';

import './my-list-page.css';
import FilmList from '@components/film-list/film-list';
import { Film } from '@components/types';
import User from '@components/user/user';
import Footer from '@components/footer/footer';
import Logo from '@components/logo/logo';

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
        <Logo />
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
        <User />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmList films={films.slice(1, 10)} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
