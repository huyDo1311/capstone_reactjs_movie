import Lottie from "lottie-react";
import React from "react";
import loadingAnimate from "./loading.json";
import { useSelector } from "react-redux";
export default function LoadingPage() {
  let isLoadingNe = useSelector((state) => state.loadingSlice.isLoading);
  return isLoadingNe ? (
    <div
      className="w-full h-full fixed z-50 top-0 flex justify-center items-center "
      style={{
        background: `rgb(20,20,20)`,
      }}
    >
      <Lottie animationData={loadingAnimate} loop={true} className="w-1/2" />
    </div>
  ) : (
    <></>
  );
}
