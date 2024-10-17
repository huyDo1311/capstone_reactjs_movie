import React, { useEffect, useState } from 'react';
import { movieService } from '../../service/movieService';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ListMovie() {
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    movieService
      .layDanhSachPhim()
      .then((res) => {
        console.log(res.data.content, 'tc');
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err, 'tb');
      });
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
              height: '130px',
              backgroundSize: 'cover',
              border: 'transparent 1px solid',
              backgroundPosition: 'center',
              backgroundImage: `url(${item.hinhAnh})`,
            }}
            size="small"
            className="hover:bg-blue-400 duration-300 rounded hover:scale-110 hover:z-10"
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
        </div>
      );
    });
  };

  return (
    <div className="px-5">
      <p className="text-lg py-2">Các phim chiếu rạp đang hot</p>
      <div className="grid grid-cols-6 gap-2 relative">{renderMovies()}</div>
    </div>
  );
}
