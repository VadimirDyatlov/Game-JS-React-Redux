/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const {
    startHp, hero, gameStats, gamePlay, enemies,
  } = useSelector((state) => state.game);

  function getLvl(num) {
    const lvlStack = [180, 460, 790, 1220, 1810, 2600, 3920, 6380, 10000];
    if (num < 180) return 1;
    if (lvlStack[0] <= num && num < lvlStack[1]) return 2;
    if (lvlStack[1] <= num && num < lvlStack[2]) return 3;
    if (lvlStack[2] <= num && num < lvlStack[3]) return 4;
    if (lvlStack[3] <= num && num < lvlStack[4]) return 5;
    if (lvlStack[4] <= num && num < lvlStack[5]) return 6;
    if (lvlStack[5] <= num && num < lvlStack[6]) return 7;
    if (lvlStack[6] <= num && num < lvlStack[7]) return 8;
    if (lvlStack[8] <= num && num < lvlStack[9]) return 9;
    if (num > lvlStack[9]) return 10;
    return 0;
  }

  function findNum() {
    const proportinon = ((hero.hp / startHp));
    return proportinon;
  }

  return (
    <div className="nes-container is-dark with-title gamebar__wrapper">
      <div className="gamebar">
        <div className="gamebar__left">
          <p className="gamebar__progress__damage__number">
            hero hp:
            {Math.floor(hero.hp)}
          </p>
          <p className="gamebar__progress__damage__number">
            hero damage:
            {Math.floor(hero.damage)}
          </p>
          <p className="gamebar__progress__damage__number">
            hero speed:
            {hero.speed}
          </p>
        </div>
        <div className="gamebar__center">
          <div
            className="gamebar__progress__hp"
            style={{ width: `${(findNum() * 100)}%` }}
          >
            <p className="gamebar__progress__number">{`${Math.floor(hero.hp)}💔`}</p>
          </div>
          <p className="gamebar__progress__number">{`lvl: ${getLvl(hero.lvl)}`}</p>
          <p className="gamebar__progress__number">{`score: ${hero.lvl}`}</p>
        </div>
        <div className="gamebar__right">
          <p className="gamebar__progress__enemies__number">0</p>
          <p className="gamebar__progress__money__number">{`gold: ${gameStats.gold}`}</p>
          <p className="gamebar__progress__enemies__number">{`kill: ${gameStats.killings}`}</p>
        </div>
      </div>
    </div>
  );
}

export default GameBar;
