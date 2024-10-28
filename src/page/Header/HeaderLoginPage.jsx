import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clickToChange } from "../../redux/userSlice";
export default function HeaderLoginPage() {
  //   const [truthy, setTruthy] = useState(false);
  const truthy = useSelector((state) => state.userSlice.truthy);
  const dispatch = useDispatch();
  console.log(truthy);
  let navigate = useNavigate();
  let handleClick = () => {
    navigate("/login");
    dispatch(clickToChange(1));
  };
  let renderHeaderLogin = () => {
    if (!truthy) {
      return (
        <div className="flex justify-between items-center mx-10">
          <img
            className="lg:w-44 md:w-36 w-28"
            src="
https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt=""
          />
          <div className="me-5">
            <div
              onClick={handleClick}
              className="bg-red-600 text-white w-20 text-xs font-medium text-center py-2 rounded cursor-pointer"
            >
              Đăng nhập
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className=" mx-10 ">
          <img
            className="lg:w-44 md:w-36 w-28"
            src="
https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt=""
          />
        </div>
      );
    }
  };
  return <div className="pt-5 ">{renderHeaderLogin()}</div>;
}
