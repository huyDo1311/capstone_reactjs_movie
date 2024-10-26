import {http} from './config';


export let quanLyRapService = {
    layThongTinHeThongRap: () => {
        return http.get("/api/QuanLyRap/LayThongTinHeThongRap");
    },
    layThongTinCumRapTheoHeThong: (maHeThongRap) => {
        return http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    },
    layThongTinLichChieuHeThongRap: () => {
        return http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
    },
    layThongTinLichChieuPhim: (maPhim) => {
        return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`);
    },
}