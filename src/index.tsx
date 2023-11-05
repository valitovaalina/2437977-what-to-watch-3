import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/app/app';
import { store } from './store';
import { Setting } from '@components/consts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App filmCardTitle={Setting.filmCardTitle} filmCardGenre={Setting.filmCardGenre} filmCardYear={Setting.filmCardYear} />
    </Provider>
  </React.StrictMode>
);
