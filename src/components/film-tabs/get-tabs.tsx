import Details from './details/details';
import Overview from './overview/overview';
import Reviews from './reviews/reviews';
import { Film, Review } from '../types';

export const getTabs = (tabFilm: 'Overview' | 'Details' | 'Reviews', currentFilm: Film | null, reviews: Review[]) => {
  if (tabFilm === 'Overview') {
    return <Overview currentFilm={currentFilm} />;
  }
  if (tabFilm === 'Details') {
    return <Details currentFilm={currentFilm} />;
  }
  if (tabFilm === 'Reviews') {
    return <Reviews reviews={reviews} />;
  }
};
