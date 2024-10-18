import React, { useEffect, useState } from "react";
import { Carousel, Button, Modal } from "antd";
import { ConfigProvider } from "antd";

const contentStyle = {
  margin: 0,
  height: "550px",
  color: "#fff",
  position: "relative",
};

let bannerList = [
  {
    maBanner: 1,
    maPhim: 1282,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
  },
  {
    maBanner: 2,
    maPhim: 1283,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png",
  },
  {
    maBanner: 3,
    maPhim: 1284,
    hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png",
  },
];

let trailerList = [
  {
    trailer: "uqJ9u7GSaYM",
  },
  {
    trailer: "kBY2k3G6LsM",
  },
  {
    trailer: "JNZv1SgHv68",
  },
];

// merged

bannerList = bannerList.map((banner, index) => {
  return {
    ...banner,
    trailer: trailerList[index].trailer,
  };
});

export default function CarouselSlice() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal

  const [trailer, setTrailer] = useState("");

  let handleTrailer = (url) => {
    setTrailer(url);

    showModal();
  };

  let renderSLiceFilm = () => {
    return bannerList.map((film, index) => {
      return (
        <div>
          <div style={contentStyle}>
            <img
              src={film.hinhAnh}
              alt="Placeholder"
              style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
            />
            <Button
              type="primary"
              onClick={() => {
                handleTrailer(film.trailer);
              }}
              // onClick={showModal()}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Xem Trailer
            </Button>
          </div>
        </div>
      );
    });
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const showModal = () => {
    setIsModalOpen(true); // Mở modal
  };

  const handleOk = () => {
    setIsModalOpen(false); // Đóng modal khi nhấn OK
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Đóng modal khi nhấn Cancel hoặc bấm ngoài
  };

  return (
    <div>
      {/* Carousel */}
      <Carousel
        arrows
        dotPosition="bottom"
        infinite={true}
        afterChange={onChange}
        autoplay="true"
        autoplaySpeed = {2500}
      >
        {renderSLiceFilm()}
      </Carousel>

      {/* Nút mở Modal */}
      {/* <Button type="primary" onClick={showModal} style={{ marginTop: "20px" }}>
        Xem Video
      </Button> */}

      {/* Modal chứa video */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              fontSize: "30",
              contentBg: "transparent", // Nền modal trong suốt
              headerBg: "transparent", // Nền header trong suốt
              colorIcon: "white", // Đổi màu icon thành trắng,
              colorIconHover	: "white",
              boxShadow: "none"
            },
          },
        }}
      >
        <Modal
          title="" // Không cần tiêu đề
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null} // Xóa nút footer
          destroyOnClose={true} // Đóng modal và gỡ component khi không dùng
          width={1000} // Chiều rộng modal
          style={{
            maxHeight: "none", // Bỏ giới hạn chiều cao
            height: 500, // Chiều cao modal cố định
            backgroundColor: "transparent", // Đảm bảo nền trong suốt
            padding: 0, // Loại bỏ padding mặc định
          }}
          centered // Căn giữa modal theo màn hình
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <iframe
              width="1000px" // Chiếm toàn bộ chiều rộng Modal
              height="500px" // Chiếm toàn bộ chiều cao Modal
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }} // Bỏ viền cho iframe
            ></iframe>
          </div>
        </Modal>
      </ConfigProvider>
      
    </div>
  );
}

// import React, { useState, useEffect } from 'react';

// const movies = [
//   { id: 10530, name: "Kẻ Độc Hành", cinema: "BHD", date: "2024-10-20" },
//   { id: 10649, name: "Captain Marvel 2", cinema: "CGV", date: "2024-10-21" },
//   { id: 10985, name: "CÔ GÁI TỪ QUÁ KHỨ", cinema: "Lotte", date: "2024-10-25" },
//   { id: 10988, name: "Phim chữ B", cinema: "BHD", date: "2024-10-28" },
// ];

// const MovieFilter = () => {
//   const [selectedMovie, setSelectedMovie] = useState('');
//   const [selectedCinema, setSelectedCinema] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [filteredMovies, setFilteredMovies] = useState(movies); // Lưu danh sách sau khi lọc

//   // useEffect để lọc dữ liệu mỗi khi có sự thay đổi trong các lựa chọn
//   useEffect(() => {
//     const filterMovies = () => {
//       const filtered = movies.filter(
//         (movie) =>
//           (selectedMovie ? movie.id === parseInt(selectedMovie) : true) &&
//           (selectedCinema ? movie.cinema === selectedCinema : true) &&
//           (selectedDate ? movie.date === selectedDate : true)
//       );
//       setFilteredMovies(filtered);
//     };

//     filterMovies();
//   }, [selectedMovie, selectedCinema, selectedDate]); // Chạy lại mỗi khi giá trị này thay đổi

//   return (
//     <div className="filter-container">
//       {/* Dropdown Chọn Phim */}
//       <select
//         name="film"
//         value={selectedMovie}
//         onChange={(e) => setSelectedMovie(e.target.value)}
//       >
//         <option value="" disabled>Phim</option>
//         {movies.map((movie) => (
//           <option key={movie.id} value={movie.id}>
//             {movie.name}
//           </option>
//         ))}
//       </select>

//       {/* Dropdown Chọn Rạp */}
//       <select
//         name="cinema"
//         value={selectedCinema}
//         onChange={(e) => setSelectedCinema(e.target.value)}
//       >
//         <option value="" disabled>Rạp</option>
//         <option value="BHD">BHD</option>
//         <option value="CGV">CGV</option>
//         <option value="Lotte">Lotte</option>
//       </select>

//       {/* Dropdown Chọn Ngày */}
//       <select
//         name="date"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//       >
//         <option value="" disabled>Ngày giờ chiếu</option>
//         {movies.map((movie) => (
//           <option key={movie.date} value={movie.date}>
//             {movie.date}
//           </option>
//         ))}
//       </select>

//       {/* Kết quả Lọc */}
//       <div className="movie-list">
//         {filteredMovies.length > 0 ? (
//           filteredMovies.map((movie) => (
//             <div key={movie.id}>
//               <h4>{movie.name}</h4>
//               <p>Rạp: {movie.cinema}</p>
//               <p>Ngày: {movie.date}</p>
//             </div>
//           ))
//         ) : (
//           <p>Không tìm thấy phim phù hợp</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieFilter;
