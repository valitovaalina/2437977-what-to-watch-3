import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from '@components/app/app';
import { store } from './store';
import { Setting } from '@components/consts';
import { checkAuthAction, fetchFilms } from './store/api-actions';

store.dispatch(fetchFilms());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App filmCardTitle={Setting.filmCardTitle} filmCardGenre={Setting.filmCardGenre} filmCardYear={Setting.filmCardYear} />
    </Provider>
  </React.StrictMode>
);
