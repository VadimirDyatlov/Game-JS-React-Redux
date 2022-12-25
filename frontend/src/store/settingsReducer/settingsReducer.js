/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars

// получить статистику игрока
// изменить пароль, имя
// *аватар

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import {
  getPlayerStatsApi, editUserDataApi,
} from './ApiFunction';

const getPlayerStats = createAsyncThunk(
  'settings/getPlayerStats',
  async (_, { rejectWithValue }) => getPlayerStatsApi(rejectWithValue, urlStore.getPlayerStats),
);

const editUserData = createAsyncThunk(
  'settings/editUserData',
  async (data, { rejectWithValue }) => editUserDataApi(rejectWithValue, data, urlStore.editUserData),
);

const userSlice = createSlice({
  name: 'settings',
  initialState: {
    user: {},
    playerStats: [{
      gamesPlayed: 0,
      killings: 0,
      gold: 0,
      time: 0,
    }],
  },
  reducers: {


  },

  extraReducers: {
    [getPlayerStats.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getPlayerStats.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.playerStats.length > 0) {
        state.playerStats = action.payload.playerStats;
      }
    },
    [getPlayerStats.rejected]: (state, action) => {
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

// export const { } = userSlice.actions;
export {
  getPlayerStats,
};
export default userSlice.reducer;
