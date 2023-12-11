import React from 'react';
import { Link } from 'react-router-dom';

import { logOut } from '@store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AppRoute, AuthorizationStatus } from '../consts';
import { getAuthStatus, getAvatar } from '@store/user-reducer/user-selectors';
import './user.css';

function User(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatar);
  const authStatus = useAppSelector(getAuthStatus);

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logOut());
  };

  if (authStatus !== AuthorizationStatus.Auth) {
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
        <div className="user-block__avatar" role='user-block-avatar'>
          <img src={avatar || ''} alt="User avatar"/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={handleSignOutClick}>Sign out</a>
      </li>
    </ul>
  );
}

export default User;
