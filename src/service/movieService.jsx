import { http } from './config';

export let movieService = {
  takeCarousel: () => {
    return http.get('/api/QuanLyPhim/LayDanhSachBanner');
  },
  layDanhSachPhim: () => {
    return http.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
  },
  layChiTietPhim: (maPhim) => {
    return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
};
