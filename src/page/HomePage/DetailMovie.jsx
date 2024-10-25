import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { Divider, message, Progress, Tabs } from "antd";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { setTicket } from "../../redux/userSlice";
export default function DetailMovie() {
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
        label: <img className="w-24" src={item.logo} alt="" />,
        children: (
          <div
            style={{
              height: "500px",
            }}
            className="overflow-y-scroll"
          >
            {item.cumRapChieu.map((item2) => {
              return (
                <div>
                  <p className="text-xl ms-2">{item2.tenCumRap}</p>
                  <div className="grid grid-cols-2 gap-2 my-5 mx-2">
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
                          className="bg-red-600 rounded hover:bg-red-700 transition"
                        >
                          <p className="text-center py-2">
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
          <p className="text-4xl font-semibold text-red-600 my-5">
            Nội dung phim
          </p>
          <Divider
            style={{
              borderColor: "red",
            }}
          ></Divider>
          <div className="flex">
            <div className="flex">
              <div
                className="border-r-2 border-red-600"
                style={{ width: "288px" }}
              >
                <img
                  className="w-56 rounded"
                  src={detailMovies?.hinhAnh}
                  alt=""
                />
              </div>
              <div className="ms-5">
                <p className="font-bold text-xl ">{detailMovies?.tenPhim}</p>
                <p className="text-xs w-96 my-5">
                  {" "}
                  <span className="text-red-600 text-sm"> Mô tả </span>:{" "}
                  {detailMovies?.moTa}
                </p>
                <div className="my-3">
                  {" "}
                  <span className="text-sm text-red-500">Lịch chiếu : </span>
                  <span className="text-sm text-white">
                    {moment(detailMovies?.ngayChieuGioChieu).format(
                      "ddd, DD/MM - HH:mm"
                    )}
                  </span>
                </div>
                <div className="h-10 flex items-center">
                  <span className="text-sm text-red-500">Trailer : </span>

                  <a
                    target="_blank"
                    href={detailMovies?.trailer}
                    className="ms-3 hover:scale-125 transition "
                  >
                    <i class="fa fa-play text-red-500 text-2xl "></i>
                  </a>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleScroll}
                    className="px-10 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Mua vé
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
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
        className="border-4 rounded border-red-600 mt-16 mx-7 p-10"
      >
        <div>
          <p className="text-4xl text-center pb-7">
            Các rạp phim hiện đang có suất chiếu{" "}
          </p>
          <Tabs
            className="ms-36 "
            tabPosition="left"
            items={itemsCinema()}
            style={{
              height: "500px",
              width: "1000px",
            }}
          />
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
