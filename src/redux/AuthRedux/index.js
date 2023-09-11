import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userInfo: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const {setUser, clearUser, setToken} = authSlice.actions;
export default authSlice.reducer;
