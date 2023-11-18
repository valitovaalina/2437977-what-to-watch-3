import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { AppRoute, AuthorizationStatus } from '@components/consts';
import { useAppDispatch, useAppSelector } from '@components/hooks/hooks';
import { AuthData } from '@components/types';
import { logIn } from '@store/api-actions';
import Footer from '@components/footer/footer';
import { getAuthStatus } from '@store/user-reducer/user-selectors';

function SignInPage(): JSX.Element {
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const rePassword = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{2,}/;
  const reEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(logIn(authData));
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailField !== null && passwordField !== null && rePassword.test(passwordField) && reEmail.test(emailField)) {
      onSubmit({
        email: emailField,
        password: passwordField,
      });
    }
  };

  if (authStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Root);
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>Что посмотреть. Авторизуйтесь</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={emailField}
                onChange={(event) => setEmailField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={passwordField}
                onChange={(event) => setPasswordField(event.target.value)}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignInPage;
