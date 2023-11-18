import { useState } from 'react';

import { useAppSelector } from '../hooks/hooks';
import { getTabs } from './get-tabs';
import { getFilm, getReviews } from '@store/film-reducer/film-selectors';

function FilmTabs() {
  const [tab, setTab] = useState('Overview');
  const reviews = useAppSelector(getReviews);
  const currentFilm = useAppSelector(getFilm);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${tab === 'Overview' ? ' film-nav__item--active' : ''}`}>
            <div onClick={() => setTab('Overview')} className="film-nav__link">{'Overview'}</div>
          </li>
          <li className={`film-nav__item ${tab === 'Details' ? ' film-nav__item--active' : ''}`}>
            <div onClick={() => setTab('Details')} className="film-nav__link">{'Details'}</div>
          </li>
          <li className={`film-nav__item ${tab === 'Reviews' ? ' film-nav__item--active' : ''}`}>
            <div onClick={() => setTab('Reviews')} className="film-nav__link">{'Reviews'}</div>
          </li>
        </ul>
      </nav>
      {getTabs(tab, currentFilm, reviews)}
    </div>
  );
}

export default FilmTabs;
