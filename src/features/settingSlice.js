import { createSlice } from '@reduxjs/toolkit';
import categoryList from '../data/categoryList';
import difficultyList from '../data/difficultyList';
import useLocalStorage from '../hooks/useLocalStorage';

const { getLocalStorage } = useLocalStorage();
const getLocalStorageOfSetting = getLocalStorage('setting');

const initialState = {
  categories: getLocalStorageOfSetting?.categories || categoryList,
  difficulties: getLocalStorageOfSetting?.difficulties || difficultyList,
  numberOfQuestions: getLocalStorageOfSetting?.numberOfQuestions || 5,
  timer: getLocalStorageOfSetting?.timer || true,
  backBtn: getLocalStorageOfSetting?.backBtn || true,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeCategories: (state, action) => {
      state.categories = state.categories.map((item) =>
        item.title === action.payload.title
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
    },

    changeDifficulties: (state, action) => {
      state.difficulties = state.difficulties.map((item) =>
        item.title === action.payload.title
          ? { ...item, isSelected: !item.isSelected }
          : item
      );
    },

    changeNumberOfQuestions: (state, action) => {
      state.numberOfQuestions = action.payload;
    },

    changeTimer: (state, action) => {
      state.timer = action.payload;
    },

    changeBackBtn: (state, action) => {
      state.backBtn = action.payload;
    },

    resetSetting: () => {
      initialState
      localStorage.removeItem('setting');
    },
  },
});

export default settingSlice.reducer;
export const {
  changeCategories,
  changeDifficulties,
  changeNumberOfQuestions,
  changeTimer,
  changeBackBtn,
  resetSetting,
} = settingSlice.actions;
