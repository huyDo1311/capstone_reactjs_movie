import { Button, Dropdown, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  let user = useSelector((state) => state.userSlice.dataLogin);
  // console.log('user', user);
  let navigate = useNavigate();

  let handleLogout = () => {
    localStorage.removeItem('USER_LOGIN');
    window.location.href = '/';
    // navigate("/login")
  };
  const items = [
    {
      key: '1',
      label: (
        <span className="text-white" onClick={handleLogout}>
          Đăng xuất ra khỏi Netflix
        </span>
      ),
    },
  ];

  let renderMenu = () => {
    return (
      <div className="h-20 flex items-center justify-between">
        <div className="flex">
          <NavLink to="/" className="text-2xl font-blod text-red-600">
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
          <i class="fa fa-search text-white text-xl"></i>
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
  return <div className="container mx-auto">{renderMenu()}</div>;
}
