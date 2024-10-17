import React, { useEffect, useState } from 'react';
import { movieService } from '../../service/movieService';
import { Carousel } from 'antd';

export default function CarouselMoive() {
  let renderCarousel = () => {
    return carousel?.map((item) => {
      return (
        <div key={item.maBanner}>
          <img
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            src={item.hinhAnh}
            alt=""
          />
        </div>
      );
    });
  };

  const [carousel, setCarousel] = useState();
  useEffect(() => {
    movieService
      .takeCarousel()
      .then((res) => {
        console.log(res, 'trung phoc');
        setCarousel(res.data.content);
      })
      .catch((err) => {
        console.log(err, 'loi');
      });
  }, []);
  return (
    <div className="">
      <Carousel dots={false} autoplaySpeed={1500} autoplay>
        {renderCarousel()}
      </Carousel>
    </div>
  );
}
