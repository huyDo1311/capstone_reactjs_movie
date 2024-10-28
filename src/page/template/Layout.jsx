import React from "react";
import Footer from "../Footer/Footer";
import MainHeader from "../Header/MainHeader";

export default function Layout({ content }) {
  return (
    <div>
      <MainHeader />
      {content}
      <Footer />
    </div>
  );
}
