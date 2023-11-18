import { State } from '@components/types';
import { Reducer } from '@components/consts';

export const getAvatar = (state: State) => state[Reducer.USER_REDUCER].avatar;
export const getAuthStatus = (state: State) => state[Reducer.USER_REDUCER].authorizationStatus;
