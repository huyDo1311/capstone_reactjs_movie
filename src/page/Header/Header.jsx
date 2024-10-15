import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  let user = useSelector((state) => state.userSlice.dataLogin);
  // console.log('user', user);
  let navigate = useNavigate()  ;

  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href= "/login";
    // navigate("/login")
  }


  let renderMenu = () => {
    if(user){
      return (
        <>
          <strong className="text-xl mr-2">{user.hoTen}</strong>
          <button
            onClick={handleLogout}
            className="bg-white px-10 py-1 rounded border-2 text-red-600 border-red-600"
          >
            Logout
          </button>
        </>
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
    <div className="container mx-auto">
      <div className="container h-20 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-blod text-red-600">
          Cyber NetFlix
        </NavLink>
        <div className="flex">{renderMenu()}</div>
      </div>
    </div>
  );
}
