import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataBanner: [],
}

const adminSlice = createSlice({
  name: "adminSLice",
  initialState,
  reducers: {
    setBannerAction: (state,action) => {
        state.dataBanner = action.payload;
    },
    pushTrailerAction: (state,action) => {
        const {id, trailer} = action.payload;
        const index = state.dataBanner.find(item => item.id === id);
        if(index !== -1){
            state.dataBanner.push(...state,trailer[action.payload]);
        } else {
            console.log('khong tim thay phim');
        }
    },
  }
});

export const {setBannerAction} = adminSlice.actions

export default adminSlice.reducer