import React from "react";

export default function FooterMobile() {
  return (
    <div>
      {" "}
      <div className="flex mt-10 mx-5">
        <div>
          <div>
            <a href="#" className="text-white px-3 ">
              <i class="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="text-white px-3">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-white px-3">
              <i class="fab fa-twitter text-xl"> </i>
            </a>
            <a href="#" className="text-white px-3">
              <i class="fab fa-youtube text-xl"> </i>
            </a>
          </div>
          <nav className="flex justify-between mt-3">
            <div className="text-xs ">
              <p className=" text-gray-500 py-2">Mô tả âm thanh</p>
              <p className=" text-gray-500 py-2">Quan hệ với nhà đầu tư</p>
              <p className=" text-gray-500 py-2">Thông báo pháp lý</p>
              <p className="text-gray-500 py-2">Trung tâm trợ giúp</p>
              <p className="text-gray-500 py-2">Việc làm</p>
              <p className="text-gray-500 py-2">Tuỳ chọn cookie</p>
            </div>

            <div className="text-xs ms-14">
              <p className="text-gray-500 py-2">Thẻ quà tặng</p>
              <p className="text-gray-500 py-2">Điều khoản sử dụng</p>
              <p className="text-gray-500 py-2">Thông tin doanh nghiệp</p>
              <p className="text-gray-500 py-2">Trung tâm đa phương tiện </p>
              <p className="text-gray-500 py-2">Quyền riêng tư </p>
              <p className="text-gray-500 py-2">Liên hệ với chúng tôi </p>
            </div>
          </nav>
          <div className="mt-5">
            <p className="border border-gray-500 text-gray-500 w-20 text-xs text-center py-2 mb-5">
              Mã dịch vụ
            </p>
            <p className="text-gray-500  text-xs ">
              "© 1997-2024 Netflix, Inc."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
