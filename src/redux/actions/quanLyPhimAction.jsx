import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyPhimService } from "../../service/quanLyPhimService";
import moment from "moment/moment";
// import { http } from "../../service/config";

export let themPhimUpLoadHinhAction = createAsyncThunk(
  "themPhimUpLoadHinhAction",
  async (dataForm) => {
    try {
      let result = await quanLyPhimService.themPhimUpLoadHinh(dataForm);
      return result.data.content;
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);
export let layThongTinPhimAction = createAsyncThunk(
  "layThongTinPhimAction",
  async (maPhim) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);

       // Chuyển ngày từ chuỗi ISO thành định dạng 'DD/MM/YYYY'
       const ngayKhoiChieu = moment(result.data.content.ngayKhoiChieu).format("DD/MM/YYYY");

       let film = {
         ...result.data.content,
         ngayKhoiChieu, // Gán giá trị đã format
       };
 
       return film; // Trả về đối tượng film đã xử lýrả về film đã xử lý
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  }
);

export let capNhatPhimUploadAction  = createAsyncThunk(
    "layThongTinPhimAction",
    async (dataForm) => {
      try {
        const result = await quanLyPhimService.capNhatPhimUpload(dataForm);
        
   
         return result.data.content; // Trả về đối tượng film đã xử lýrả về film đã xử lý
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    }
  );
// export let xoaPhimAction  = createAsyncThunk(
//     "xoaPhimAction",
//     async (maPhim) => {
//       try {
//         const result = await quanLyPhimService.xoaPhim(maPhim);
        
//         alert("Xoá phim thành công");

        
   
//          return result.data.content; // Trả về đối tượng film đã xử lýrả về film đã xử lý
//       } catch (error) {
//         console.log("🚀 ~ error:", error);
//       }
//     }
//   );
