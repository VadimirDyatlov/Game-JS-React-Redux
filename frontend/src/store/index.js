import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer/authReducer';
import gameReducer from './gameReducer/gameReducer';
import heroReducer from './upgradeReducer/upgradeReducer';
import settingsReducer from './settingsReducer/settingsReducer';
import statisticsReducer from './statisticsReducer/statisticsReducer';
import chatReducer from './chatReducer/chatReducer';

export default configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
    hero: heroReducer,
    settings: settingsReducer,
    statistics: statisticsReducer,
    chat: chatReducer,
  },
});
