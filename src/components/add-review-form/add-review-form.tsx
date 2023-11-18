import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';
import { postReview } from '@store/api-actions';
import RatingItem from '../rating-item/rating-item';

function AddReviewForm() {
  const id = String(useParams().id);
  const navigate = useNavigate();
  const [filmRating, setFilmRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) =>
    setFilmRating(Number(evt.target.value)), []);

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

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from({ length: 10 }, (_, i) => i + 1)
              .reverse()
              .map((number) => <RatingItem key={number} number={number} handleInputChange={handleInputChange} />)}
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
