/*eslint-disable*/



import React, { useEffect } from "react";
import VideoComponent from "../AppComponents/VideoComponent";
import NavbarComponent from "../AppComponents/NavbarComponent";
import FeatureComponent from "../AppComponents/FeatureComponent";
import AboutComponent from "../AppComponents/AboutComponent";
import FooterComponent from "../AppComponents/FooterComponent";

function HomePage() {
  return (
    <React.Fragment>
      <NavbarComponent />
      <VideoComponent />
      <FeatureComponent />
      <AboutComponent />
      <FooterComponent />
    </React.Fragment>
  );
}

export default HomePage;
