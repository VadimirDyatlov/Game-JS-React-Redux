/* eslint-disable default-param-last */

/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const addData = createAsyncThunk(
  '/game',
  async () => {
    const data = await fetch('/game');
    const req = await data.json();
    return req.str;
  },
);

const dataSlice = createSlice({
  name: 'Game',
  gameState: {
    data: [1, 2, 3],
  },
  reducers: {
    getData(state, action) {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [addData.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [addData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = [...state.data, action.payload];
    },
  },
});

export default dataSlice.reducer;
