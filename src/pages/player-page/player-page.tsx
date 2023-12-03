import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import './player-page.css';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { fetchFilmByID } from '@store/api-actions';
import { getFilm } from '@store/film-reducer/film-selectors';
import { Reducer } from '@components/consts';
import Loader from '@components/loader/loader';
import { getTimeLeft } from '@components/extra-functions/get-time-left';
import PlayerState from '@components/player-state/player-state';

function Player() {
  const { id = '' } = useParams();
  const currentFilm = useAppSelector(getFilm);
  const isFilmLoadingStatus = useAppSelector((state) => state[Reducer.FILM_REDUCER].isFilmLoading);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPause, setIsPause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const progressRef = useRef(null);
  const [progressPosition, setProgressPosition] = useState(0);

  const updateTime = () => {
    if (videoRef.current) {
      setTimeLeft(Math.round(videoRef.current?.duration - videoRef.current?.currentTime));
      setProgressPosition((videoRef.current?.currentTime * 100) / videoRef.current?.duration);
    }
  };

  const actByPlayPauseClick = () => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.play();
        setIsPause(false);
      } else {
        videoRef.current.pause();
        setIsPause(true);
      }
    }
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByID(id));
      setIsPause(true);
    }
  }, [dispatch, id]);

  if (!currentFilm) {
    return null;
  }

  if (isFilmLoadingStatus) {
    return <Loader />;
  }

  return (
    <div className="player">
      <video
        src={currentFilm?.videoLink}
        className="player__video"
        poster={currentFilm?.posterImage}
        ref={videoRef}
        onTimeUpdate={updateTime}
      >
      </video>

      <Link to={`/films/${currentFilm?.id}`} type="button" className="player__exit">
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100" />
            <div className="player__toggler" style={{ left: `${progressPosition}%` }} ref={progressRef}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={actByPlayPauseClick}>
            {isPause
              ? <PlayerState viewBox={'0 0 19 19'} width={19} height={19} xlinkHref={'#play-s'} state={'Play'} />
              : <PlayerState viewBox={'0 0 14 21'} width={14} height={21} xlinkHref={'#pause'} state={'Pause'} />}
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={() => {
            videoRef.current?.requestFullscreen();
          }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Player;
