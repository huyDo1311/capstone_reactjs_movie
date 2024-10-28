import React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import MediaQuery from "react-responsive";

export default function MainHeader() {
  return (
    <div>
      {/* Mobile: Screens smaller than 1024px */}
      <MediaQuery maxWidth={1023}>
        <HeaderMobile />
      </MediaQuery>

      {/* Desktop: Screens from 1024px to 1536px */}
      <MediaQuery minWidth={1024}>
        <HeaderDesktop />
      </MediaQuery>
    </div>
  );
}
