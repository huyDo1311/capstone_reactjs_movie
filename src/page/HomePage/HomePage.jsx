import React from "react";
import ListMoive from "./ListMoive";
import CarouselMoive from "./CarouselMovie";
import { useSelector } from "react-redux";
import TabMovie from "./TabMovie";

export default function HomePage() {
  const user = useSelector((state) => state.userSlice.dataLogin);

  return user ? (
    <>
      <CarouselMoive />
      <ListMoive />
      <TabMovie />
    </>
  ) : (
    (window.location.href = "/")
  );
}
