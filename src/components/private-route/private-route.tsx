import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../consts';

type PrivateRouteProps = {
  children: JSX.Element;
  authStatus: AuthorizationStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return (
    props.authStatus === AuthorizationStatus.Auth
      ? props.children
      : <Navigate to={AppRoute.Signin} />
  );
}

export default PrivateRoute;
