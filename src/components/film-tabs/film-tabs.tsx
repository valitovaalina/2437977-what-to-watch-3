import { useState } from 'react';
import { reviews } from '@mocks/reviews.ts';
import { Film } from '../types';
import Overview from '@components/film-tabs/overview/overview';
import Details from '@components/film-tabs/details/details';
import Reviews from '@components/film-tabs/reviews/reviews';

type FilmTabsProps = {
  films: Film[];
}

function FilmTabs(props: FilmTabsProps) {
  const [tab, setTab] = useState('Overview');
  const getTab = (tabFilm: string) => {
    if (tabFilm === 'Overview') {
      return <Overview films={props.films} />;
    }
    if (tabFilm === 'Details') {
      return <Details films={props.films} />;
    }
    if (tabFilm === 'Reviews') {
      return <Reviews reviews={reviews} />;
    }
  };

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
      {getTab(tab)}
    </div>
  );
}

export default FilmTabs;
