/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHeroApi, sendGameStatsApi } from './ApiFunction';
import urlStore from '../urlStoreApi';
import calcHero from './functions/calcHero';
import calcBullets from './functions/calcBullets';
import calcEnemies from './functions/calcEnemies';
import calcCollisionsEnemie from './functions/calcCollisionsEnemie';
import calcCollisionBullets from './functions/calcCollisionBullets';
import upGameLoop from './functions/upGameLoop';
import calcGoldCoin from './functions/calcGoldCoin';

// полуение героя +
// повышение лвл(всего 10 лвл) +
// отправить статистику раунда на сервер(золото, лвл, время) +
// сохранять в статистику выигрышь или проигрышь

const getHero = createAsyncThunk(
  'game/getHero',
  async (_, { rejectWithValue }) => getHeroApi(rejectWithValue, urlStore.getHero),
);
const sendGameStats = createAsyncThunk(
  'game/roundstats',
  async (data, { rejectWithValue }) => sendGameStatsApi(rejectWithValue, data, urlStore.sendRoundStats),
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    startHp: 0,
    gamePlay: {
      waves1: 7, // кол-во мобов
      waves1Count: 0,
      waves2: 10, // кол-во мобов
      waves2Count: 0,
      waves3: 12, // кол-во мобов
      waves3Count: 0,
      boss: 1,
      bossCount: 0,
      countWaves: 1,
    },
    gameStats: {
      // объект для сбора статистики за игру
      killings: 0,
      gold: 0,
      gameTime: 0,
    },
    hero: {
      x: 0, // горизонталь
      y: 500, // вертикаль
      w: 180, // высота
      h: 180, // ширина
      skin: '/animations/hero1.gif',
      move: 1,
      // speed: 5,
      // damage: 30,
      // hp: 1000,
      // weapon: ['trunk'],
      // ammunition: [
      //   {
      //     // боезапас
      //     trunk: 0,
      //   },
      // ],
    },
    statistic: [],
    oneStatistic: [],
    heroStats: [],
    enemies: [], // массив врагов
    enemies1: {
      type: 1,
      w: 120, // высота
      h: 120, // ширина
      x: 500, // горизонталь
      y: 300, // вертикаль
      hp: 100, // здоровье
      speed: 3, // скорость
      damage: 1, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie0move.gif',
      move: 1,
      xp: 26,
    },
    enemies2: {
      type: 2,
      w: 180, // высота
      h: 180, // ширина
      x: 600, // горизонталь
      y: 45, // вертикаль
      hp: 80, // здоровье
      speed: 4, // скорость
      damage: 0.8, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie1move.gif',
      move: 1,
      xp: 32,
    },
    enemies3: {
      type: 3,
      w: 200, // высота
      h: 200, // ширина
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 140, // здоровье
      speed: 4,
      damage: 0.5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie2move.gif',
      move: 1,
      xp: 48,
    },
    enemies4: {
      type: 4,
      w: 350, // высота
      h: 350, // ширина
      x: 400, // горизонталь
      y: 50, // вертикаль
      hp: 100, // здоровье
      speed: 1,
      damage: 1, // урон
      coolDown: 40, // скорость удара
      skin: '/animations/enemie3move.gif',
      move: 1,
      xp: 300,
    },
    // weapon: {
    //   // НЕ ИСПОЛЬЗУЕТСЯ
    //   name: 'trunk', // название
    //   damage: 20, // урон
    //   clip: 30, // обойма
    //   rateOfFire: 0.5, // скорострельность
    //   recharge: 1500, // время перезарядки
    // },
    gold: {
      id: 1,
      x: 50,
      y: 70,
      h: 50,
      w: 50,
      skin: '/animations/gold.gif',
    },
    golds: [],
    bullets: [], // массив пуль
    gameLoop: 0, // игровой цик
    display: {
      // размеры экрана юзера
      width: 0,
      height: 0,
    },
    backgroundPositionLeft: 0, // начальные координаты локации
    calcEnemiesFlag: false, // ии врагов
    calcEnemiesFlag1: false, // ии врагов
    column: {
      x: 600,
      y: 200,
      h: 300,
      w: 300,
      skin: '/img/column1.png',
    },
  },
  reducers: {
    gameOverTime(state, action) {
      state.gameStats.gameTime = action.payload.gameTime;
    },
    deleteAllGolds(state, action) {
      state.golds = [];
    },
    deleteAllEnemies(state, action) {
      state.enemies = [];
    },
    // логика движения игрока при смены локации чтобы он проходил в ворота
    updatePositionhero(state, action) {
      if (state.hero.y < 450) {
        if (state.hero.y !== 450) {
          state.hero.y += 5;
        }
      } else if (state.hero.y !== 600) {
        state.hero.y -= 5;
      }
    },
    // передвигаем бэкграунд при прохождении первой волны
    updateBackgroundWaves2(state, action) {
      if (state.backgroundPositionLeft > -2800) {
        state.backgroundPositionLeft -= 10;
        state.column.x -= 10;
      }
    },
    // передвигаем бэкграунд при прохождении второй волны
    updateBackgroundWaves3(state, action) {
      if (state.backgroundPositionLeft > -5800) {
        state.backgroundPositionLeft -= 10;
      }
    },
    // увеличиваем характеристики врагов
    // updateEnemies(state, action) {
    //   state.enemies.forEach((el) => {
    //     el.hp = +el.hp * 1.2;
    //     el.damage = +el.damage * 1.2;
    //     el.coolDown = +el.coolDown * 1.2;
    //   });
    // },
    // записывает координаты экрана юзера
    display(state, action) {
      state.display.height = action.payload.height;
      state.display.width = action.payload.width;
    },
    // обновлят игроавую волну
    updateWaves(state, action) {
      state.gamePlay.countWaves += 1;
    },
    updateFrame(state, action) {
      upGameLoop(state); // прибовляет 1 каждый цикл;
      calcEnemies(state, state.enemies, state.hero); // рассчитывает поведение мобов
      calcHero(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state, state.enemies, state.hero); // рассчит контакт героя и моба
      calcCollisionBullets(state, state.enemies); // рассчитывает контакт моба и пули
      calcGoldCoin(state, state.golds, state.hero);
    },
  },
  extraReducers: {
    [getHero.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getHero.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.hero) {
        state.hero = { ...state.hero, ...action.payload.hero };
      }
    },
    [getHero.rejected]: (state, action) => {
      state.status = 'rejected';
      if (action.payload.message) {
        state.error = action.payload.message;
      }
    },
  },
});

export const {
  gameOverTime,
  sendStartHp,
  display,
  updateFrame,
  updateWaves,
  updateEnemies,
  updateBackgroundWaves2,
  updateBackgroundWaves3,
  updatePositionhero,
  deleteAllEnemies,
  deleteAllGolds,
} = gameSlice.actions;

export { getHero, sendGameStats };

export default gameSlice.reducer;
