import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isLightMode: true,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => action.payload,
    setDefault: () => initialState,
    setAppMode: (state, action) => {
      state.isLightMode = action.payload;
    },
  },
});

export const {setLanguage, setDefault, setAppMode} = appSlice.actions;
export default appSlice.reducer;
