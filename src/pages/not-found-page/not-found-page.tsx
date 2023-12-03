import { Link } from 'react-router-dom';
import { Fragment } from 'react';

function NotFoundPage(): JSX.Element {
  return (
    <Fragment>
      <h1>
        404. Page not found
      </h1>
      <Link to="/">Вернуться на главную</Link>
    </Fragment>
  );
}

export default NotFoundPage;
