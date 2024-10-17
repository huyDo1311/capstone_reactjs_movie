import React, { useEffect, useState } from 'react';
import { movieService } from '../../service/movieService';
import { Card, Popover } from 'antd';
import Meta from 'antd/es/card/Meta';

export default function ListMoive() {
  const [movies, setMovies] = useState();
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
  let renderMovies = () => {
    return movies?.map((item) => {
      return (
        <Card
          className="hover:bg-blue-400 hover:scale-90 transition duration-300"
          hoverable
          cover={
            <img
              alt="example"
              className="h-40 object-cover"
              src={item.hinhAnh}
            />
          }
        >
          <Meta
            title={<Popover content={item.tenPhim}>{item.tenPhim}</Popover>}
          />
        </Card>
      );
    });
  };
  return <div className="grid grid-cols-6 gap-3">{renderMovies()}</div>;
}
