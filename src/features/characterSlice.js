import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('character')) || {
  username: '',
  avatar: 'avatars/1.jpg',
  isLogin: false,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    loginCharacter: (state, action) => action.payload,
    logoutCharacter: (state, action) => initialState,
  },
});

export default characterSlice.reducer;
export const { loginCharacter, logoutCharacter } = characterSlice.actions;
