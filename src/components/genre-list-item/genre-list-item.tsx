import { changeGenre } from '@store/actions';
import { Genre } from '@consts/consts';
import { useAppDispatch } from '../hooks/hooks';

type GenreListItemProps = {
  genre: Genre;
  currentGenre: Genre;
}

function GenreListItem({ genre, currentGenre }: GenreListItemProps): React.ReactElement {
  const dispatch = useAppDispatch();

  return (
    <li key={genre} className={`catalog__genres-item ${genre === currentGenre ? 'catalog__genres-item--active' : ''}`}>
      <button className="catalog__genres-link"
        onClick={() => {
          dispatch(changeGenre(genre));
        }}
        style={{ background: 'transparent', border: 'none' }}
      >
        {genre}
      </button>
    </li>
  );
}

export default GenreListItem;
