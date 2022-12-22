/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars

// получить статистику игроков

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import {
  getPlayerStatsApi,
} from './ApiFunction';

const getPlayerStats = createAsyncThunk(
  'statistics/getPlayerStats',
  async (_, { rejectWithValue }) => getPlayerStatsApi(rejectWithValue, urlStore.getPlayerStats),
);

const userSlice = createSlice({
  name: 'statistics',
  initialState: {
    playerStats: [],
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
      console.log(action.payload);
      if (action.payload.statistics) {
        state.playerStats = action.payload.statistics;
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
