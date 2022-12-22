/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserSingIn, setError } from '../../store/authReducer/authReducer';
import './Login.css';

function setEventUser(event) {
  return {
    name: event.target.name.value,
    password: event.target.password.value,
  };
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const signInForm = useRef();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(getUserSingIn(setEventUser(event)));
    },
    [signInForm],
  );

  if (error !== false) {
    setTimeout(() => {
      dispatch(setError());
    }, 6000);
  }

  useEffect(
    () => {
      if (user && user.id) {
        navigate('/');
      }
    },
    [user],
  );

  return (
    <div className="login-box anim-show-singin nes-container is-rounded is-dark forms">
      <h1>
        <span className="blue">WELCOME</span>
        {' '}
        <span className="yellow">BACK!</span>
      </h1>
      <form className="form_login" autoComplete="off" ref={signInForm} onSubmit={onSubmit}>
        <div className="input-section nes-field">
          <i className="far" />
          <input
            required
            name="name"
            className="nes-input"
            type="name"
            placeholder="name"
            style={{ color: 'black' }}
          />
        </div>
        <div className="input-section nes-field">
          <i className="fas" />
          <input
            name="password"
            required
            className="nes-input"
            type="password"
            placeholder="Password"
            style={{ color: 'black' }}
          />
        </div>
        <button type="submit" className="nes-btn is-primary nes-up" id="login-btn">
          Войти
        </button>
        { error !== false && <div className="error_mes">{error}</div> }
      </form>
    </div>
  );
}

export default Login;
