/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPlayersStats } from '../../store/statisticsReducer/statisticsReducer';
import { formatTime } from '../functions';
import './Statistics.css';

function Statistics() {
  console.log('render');
  const { playerStats } = useSelector((state) => state.statistics);
  const [key, setKey] = useState('gamesPlayed');
  const [countIndex, setcountIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlayersStats());
  }, []);
  const handleClickSortStats = () => {
    const arr = ['killings', 'gold', 'time', 'gamesPlayed'];
    const maxIndex = arr.length - 1;
    setKey(arr[countIndex]);
    setcountIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  return (
    <div className="center anim-show-rating">
      <h1>
        <span className="blue">TOP</span>
        {' '}
        <span className="yellow">USERS</span>
      </h1>
      <div className="container">
        <table className="container-rating">
          <thead>
            <tr>
              <th className="first-th">
                <h1>№</h1>
              </th>
              <th>
                <h1>Player</h1>
              </th>
              <th>
                <h1>Games</h1>
              </th>
              <th>
                <h1>Killings</h1>
              </th>
              <th>
                <h1>Gold</h1>
              </th>
              <th>
                <h1>Time Game</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...playerStats].sort((a, b) => b[key] - a[key]).map((player, index) => (
              <tr key={player['User.id']}>
                <td className="first-td">{index + 1}</td>
                <td>{player['User.name']}</td>
                <td>{player.gamesPlayed}</td>
                <td>{player.killings}</td>
                <td>{player.gold}</td>
                <td>{formatTime(player.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleClickSortStats} type="button">
        {`sort-${key}`}
      </button>
      <div className="score-box-rating">
        <p className="score-rating" />
        <Link className="return-rating" to="/">
          &lt;&lt; НАЗАД
        </Link>
      </div>
    </div>
  );
}

export default Statistics;
