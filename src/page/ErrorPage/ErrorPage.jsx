import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="bg-black  ps-6">
        <img
          className="w-24"
          src="
https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
      </div>
      <div className="relative">
        <img
          className="w-full "
          src="https://assets.nflxext.com/ffe/siteui/pages/errors/bg-mindhunter-v2.png"
          alt=""
        />
        <div className="absolute top-1/3 right-1/3">
          <p className="text-6xl font-semibold ">Xin lỗi vì sự gián đoạn</p>
          <p className="text-5xl font-semibold text-center my-4 text-red-500 ">
            404
          </p>
          <p className="text-xl text-center">Không thể tìm thấy trang</p>
          <div className="flex justify-center mt-5">
            <button
              onClick={() => {
                navigate("/home");
              }}
              className="bg-white px-4 py-2 rounded border-2 border-gray-500 hover:bg-red-600 hover:text-white hover:border-black transition "
            >
              Trang chủ Netflix
            </button>
          </div>
          <div className="">
            <div className="text-gray-400 font-thin text-3xl  w-1/2 border-l border-red-500 mx-auto text-center mt-6">
              Mã lỗi :
              <span className="text-white ms-1 font-semibold">ADN-032</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
