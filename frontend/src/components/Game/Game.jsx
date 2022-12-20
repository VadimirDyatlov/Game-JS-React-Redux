/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import muzic from '../../sounds/Sound_15678.mp3';
import Hero from '../Hero/Hero';
import GameBar from '../GameBar/GameBar';
import Bullet from '../Bullet/Bullet';
import Enemy from '../Enemy/Enemy';
import GoldCoin from '../GoldCoin/GoldCoin';
import GameOver from '../GameOver/GameOver';
// import Column from '../Column/Column';
import './Game.css';
// import { sendMoney } from '../../store/userReducer/reducer';
import {
  getHero,
  display,
  updateFrame,
  sendGameStats,
  gameOverTime,
  // gameStartTime,
  // gameStopTime,
  // sendStatistic,
  // sendScoreLvl,
  updateWaves,
  // updateEnemies,
  updateBackgroundWaves2,
  updateBackgroundWaves3,
  updatePositionhero,
  deleteAllGolds,
} from '../../store/gameReducer/gameReducer';

function Game() {
  const dispatch = useDispatch();
  const gameRef = useRef();
  // const { user } = useSelector((state) => state.user);
  const {
    enemies,
    bullets,
    hero,
    // game,
    backgroundPositionLeft,
    golds,
    gamePlay,
    // startHp,
    gameStats,
  } = useSelector((state) => state.game);
  const [passageWaves, setPassageWaves] = useState(1);
  const [countWaves, setCountWaves] = useState(1);
  const [playGame, setPlayGame] = useState('play');
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [bullet, setBullet] = useState(false);
  // const [startTime, setStartTime] = useState(Date.now());
  const [timeBullet, seTimeBullet] = useState(Date.now());
  const [timeEnemy, setTimeEnemy] = useState(Date.now());
  const [shoot, setShoot] = useState(false);
  const [cordMouse, setCordMouse] = useState();
  const [cordMouseOver, setCordMouseOver] = useState();
  const [timeoutFlag, setTimeoutFlag] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);
  // ???
  // useEffect(() => {
  //   const mouseOverFunc = (event) => {
  //     setCordMouseOver([event.clientX - 36, event.clientY - 35]);
  //   };
  //   document.addEventListener('mouseover', mouseOverFunc);
  //   return () => {
  //     document.removeEventListener('mouseover', mouseOverFunc);
  //   };
  // }, [cordMouseOver]);

  useEffect(() => {
    dispatch(getHero());
    setGameStartTime(new Date().getTime());
    dispatch(
      display({
        width: gameRef.current.offsetWidth,
        height: gameRef.current.offsetHeight,
      }),
    );

    const mouseOverFunc = (event) => {
      setCordMouseOver([event.clientX - 36, event.clientY - 35]);
    };

    const mouseClickDown = (event) => {
      setShoot(true);
      setCordMouse([event.clientX - 36, event.clientY - 35]);
    };

    const mouseClickUp = (event) => {
      setShoot(false);
    };

    const keyDownFunc = (event) => {
      if (event.key === 'd') {
        setArrowRight(true);
      }
      if (event.key === 'a') {
        setArrowLeft(true);
      }
      if (event.key === 'w') {
        setArrowUp(true);
      }
      if (event.key === 's') {
        setArrowDown(true);
      }
      if (event.key === ' ') {
        setBullet(true);
      }
    };

    const keyUpFunc = (event) => {
      if (event.key === 'd') {
        setArrowRight(false);
      }
      if (event.key === 'a') {
        setArrowLeft(false);
      }
      if (event.key === 'w') {
        setArrowUp(false);
      }
      if (event.key === 's') {
        setArrowDown(false);
      }
      if (event.key === ' ') {
        setBullet(false);
      }
    };

    document.addEventListener('mouseover', mouseOverFunc);

    document.addEventListener('mousedown', mouseClickDown);
    document.addEventListener('mouseup', mouseClickUp);

    document.addEventListener('keydown', keyDownFunc);
    document.addEventListener('keyup', keyUpFunc);

    return () => {
      document.removeEventListener('mouseover', mouseOverFunc);
      document.removeEventListener('mousedown', mouseClickDown);
      document.removeEventListener('mouseup', mouseClickUp);
      document.removeEventListener('keydown', keyDownFunc);
      document.removeEventListener('keyup', keyUpFunc);
    };
  }, []);

  // главный
  useEffect(() => {
    const pressedButtons = [];
    const mouseCord = [];

    if (shoot) {
      if (Date.now() - timeBullet > 180) {
        mouseCord.push(cordMouse[0], cordMouse[1]);
        seTimeBullet(Date.now);
      }
    }

    if (arrowRight && playGame === 'play') {
      pressedButtons.push('d');
    }
    if (arrowLeft && playGame === 'play') {
      pressedButtons.push('a');
    }
    if (arrowUp && playGame === 'play') {
      pressedButtons.push('w');
    }
    if (arrowDown && playGame === 'play') {
      pressedButtons.push('s');
    }
    if (!arrowRight && !arrowLeft && !arrowUp && !arrowDown) {
      pressedButtons.push('stop');
    }
    // логика скорострельности
    if (bullet && playGame === 'play') {
      if (Date.now() - timeBullet > 30) {
        pressedButtons.push(' ');
        seTimeBullet(Date.now);
      }
    }
    // логика появления врагов
    if (Date.now() - timeEnemy > 700 && playGame === 'play') {
      pressedButtons.push('enemy');
      setTimeEnemy(Date.now());
    }

    // логика завершения игры
    if (hero.hp <= 0) {
      setPlayGame('game-over');
    }
    // логика смены волн врагов
    if (playGame === 'play') {
      if (gameStats.killings === gamePlay.waves1 && passageWaves === 1 && hero.x > 1050) {
        // меняет стейт для ожидание смены локации
        setPlayGame('waiting');
        // увеличевает волну
        dispatch(updateWaves());
        // увеличивает характеристики врагов
        // dispatch(updateEnemies());
        // стейт чтобы предотвартить заход в этот if каждыем 20 млск
        setPassageWaves(2);
      }

      if (
        gameStats.killings === gamePlay.waves2 + gamePlay.waves1
        && passageWaves === 2
        && hero.x > 1050
      ) {
        // меняет стейт для ожидание смены локации
        setPlayGame('waiting');
        // увеличевает волну
        dispatch(updateWaves());
        // увеличивает характеристики врагов
        // dispatch(updateEnemies());
        // стейт чтобы предотвартить заход в этот if каждыем 20 млск
        setPassageWaves(3);
      }
      // логика выгрыша
      if (
        gameStats.killings
        === gamePlay.waves2 + gamePlay.waves1 + gamePlay.waves3 + gamePlay.boss
      ) {
        setPlayGame('win');
      }
    }
    // главный диспатчэ
    dispatch(updateFrame({ hero: pressedButtons, mouseCord, cordMouseOver }));

    // логика для смены локации при прохождении первой волны
    if (playGame === 'waiting' && gamePlay.countWaves === 2) {
      dispatch(deleteAllGolds());
      // переходт на вторую локацию
      dispatch(updateBackgroundWaves2());
      // меняет позицию героя для прохождения в ворота
      dispatch(updatePositionhero());
      // когда анимация смены локации закончилась меням стейт снова на 'play'
      if (backgroundPositionLeft === -2800) {
        setPlayGame('play');
      }
    }
    // логика для смены локации при прохождении первой волны
    if (playGame === 'waiting' && gamePlay.countWaves === 3) {
      dispatch(deleteAllGolds());
      // переходт на третью локацию
      dispatch(updateBackgroundWaves3());
      // меняет позицию героя для прохождения в ворота
      dispatch(updatePositionhero());
      // когда анимация смены локации закончилась меням стейт снова на 'play'
      if (backgroundPositionLeft === -5800) {
        setPlayGame('play');
      }
    }
    // перерендриваем компонет каждые 20 млск при смене локации
    if (playGame === 'waiting') {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 20);
    }

    // перерендриваем компонет каждые 20 млск чтобы играть
    if (playGame === 'play') {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 20);
    }
  }, [timeoutFlag]);

  useEffect(() => {
    // логика завершения игры
    if (playGame === 'game-over' || playGame === 'win') {
      console.log('---> win');
      const gameStopTime = new Date().getTime();
      const gameTime = gameStopTime - gameStartTime;
      dispatch(gameOverTime({ gameTime }));
      dispatch(sendGameStats({
        heroStats: { lvl: hero.lvl, type: hero.type },
        gameStats: { ...gameStats, gameTime },
      }));
      // dispatch(
      //   sendMoney({ gameMoney: game.countMoney, userMoney: user.money }),
      // );
      // dispatch(
      //   sendStatistic({
      //     userId: game.userId,
      //     countEnemies: game.countEnemies,
      //     countDamage: game.countDamage,
      //     countWaves,
      //     timeGame: Math.floor(time),
      //     countMoney: game.countMoney,
      //   }),
      // );
      // dispatch(sendScoreLvl({ lvl: hero.lvl, score: hero.score }));
    }
  }, [playGame]);

  const restart = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        backgroundPosition: backgroundPositionLeft,
      }}
      className="game-back"

    >
      <div ref={gameRef} className="game">
        {playGame === 'play' && (
          <>
            <GameBar />
            <Hero />
            {/* <Column /> */}
            {bullets && bullets.map((el) => <Bullet key={el.id} bullet={el} />)}
            {enemies && enemies.map((el) => <Enemy key={el.id} enemy={el} />)}
            {golds && golds.map((el) => <GoldCoin key={el.id} coin={el} />)}
          </>
        )}
        {(playGame === 'game-over' || playGame === 'win') && <GameOver playGame={playGame} />}
        {playGame === 'waiting' && (
          <>
            <GameBar />
            <Hero />
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
