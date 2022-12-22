/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { editUser } from '../../store/userReducer/reducer';
// import { userOneStats, heroOneStats } from '../../store/gameReducer/reducer';
import './Settings.css';
import { formatTime } from '../functions';

function Settings() {
  const { user } = useSelector((state) => state.auth);
  const { oneStatistic, heroStats } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const editProfileForm = useRef();

  // useEffect((event) => {
  //   dispatch(userOneStats({ event, id: user.id }));
  // }, []);

  // useEffect((event) => {
  //   console.log('---->', event);
  //   dispatch(heroOneStats(event));
  // }, []);

  const onSubmit = useCallback(
    () => {
      // event.preventDefault();

      // dispatch(editUser(event));
    },
    [editProfileForm],
  );

  return (
    <div className="container__stats anim-show-profile flex">
      <div className="user__wrapper">
        <div className="user-profile">
          <img
            className="avatar"
            src="https://cdnn11.img.sputnik.by/img/07e5/07/06/1054427663_79:0:979:900_1920x0_80_0_0_7d61a9785aa88b97857d3414f37ba600.jpg"
            alt="Ash"
          />
          <div className="username">{user.name}</div>
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
        <div className="edit-user-profile nes-container is-rounded is-dark">
          <form className="edit-form" ref={editProfileForm} onSubmit={onSubmit}>
            <h3 className="edit-title">Изменить почту и пароль:</h3>
            <div className="edit-profile">
              <input
                required
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
                required
                autoComplete="off"
                name="password"
                type="password"
                placeholder="New password"
              />
            </div>
            <button type="submit" className="btn-2 nes-btn is-primary edit-btn">
              Изменить
            </button>
          </form>
        </div>
      </div>
      <div className="score__table">
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Уровень</h1>
              </th>
              <th>
                <h1>Очки</h1>
              </th>
              <th>
                <h1>Золото</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{heroStats.lvl}</td>
              <td>{heroStats.score}</td>
              {oneStatistic.map((el) => (
                <td>{el['Game.countMoney']}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Время в игре</h1>
              </th>
              <th>
                <h1>Убито врагов</h1>
              </th>
              <th>
                <h1>Нанесено урона</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {oneStatistic.map((el) => (
                <>
                  <td>{formatTime(el['Game.timeGame'])}</td>
                  <td>{el['Game.countEnemies']}</td>
                  <td>{el['Game.countDamage']}</td>
                </>
              ))}
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
