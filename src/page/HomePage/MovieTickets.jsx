import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { useSelector } from "react-redux";
import { Card, Popover } from "antd";
import moment from "moment";

export default function MovieTickets() {
  let ticket = useSelector((state) => state.userSlice.dataTicket.movieTicket);
  // let cloneIsSelected = [];

  let isClicked = (tenGhe) => {
    let cloneDataTicket = { ...dataMovieTicket };
    cloneDataTicket.danhSachGhe.forEach((item) => {
      if (item.tenGhe === tenGhe) {
        let pushDaChon = { ...item, daChon: false };
        console.log(item.tenGhe);
        item.daChon = !item.daChon;
        console.log(item.daChon);
        if (item.daChon === true) {
          setIsSelected([...isSelected, "Ghế " + tenGhe + " , "]);
          console.log("clq jz", item.daChon);
          setDisplayPrice((price) => (price += item.giaVe));
        } else {
          setIsSelected((item) =>
            item.filter((ghe) => ghe !== "Ghế " + tenGhe + " , ")
          );
          setDisplayPrice((price) => (price -= item.giaVe));
        }
        console.log(isSelected, "hai hung");
      }
    });
    // setIsSelected(cloneIsSelected);
    setDataMovieTicket(cloneDataTicket);
    console.log(cloneDataTicket);
    console.log(dataMovieTicket);
  };
  let clickToUpdate = () => {};
  const [dataMovieTicket, setDataMovieTicket] = useState();
  const [isSelected, setIsSelected] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  let renderChair = () => {
    return dataMovieTicket?.danhSachGhe.map((chair) => {
      if (chair.loaiGhe == "Thuong") {
        if (chair.daDat === false) {
          return (
            <Popover content={chair.stt}>
              <button
                onClick={() => {
                  isClicked(chair.tenGhe);
                }}
                className=" hover:bg-white transition border  border-white flex items-center rounded "
                style={{
                  background: chair.daChon === true ? "#798645" : "#ef4444",
                }}
              >
                <div className="w-full flex justify-center ">
                  <img src="/assests/chairFalse.png" alt="" />
                </div>
              </button>
            </Popover>
          );
        } else {
          return (
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm">
              X
            </div>
          );
        }
      } else {
        if (chair.daDat === false) {
          return (
            <Popover content={chair.stt}>
              <button
                onClick={() => {
                  isClicked(chair.tenGhe);
                }}
                className="bg-black hover:bg-white transition border  border-red-500 flex items-center  rounded"
                style={{
                  border: chair.daChon === true ? "1px white solid" : "",

                  background: chair.daChon === true ? "#536493" : "",
                }}
              >
                <div className="w-full flex justify-center ">
                  <img src="/assests/chairTrue.png" alt="" />
                </div>
              </button>
            </Popover>
          );
        } else {
          return (
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm">
              X
            </div>
          );
        }
      }
    });
  };

  useEffect(() => {
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
      <div>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "repeat(16, minmax(0, 1fr)",
            height: "620px",
          }}
        >
          {renderChair()}
        </div>
        <div className="flex justify-center mt-5 items-center">
          <div
            className="flex justify-center mt-10 items-center"
            style={{ height: "100px" }}
          >
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center py-4 px-7 ">
              <p style={{ width: "15px" }}>X</p>
            </div>
            <p className="mx-5 text-center">Đã đặt</p>
          </div>
          <div
            className="flex justify-center mt-10 items-center"
            style={{ height: "100px" }}
          >
            <div className="bg-red-500 flex justify-center border rounded  py-5 px-7">
              <img width="16px" src="/assests/chairFalse.png" alt="" />
            </div>
            <p className="mx-5 text-center">Thường</p>
          </div>
          <div
            className="flex justify-center mt-10 items-center"
            style={{ height: "100px" }}
          >
            <div className=" flex justify-center border border-red-500  rounded  py-5 px-7">
              <img width="16px" src="/assests/chairTrue.png" alt="" />
            </div>
            <p className="mx-5 text-center">Vip</p>
          </div>
        </div>
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
            <p className="max-w-80">{isSelected}</p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-between">
            <p
              className="black text-xl font-medium 
            
            "
              style={{ color: "rgb(20,20,20)" }}
            >
              Giá:
            </p>
            <p className="text-lg">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(displayPrice)}
            </p>
          </div>
          <hr className="my-6 border-black" />

          <div className="flex justify-center mt-3">
            <button
              onClick={clickToUpdate}
              className="py-2 px-20 rounded bg-black text-white hover:scale-125 transition"
            >
              Đặt vé
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
