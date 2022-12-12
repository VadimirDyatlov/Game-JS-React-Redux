/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line no-unused-vars
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import urlStore from '../urlStoreApi';

import {
  getCheckSessionApi, getUserSingUpApi, getUserSingInApi, getUserLogOutApi,
} from './ApiFunction';

const getCheckSession = createAsyncThunk(urlStore.checkSession, async (_, { rejectWithValue }) => getCheckSessionApi(rejectWithValue, urlStore.checkSession));
const getUserSingUp = createAsyncThunk(urlStore.authReg, async (data, { rejectWithValue }) => getUserSingUpApi(rejectWithValue, data, urlStore.authReg));
const getUserSingIn = createAsyncThunk(urlStore.authLog, async (data, { rejectWithValue }) => getUserSingInApi(rejectWithValue, data, urlStore.authLog));
const getUserLogOut = createAsyncThunk(urlStore.authLogOut, async (_, { rejectWithValue }) => getUserLogOutApi(rejectWithValue, urlStore.authLogOut));

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    error: false,
    status: null,
  },
  reducers: {
    setError(state) {
      state.error = false;
    },
  },

  extraReducers: {
    // getCheckSession
    [getCheckSession.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getCheckSession.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    [getCheckSession.rejected]: (state, action) => {
      state.status = 'rejected';
      state.user = null;
      if (action.payload.message) {
        state.error = action.payload.message;
      }
    },
    // getUserSingUp
    [getUserSingUp.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getUserSingUp.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    [getUserSingUp.rejected]: (state, action) => {
      state.status = 'rejected';
      if (action.payload.message) {
        state.error = action.payload.message;
      }
    },
    // getUserSingIn
    [getUserSingIn.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getUserSingIn.fulfilled]: (state, action) => {
      state.status = 'resolved';
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    [getUserSingIn.rejected]: (state, action) => {
      state.status = 'rejected';
      if (action.payload.message) {
        state.error = action.payload.message;
      }
    },
    // getUserLogOut
    [getUserLogOut.pending]: (state) => {
      state.status = 'loading';
      state.error = false;
    },
    [getUserLogOut.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = null;
    },
    [getUserLogOut.rejected]: (state, action) => {
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

export const { setError } = userSlice.actions;
export {
  getCheckSession, getUserSingUp, getUserSingIn, getUserLogOut,
};
export default userSlice.reducer;
