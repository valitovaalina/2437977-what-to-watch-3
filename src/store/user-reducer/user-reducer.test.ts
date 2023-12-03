import { AuthorizationStatus, LogInState } from '@components/consts';
import { userReducer } from './user-reducer';
import { UserState } from '@components/types';
import { checkAuth, logIn, logOut } from '../api-actions';

describe('UserReducer Slice', () => {
  const user = {
    avatarUrl: 'lol/kek',
    email: 'a@mail.ru',
    id: 1,
    name: 'Alina',
    token: 'wtw',
  };

  it('should return initial state with empty action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };
    const emptyAction = { type: '' };

    const result = userReducer.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };
    const emptyAction = { type: '' };

    const result = userReducer.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set "Auth" with "checkAuth.fulfilled" action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatar: user.avatarUrl,
      loginState: LogInState.NoError,
    };

    const result = userReducer.reducer(initialState, {
      type: checkAuth.fulfilled,
      payload: user,
    });

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuth.rejected" action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatar: null,
      loginState: LogInState.NoError,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };

    const result = userReducer.reducer(initialState, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "logIn.fulfilled" action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatar: user.avatarUrl,
      loginState: LogInState.NoError,
    };

    const result = userReducer.reducer(initialState,{
      type: logIn.fulfilled,
      payload: user,
    });

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "logOut.fulfilled" action', () => {
    const initialState: UserState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatar: user.avatarUrl,
      loginState: LogInState.NoError,
    };
    const expectedState: UserState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatar: null,
      loginState: LogInState.NoError,
    };

    const result = userReducer.reducer(initialState,{
      type: logOut.fulfilled,
      payload: user,
    });

    expect(result).toEqual(expectedState);
  });
});
