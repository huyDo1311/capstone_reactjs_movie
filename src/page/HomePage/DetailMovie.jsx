import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../../service/movieService';
import { Divider } from 'antd';
import moment from 'moment/moment';

export default function DetailMovie() {
  let { id } = useParams();

  const [detailMovies, setDetailMovies] = useState();

  useEffect(() => {
    movieService
      .layChiTietPhim(id)
      .then((res) => {
        console.log(res.data.content, 'dung roi em');
        setDetailMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err, 'sai roi em');
      });
  }, []);

  return (
    <div className="mx-10">
      <p className="text-3xl text-red-600 my-5">Nội dung phim</p>
      <Divider
        style={{
          borderColor: 'red',
        }}
      ></Divider>
      <div className="flex">
        <div className="border-r-2 border-red-600" style={{ width: '270px' }}>
          <img className="w-56 rounded" src={detailMovies?.hinhAnh} alt="" />
        </div>
        <div className="ms-5">
          <p className="font-bold text-xl ">{detailMovies?.tenPhim}</p>
          <p className="text-xs w-96 my-5">
            {' '}
            <span className="text-red-600 text-sm"> Mô tả </span>:{' '}
            {detailMovies?.moTa}
          </p>
          <div className="my-3">
            {' '}
            <span className="text-sm text-red-500">Lịch chiếu : </span>
            <span className="text-sm text-white">
              {moment(detailMovies?.ngayChieuGioChieu).format(
                'ddd, DD/MM - HH:mm',
              )}
            </span>
          </div>
          <div className="h-10 flex items-center">
            <span className="text-sm text-red-500">Trailer : </span>

            <a
              target="_blank"
              href={detailMovies?.trailer}
              className="ms-3 hover:scale-125 transition "
            >
              <i class="fa fa-play text-red-500 text-2xl "></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
