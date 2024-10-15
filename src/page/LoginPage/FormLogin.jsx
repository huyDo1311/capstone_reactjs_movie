import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { http } from "../../service/config";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

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

        let dataJson = JSON.stringify(result.data.content);

        localStorage.setItem("USER_LOGIN", dataJson);

        if (result.data.content.maLoaiNguoiDung == "QuanTri") {
          navigate("/list-user");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("Login failed");
  };

  return (
    <div className="text-center">
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
          taiKhoan: "admin1123",
          matKhau: "123321",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        // layout="vertical"
      >
        <Form.Item
          label="Username"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-white text-blue-700 border-blue-900"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
