import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Load test', () => {
  it('should render correctly', () => {
    render(<Loader />);

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
});
