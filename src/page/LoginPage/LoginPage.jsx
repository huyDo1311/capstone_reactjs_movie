import React from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import HeaderLoginPage from "../Header/HeaderLoginPage";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clickToChange } from "../../redux/userSlice";
export default function LoginPage() {
  const truthy = useSelector((state) => state.userSlice.truthy);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let login = () => {
    setTimeout(() => {
      navigate("/register");
      dispatch(clickToChange(2));
    }, 1000);
  };
  let renderLoginPage = () => {
    if (truthy === 1) {
      return (
        <>
          <FormLogin />
        </>
      );
    } else if (truthy === 2) {
      return (
        <>
          <FormRegister />
        </>
      );
    } else {
      return (
        <div className="max-w-lg text-center m-auto">
          <p className="text-white text-5xl font-bold leading-snug">
            Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác
          </p>
          <p className="text-white text-xl font-medium">
            Giá từ 70.000 ₫. Hủy bất kỳ lúc nào.
          </p>
          <p className="text-white text-sm mt-6">
            Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư
            cách thành viên của bạn.
          </p>
          <button
            onClick={login}
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Bắt đầu <i class="fa fa-angle-right"></i>
          </button>
        </div>
      );
    }
  };
  return (
    <div id="LoginPage">
      <div className="overlay"></div>
      <div className="content relative z-10 w-screen h-screen">
        <HeaderLoginPage />
        <div className="h-2/3 flex items-center justify-center">
          {renderLoginPage()}
        </div>
      </div>
    </div>
  );
}
