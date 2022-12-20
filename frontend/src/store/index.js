import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer/authReducer';
import gameReducer from './gameReducer/gameReducer';
import heroReducer from './heroReducer/heroReducer';
// import settingsReducer from './settingsReducer/settingsReducer';
// import statisticsReducer from './statisticsReducer/statisticsReducer';

export default configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    hero: heroReducer,
    // settings: settingsReducer,
    // statistics: statisticsReducer,
  },
});
