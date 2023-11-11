import { useEffect, useState } from 'react';
import './film-card.css';
import { Film } from '../types';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { hoverFilmCardTime } from '../consts';

type FilmCardProps = {
  film: Film;
}

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needToActiveVideo, setNeedToActiveVideo] = useState(false);

  useEffect(() => {
    let cleanFlag = true;

    if (needToActiveVideo) {
      setTimeout(() => cleanFlag && setIsPlaying(true), hoverFilmCardTime);
    }

    return () => {
      cleanFlag = false;
    };
  }, [needToActiveVideo]);

  return (
    <Link className="small-film-card__link small-film-card catalog__films-card" to={`/films/${film.id}`} onMouseEnter={() => setNeedToActiveVideo(true)} onMouseLeave={() => {
      setNeedToActiveVideo(false);
      setIsPlaying(false);
    }}
    >
      {!isPlaying ? <img src={film.previewImage} /> : <VideoPlayer isPlaying={isPlaying} isMuting src={film.previewVideoLink} poster={film.previewImage} />}
    </Link>
  );
}

export default FilmCard;
