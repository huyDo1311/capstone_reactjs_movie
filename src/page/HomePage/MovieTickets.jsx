import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingPage from "../../component/LoadingPage";
export default function MovieTickets() {
  let ticket = useSelector((state) => state.userSlice.dataTicket.movieTicket);
  // let cloneIsSelected = [];
  let { id } = useParams();
  console.log(id, "id ne");

  let navigate = useNavigate();
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
    console.log(dataMovieTicket, "dataMovieTicket ne");
  };
  let clickToUpdate = () => {};
  const [dataMovieTicket, setDataMovieTicket] = useState();
  const [isSelected, setIsSelected] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  let renderChair = () => {
    return dataMovieTicket?.danhSachGhe.map((chair) => {
      if (chair.loaiGhe == "Thuong") {
        if (!chair.daDat) {
          return (
            <button
              onClick={() => {
                isClicked(chair.tenGhe);
              }}
              className=" hover:bg-white transition border bg-red-600  border-white flex items-center rounded "
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
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm">
              X
            </div>
          );
        }
      } else {
        if (!chair.daDat) {
          return (
            <button
              onClick={() => {
                isClicked(chair.tenGhe);
              }}
              className="bg-black hover:bg-white  transition border group border-red-500 flex items-center  rounded"
              style={{
                border: chair.daChon && "1px white solid",
              }}
            >
              <div className="w-full flex justify-center text-white text-xs ">
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
            <div className="text-white bg-slate-600 rounded border flex justify-center items-center text-sm">
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
  }, []);
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

      <div className="grid grid-cols-2 mt-5 ">
        <div className="mt-10">
          <div className="grid grid-cols-10">
            <div>
              {" "}
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                A
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                B
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                C
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                D
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                E
              </div>
              <div className="mb-1 text-white flex items-center justify-center  h-14 w-20">
                F
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                G
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                H
              </div>
              <div className="mb-1 text-white flex items-center justify-center  h-14 w-20">
                I
              </div>
              <div className="mb-2 text-white flex items-center justify-center  h-14 w-20">
                J
              </div>
            </div>
            <div
              className="grid gap-2 col-span-9"
              style={{
                gridTemplateColumns: "repeat(16, minmax(0, 1fr)",
                height: "620px",
              }}
            >
              {renderChair()}
            </div>
          </div>
          <div className="flex justify-center mt-3 ">
            <div
              className="flex justify-center  items-center"
              style={{ height: "80px" }}
            >
              <div className="text-white bg-slate-600 rounded border flex justify-center items-center py-4 px-7 ">
                <p style={{ width: "15px" }}>X</p>
              </div>
              <p className="mx-5 text-center">Đã đặt</p>
            </div>
            <div
              className="flex justify-center  items-center"
              style={{ height: "80px" }}
            >
              <div className="bg-red-500 flex justify-center border rounded  py-5 px-7">
                <img width="16px" src="/assets/chairFalse.png" alt="" />
              </div>
              <p className="mx-5 text-center">Thường</p>
            </div>
            <div
              className="flex justify-center  items-center"
              style={{ height: "80px" }}
            >
              <div className=" flex justify-center border border-red-500  rounded  py-5 px-7">
                <img width="16px" src="/assets/chairTrue.png" alt="" />
              </div>
              <p className="mx-5 text-center">Vip</p>
            </div>
          </div>
        </div>
        <div>
          <Card
            bordered={false}
            cover={coverTicket()}
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
              <p>{ticket?.lichChieu}</p>
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
