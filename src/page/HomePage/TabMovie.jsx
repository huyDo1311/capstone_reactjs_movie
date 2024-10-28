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
      <div className=" lg:flex lg:space-x-3 lg:mt-5 ">
        <img className="w-32 xl:w-64" src={phim.hinhAnh} alt="" />
        <div className="my-5  ">
          <p className="lg:text-left text-center xl:text-xl">{phim.tenPhim}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 gap-4 lg:mt-3">
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
                  className="text-white cursor-pointer rounded border-2 lg:p-2 xl:py-3 xl:px-9 hover:bg-red-600 transition active:bg-black hover:border-black"
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
          <div className="text-left" style={{ width: "350px" }}>
            <p className="truncate text-sm lg:text-lg xl:text-xl">
              {item.tenCumRap}
            </p>
            <p className="truncate text-base text-gray-500">{item.diaChi}</p>
          </div>
        ),
        children: (
          <div style={{ height: "500px" }} className="overflow-y-scroll ">
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
            style={{ height: "500px" }}
          />
        ),
      };
    });
  };

  return (
    <div className="md:!flex  flex-col items-center  hidden">
      <p className="text-3xl font-bold text-center my-4">
        Các cụm rạp chiếu phim
      </p>

      <div className="m-10 ms-20 w-4/5 justify-center flex">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={renderLogo()}
          className="w-4/5"
          style={{ height: "500p  x" }}
        />
      </div>
    </div>
  );
}
