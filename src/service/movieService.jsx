import { http } from "./config";

export let movieService = {
  layDanhSachPhim: () => {
    return http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
};

export let adminService = {
  layDanhSachUser: () => {
    return http.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP01");
  },
};
