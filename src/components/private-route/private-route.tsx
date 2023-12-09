import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../consts';
import { useAppSelector } from '../hooks/hooks';
import { getAuthStatus } from '@store/user-reducer/user-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    authStatus === AuthorizationStatus.Auth
      ? props.children
      : <Navigate to={AppRoute.Signin} />
  );
}

export default PrivateRoute;
