/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import './GameOver.css';

function GameOver({ playGame }) {
  const { gameStats } = useSelector((state) => state.game);

  return (
    <div className="gameOver">
      {playGame === 'game-over'
        ? (
          <h1>
            <span className="blue">GAME</span>
            {' '}
            <span className="yellow">OVER</span>
          </h1>
        )
        : (
          <h1>
            <span className="blue">YOU</span>
            {' '}
            <span className="yellow">WON!</span>
          </h1>
        )}
      <table className="container-rating">
        <thead>
          <tr>
            <th>
              <h1>Убито врагов</h1>
            </th>
            <th>
              <h1>{gameStats.killings}</h1>
            </th>
          </tr>
          <tr>
            <th>
              <h1>Золота добыто</h1>
            </th>
            <th>
              <h1>{gameStats.gold}</h1>
            </th>
          </tr>
          <tr>
            <th>
              <h1>Время игры</h1>
            </th>
            <th>
              <h1>{gameStats.gameTime}</h1>
            </th>
          </tr>
        </thead>
      </table>
      <a className="nes-btn is-warning" href="/">
        Вернуться в главное меню
      </a>
    </div>
  );
}

export default GameOver;
