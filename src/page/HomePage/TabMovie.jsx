import React, { useEffect, useState } from 'react';
import { movieService } from '../../service/movieService';
import { Tabs } from 'antd';
import moment from 'moment';

export default function TabMovie() {
  const [dataRap, setDataRap] = useState();
  useEffect(() => {
    movieService
      .layHeThongRap()
      .then((res) => {
        console.log(res.data.content, 'trung');
        setDataRap(res.data.content);
      })
      .catch((err) => {
        console.log(err, 'truot');
      });
  }, []);
  let ItemPhim = ({ phim }) => {
    return (
      <div className="flex space-x-3 mt-5 ">
        <img className="w-32" src={phim.hinhAnh} alt="" />
        <div>
          <p>{phim.tenPhim}</p>
          <div className="grid grid-cols-3 gap-3">
            {phim.lstLichChieuTheoPhim.slice(0, 6).map((item, index) => {
              return (
                <span
                  key={index}
                  className="text-white cursor-pointer rounded border-2  p-2"
                >
                  {moment(item.ngayChieuGioChieu).format('ddd, DD/MM - HH:mm')}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderCumRap = (cumRap) => {
    return cumRap.map((item, index) => {
      return {
        key: index,
        label: (
          <div className="text-left" style={{ width: '350px' }}>
            <p className="truncate text-lg">{item.tenCumRap}</p>
            <p className="truncate text-base text-gray-500">{item.diaChi}</p>
          </div>
        ),
        children: (
          <div style={{ height: '500px' }} className="overflow-y-scroll">
            {item.danhSachPhim.map((phim) => {
              return <ItemPhim phim={phim} key={phim.maPhim} />;
            })}
          </div>
        ),
      };
    });
  };
  const renderLogo = () => {
    return dataRap?.map((item, index) => {
      return {
        key: index,
        label: <img width={60} src={item.logo} alt="" />,
        children: (
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            items={renderCumRap(item.lstCumRap)}
            style={{ height: '500px' }}
          />
        ),
      };
    });
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <p className="text-3xl font-bold text-center my-4">
        Các cụm rạp chiếu phim
      </p>

      <div className="m-10 ms-20">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={renderLogo()}
          onChange={onChange}
          style={{ height: '500px' }}
        />
      </div>
    </div>
  );
}
