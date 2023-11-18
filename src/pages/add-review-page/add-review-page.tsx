import { Helmet } from 'react-helmet-async';
import './add-review-page.css';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@components/consts';
import AddReviewForm from '@components/add-review-form/add-review-form';
import User from '@components/user/user';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { useEffect } from 'react';
import { setDataIsLoading } from '@store/actions';
import { fetchFilmByID } from '@store/api-actions';
import Logo from '@components/logo/logo';
import { getFilm } from '@store/film-reducer/film-selectors';
import { getAuthStatus } from '@store/user-reducer/user-selectors';

function AddReviewPage(): JSX.Element {
  const id = String(useParams().id);
  const dispatch = useAppDispatch();
  const currentFilm = useAppSelector(getFilm);
  const authStatus = useAppSelector(getAuthStatus);

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
          <Logo />
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
