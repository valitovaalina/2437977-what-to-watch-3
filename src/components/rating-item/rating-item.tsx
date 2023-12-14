import { ChangeEvent, Fragment } from 'react';

type RatingItemProps = {
  number: number;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function RatingItem({ number, onInputChange }: RatingItemProps): React.ReactElement {
  return (
    <Fragment key={number}>
      <input
        data-testid='rating-item'
        key={`star-${number}`}
        onChange={onInputChange}
        className="rating__input"
        id={`star-${number}`}
        type="radio"
        name="rating"
        value={`${number}`}
      />
      <label
        className="rating__label"
        htmlFor={`star-${number}`}
      >
        Rating ${number}
      </label>
    </Fragment>
  );
}

export default RatingItem;
