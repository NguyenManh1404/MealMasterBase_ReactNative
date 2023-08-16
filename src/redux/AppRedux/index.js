import {createSlice} from '@reduxjs/toolkit';
const appSlice = createSlice({
  name: 'app',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const {setUser, clearUser} = appSlice.actions;
export default appSlice.reducer;
