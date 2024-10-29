import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { Tabs } from "antd";
import moment from "moment";
import { setTicket } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

export default function TabMovie() {
  const dispatch = useDispatch();
  const [dataRap, setDataRap] = useState();
  useEffect(() => {
    movieService
      .layHeThongRap()
      .then((res) => {
        setDataRap(res.data.content);
      })
      .catch((err) => {});
  }, []);
  let handleBuyTicket = (dataMa, dataLichChieu, dataMaPhim) => {
    dispatch(setTicket({ id: dataMa, lichChieu: dataLichChieu }));
    let dataJson = JSON.stringify({ id: dataMa, lichChieu: dataLichChieu });
    localStorage.setItem("DATA_TICKET", dataJson);
    window.location.href = `/ticket-booking/${dataMaPhim}`;
  };
  let ItemPhim = ({ phim }) => {
    return (
      <div className=" lg:flex lg:flex-row lg:space-x-3 lg:mt-5 flex flex-col items-center w-full">
        <div className="w-32 2xl:w-64 flex items-center justify-center ">
          <img src={phim.hinhAnh} alt="" />
        </div>
        <div className="my-5  ">
          <p className="lg:text-left text-center xl:text-xl text-xl mb-2 text-red-500">
            {phim.tenPhim}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2 gap-4 lg:mt-3">
            {phim.lstLichChieuTheoPhim.slice(0, 6).map((item, index) => {
              return (
                <button
                  onClick={() => {
                    handleBuyTicket(
                      item.maLichChieu,
                      item.ngayChieuGioChieu,
                      phim.maPhim
                    );
                  }}
                  key={index}
                  className="text-white cursor-pointer rounded border-2 p-1 lg:p-2 2xl:py-3 2xl:px-9 hover:bg-red-600 transition active:bg-black hover:border-black"
                >
                  {moment(item.ngayChieuGioChieu).format("ddd, DD/MM ")}
                </button>
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
          <div className="text-left w-70">
            <p className="truncate text-sm lg:text-lg xl:text-xl">
              {item.tenCumRap}
            </p>
            <p className="truncate text-base text-gray-500">{item.diaChi}</p>
          </div>
        ),
        children: (
          <div className="overflow-y-scroll h-[700px] w-64  lg:w-80 xl:w-96">
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
        label: <img className="w-16 xl:w-24" src={item.logo} alt="" />,
        children: (
          <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            items={renderCumRap(item.lstCumRap)}
          />
        ),
      };
    });
  };

  return (
    <div className="md:!flex  flex-col xl:items-center  hidden">
      <p className="text-3xl font-bold text-center my-4">
        Các cụm rạp chiếu phim
      </p>

      <div className="xl:m-10 xl:ms-20 w-4/5 xl:justify-center flex">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={renderLogo()}
          className="w-4/5 h-4/5"
        />
      </div>
    </div>
  );
}
