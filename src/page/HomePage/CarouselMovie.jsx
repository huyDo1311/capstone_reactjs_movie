import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { movieService } from '../../service/movieService';

export default function CarouselMoive() {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 700,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'ease-in-out',
  };
  let renderCarousel = () => {
    return carousel?.map((item) => {
      console.log(item, 'hi');
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
      <Slider {...settings}>{renderCarousel()}</Slider>
    </div>
  );
}
