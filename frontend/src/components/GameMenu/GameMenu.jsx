import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserLogOut } from '../../store/authReducer/authReducer';
import './GameMenu.css';

function GameMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(getUserLogOut());
  }, []);
  return (
    <nav className="anim-show-gamemenu">
      <ul className="game-menu nes-container is-rounded is-dark with-title">
        {user ? (
          <>
            <li>
              <Link to="/game" className="lists__items">
                Начать игру
              </Link>
            </li>
            <li>
              <Link to="/hero-up" className="lists__items">
                Герой
              </Link>
            </li>
            <li>
              <Link to="/settings" className="lists__items">
                Настройки профиля
              </Link>
            </li>
            <li>
              <Link to="/chat" className="lists__items">
                Войти в чат
              </Link>
            </li>
            <li>
              <Link to="/statistics" className="lists__items">
                Рейтинг игроков
              </Link>
            </li>
            <li>
              <Link to="/log" onClick={onClick} className="lists__items">
                Сменить пользователя
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/log" className="lists__items">
                Войти
              </Link>
            </li>
            <li>
              <Link to="/reg" className="lists__items">
                Зарегистрироваться
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default GameMenu;
