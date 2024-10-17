import React from 'react';
import ListMoive from './ListMoive';
import CarouselMoive from './CarouselMovie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const user = useSelector((state) => state.userSlice.dataLogin);
  const render = () => {
    if (user) {
      return (
        <>
          <CarouselMoive />
          <ListMoive />
        </>
      );
    } else {
      return (window.location.href = '/');
    }
  };
  return <div>{render()}</div>;
}
