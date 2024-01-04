import { configureStore } from '@reduxjs/toolkit';
import matchDataReducer from './features/matchDataSlice';
import characterReducer from './features/characterSlice';
import settingReducer from './features/settingSlice';

export const core = configureStore({
  reducer: {
    matchData: matchDataReducer,
    character: characterReducer,
    setting: settingReducer,
  },
});
