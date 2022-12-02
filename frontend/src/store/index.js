import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/reducer';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
