import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { Divider, message, Progress, Tabs } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { setTicket } from "../../redux/userSlice";
export default function DetailMovie() {
  let navigate = useNavigate();
  let { id } = useParams();

  const takeDataTickets = (dataMa, dataLichChieu) => {
    dispatch(setTicket({ id: dataMa, lichChieu: dataLichChieu }));
    let dataJson = JSON.stringify({ id: dataMa, lichChieu: dataLichChieu });
    localStorage.setItem("DATA_TICKET", dataJson);
    window.location.href = `/ticket-booking/${id}`;
  };
  const itemsCinema = () => {
    return cinema?.heThongRapChieu?.map((item) => {
      return {
        key: item.maHeThongRap,
        label: <img className="sm:w-24 w-10" src={item.logo} alt="" />,
        children: (
          <div className="overflow-y-scroll h-96">
            {item.cumRapChieu.map((item2) => {
              return (
                <div>
                  <p className="text-sm sm:text-xl ms-2">{item2.tenCumRap}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 my-5 mx-2">
                    {item2.lichChieuPhim.slice(0, 3).map((item3) => {
                      return (
                        <button
                          onClick={() => {
                            takeDataTickets(
                              item3.maLichChieu,
                              item3.ngayChieuGioChieu
                            );
                          }}
                          key={item3.maLichChieu}
                          className="bg-red-600 rounded hover:bg-red-700 transition "
                        >
                          <p className="text-center py-2 text-xs sm:text-sm">
                            {moment(item3.ngayChieuGioChieu).format(
                              "ddd, DD/MM - HH:mm"
                            )}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ),
      };
    });
  };
  let renderDetail = () => {
    return (
      <div>
        <div>
          <div className="flex justify-between">
            <p className="text-4xl font-semibold text-red-600 my-5">
              Nội dung phim
            </p>
            <div className="flex items-center  relative w-20">
              <i
                onClick={() => {
                  navigate("/home");
                }}
                class="fa fa-arrow-left text-red-600 animate-fade-slide  text-3xl absolute cursor-pointer"
              ></i>
            </div>
          </div>
          <Divider
            style={{
              borderColor: "red",
            }}
          ></Divider>
          <div className="block lg:flex">
            <div className="block md:flex">
              <div className="flex justify-center sm:border-r-2 sm:border-red-600 ">
                <div className="sm:me-10   sm:w-56 w-72- 2xl:w-96 ">
                  <img
                    className=" rounded h-full m-auto"
                    src={detailMovies?.hinhAnh}
                    alt=""
                  />
                </div>
              </div>
              <div className="sm:ms-5 mt-5 sm:mt-0 flex flex-col  items-center w-full">
                <p className="font-bold text-xl text-center sm:text-left w-full ">
                  {detailMovies?.tenPhim}
                </p>
                <p className="text-xs w-full sm:my-5 my-2">
                  {" "}
                  <span className="text-red-600 text-sm w-full ">
                    {" "}
                    Mô tả{" "}
                  </span>:{" "}
                  <span className="text-center">{detailMovies?.moTa}</span>
                </p>
                <div className="my-3 w-full ">
                  {" "}
                  <span className="text-sm text-red-500 ">Lịch chiếu : </span>
                  <span className="text-sm text-white">
                    {moment(detailMovies?.ngayChieuGioChieu).format(
                      "ddd, DD/MM - HH:mm"
                    )}
                  </span>
                </div>
                <div className="h-10 flex items-center w-full">
                  <span className="text-sm text-red-500">Trailer : </span>

                  <a
                    target="_blank"
                    href={detailMovies?.trailer}
                    className="ms-3 hover:scale-125 transition "
                  >
                    <i class="fa fa-play text-red-500 text-2xl "></i>
                  </a>
                </div>
                <div className="mt-4 w-full">
                  <button
                    onClick={handleScroll}
                    className="px-10 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Mua vé
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center xl:items-center my-10 sm:my-0 sm:hidden lg:flex">
              <Progress
                size={200}
                className="text-white text-center"
                strokeColor="red"
                type="circle"
                percent={detailMovies?.danhGia * 10}
                format={() => (
                  <span className="text-xl font-medium">
                    {detailMovies?.danhGia}/ 10 điểm
                  </span>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  let renderCinema = () => {
    return cinema?.heThongRapChieu.length > 0 ? (
      <div
        ref={sectionRef}
        className="border-4 rounded border-red-600 mx-0 p-5  sm:mt-16 sm:mx-7 sm:p-10  "
      >
        <div>
          <p className="text-lg sm:text-4xl text-center pb-7 ">
            Các rạp phim hiện đang có suất chiếu{" "}
          </p>
          <Tabs className=" " tabPosition="left" items={itemsCinema()} />
        </div>
      </div>
    ) : (
      <div className="border-4 rounded border-red-600 mt-16 mx-7 p-10">
        <p className="text-4xl text-center ">
          Phim này hiện đang không có suất chiếu
        </p>
      </div>
    );
  };
  const [detailMovies, setDetailMovies] = useState();
  const [cinema, setCinema] = useState();
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const handleScroll = () => {
    cinema.heThongRapChieu.length > 0
      ? sectionRef.current.scrollIntoView({ behavior: "smooth" })
      : message.info("Phim này hiện đang không có suất chiếu");
  };
  useEffect(() => {
    movieService
      .layChiTietPhim(id)
      .then((res) => {
        console.log(res.data.content, "dung roi em");
        setDetailMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err, "sai roi em");
      });
    movieService
      .layChiTietCumRap(id)
      .then((res) => {
        console.log(res.data.content, "cc");
        setCinema(res.data.content);
      })
      .catch((err) => {
        console.log(err, "sai");
      });
  }, []);

  return (
    <div className="mx-10 my-16">
      {renderDetail()} {renderCinema()}
    </div>
  );
}
