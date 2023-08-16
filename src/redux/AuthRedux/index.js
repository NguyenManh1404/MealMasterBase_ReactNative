import {createSlice} from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: 'Nguyen Hung Manh',
  },
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
