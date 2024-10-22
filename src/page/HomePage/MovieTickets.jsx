import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { useSelector } from "react-redux";
import { Card } from "antd";
import moment from "moment";

export default function MovieTickets() {
  let ticket = useSelector((state) => state.userSlice.dataTicket);
  let isClicked = (chair) => {
    setChairName(chair);
  };
  const [chairName, setChairName] = useState(null);
  const [dataMovieTicket, setDataMovieTicket] = useState();

  let renderChair = () => {
    return dataMovieTicket?.danhSachGhe.map((chair) => {
      return chair.loaiGhe == "Thuong" ? (
        <button
          tabindex={chair.stt}
          key={chair.stt}
          onClick={() => {
            isClicked(chair.tenGhe);
          }}
          className="bg-red-500 hover:bg-white transition border  border-white flex items-center rounded focus:bg-green-700 "
          // style={{ background: chairName === chair.stt ? "#DAD4B5 " : "" }}
        >
          <div className="w-full flex justify-center ">
            <img src="/assests/chairFalse.png" alt="" />
          </div>
        </button>
      ) : (
        <button
          key={chair.stt}
          className="bg-black hover:bg-white transition border  border-red-500 flex items-center  rounded focus:bg-slate-300"
        >
          <div className="w-full flex justify-center ">
            <img src="/assests/chairTrue.png" alt="" />
          </div>
        </button>
      );
    });
  };

  useEffect(() => {
    console.log(ticket);
    movieService
      .layChiTietVe(ticket.id)
      .then((res) => {
        setDataMovieTicket(res.data.content);
        console.log(res, "lay dc");
      })
      .catch((err) => {
        console.log(err, "khong lay duoc");
      });
  }, []);

  return (
    <div className="grid grid-cols-2   ">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr)" }}
      >
        {renderChair()}
      </div>
      <div>
        <Card
          bordered={false}
          cover={
            <div
              className="flex justify-center py-6 px-10   "
              style={{ background: "rgb(20,20,20)" }}
            >
              <img
                className="w-24"
                src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
                alt=""
              />
            </div>
          }
          className="m-auto  bg-red-500 border-2"
          style={{ width: 600 }}
        >
          <div className="flex justify-between">
            <p
              className=" text-lg font-medium"
              style={{ color: "rgb(20,20,20)" }}
            >
              Cụm rạp:
            </p>
            <p>{dataMovieTicket?.thongTinPhim.tenCumRap}</p>
          </div>
          <hr className="my-6 border-black   " />
          <div className="flex justify-between">
            <p
              className="black text-lg font-medium"
              style={{ color: "rgb(20,20,20)" }}
            >
              Địa chỉ:
            </p>
            <p>{dataMovieTicket?.thongTinPhim.diaChi}</p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-between">
            <p
              className="black text-lg font-medium 
            
            "
              style={{ color: "rgb(20,20,20)" }}
            >
              Rạp:
            </p>
            <p>{dataMovieTicket?.thongTinPhim.tenRap}</p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-between">
            <p
              className="black text-lg font-medium 
            
            "
              style={{ color: "rgb(20,20,20)" }}
            >
              Ngày giờ chiếu:
            </p>
            <p>{moment(ticket?.lichChieu).format("DD/MM/YYYY - HH:mm")}</p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-between">
            <p
              className="black text-lg font-medium 
            
            "
              style={{ color: "rgb(20,20,20)" }}
            >
              Tên Phim:
            </p>
            <p>{dataMovieTicket?.thongTinPhim.tenPhim}</p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-between">
            <p
              className="black text-lg font-medium 
            
            "
              style={{ color: "rgb(20,20,20)" }}
            >
              Chọn:
            </p>
            <p>hi</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
