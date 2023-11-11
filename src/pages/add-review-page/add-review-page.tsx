/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Helmet } from 'react-helmet-async';
import './add-review-page.css';
import { Film } from '@components/types';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '@components/consts';
import AddReviewForm from '@components/add-review-form/add-review-form';
import User from '@components/user/user';

export type AddReviewPageProps = {
  films: Film[];
}

function AddReviewPage({ films }: AddReviewPageProps): JSX.Element {
  const { id } = useParams();
  const currentFilmId = Number(id);
  const currentFilm = films.at(currentFilmId);

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>Что посмотреть. Оставьте отзыв!</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={currentFilm?.background}
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
                <Link to={`/films/${currentFilm?.id}`} className="breadcrumbs__link">
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
            src={currentFilm?.previewImage}
            alt={`${currentFilm?.name} poster`}
          />
        </div>
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;
