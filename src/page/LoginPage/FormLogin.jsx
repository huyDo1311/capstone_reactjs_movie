import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { http } from "../../service/config";
import { useDispatch } from "react-redux";
import { clickToChange, setUserAction } from "../../redux/userSlice";
import { NavLink, useNavigate } from "react-router-dom";

export default function FormLogin() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Success:", values);

    http
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((result) => {
        // console.log("result", result.data.content);

        message.success("Login success");

        dispatch(setUserAction(result.data.content));
        console.log(result, "admin");
        let dataJson = JSON.stringify(result.data.content);

        localStorage.setItem("USER_LOGIN", dataJson);
        if (result.data.content.maLoaiNguoiDung == "QuanTri") {
          navigate("/admin");
        } else {
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      })
      .catch((err) => {
        message.info("Login fail");
        console.log("err", err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("Login failed");
  };

  return (
    <div>
      <div
        className="text-center w-96 mx-auto"
        style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="p-14">
          <p className="text-left text-white text-3xl mb-8">Đăng Nhập</p>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 300,
              margin: "auto",
            }}
            initialValues={{
              // remember: true,
              taiKhoan: "nhiNguvl",
              matKhau: "123",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // layout="vertical"
          >
            <Form.Item
              style={{ width: "410px" }}
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-xs">
                      Vui lòng nhập email hoặc số điện thoại hợp lệ.
                    </span>
                  ),
                },
              ]}
            >
              <Input className="py-3" />
            </Form.Item>

            <Form.Item
              style={{ width: "410px" }}
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-xs">
                      Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự.
                    </span>
                  ),
                },
              ]}
            >
              <Input.Password className="py-3" />
            </Form.Item>

            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="Đăng nhập"
              className="bg-red-600 text-white "
            >
              Đăng nhập
            </Button>
          </Form>
          <p
            style={{ color: "rgba(255,255,255,0.7)" }}
            className=" text-sm, my-3"
          >
            HOẶC
          </p>
          <Button
            style={{ width: "100%", background: "rgba(128,128,128,0.3)" }}
            className="bg-red-600 text-white border-transparent mb-2"
          >
            Sử dụng mã đăng nhập
          </Button>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            Bạn mới tham gia Netflix?{" "}
            <NavLink
              to="/register"
              onClick={() => {
                dispatch(clickToChange(2));
              }}
            >
              Đăng ký ngay.
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}
