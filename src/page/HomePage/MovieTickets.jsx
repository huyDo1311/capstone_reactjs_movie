import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { useSelector } from "react-redux";
import { Card, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingPage from "../../component/LoadingPage";
import moment from "moment";
export default function MovieTickets() {
  let ticket = useSelector((state) => state.userSlice.dataTicket.movieTicket);
  // let cloneIsSelected = [];
  let { id } = useParams();
  let navigate = useNavigate();
  let isClicked = (maGheNe, tenGhe) => {
    let cloneDataTicket = { ...dataMovieTicket };
    cloneDataTicket.danhSachGhe.forEach((item) => {
      if (item.maGhe === maGheNe) {
        let pushDaChon = { ...item, daChon: false };
        item.daChon = !item.daChon;
        console.log(item.daChon);
        if (item.daChon === true) {
          setIsSelected([...isSelected, "Ghế " + tenGhe + " , "]);
          setDisplayPrice((price) => (price += item.giaVe));
          let maVe = {
            maGhe: item.maGhe,
            giaVe: item.giaVe,
          };
          setDanhSachVe([...danhSachVe, maVe]);

          console.log(danhSachVe);
        } else {
          setIsSelected((item) =>
            item.filter((ghe) => ghe !== "Ghế " + tenGhe + " , ")
          );

          setDanhSachVe((ve) => ve.filter((item) => item.maGhe != maGheNe));
          setDisplayPrice((price) => (price -= item.giaVe));
        }
      }
    });
    setDataMovieTicket(cloneDataTicket);
  };

  let clickToUpdate = () => {
    console.log(bookTicket, "deo dc");
    if (isSelected.length <= 0 && danhSachVe <= 0) {
      message.info("bạn cần phải chọn ghế");
    } else {
      message.success("Đặt thành công");
      setIsBooking(true);

      setBookTicket({
        ...bookTicket,
        maLichChieu: dataMovieTicket.thongTinPhim.maLichChieu,
        danhSachVe: danhSachVe,
      });
    }
  };

  const [danhSachVe, setDanhSachVe] = useState([]);
  console.log(danhSachVe, "k phai tui");
  const [bookTicket, setBookTicket] = useState({});
  const [dataMovieTicket, setDataMovieTicket] = useState();
  const [isSelected, setIsSelected] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  let renderChair = () => {
    return dataMovieTicket?.danhSachGhe.map((chair) => {
      if (chair.loaiGhe == "Thuong") {
        if (!chair.daDat) {
          return (
            <button
              onClick={() => {
                isClicked(chair.maGhe, chair.tenGhe);
              }}
              className=" hover:bg-white transition border bg-red-600  border-white flex items-center rounded h-8 w-6  md:h-auto md:w-auto "
            >
              <div className="w-full flex justify-center text-xs">
                {" "}
                {chair.daChon === true ? (
                  <img src="/assets/chairFalse.png" alt="" />
                ) : (
                  chair.stt
                )}
              </div>
            </button>
          );
        } else {
          return (
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm h-8 w-6 md:h-auto md:w-auto">
              X
            </div>
          );
        }
      } else {
        if (!chair.daDat) {
          return (
            <button
              onClick={() => {
                isClicked(chair.maGhe, chair.tenGhe);
              }}
              className="bg-black hover:bg-white  transition border group border-red-500 flex items-center justify-center rounded h-8 w-6 md:h-auto md:w-auto"
              style={{
                border: chair.daChon && "1px white solid",
              }}
            >
              <div className=" flex justify-center text-white text-xs h-8 w-6 md:h-auto md:w-auto items-center">
                {chair.daChon === true ? (
                  <img src="/assets/chairTrue.png" alt="" />
                ) : (
                  <p className=" group-hover:text-black"> {chair.stt}</p>
                )}
              </div>
            </button>
          );
        } else {
          return (
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm  h-8 w-6  md:h-auto md:w-auto">
              X
            </div>
          );
        }
      }
    });
  };
  let handleTurnBack = () => {
    navigate(`/detail/${id}`);
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
    if (isBooking) {
      movieService
        .datVe(bookTicket)
        .then((res) => console.log(res, "em iu"))
        .catch((err) => console.log(err, "an l roi"))
        .finally(() => setIsBooking(false));
    }
  }, [bookTicket]);

  let coverTicket = () => {
    return (
      <div
        className="flex justify-between py-6 px-10   "
        style={{ background: "rgb(20,20,20)" }}
      >
        <div className="flex justify-between">
          <img
            className="w-24"
            src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
            alt=""
          />
          <img
            onClick={handleTurnBack}
            className="text-white  cursor-pointer hover:scale-125 transition"
            src="/assets/back-arrow.png"
            alt=""
          />
        </div>
      </div>
    );
  };
  return (
    <div>
      <LoadingPage />
      <div className="bg-black py-1 ps-6 flex justify-center">
        <img
          onClick={() => {
            navigate("/home");
          }}
          className="w-32 cursor-pointer"
          src="
https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 mt-5 ">
        <div className="mt-10">
          <div className="grid grid-cols-12  overflow-x-auto ">
            <div className=" col-span-2">
              {" "}
              <div className="md:mb-1 mb-5 text-white flex items-center justify-center   md:h-14 md:w-20">
                A
              </div>
              <div className="md:mb-1 mb-5 text-white flex items-center justify-center   md:h-14 md:w-20">
                B
              </div>
              <div className="md:mb-1 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                C
              </div>
              <div className="md:mb-2 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                D
              </div>
              <div className="md:mb-2 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                E
              </div>
              <div className="md:mb-1 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                F
              </div>
              <div className="md:mb-3 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                G
              </div>
              <div className="md:mb-2 mb-3 text-white flex items-center justify-center   md:h-14 md:w-20">
                H
              </div>
              <div className="md:mb-3 mb-4 text-white flex items-center justify-center   md:h-14 md:w-20">
                I
              </div>
              <div className="  text-white flex items-center justify-center   md:h-14 md:w-20">
                J
              </div>
            </div>
            <div
              className="grid gap-2 col-span-10 grid-cols-16 w-[700px]   "
              // style={{
              //   height: "620px",
              // }}
            >
              {renderChair()}
            </div>
          </div>
          <div className="flex space-x-6 items-center justify-center my-10">
            {/* Đã Đặt (Booked) */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center borderq ">
                <span className="text-white text-lg">X</span>
              </div>
              <p className="text-center text-sm mt-1">Đã đặt</p>
            </div>

            {/* Thường (Normal) */}
            <div className="flex flex-col  items-center">
              <div className="w-12 h-12 bg-red-500 rounded-md border"></div>
              <p className="text-center text-sm mt-1">Thường</p>
            </div>

            {/* Vip */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-black border border-red-500 rounded-md"></div>
              <p className="text-center text-sm mt-1">Vip</p>
            </div>
          </div>
        </div>
        <div>
          <Card
            bordered={false}
            cover={coverTicket()}
            className="m-auto  bg-red-500 border-2 w-10/12"
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
              <p className="max-w-72">{dataMovieTicket?.thongTinPhim.diaChi}</p>
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
              <p> {moment(ticket?.lichChieu).format("ddd, DD/MM - HH:mm")}</p>
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
              <motion.button
                onClick={clickToUpdate}
                className="py-2 px-20 rounded bg-black text-white "
                whileHover={{ scale: 1.1 }} // Scale up on hover
                whileTap={{ scale: 0.9 }} // Scale down on tap
                transition={{ type: "spring", stiffness: 400, damping: 10 }} // Spring animation
              >
                Đặt vé
              </motion.button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
