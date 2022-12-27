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

const userSlice = createSlice({
  name: 'statistics',
  initialState: {
    messageHistory: [],
  },
  reducers: {
    getMessageHistory(state, action) {
      state.messageHistory = action.payload.allMessage;
    },
    getNewMessage(state, action) {
      state.messageHistory = [...state.messageHistory, action.payload.newMessage];
    },
  },

  extraReducers: {
  },
});

export const { getMessageHistory, getNewMessage } = userSlice.actions;
export {
  // getPlayersStats,
};
export default userSlice.reducer;
