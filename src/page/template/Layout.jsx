import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ content }) {
  return (
    <div>
      <Header />
      {content}
      <Footer />
    </div>
  );
}
