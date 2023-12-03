import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from '@components/app/app';
import { store } from './store';
import { checkAuth, fetchFilms, fetchPromoFilm } from './store/api-actions';

store.dispatch(fetchFilms());
store.dispatch(checkAuth());
store.dispatch(fetchPromoFilm());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer />
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
