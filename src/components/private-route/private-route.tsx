import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, Reducer } from '../consts';
import { useAppSelector } from '../hooks/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[Reducer.USER_REDUCER].authorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? props.children
      : <Navigate to={AppRoute.Signin} />
  );
}

export default PrivateRoute;
