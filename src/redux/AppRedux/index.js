import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isLightMode: true,
  userInfo: null,
  isAbleToGoHome: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setDefault: () => initialState,
    setAppMode: (state, action) => {
      state.isLightMode = action.payload;
    },
    setIsAbleToGoHome: (state, action) => {
      state.isAbleToGoHome = action.payload;
    },
  },
});

export const {setLanguage, setDefault, setAppMode, setIsAbleToGoHome} =
  appSlice.actions;
export default appSlice.reducer;
