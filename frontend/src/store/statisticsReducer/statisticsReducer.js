/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars

// получить статистику игроков

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import {

} from './ApiFunction';

const name = createAsyncThunk('auth/getCheckSession', async (_, { rejectWithValue }) => getCheckSessionApi(rejectWithValue, urlStore.checkSession));

const userSlice = createSlice({
  name: '',
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

export const { } = userSlice.actions;
export {

};
export default userSlice.reducer;
