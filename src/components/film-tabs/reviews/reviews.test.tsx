import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Reviews from './reviews';
import { takeTestReviews } from '@mocks/mocks';

describe('Component: Reviews', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const reviewItems = screen.getAllByTestId('review-item');
    const store = mockStore();
    const reviews = takeTestReviews();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Reviews reviews={reviews} />
        </MemoryRouter>
      </Provider>
    );

    expect(reviewItems.length).toBe(reviews.length);
  });
});
