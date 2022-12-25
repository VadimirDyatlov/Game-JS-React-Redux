/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerStats } from '../../store/settingsReducer/settingsReducer';
import { editUserData, setError } from '../../store/authReducer/authReducer';
import './Settings.css';
import { formatTime } from '../functions';

function Settings() {
  console.log('render');

  const { user, error } = useSelector((state) => state.auth);
  const { playerStats } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const editProfileForm = useRef();

  useEffect(() => {
    dispatch(getPlayerStats());
  }, []);

  // useEffect((event) => {
  //   console.log('---->', event);
  //   dispatch(heroOneStats(event));
  // }, []);

  if (error !== false) {
    setTimeout(() => {
      dispatch(setError());
    }, 6000);
  }

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(event.target);
      const userData = {
        name: event.target.name.value,
        password: event.target.password.value,
      };
      console.log(userData);
      dispatch(editUserData(userData));
    },
    [editProfileForm],
  );
  console.log(playerStats[0].gold, '<-----');
  return (
    <div className="container__stats anim-show-profile flex">
      <div className="user__wrapper">
        <div className="edit-user-profile nes-container is-rounded is-dark">
          <form className="edit-form" ref={editProfileForm} onSubmit={onSubmit}>
            <h3 className="edit-title">Изменить имя и пароль:</h3>
            <div className="edit-profile">
              <input
                // required
                autoComplete="off"
                name="name"
                type="name"
                placeholder="Name"
                defaultValue={user.name}
                className="edit__input"
              />
            </div>
            <div className="edit-profile">
              <input
                // required
                // autoComplete="off"
                name="password"
                type="password"
                placeholder="New password"
              />
            </div>
            <button type="submit" className="btn-2 nes-btn is-primary edit-btn">
              Изменить
            </button>
          </form>
          { error !== false && <div className="error_mes">{error}</div> }
        </div>
        <div className="user-profile">
          {user.avatar === 'false' ? <span className="avatarL"><h1 className="hsett">{user.name[0]}</h1></span>
            : (
              <>
                <img
                  className="avatar"
                  src="https://cdnn11.img.sputnik.by/img/07e5/07/06/1054427663_79:0:979:900_1920x0_80_0_0_7d61a9785aa88b97857d3414f37ba600.jpg"
                  alt="Ash"
                />
                <div className="username">{user.name}</div>
              </>
            )}
          <div className="edit-profile">
            <input
              required
              className="edit-avatar"
              name="file"
              type="file"
              defaultValue=""
              style={{
                color: 'transparent',
                width: '200px',
                marginTop: '20px',
              }}
            />
          </div>
        </div>
      </div>

      <div className="score__table">
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Games Played</h1>
              </th>
              <th>
                <h1>Killings</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{playerStats[0].gamesPlayed}</td>
              <td>{playerStats[0].killings}</td>
            </tr>
          </tbody>
        </table>
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Gold</h1>
              </th>
              <th>
                <h1>Time Game</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{playerStats[0].gold}</td>
              <td>{playerStats[0].time}</td>
            </tr>
          </tbody>
        </table>
        <div className="score-box-profile">
          <p className="score-profile" />
          <Link className="return-rating btn-back" to="/">
            &lt;&lt; НАЗАД
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
