import { createSlice } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

const { getLocalStorage } = useLocalStorage();
const initialState = getLocalStorage('character') || {
  username: '',
  avatar: 'avatars/1.jpg',
  isLogin: false,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    loginCharacter: (state, action) => action.payload,
    logoutCharacter: (state, action) => {
      initialState
      localStorage.removeItem('character');
    },
  },
});

export default characterSlice.reducer;
export const { loginCharacter, logoutCharacter } = characterSlice.actions;
