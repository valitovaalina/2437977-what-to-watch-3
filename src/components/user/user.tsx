import React from 'react';
import { Link } from 'react-router-dom';

import { logOut } from '@store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AppRoute, AuthorizationStatus } from '../consts';
import { getAuthStatus, getAvatar } from '@store/user-reducer/user-selectors';

function User(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatar);
  const authorizationStatus = useAppSelector(getAuthStatus);

  const signOutClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logOut());
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link to={AppRoute.Signin} className='user-block__link'>Sign in</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatar || ''} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={signOutClickHandler}>Sign out</a>
      </li>
    </ul>
  );
}

export default User;
