import {http} from './config';


export let quanLyPhimService = {
    layDanhSachPhim: () => {
        return http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
    },
    themPhimUpLoadHinh: (formData) => {
        return http.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData);
    },
    layThongTinPhim: (maPhim) => {
        return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    },
    capNhatPhimUpload: (formData) => {
        return http.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData);
    },
    xoaPhim: (maPhim) => {
        return http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    },
    searchPhim: (value) => {
        return http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${value}`);
    },
}