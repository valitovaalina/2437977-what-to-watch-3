import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './film-card.css';
import { Film } from '../types';
import VideoPlayer from '../video-player/video-player';
import { HOVER_FILM_CARD_TIME } from '@consts/consts';

type FilmCardProps = {
  film: Film;
}

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needToActiveVideo, setNeedToActiveVideo] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (needToActiveVideo) {
      setTimeout(() => isMounted && setIsPlaying(true), HOVER_FILM_CARD_TIME);
    }

    return () => {
      isMounted = false;
    };
  }, [needToActiveVideo]);

  return (
    <Link data-testid='film-card' className="small-film-card__link small-film-card catalog__films-card" to={`/films/${film.id}`} onMouseEnter={() => setNeedToActiveVideo(true)} onMouseLeave={() => {
      setNeedToActiveVideo(false);
      setIsPlaying(false);
    }}
    >
      {!isPlaying ? <img src={film.previewImage} /> : <VideoPlayer isPlaying={isPlaying} isMuting src={film.previewVideoLink} poster={film.previewImage} />}
      <h3 className="small-film-card__title">
        {film.name}
      </h3>
    </Link>
  );
}

export default FilmCard;
