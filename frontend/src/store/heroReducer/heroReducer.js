/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars

// получение персонажа +
// прокачка персонажа за золото +

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import { getHeroApi } from '../gameReducer/ApiFunction';
import { sendUpgradeSkillsApi } from './ApiFunction';

const getHeroUpgrade = createAsyncThunk('game/getHero', async (_, { rejectWithValue }) => getHeroApi(rejectWithValue, urlStore.getHero));
const sendUpgradeSkills = createAsyncThunk('hero/sendUpgradeSkills', async (data, { rejectWithValue }) => sendUpgradeSkillsApi(rejectWithValue, data, urlStore.sendUpgradeSkills));

const userSlice = createSlice({
  name: 'UpgradeHero',
  initialState: {
    UpgradeHeroValue: {
      hp: null,
      damage: null,
      speed: null,
    },
    upSkillsСonstants: {
      hpUpdateArray: [
        100, 110, 120, 132, 144, 157, 170, 184, 199, 213, 228, 243, 257, 271, 285, 300],
      damageUpdateArray: [8, 10, 13, 16, 20, 25, 29, 33, 37, 41, 45, 49, 52, 56, 59, 62],
      // speedUpdateArray: [16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      speedUpdateArray: [2, 3, 4, 5],
      hpStartPrice: 30,
      damageStartPrice: 40,
      speedStartPrice: 50,
      hpPriceCoefficient: 1.05,
      damagePriceCoefficient: 1.1,
      speedPriceCoefficient: 1.07,
    },
    UpgradeGold: null,
  },
  reducers: {
    getUserGold(state, action) {
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeHp(state, action) {
      state.UpgradeHeroValue.hp = action.payload.hp;
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeDamage(state, action) {
      state.UpgradeHeroValue.damage = action.payload.damage;
      state.UpgradeGold = action.payload.gold;
    },
    UpgradeSpeed(state, action) {
      state.UpgradeHeroValue.speed = action.payload.speed;
      state.UpgradeGold = action.payload.gold;
    },
  },

  extraReducers: {
    [getHeroUpgrade.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getHeroUpgrade.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.hero) {
        state.UpgradeHeroValue = { ...state.UpgradeHeroValue, ...action.payload.hero };
      }
    },
    [getHeroUpgrade.rejected]: (state, action) => {
      state.status = 'rejected';
      if (action.payload.message) {
        state.error = action.payload.message;
      }
    },
    // [.pending]: (state) => {
    //   state.status = 'loading';
    //   state.error = false;
    // },
    // [.fulfilled]: (state, action) => {
    //   state.status = 'resolved';
    //   if (action.payload.user) {
    //     state.user = action.payload.user;
    //   }
    // },
    // [.rejected]: (state, action) => {
    //   state.status = 'rejected';
    //   if (action.payload.message) {
    //     state.error = action.payload.message;
    //   }
    // },
  },
});

export const {
  UpgradeHp, UpgradeDamage, UpgradeSpeed, getUserGold,
} = userSlice.actions;
export {
  getHeroUpgrade, sendUpgradeSkills,
};
export default userSlice.reducer;
