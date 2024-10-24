import React, { useState } from "react";
import { Select, Button, Space } from "antd";

const { Option } = Select;

const MovieSelect = () => {
  // State quản lý các giá trị đã chọn
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Dữ liệu mẫu
  const movies = ["Phim 1", "Phim 2", "Phim 3"];
  const cinemas = ["Rạp A", "Rạp B", "Rạp C"];
  const times = ["14:00", "16:30", "20:00"];

  // Hàm reset toàn bộ Select về giá trị mặc định
  const handleReset = () => {
    setSelectedMovie(null);
    setSelectedCinema(null);
    setSelectedTime(null);
  };

  // Hàm xử lý khi chọn một Phim
  const handleMovieChange = (value) => {
    setSelectedMovie(value);
    setSelectedCinema(null); // Reset Rạp
    setSelectedTime(null); // Reset Giờ
  };

  // Hàm xử lý khi chọn một Rạp
  const handleCinemaChange = (value) => {
    setSelectedCinema(value);
    setSelectedTime(null); // Reset Giờ
  };

  // Hàm xử lý khi chọn một Giờ
  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ display: "flex", gap: "10px" }}>
        {/* Select Phim */}
        <Select
          value={selectedMovie || "Phim"}
          style={{ width: 120 }}
          onChange={handleMovieChange}
        >
          {movies.map((movie, index) => (
            <Option key={index} value={movie}>
              {movie}
            </Option>
          ))}
        </Select>

        {/* Select Rạp */}
        <Select
          value={selectedCinema || "Rạp"}
          style={{ width: 120 }}
          onChange={handleCinemaChange}
        >
          {cinemas.map((cinema, index) => (
            <Option key={index} value={cinema}>
              {cinema}
            </Option>
          ))}
        </Select>

        {/* Select Giờ */}
        <Select
          value={selectedTime || "Giờ"}
          style={{ width: 120 }}
          onChange={handleTimeChange}
        >
          {times.map((time, index) => (
            <Option key={index} value={time}>
              {time}
            </Option>
          ))}
        </Select>
      </Space>

      {/* Nút Reset */}
      <Button onClick={handleReset} type="primary" style={{ marginTop: 20 }}>
        Reset
      </Button>
    </div>
  );
};

export default MovieSelect;
