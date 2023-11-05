import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/app/app';
import { films } from '@mocks/films';
import { store } from './store';

const Setting = {
  filmCardTitle: 'The Grand Budapest Hotel',
  filmCardGenre: 'Drama',
  filmCardYear: 2014
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App filmCardTitle={Setting.filmCardTitle} filmCardGenre={Setting.filmCardGenre} filmCardYear={Setting.filmCardYear} films={films} />
    </Provider>
  </React.StrictMode>
);
