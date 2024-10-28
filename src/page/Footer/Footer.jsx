import React from "react";
import MediaQuery from "react-responsive";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterMobile";

export default function Footer() {
  return (
    <div>
      <MediaQuery maxWidth={799}>
        <FooterMobile />
      </MediaQuery>
      <MediaQuery minWidth={800} maxWidth={4000}>
        <FooterDesktop />
      </MediaQuery>
    </div>
  );
}
