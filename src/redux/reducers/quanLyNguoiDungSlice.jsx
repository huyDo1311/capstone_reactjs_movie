import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../service/config';

export let getUserInfoActionService = createAsyncThunk('adminSlice/getUserInfoActionService',
    async () => {
        try {
            const result = await http.post("/api/QuanLyNguoiDung/LayThongTinNguoiDung");
            console.log('result', result);
            return result;
        } catch (error) {
            console.log("🚀 ~ error:", error)
        }
    }
)

const initialState = {
    acountInfo: []
}

const quanLyNguoiDungSlice = createSlice({
  name: 'quanLyNguoiDungSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfoActionService.fulfilled, (state,action) => {
        state.userInfo = action.payload;
    });
  }
});

// export const {} = adminSlice.actions

export default quanLyNguoiDungSlice.reducer

