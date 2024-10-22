import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLogin: localStorage.getItem("USER_LOGIN")
    ? JSON.parse(localStorage.getItem("USER_LOGIN"))
    : null,
  truthy: "",
  dataTicket: {
    id: "",
    lichChieu: "",
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.dataLogin = action.payload;
    },
    clickToChange: (state, action) => {
      state.truthy = action.payload;
    },
    setTicket: (state, action) => {
      state.dataTicket = { ...state.dataTicket, ...action.payload };
    },
  },
});

export const { setUserAction, clickToChange, setTicket } = userSlice.actions;

export default userSlice.reducer;
