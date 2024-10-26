import {http} from '../../src/service/config';
export let quanLyNguoiDungService = {
    layDanhSachUser: () => {
        return http.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP01");
    },
    xoaNguoiDung: (taiKhoan) => {
        return http.delete(`https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    },
    themNguoiDung: (dataForm) => {
        return http.post('/api/QuanLyNguoiDung/ThemNguoiDung',dataForm);
    }
}