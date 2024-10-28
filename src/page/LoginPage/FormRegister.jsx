import React from "react";
import { Button, Form, Input, message } from "antd";
import { clickToChange, setUserAction } from "../../redux/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { http } from "../../service/config";
import { useDispatch } from "react-redux";

export default function FormRegister() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinishRegister = (values) => {
    // console.log("Success:", values);

    http
      .post("/api/QuanLyNguoiDung/DangKy", values)
      .then((result) => {
        message.info("Register success");
        setTimeout(() => {
          dispatch(clickToChange(1));
        }, 1000);
      })
      .catch((err) => {
        message.info("Register fail");
        console.log("err", err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("Login failed");
  };
  return (
    <div>
      {" "}
      <div
        className="text-center w-96 mx-auto"
        style={{ height: "550px", backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="p-14">
          <p className="text-left text-white text-3xl mb-8">Đăng Ký</p>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinishRegister}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // layout="vertical"
          >
            <Form.Item
              noStyle
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-xs">Vui lòng nhập họ tên</span>
                  ),
                },
              ]}
            >
              <Input className="py-3" placeholder="Họ và tên" />
            </Form.Item>
            <div className="my-6">
              <Form.Item
                noStyle
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: (
                      <span className="text-xs">
                        Vui lòng nhập email hợp lệ.
                      </span>
                    ),
                  },
                ]}
              >
                <Input className="py-3" placeholder="Email" />
              </Form.Item>
            </div>
            <Form.Item
              noStyle
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-xs">
                      Vui lòng nhập tên tài khoản hợp lệ
                    </span>
                  ),
                },
              ]}
            >
              <Input className="py-3" placeholder="Tài khoản" />
            </Form.Item>

            <div className="my-5">
              <Form.Item
                noStyle
                name="matKhau"
                rules={[
                  {
                    type: "string",
                    required: true,
                    message: (
                      <span className="text-xs">Vui lòng nhập mật khẩu</span>
                    ),
                  },
                ]}
              >
                <Input className="py-3" placeholder="Mật khẩu" />
              </Form.Item>
            </div>

            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="Đăng ký"
              className="bg-red-600 text-white mb-5 "
            >
              Đăng ký
            </Button>
          </Form>

          <span className="text-xs " style={{ color: "rgba(255,255,255,0.7)" }}>
            Bạn đã có tài khoản?{" "}
            <NavLink
              to="/login"
              onClick={() => {
                dispatch(clickToChange(1));
              }}
            >
              Đăng nhập ngay.
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}
