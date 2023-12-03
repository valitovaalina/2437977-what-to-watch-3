import React from 'react';

import { getRating } from '@components/extra-functions/get-rating-function';
import { Film } from '@components/types';

type OverviewProps = {
  currentFilm: Film | null;
}

function Overview({ currentFilm }: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{currentFilm?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{currentFilm?.rating && getRating(currentFilm?.rating)}</span>
          <span className="film-rating__count">{currentFilm?.scoresCount && `${currentFilm?.scoresCount} ratings`}</span>
        </p>
      </div>
      <div className="film-card__text">
        {currentFilm?.description}
        <p className="film-card__director">
          <strong>Director: {currentFilm?.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>
            Starring:
            {currentFilm?.starring.map((actor) => (
              <React.Fragment key={actor}>
                {actor} {`${currentFilm?.starring[currentFilm?.starring.length - 1] === actor ? 'and other' : ''}`}
              </React.Fragment>
            ))}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
