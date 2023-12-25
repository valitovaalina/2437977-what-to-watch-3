import { render, screen } from '@testing-library/react';
import RatingItem from './rating-item';
import userEvent from '@testing-library/user-event';

describe('Component: RatingItem', () => {
  it('should render correctly', async () => {
    const mockInputChange = vi.fn();

    render(<RatingItem number={5} onInputChange={mockInputChange} />);
    await userEvent.click(screen.getByTestId('rating-item'));

    expect(mockInputChange).toHaveBeenCalled();
  });
});
