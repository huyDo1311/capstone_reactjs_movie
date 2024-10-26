import React, { useEffect, useState } from "react";
import {
  Button,
  // Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import { useDispatch } from "react-redux";
import {
  layThongTinPhimAction,
  capNhatPhimUploadAction,
} from "../../../../redux/actions/quanLyPhimAction";
// import { message } from "antd";
import moment from "moment/moment";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { quanLyPhimService } from "../../../../service/quanLyPhimService";
import { useSelector } from "react-redux";
// import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
// import 'dayjs/locale/vi-vn';
// dayjs.locale('vi-vn');

const { TextArea } = Input;

const Edit = (props) => {
  // const [file, setFile] = useState(null); // Lưu file đã chọn
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  // console.log("🚀 ~ Edit ~ id:", id)
  const { thongTinPhimEdit } = useSelector((state) => state.quanLyPhimSlice);
  // console.log("🚀 ~ Edit ~ thongTinPhimEdit:", thongTinPhimEdit)

  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // quanLyPhimService
  //   .layThongTinPhim(param)
  //   .then((result) => {
  //     console.log("🚀 ~ quanLyPhimService.layThongTinPhim ~ result:", result);
  //   })
  //   .catch((err) => {
  //     console.log("🚀 ~ quanLyPhimService.layThongTinPhim ~ err:", err);
  //   });

  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhimEdit?.maPhim,
      tenPhim: thongTinPhimEdit?.tenPhim,
      trailer: thongTinPhimEdit?.trailer,
      moTa: thongTinPhimEdit?.moTa,
      ngayKhoiChieu: thongTinPhimEdit?.ngayKhoiChieu,
      dangChieu: thongTinPhimEdit?.dangChieu,
      sapChieu: thongTinPhimEdit?.sapChieu,
      hot: thongTinPhimEdit?.hot,
      danhGia: thongTinPhimEdit?.danhGia,
      hinhAnh: null,
      maNhom: "GP01",
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
      }
      dispatch(capNhatPhimUploadAction(formData));
      // console.log("values:", values);
      // console.log("🚀 ~ formData:", formData.get("File"));

      quanLyPhimService
        .capNhatPhimUpload(formData)
        .then((result) => {
          console.log("🚀 ~ .then ~ result:", result);
          navigate('/admin/films');
        })
        .catch((err) => {
          console.log("🚀 ~ Edit ~ err:", err)
          
        });
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
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
      <h3 className="text-4xl mb-5">Edit phim</h3>

      <Form
        // onFinish={onFinish}
        onSubmitCapture={formik.handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Tên Phim"

          // rules={[{ required: true, message: "Vui lòng nhập tên phim!" }]}
        >
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>

        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh" n>
          <Input type="file" ame="hinhAnh" onChange={handleChangeFile} />
          <br />
          <img
            style={{ width: 200, height: 200 }}
            src={imgSrc === "" ? thongTinPhimEdit.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>

        <Form.Item label="Mô Tả">
          <TextArea
            rows={4}
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>

        <Form.Item label="Ngày Khởi Chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            value={dayjs(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
          />
        </Form.Item>

        <Form.Item
          label="Đánh Giá"
          rules={[
            { type: "number", min: 1, max: 10, message: "Nhập từ 1-10!" },
          ]}
        >
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            min={1}
            max={10}
            name="danhGia"
            value={formik.values.danhGia}
          />
        </Form.Item>

        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            name="hot"
            onChange={handleChangeSwitch("hot")}
            defaultChecked={formik.values.hot}
          />
        </Form.Item>

        <Form.Item label="Đang Chiếu" valuePropName="checked">
          <Switch
            name="dangChieu"
            onChange={handleChangeSwitch("dangChieu")}
            defaultChecked={formik.values.dangChieu}
          />
        </Form.Item>

        <Form.Item label="Sắp Chiếu" valuePropName="checked">
          <Switch
            name="sapChieu"
            onChange={handleChangeSwitch("sapChieu")}
            vadefaultChecked={formik.values.sapChieu}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-blue-500 text-white p-2"
            type="submit"
            htmlType="submit"
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
