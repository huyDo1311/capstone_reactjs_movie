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
        <div className="lg:w-2/4 text-center m-auto">
          <div className="flex justify-center">
            <p className="text-white text-3xl lg:text-4xl md:text-4xl font-bold    w-full xl:w-2/3 2xl:w-2/3 2xl:text-5xl max-w-80 lg:max-w-full md:max-full   ">
              Chương trình truyền hình, phim không giới hạn và nhiều nội dung
              khác
            </p>
          </div>
          <p className="text-white text-xl font-medium md-my-5 my-4 lg:text-2xl">
            Giá từ 70.000 ₫. Hủy bất kỳ lúc nào.
          </p>
          <p className="text-white text-sm lg:text-xl mt-6 max-w-80 md:max-full lg:max-w-full ">
            Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư
            cách thành viên của bạn.
          </p>
          <button
            onClick={login}
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 xl:py-4 xl:px-7 rounded mt-4"
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
        <div className="lg:h-2/3 h-2/3 flex items-center justify-center">
          {renderLoginPage()}
        </div>
      </div>
    </div>
  );
}
