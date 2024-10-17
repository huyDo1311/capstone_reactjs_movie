import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataLogin: localStorage.getItem('USER_LOGIN')
    ? JSON.parse(localStorage.getItem('USER_LOGIN'))
    : null,
  truthy: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.dataLogin = action.payload;
    },
    clickToChange: (state, action) => {
      state.truthy = action.payload;
    },
  },
});

export const { setUserAction, clickToChange } = userSlice.actions;

export default userSlice.reducer;
