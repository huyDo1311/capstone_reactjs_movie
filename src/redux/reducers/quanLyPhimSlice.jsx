import { createSlice } from "@reduxjs/toolkit";
import {layThongTinPhimAction, themPhimUpLoadHinhAction} from '../actions/quanLyPhimAction';

const initialState = {
  dataThemPhim: [],
  thongTinPhimEdit: {},
  capNhatPhimUpload: {},
};

const quanLyPhimSlice = createSlice({
  name: "quanLyPhimSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(themPhimUpLoadHinhAction.fulfilled, (state, action) => {
        state.dataThemPhim = action.payload;
      })
      .addCase(layThongTinPhimAction.fulfilled, (state, action) => {
        state.thongTinPhimEdit = action.payload;
      })
      // .addCase(capNhatPhimUploadAction.fulfilled, (state, action) => {
      //   state.capNhatPhimUpload = action.payload;
      // });
  },
});

// export const {} = quanLyPhimSlice.actions;

export default quanLyPhimSlice.reducer;
