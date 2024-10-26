import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {
  let user = useSelector((state) => state.userSlice.dataLogin);
  // console.log(user);
  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/login";
  };
  let renderMenu = () => {
    if (user) {
      return (
        <div className="mr-10">
          <strong className="text-xl mr-2">{user.hoTen}</strong>
          <button
            onClick={handleLogout}
            className="bg-white px-10 py-1 rounded border-2 text-red-600 border-red-600"
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
          <NavLink
            to="/login"
            className="text-white px-10 py-2 rounded border-2 bg-red-600"
          >
            Login
          </NavLink>
        </>
      );
    }
  };
  return (
    <div className="">
      <div className="container h-20 flex justify-end items-center">
        <div className="flex">{renderMenu()}</div>
      </div>
    </div>
  );
}
