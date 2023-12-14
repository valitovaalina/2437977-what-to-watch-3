import { Provider } from 'react-redux';
import FilmList from './film-list';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { takeTestFilms } from '@components/mocks/mocks';

describe('Component: FilmList', () => {
  const mockStore = configureMockStore();

  it('should render correctly', () => {
    const store = mockStore();
    const testFilms = takeTestFilms();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmList films={testFilms} />
        </MemoryRouter>
      </Provider>
    );

    const cardsFilm = screen.getAllByTestId('film-card');

    expect(cardsFilm.length).toBe(testFilms.length);
  });
});
