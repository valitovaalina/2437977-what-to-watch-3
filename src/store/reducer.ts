import { combineReducers } from '@reduxjs/toolkit';

import { mainReducer } from './main-reducer';
import { filmReducer } from './film-reducer';
import { userReducer } from './user-reducer';
import { Reducer } from '@components/consts';

const reducer = combineReducers({
  [Reducer.FILM_REDUCER]: filmReducer.reducer,
  [Reducer.MAIN_REDUCER]: mainReducer.reducer,
  [Reducer.USER_REDUCER]: userReducer.reducer,
});

export { reducer };
