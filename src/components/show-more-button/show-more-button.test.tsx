import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

describe('Component: ShowMoreButton', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShowMoreButton />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
