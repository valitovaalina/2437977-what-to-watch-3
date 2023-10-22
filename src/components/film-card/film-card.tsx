import './film-card.css';
import { Film } from '../consts';
import { Link } from 'react-router-dom';

type FilmCardProps = {
  film: Film;
}

function FilmCard({ film }: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          className="small-film-card__image-item"
          src={film.poster}
          alt={film.name}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
