import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './not-found-page';
import { render, screen } from '@testing-library/react';

describe('Non-existent page test', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
