import React from 'react'
import { Select, Button, Row, Col } from 'antd';

const { Option } = Select;

export default function FilterFilm() {
  return (
    <div id="homeTool" className='container mx-auto'>
      <Row gutter={16}>
        <Col span={8}>
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            placeholder="Phim"
            onChange={(value) => console.log(value)} // Thay thế bằng logic của bạn
          >
            <Option value="" disabled>
              Phim
            </Option>
            <Option value="10530">Kẻ Độc Hành</Option>
            <Option value="10531">Nhà Bà Nữ</Option>
            <Option value="10532">Tăng tốc phía em</Option>
            <Option value="10533">Phim cực kì hay</Option>
            <Option value="10606">Nghề siêu dễ</Option>
            <Option value="10614">RỪNG SĂN NGƯỜI</Option>
            <Option value="10647">Black Adam</Option>
            <Option value="10649">Captain Marvel 2</Option>
            <Option value="10765">Iron Man 4</Option>
            <Option value="10766">Thor 5</Option>
            <Option value="10786">test11</Option>
            <Option value="10840">Detective Pikachu</Option>
            <Option value="10949">evfweagwagÁDASDASDAS</Option>
            <Option value="10952">TẤM VÉ ĐẾN THIÊN ĐƯỜNG</Option>
            <Option value="10953">TẤM VÉ ĐẾN THIÊN ĐƯỜNG</Option>
            <Option value="10984">Aquaman 1</Option>
            <Option value="10985">CÔ GÁI TỪ QUÁ KHỨ</Option>
            <Option value="10986">Black Adam</Option>
            <Option value="10987">Fantastic Beast</Option>
            <Option value="10988">Phim chữ B</Option>
            <Option value="10989">BỖNG DƯNG TRÚNG SỐ</Option>
            <Option value="11393">strinxg</Option>
            <Option value="11413">John Cena WWE</Option>
            <Option value="11530">Ngoi Den</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            placeholder="Rạp"
            onChange={(value) => console.log(value)} // Thay thế bằng logic của bạn
          >
            <Option value="" disabled>
              Rạp
            </Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            defaultValue=""
            style={{ width: '100%' }}
            placeholder="Ngày giờ chiếu"
            onChange={(value) => console.log(value)} // Thay thế bằng logic của bạn
          >
            <Option value="" disabled>
              Ngày giờ chiếu
            </Option>
          </Select>
        </Col>

        <Col span={4}>
          <Button
            type="primary"
            style={{ width: '100%' }}
            onClick={() => console.log('Mua vé ngay!')} // Thay thế bằng logic của bạn
          >
            MUA VÉ NGAY
          </Button>
        </Col>
      </Row>
    </div>
  )
}
