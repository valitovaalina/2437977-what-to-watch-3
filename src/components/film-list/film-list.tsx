import React from 'react';
import { Film } from '../types';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Film[];
}

function FilmList({ films }: FilmListProps): React.ReactElement {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <FilmCard key={film.name} film={film} />)}
    </div>
  );
}

export default FilmList;
