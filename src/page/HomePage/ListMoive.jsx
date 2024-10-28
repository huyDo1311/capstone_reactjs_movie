import React, { useEffect, useState } from "react";
import { movieService } from "../../service/movieService";
import { Button, Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import Paragraph from "antd/es/typography/Paragraph";
import moment from "moment";
import { setTicket } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { setMovies } from "../../redux/listMovieSlice";

export default function ListMovie() {
  let movies = useSelector((state) => state.listMovieSlice.movies);
  console.log(movies);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((res) => {
        dispatch(setMovies(res.data.content));
      })
      .catch((err) => {});
  }, []);
  let goToDetailPage = (maPhim) => {
    navigate(`/detail/${maPhim}`);
  };
  let renderMovies = () => {
    return movies?.map((item) => {
      return (
        <div key={item.maPhim} className="relative group">
          <Card
            style={{
              backgroundSize: "cover",
              border: "transparent 1px solid",
              backgroundImage: `url(${item.hinhAnh})`,
            }}
            className="hover:bg-blue-400 duration-300 rounded hover:scale-110 hover:z-10 md:h-32  xl:h-72 bg-center hidden md:!block"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-center p-2">
                <p className="text-sm font-semibold ">{item.tenPhim}</p>
                <Button
                  onClick={() => {
                    goToDetailPage(item.maPhim);
                  }}
                  type="circle"
                  className="text-red-500 border-x-red-600"
                >
                  <i class="fa fa-play"></i>
                </Button>
              </div>
            </div>
          </Card>
          <div className="block sm:!hidden">
            <div className="flex  justify-between py-3 ">
              <div className="">
                <img src={item.hinhAnh} className="w-36 " alt="" />
              </div>
              <div className="w-60 flex-col flex justify-between ms-5">
                <p className="text-xl text-red-500 overflow-hidden text-ellipsis whitespace-nowrap  w-48">
                  {item.tenPhim}
                </p>
                {item.moTa ? (
                  <Paragraph
                    ellipsis={{
                      rows: 3,
                      expandable: false,
                      tooltip: item.moTa,
                    }}
                  >
                    <p className="text-white">{item.moTa}</p>
                  </Paragraph>
                ) : (
                  <button
                    onClick={() => {
                      goToDetailPage(item.maPhim);
                    }}
                    className="text-black border-x-red-600 bg-red-500 w-full py-3 rounded "
                  >
                    <p className="text-white">Mua Vé</p>
                  </button>
                )}
                <div className="flex justify-center">
                  {item.moTa ? (
                    <button
                      onClick={() => {
                        goToDetailPage(item.maPhim);
                      }}
                      className="text-black border-x-red-600 bg-red-500 w-full py-3 rounded "
                    >
                      <p className="text-white">Mua Vé</p>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  let optionMovie = () => {
    return movies?.slice(0, 18).map((phim) => {
      return {
        value: phim.maPhim,
        label: phim.tenPhim,
      };
    });
  };
  let optionCinema = () => {
    return cinema?.heThongRapChieu.map((cinema) => {
      return {
        value: cinema.maHeThongRap,
        label: cinema.cumRapChieu.map((item) => item.tenCumRap),
      };
    });
  };

  let optionTime = () => {
    return storeData?.flatMap((item) => {
      return item.lichChieuPhim.map((schedule) => {
        return {
          value: schedule.maLichChieu,
          label: moment(schedule.ngayChieuGioChieu).format(
            "ddd, DD/MM - HH:mm"
          ),
        };
      });
    });
  };

  let handleChangeTime = (id, value) => {
    setNgayChieuGioChieu(value.label);
    setSelectedTime(id);
  };

  let handleChangeMovie = (idPhim) => {
    setSelectedMovie(idPhim);
    setSelectedCinema(null);
    setSelectedTime(null);
    console.log(idPhim, "maPhimNe");
    movieService
      .layChiTietCumRap(idPhim)
      .then((trung) => {
        setCinema(trung.data.content);
      })
      .catch((trat) => {});
    // valueMovieNe(idPhim);

    // movie?.map((phim) => {
    //   setValueMovie(phim.tenPhim)
    // })
  };
  let handleChangeCinema = (id) => {
    const selectCinema = cinema?.heThongRapChieu.find((item) => {
      return item.maHeThongRap === id;
    });

    if (selectCinema) {
      setSelectedCinema(id);
      setSelectedTime(null);
      setStoreData(selectCinema.cumRapChieu);
      console.log(storeData);
      return selectCinema;
    }
  };
  const handleOk = () => {
    if (selectedTime && ngayChieuGioChieu) {
      dispatch(setTicket(selectedTime));
      let dataJson = JSON.stringify({
        id: selectedTime,
        lichChieu: ngayChieuGioChieu,
      });

      localStorage.setItem("DATA_TICKET", dataJson);
      window.location.href = `/ticket-booking/${selectedMovie}`;
    } else {
      message.info("Bạn cần phải lựa chọn phim, rạp chiếu, và giờ chiếu");
    }
  };
  const [storeData, setStoreData] = useState([]);
  const [cinema, setCinema] = useState();
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  return (
    <div className="px-5">
      <p className="text-lg py-2 mb-3">Các phim chiếu rạp đang hot</p>
      <div className="hidden  md:!flex justify-center ">
        <div className="my-5">
          {" "}
          <Select
            className="w-36 lg:w-52"
            value={selectedMovie || "Phim"}
            onChange={handleChangeMovie}
            options={optionMovie()}
          />
          <Select
            className="mx-3 w-36 lg:w-52"
            value={selectedCinema || "Rạp"}
            // onChange={handleChange}
            onChange={handleChangeCinema}
            options={optionCinema()}
          />
          <Select
            className="w-36 lg:w-52"
            value={selectedTime || "Giờ chiếu"}
            onChange={handleChangeTime}
            options={optionTime()}
          />
        </div>
        <div className="flex items-center ms-3">
          <button
            className="px-6 py-1  font-normal bg-red-500 hover:bg-red-600 active:bg-slate-800 rounded border border-white"
            onClick={handleOk}
          >
            Mua vé
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 relative">
        {renderMovies()}
      </div>
    </div>
  );
}
