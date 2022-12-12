import { configureStore } from '@reduxjs/toolkit';
// import gameReducer from './game/reducer';
import userReducer from './userReducer/userReducer';

export default configureStore({
  reducer: {
    // game: gameReducer,
    user: userReducer,
  },
});
