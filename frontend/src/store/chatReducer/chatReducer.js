/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars

// чат

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import {
  // getPlayersStatsApi,
} from './ApiFunction';

// const getPlayersStats = createAsyncThunk(
//   'statistics/getPlayerStats',
//   async (_, { rejectWithValue }) => getPlayersStatsApi(rejectWithValue, urlStore.getPlayersStats),
// );

const userSlice = createSlice({
  name: 'statistics',
  initialState: {

  },
  reducers: {


  },

  extraReducers: {
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
  // getPlayersStats,
};
export default userSlice.reducer;
