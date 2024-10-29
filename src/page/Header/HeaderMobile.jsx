import { Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { onChangeToSearch } from "../../redux/listMovieSlice";

export default function HeaderMobile() {
  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
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

  let clickToSearch = () => {
    setRenderSearching(true);
  };
  const [renderSearching, setRenderSearching] = useState(false);
  const [storeDataToSea, setStoreDataToSea] = useState();
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => setShowInput((item) => !item);
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((res) => {
        setStoreDataToSea(res.data.content);
        console.log(res.data.content, "iu nhi");
      })
      .catch((err) => {
        console.log(err, "ghetNhi");
      });
  }, []);
  let dispatch = useDispatch();
  const handleToSearch = (event) => {
    dispatch(onChangeToSearch(event.target.value));
  };
  let renderMenu = () => {
    return (
      <div className="h-20 flex items-center justify-between mx-5">
        <div className="flex">
          <NavLink
            to="/home"
            className="text-4xl lg:text-2xl font-blod text-red-600 flex items-center"
          >
            <img
              className="w-24"
              src="https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png"
              alt=""
            />
          </NavLink>
          {/* <nav className="ms-10">
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
          </nav> */}
        </div>
        <div className="flex">
          <div>
            <button onClick={handleShowInput}>
              <i class="fa fa-search text-white text-xl hover:text-red-500 hover:scale-110 transition"></i>
            </button>
          </div>
          <i class="fa fa-bell text-white text-xl mx-6"></i>

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

  return (
    <div>
      <div className="container mx-auto">{renderMenu()}</div>
      <div className="flex justify-end">
        {showInput && (
          <motion.input
            onChange={handleToSearch}
            type="text"
            placeholder="Tìm kiếm phim"
            className="px-3 py-1 border rounded-md bg-black border-red-500 text-sm text-white"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </div>
    </div>
  );
}