import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
