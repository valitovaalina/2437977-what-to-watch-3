import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';
import { postReview } from '@store/api-actions';
import NotFoundPage from '@pages/not-found-page/not-found-page.tsx';

function AddReviewForm() {
  const id = String(useParams().id);
  const navigate = useNavigate();
  const [filmRating, setFilmRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const dispatch = useAppDispatch();
  if (!id) {
    return <NotFoundPage />;
  }
  const doOnSubmit = (rating: number, comment: string) => {
    dispatch(postReview({ filmId: id, rating, comment }));
    navigate(`/films/${id}`);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (filmRating && reviewContent) {
      doOnSubmit(filmRating, reviewContent);
    }
  };
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFilmRating(Number(evt.target.value));
  };
  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, i) => i + 1)
              .reverse()
              .map((number) => (
                <Fragment key={number}>
                  <input
                    key={`star-${number}`}
                    onChange={handleInputChange}
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
                </Fragment>))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            value={reviewContent}
            onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
              setReviewContent(evt.target.value);
            }}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            minLength={50}
            maxLength={400}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!filmRating || !reviewContent || reviewContent.length < 50 || reviewContent.length > 400}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
