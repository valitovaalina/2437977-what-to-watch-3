import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Review } from '../types';
import { films } from '@mocks/films';

function AddReviewForm(): JSX.Element {
  const film = films[0];
  const [filmRating, setFilmRating] = useState(0);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [, setReviewForm] = useState<Review>({
    id: 0,
    text: '',
    author: '',
    date: '',
    rating: 0,
    filmId: film.id,
  });

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilmRating(Number(evt.target.value));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filmRating && textArea.current?.value) {
      const review: Review = {
        id: film.id,
        text: textArea.current.value,
        author: 'person',
        date: '2023-10-22',
        rating: filmRating,
        filmId: film.id,
      };
      setReviewForm(review);
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={submitHandler}>
        <div className="rating">
          <div className="rating__stars">
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              defaultValue={10}
            />
            <label className="rating__label" htmlFor="star-10">
              Rating 10
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              defaultValue={9}
            />
            <label className="rating__label" htmlFor="star-9">
              Rating 9
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              defaultValue={8}
              defaultChecked
            />
            <label className="rating__label" htmlFor="star-8">
              Rating 8
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              defaultValue={7}
            />
            <label className="rating__label" htmlFor="star-7">
              Rating 7
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              defaultValue={6}
            />
            <label className="rating__label" htmlFor="star-6">
              Rating 6
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              defaultValue={5}
            />
            <label className="rating__label" htmlFor="star-5">
              Rating 5
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              defaultValue={4}
            />
            <label className="rating__label" htmlFor="star-4">
              Rating 4
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              defaultValue={3}
            />
            <label className="rating__label" htmlFor="star-3">
              Rating 3
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              defaultValue={2}
            />
            <label className="rating__label" htmlFor="star-2">
              Rating 2
            </label>
            <input
              onChange={changeHandler}
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              defaultValue={1}
            />
            <label className="rating__label" htmlFor="star-1">
              Rating 1
            </label>
          </div>
        </div>
        <div className="add-review__text">
          <textarea
            ref={textArea}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            defaultValue=''
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
