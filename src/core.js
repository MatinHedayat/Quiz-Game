import { configureStore } from '@reduxjs/toolkit';
import matchDataReducer from './features/matchDataSlice';
import historyReducer from './features/historySlice';
import characterReducer from './features/characterSlice';
import settingReducer from './features/settingSlice';

export const core = configureStore({
  reducer: {
    matchData: matchDataReducer,
    history: historyReducer,
    character: characterReducer,
    setting: settingReducer,
  },
});
