import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { Button, Carousel, Modal } from "antd";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

export default function CarouselMoive() {
  let renderCarousel = () => {
    return carousel?.map((item, index) => {
      return (
        <div key={index} className="relative">
          <div key={item.maBanner}>
            <img
              className="w-full h-[600px] 2xl:h-[1000px] !object-cover"
              src={item.hinhAnh}
              alt=""
            />
          </div>

          <div>
            <button
              onClick={() => {
                clickToTurnOn(item.trailer);
              }}
              className="absolute top-1/2 right-1/2 opacity-30 hover:opacity-100 transition "
            >
              <i class="fa fa-play-circle text-8xl text-red-500 "></i>
            </button>
          </div>
        </div>
      );
    });
  };
  const trailer = ["uqJ9u7GSaYM", "Zw9lINmT-zc", "Eu9G8nO5-Ug"];
  let clickToTurnOn = (idTrailer) => {
    setIsDisPlay(true);
    setModal(idTrailer);
  };

  const [carousel, setCarousel] = useState();
  const [isDisPlay, setIsDisPlay] = useState(false);
  const [modal, setModal] = useState();
  useEffect(() => {
    movieService
      .takeCarousel()
      .then((res) => {
        let banner = res.data.content;
        let newArr = [];
        banner.forEach((objBanner, index) => {
          let dataTrailer = trailer[index];
          let cloneObjBanner = { ...objBanner, trailer: dataTrailer };
          newArr.push(cloneObjBanner);
        });
        setCarousel(newArr);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <div className="hidden md:!block ">
        <Carousel
          style={{ backgroundColor: "blue" }}
          arrows
          dots={false}
          autoplaySpeed={1500}
          autoplay
        >
          {renderCarousel()}
        </Carousel>
        <ModalVideo
          modalVideoClose
          isOpen={isDisPlay}
          onClose={() => {
            setIsDisPlay(false);
          }}
          channel="youtube"
          videoId={modal}
          autoplay
        />
      </div>
    </div>
  );
}
