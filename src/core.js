import { configureStore } from '@reduxjs/toolkit';
import matchDataReducer from './features/matchDataSlice';

export const core = configureStore({
  reducer: { matchData: matchDataReducer },
});
