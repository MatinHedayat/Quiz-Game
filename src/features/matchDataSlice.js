import { createSlice } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

const { setLocalStorage, getLocalStorage } = useLocalStorage();
const initialState = getLocalStorage('matchData') || [];

const matchData = createSlice({
  name: 'matchData',
  initialState,
  reducers: {
    setMatchData: (state, action) => action.payload,
    ClearMatchData: (state, action) => [],
  },
});

export default matchData.reducer;
export const { setMatchData, ClearMatchData } = matchData.actions;
