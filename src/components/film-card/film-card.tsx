import './film-card.css';
import { Film } from '../consts';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import { useEffect, useState } from 'react';

type FilmCardProps = {
  film: Film;
}

function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needToActiveVideo, setNeedToActiveVideo] = useState(false);

  useEffect(() => {
    if (needToActiveVideo) {
      setTimeout(() => setIsPlaying(true), 1000);
    }
  }, [needToActiveVideo]);

  return (
    <Link className="small-film-card__link small-film-card catalog__films-card" to={`/films/${film.id}`} onMouseEnter={() => setNeedToActiveVideo(true)} onMouseLeave={() => {
      setNeedToActiveVideo(false);
      setIsPlaying(false);
    }}
    >
      <VideoPlayer isPlaying={isPlaying} isMuting src={film.videoPreview} poster={film.poster} />
      {!isPlaying && film.name}
    </Link>
  );
}

export default FilmCard;
