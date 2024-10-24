import { Button, Dropdown, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { movieService } from "../../service/movieService";

export default function Header() {
  const user = useSelector((state) => state.userSlice.dataLogin);

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };

  // State management
  const [storeData, setStoreData] = useState([]);
  const [storeIdCinema, setStoreIdCinema] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Fetch movie list
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((res) => {
        setMovie(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const optionMovie = () => {
    return movie.map((phim) => ({
      value: phim.maPhim,
      label: phim.tenPhim,
    }));
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
  const optionCinema = () => {
    return (
      cinema.heThongRapChieu?.map((cinema) => ({
        value: cinema.maHeThongRap,
        label: cinema.cumRapChieu.map((item) => item.tenCumRap),
      })) || []
    );
  };

  const optionTime = () => {
    return (
      storeData.flatMap((item) =>
        item.lichChieuPhim.map((item2) => ({
          value: item2.maLichChieu,
          label: item2.ngayChieuGioChieu,
        }))
      ) || []
    );
  };

  const handleChangeMovie = (idPhim) => {
    setSelectedMovie(idPhim);
    setSelectedCinema(null); // Reset cinema
    setSelectedTime(null); // Reset time

    movieService
      .layChiTietCumRap(idPhim)
      .then((response) => {
        setCinema(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeCinema = (id) => {
    const selectedCinema = cinema.heThongRapChieu.find(
      (item) => item.maHeThongRap === id
    );

    if (selectedCinema) {
      setStoreData(selectedCinema.cumRapChieu);
      setStoreIdCinema(id);
      setSelectedCinema(id);
      setSelectedTime(null); // Reset time
    } else {
      console.log("No match found for id:", id);
    }
  };

  const handleChangeTime = (id) => {
    setSelectedTime(id);
    console.log(id, "Selected time ID");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderMenu = () => (
    <div className="h-20 flex items-center justify-between">
      <div className="flex">
        <NavLink to="/home" className="text-2xl font-bold text-red-600">
          <img
            className="w-20"
            src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
            alt="Netflix Logo"
          />
        </NavLink>
        <nav className="ms-10">
          <a className="text-white text-xs px-2" href="#">
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
        <Button type="primary" onClick={showModal}>
          <i className="fa fa-search text-white text-xl"></i>
        </Button>
        <i className="fa fa-bell text-white text-xl mx-6"></i>
        <Modal
          title="Chọn Phim, Rạp và Giờ Chiếu"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Select
            value={selectedMovie || "Phim"}
            style={{ width: 140 }}
            onChange={handleChangeMovie}
            options={optionMovie()}
          />
          <Select
            className="mx-3"
            value={selectedCinema || "Rạp"}
            style={{ width: 140 }}
            onChange={handleChangeCinema}
            options={optionCinema()}
          />
          <Select
            value={selectedTime || "Giờ chiếu"}
            style={{ width: 140 }}
            onChange={handleChangeTime}
            options={optionTime()}
          />
        </Modal>
        <div>
          <Space className="group" direction="vertical">
            <Dropdown menu={{ items }} placement="bottom">
              <div className="flex items-center">
                <img
                  className="rounded me-1"
                  src="https://occ-0-58-395.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABeuqjuQsRgqEDlibtJTI5BMf8IxhLlLOeIT6xI4TL57mqv7XHja43gx02S8pZVe8JNGRQXjnrUk1VcsTXqi83tFKPI6OR3k.png?r=bd7"
                  alt=""
                />
                <i className="fa fa-sort-down text-white text-sm w-5 text-center group-hover:rotate-180 transition duration-500"></i>
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>
    </div>
  );

  return <div className="container mx-auto">{renderMenu()}</div>;
}
