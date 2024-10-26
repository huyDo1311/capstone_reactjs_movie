import {http} from '../../src/service/config';
export let quanLyDatVeService = {
    taoLichChieu: (thongTinLichChieu) => {
        return http.post(`/api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu);
    },

   
}