import { createSlice } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

const { getLocalStorage } = useLocalStorage();
const initialState = getLocalStorage('matchData') || [];

const matchData = createSlice({
  name: 'matchData',
  initialState,
  reducers: {
    setMatchData: (state, action) => action.payload,

    updateMatchData: (state, { payload }) => {
      return state.map((item) =>
        item.id === state[payload.matchDataIndex].id
          ? item.selectedAnswer === payload.answer
            ? { ...item, selectedAnswer: '' }
            : { ...item, selectedAnswer: payload.answer }
          : item
      );
    },

    clearMatchData: (state, action) => [],
  },
});

export default matchData.reducer;
export const { setMatchData, updateMatchData, clearMatchData } =
  matchData.actions;
