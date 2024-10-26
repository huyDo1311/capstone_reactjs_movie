import React, { useEffect, useState } from 'react'
import { Button, Form, DatePicker, Select } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../service/quanLyRapService';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import {quanLyDatVeService} from '../../../service/quanLyDatVeService';



const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
];





export default function ShowTime(props) {

  let {id,tenphim} = useParams();

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: async (values) => {
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        alert(result.data.content);
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error)
        
      }
      
    }
  });


  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  });
  console.log("🚀 ~ ShowTime ~ state:", state);


  useEffect(async () => {
    try {
      let result = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content
      })
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);

    }
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const convertSelectHTR = () => {
   return state.heThongRapChieu?.map((item, index) =>
      ({ label: item.tenHeThongRap, value: item.maHeThongRap })
    )
  }

  const handleChangeHeThongRap = async (values,option) => {
    // console.log("🚀 ~ handleChangeHeThongRap ~ values:", values);
    try {
      let cumRapChieu = await quanLyRapService.layThongTinCumRapTheoHeThong(values);

      setState({
        ...state,
        cumRapChieu: cumRapChieu.data.content
      })

    } catch (error) {
      console.log("🚀 ~ handleChangeHeThongRap ~ error:", error)
      
    }

  }

  const handleChangeCumRap = (values) => {
    formik.setFieldValue('maRap',values);
  }

  const onOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    // console.log("🚀 ~ onOk ~ values:", moment(values).format('DD/MM/YYYY hh:mm:ss'));
  }

  const onChangeDate = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
  }

  const handleGiaVe = (values) => {
    formik.setFieldValue('giaVe',values);
  }

  let film = {};
  if(localStorage.getItem('filmParam')) {
    film = JSON.parse(localStorage.getItem('filmParam'));
  }
  return (
    <div className="">
      <h3 className='text-4xl mb-2'>Tạo lịch chiếu phim - {tenphim}</h3>
      <img className='my-3' src={film.hinhAnh} alt={film.tenPhim} width={200} height={100}/>
      <Form
        className='mt-5'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={formik.handleSubmit}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // autoComplete="off"
      >

        <Form.Item label="Hệ thống rạp">
          <Select className='w-10' options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select options={state.cumRapChieu?.map((item,index) => ({label:item.tenCumRap,value:item.maCumRap}))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
        </Form.Item>
        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker format={'DD/MM/YYYY hh:mm:ss'} showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber min={75000} max={150000} defaultValue={3} onChange={handleGiaVe} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
