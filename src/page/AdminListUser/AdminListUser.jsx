import React, { useEffect, useState } from "react";
import { adminService } from "../../service/movieService";
import { Button, Space, Table, Tag } from "antd";

export default function AdminListUser() {
  const [listUser, setListUser] = useState();
  useEffect(() => {
    adminService
      .layDanhSachUser()
      .then((result) => {
        // console.log("result", result.data.content);
        setListUser(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // email: "AdminS@gmail.com"
  // hoTen: "Có ai ở đây không"
  // maLoaiNguoiDung: "KhachHang"
  // matKhau: "yurtal_tunalsos1"
  // soDT: "0323467891"
  // taiKhoan: "admin0002"

  let handleDelete = (taiKhoan) => {
    console.log("taiKhoan", taiKhoan);
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ho ten",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Loai nguoi dung",
      // dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (_, object) => {
        let color =
          object.maLoaiNguoiDung === "KhachHang" ? "geekblue" : "green";
        return (
          <Tag color={color} key={object.maLoaiNguoiDung}>
            {object.maLoaiNguoiDung.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Mat khau",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "So dien thoai",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Tai khoan",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Control",
      key: "action",
      render: (_, object) => {
        return (
          <div className="">
            <Button
              key={object.taiKhoan}
              className="bg-red-500"
              onClick={() => {
                handleDelete(object.taiKhoan);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      AdminListUser
      <Table dataSource={listUser} columns={columns} />
    </div>
  );
}
