import { http } from "./config";

export let movieService = {
  takeCarousel: () => {
    return http.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  layDanhSachPhim: () => {
    return http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  layChiTietPhim: (maPhim) => {
    return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  layChiTietCumRap: (maPhim) => {
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  },
  layChiTietVe: (maPhim) => {
    return http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPhim}`
    );
  },
  layHeThongRap: () => {
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`);
  },
  datVe: (ma) => {
    return http.post(`/api/QuanLyDatVe/DatVe=${ma}`);
  },
};
