import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => action.payload,
    setDefault: () => initialState,
  },
});

export const {setLanguage, setDefault} = appSlice.actions;
export default appSlice.reducer;
