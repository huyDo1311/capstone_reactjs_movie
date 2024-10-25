import { Button, Dropdown, message, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { setTicket } from "../../redux/userSlice";
import moment from "moment";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector((state) => state.userSlice.dataLogin);
  // console.log('user', user);

  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };
  let optionMovie = () => {
    return movie?.slice(0, 18).map((phim) => {
      return {
        value: phim.maPhim,
        label: phim.tenPhim,
      };
    });
  };
  let optionCinema = () => {
    return cinema?.heThongRapChieu.map((cinema) => {
      return {
        value: cinema.maHeThongRap,
        label: cinema.cumRapChieu.map((item) => item.tenCumRap),
      };
    });
  };

  let optionTime = () => {
    console.log(storeData, " uoc gi giau");

    return storeData?.flatMap((item) => {
      console.log(item, "uoc gi gioi");

      return item.lichChieuPhim.map((schedule) => {
        return {
          value: schedule.maLichChieu,
          label: moment(schedule.ngayChieuGioChieu).format(
            "ddd, DD/MM - HH:mm"
          ),
        };
      });
    });
  };

  let handleChangeTime = (id, value) => {
    console.log(value, "value ne");
    setNgayChieuGioChieu(value.label);
    setSelectedTime(id);
    console.log(id, "duma may");
  };

  let handleChangeMovie = (idPhim) => {
    setSelectedMovie(idPhim);
    setSelectedCinema(null);
    setSelectedTime(null);
    console.log(idPhim, "maPhimNe");
    movieService
      .layChiTietCumRap(idPhim)
      .then((trung) => {
        console.log(trung.data.content, "tui ne");
        setCinema(trung.data.content);
      })
      .catch((trat) => {
        console.log(trat, "trat roi");
      });
    // valueMovieNe(idPhim);

    // movie?.map((phim) => {
    //   setValueMovie(phim.tenPhim)
    // })
  };
  let handleChangeCinema = (id) => {
    const selectCinema = cinema?.heThongRapChieu.find((item) => {
      return item.maHeThongRap === id; // Find the matching cinema
    });

    if (selectCinema) {
      console.log("Match found:", selectCinema);
      setSelectedCinema(id);
      setSelectedTime(null);
      setStoreData(selectCinema.cumRapChieu);
      console.log(storeData);
      return selectCinema;
    }
  };
  const items = [
    {
      key: "1",
      label: (
        <span className="text-white" onClick={handleLogout}>
          Đăng xuất ra khỏi Netflix
        </span>
      ),
    },
  ];
  const [storeData, setStoreData] = useState([]);
  const [movie, setMovie] = useState();
  const [cinema, setCinema] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((res) => {
        setMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err, "nay cua header");
      });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedTime && ngayChieuGioChieu) {
      dispatch(setTicket(selectedTime));
      let dataJson = JSON.stringify({
        id: selectedTime,
        lichChieu: ngayChieuGioChieu,
      });
      setIsModalOpen(false);

      localStorage.setItem("DATA_TICKET", dataJson);
      window.location.href = `/ticket-booking/${selectedMovie}`;
    } else {
      message.info("Bạn cần phải lựa chọn phim, rạp chiếu, và giờ chiếu");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let renderMenu = () => {
    return (
      <div className="h-20 flex items-center justify-between">
        <div className="flex">
          <NavLink to="/home" className="text-2xl font-blod text-red-600">
            <img
              className="w-20"
              src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
              alt=""
            />
          </NavLink>
          <nav className="ms-10">
            <a className="text-white text-xs px-2 " href="#">
              Trang chủ
            </a>
            <a className="text-white text-xs px-2" href="#">
              Phim T.hình
            </a>
            <a className="text-white text-xs px-2" href="#">
              Phim
            </a>
            <a className="text-white text-xs px-2" href="#">
              Mới & Phổ biến
            </a>
            <a className="text-white text-xs px-2" href="#">
              Danh sách của tôi
            </a>
            <a className="text-white text-xs px-2" href="#">
              Duyệt tìm ngôn ngữ
            </a>
          </nav>
        </div>
        <div className="flex">
          <div>
            <button onClick={showModal}>
              <i class="fa fa-search text-white text-xl hover:text-red-500 hover:scale-110 transition"></i>
            </button>
          </div>
          <i class="fa fa-bell text-white text-xl mx-6"></i>
          <Modal
            closeIcon={<p className="text-red-500">x</p>}
            keyboard
            className="flex justify-center"
            width={700}
            title={
              <p className="text-center text-xl ">Đặt vé xem phim nhanh</p>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <div className="my-5">
              {" "}
              <Select
                value={selectedMovie || "Phim"}
                style={{
                  width: 205,
                }}
                onChange={handleChangeMovie}
                options={optionMovie()}
              />
              <Select
                className="mx-3"
                value={selectedCinema || "Rạp"}
                style={{
                  width: 205,
                }}
                // onChange={handleChange}
                onChange={handleChangeCinema}
                options={optionCinema()}
              />
              <Select
                value={selectedTime || "Giờ chiếu"}
                style={{
                  width: 205,
                }}
                onChange={handleChangeTime}
                options={optionTime()}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  className="w-20 "
                  src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
                  alt=""
                />
              </div>
              <button
                className="px-6 py-1 mt-3 font-normal bg-red-500 hover:bg-red-600 active:bg-slate-800 rounded border border-white"
                onClick={handleOk} // Add your own OK button if needed
              >
                Mua vé
              </button>
            </div>
          </Modal>
          <div>
            <Space className="group" direction="vertical">
              <Space>
                <Dropdown menu={{ items }} placement="bottom">
                  <div className="flex items-center">
                    <img
                      className="rounded me-1"
                      src="https://occ-0-58-395.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7"
                      alt=""
                    />
                    <i class="fa fa-sort-down  text-white text-sm w-5 text-center group-hover:rotate-180 transition duration-500"></i>
                  </div>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
      </div>
    );
  };
  return <div className="container mx-auto">{renderMenu()}</div>;
}
