import React, { useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinhAction } from "../../../../redux/actions/quanLyPhimAction";
import moment from "moment/moment";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { quanLyPhimService } from "../../../../service/quanLyPhimService";

const { TextArea } = Input;

const AddNew = () => {
  // const [file, setFile] = useState(null); // Lưu file đã chọn
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState("");

  let fetchListMovie = () => {
    quanLyPhimService
      .layDanhSachPhim()
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result)

      })
      .catch((err) => {
        console.log("🚀 ~ fetchListUser ~ err:", err);
      });
  };

  const GROUPID = "GP01";

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
        console.log("🚀 ~ AddNew ~ values:", values);
        console.log("🚀 ~ formData:", formData.get("File"));
      }

      // dispatch(themPhimUpLoadHinhAction(formData));

      quanLyPhimService
      .themPhimUpLoadHinh(formData)
      .then((result) => {
        navigate("/admin/films");
        fetchListMovie();
        console.log("🚀 ~ .then ~ result:", result);
      })
      .catch((err) => {
        console.log("🚀 ~ onFinish ~ err:", err);
      });
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  return (
    <>
      <h3 className="text-4xl mb-5">Thêm phim mới</h3>

      <Form
        // onFinish={onFinish}
        onSubmitCapture={formik.handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Tên Phim"
          name="tenPhim"
          onChange={formik.handleChange}
          // rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Trailer"
          name="trailer"
          onChange={formik.handleChange}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="hinhAnh" onChange={handleChangeFile}>
          <Input type="file" />
          <br />
          <img style={{ width: 200, height: 200 }} src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Mô Tả" name="moTa" onChange={formik.handleChange}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Ngày Khởi Chiếu" >
          <DatePicker name="ngayKhoiChieu" onChange={handleChangeDatePicker} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Đánh Giá"
          name="danhGia"
          onChange={formik.handleChange}
          rules={[
            { type: "number", min: 1, max: 10, message: "Nhập từ 1-10!" },
          ]}
        >
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>

        <Form.Item label="Hot" name="hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>

        <Form.Item label="Đang Chiếu" name="dangChieu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>

        <Form.Item label="Sắp Chiếu" name="sapChieu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-blue-500 text-white p-2"
            type="submit"
            htmlType="submit"
          >
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
