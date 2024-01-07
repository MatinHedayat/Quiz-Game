import { createSlice } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

const { getLocalStorage } = useLocalStorage();
const initialState = getLocalStorage('history') || [];

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.push(action.payload);
    },

    removeHistory: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    clearHistory: (state, action) => [],
  },
});

export default historySlice.reducer;
export const { addHistory, removeHistory, clearHistory } = historySlice.actions;
