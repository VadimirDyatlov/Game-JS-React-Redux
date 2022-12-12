/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserSingUp, setError } from '../../store/userReducer/userReducer';
import './Register.css';

function setEventUser(event) {
  return {
    name: event.target.name.value,
    password: event.target.password.value,
    password2: event.target.password2.value,
  };
}

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const signInForm = useRef();
  // console.log(signInForm);
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log(event);
      console.log(signInForm);
      dispatch(getUserSingUp(setEventUser(event)));
    },
    [signInForm],
  );
  console.log('=>', user, '<=');
  console.log('e=>', error, '<=e');

  if (error !== false) {
    setInterval(() => {
      dispatch(setError());
    }, 3000);
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
    <div className="registr-box anim-show-signup nes-container is-rounded is-dark forms anim-show-singup">
      <h1>
        <span className="blue">LET&apos;S</span>
        {' '}
        <span className="yellow">PLAY!</span>
      </h1>
      <form className="form_login" autoComplete="off" ref={signInForm} onSubmit={onSubmit}>
        <div className="input-section nes-field">
          <i className="far" />
          <input
            required
            name="name"
            className="nes-input"
            type="text"
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
        <div className="input-section nes-field">
          <i className="fas" />
          <input
            name="password2"
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

export default Register;
